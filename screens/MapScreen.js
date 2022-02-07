import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity,View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from '../constants/Colors';

function MapScreen(props) {
    const initialLocation = props.navigation.getParam("initialLocation");
    const readonly = props.navigation.getParam("readonly");

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221
    };

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }
        const coord = event.nativeEvent.coordinate;
        setSelectedLocation({
            lat: coord.latitude,
            lng: coord.longitude
        });
    };

    //to navigate back WITH params we can use navigate and set the previous page. The stack will not go on top but actually will go back
    //and we pass the params as a second argument
    const savePickedLocation = useCallback(() => {
        if (!selectedLocation) {
            return;
        }

        props.navigation.navigate('NewPlace', {
            pickedLocation: selectedLocation
        });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocation})
    }, [savePickedLocation])

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }


    //add a style and region props
    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>}
        </MapView>
    );
};

MapScreen.navigationOptions = data => {
    const readonly = data.navigation.getParam('readonly');
    const saveLocation = data.navigation.getParam("saveLocation");
    if(readonly){
        return {};
    }
    return {
        headerRight: () => {
            return (
                <TouchableOpacity onPress={saveLocation} style={styles.headerButtonContainer}>
                    <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
            )
        }
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButtonContainer: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen;
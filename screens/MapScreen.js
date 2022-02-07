import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen(props) {
    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        const coord = event.nativeEvent.coordinate;
        setSelectedLocation({
            lat: coord.latitude,
            lng: coord.longitude
        })
    };

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


const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default MapScreen;
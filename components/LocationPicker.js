import React, {useState, useEffect} from 'react';
import { TouchableOpacity, View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from "expo-location";
import MapPreview from './MapPreview';

function LocationPicker(props) {

    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const mapPickedLocation = props.navigation.getParam("pickedLocation");

    //we don't mapPickedLocation if we navigate from PlacesListScreen and it's going to be undefinded
    //but we set up useEffect and if we come from MapScreen it's gonna change, useEffect will listen for its changes
    //and then this function will trigger
    const {onLocationPicked} = props;
    useEffect(() => {
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    }, [onLocationPicked, mapPickedLocation])

    const pickOnMapHandler = () => {
        props.navigation.navigate("Map");
    }

    const getLocationHandler = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (!status === 'granted') {
            return;
        };

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            
            setIsFetching(false);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview onPress={pickOnMapHandler}  style={styles.mapPreview} location={pickedLocation}>
                { isFetching ? <ActivityIndicator color={Colors.primary} size='small' /> : <Text>No location chosen yet</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
                <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        margin: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "100%"
    }
});

export default LocationPicker;

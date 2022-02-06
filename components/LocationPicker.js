import React, {useState} from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from "expo-location";
import MapPreview from './MapPreview';

function LocationPicker(props) {

    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

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
            })
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview  style={styles.mapPreview} location={pickedLocation}>
                { isFetching ? <ActivityIndicator color={Colors.primary} size='small' /> : <Text>No location chosen yet</Text>}
            </MapPreview>
            <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
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
    }
});

export default LocationPicker;

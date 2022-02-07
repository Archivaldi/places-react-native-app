import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
import { useSelector } from "react-redux";

function PlaceDetailsScreen(props) {
    const placeId = props.navigation.getParam('placeId');
    const place = useSelector(state => state.places.places.find(place => place.id === placeId));
    const initialLocation = {lat: place.lat, lng: place.lng}

    const showMapHandler = () => {
        props.navigation.navigate("Map", {
            readonly: true,
            initialLocation
        });
    };

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image style={styles.image} source={{uri: place.image}} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}><Text style={styles.address}>{place.adress}</Text></View>
                <MapPreview style={styles.mapPreview} location={initialLocation} onPress={showMapHandler}/>
            </View>
        </ScrollView>
    );
}

PlaceDetailsScreen.navigationOptions = data => {
    const placeTitle = data.navigation.getParam("placeTitle");
    return {
        headerTitle: placeTitle
    };
};

const styles = StyleSheet.create({
    image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
    },
    locationContainer: {
      marginVertical: 20,
      width: '90%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10
    },
    addressContainer: {
      padding: 20
    },
    address: {
      color: Colors.primary,
      textAlign: 'center'
    },
    mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 300,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  });

export default PlaceDetailsScreen;

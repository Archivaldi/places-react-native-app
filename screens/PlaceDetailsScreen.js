import React from 'react';
import { View, Text, StyleSheet } from "react-native";

function PlaceDetailsScreen() {
    return (
        <View>
            <Text>This is PlaceDetailsScreen</Text>
        </View>
    );
}

PlaceDetailsScreen.navigationOptions = data => {
    const placeTitle = data.navigation.getParam("placeTitle");
    return {
        headerTitle: placeTitle
    }
};

const styles = StyleSheet.create({
    
})

export default PlaceDetailsScreen;

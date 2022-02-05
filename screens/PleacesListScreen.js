import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";


function PlacesListScreen(props) {
    const places = useSelector(state => state.places.places);

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => {
                return (
                    <PlaceItem onSelect={() => {
                        props.navigation.navigate("PlaceDetail", {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        })
                    }}
                        image={'some image'} title={itemData.item.title} address={"some address"}
                    />
                )
            }}
        />
    );
}

PlacesListScreen.navigationOptions = data => {
    return {
        headerTitle: 'All Places',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Add Plave" iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => {
                        data.navigation.navigate("NewPlace")
                    }} />
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen;

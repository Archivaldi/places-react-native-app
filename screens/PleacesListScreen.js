import React from 'react';
import { View, Text, StyleSheet, Platform } from "react-native";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';


function PlacesListScreen() {
    return (
        <View>
            <Text>This is PlacesListScreen</Text>
        </View>
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
                    }}/>
                </HeaderButtons>
            )
        }
    } 
}

const styles = StyleSheet.create({

})

export default PlacesListScreen;

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as placesActions from "../store/actions/places";
import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

function NewPlaceScreen(props) {
    const [titleValue, setTitleValue] = useState('');
    const [image, setImage] = useState(undefined);
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //add validation
        setTitleValue(text)
    };

    const savePlaceHandler = () => {
        if (titleValue && image && selectedLocation) {
            dispatch(placesActions.addPlace(titleValue, image, selectedLocation));
            props.navigation.goBack();
        }
    };

    const imageTakenHanler = imagePath => {
        setImage(imagePath);
    };

    const locationPicked = useCallback(location => {
        setSelectedLocation(location)
    }, [])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
                <ImgPicker onImageTaken={imageTakenHanler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPicked} />
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = data => {
    return {
        headerTitle: 'Add New Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen;

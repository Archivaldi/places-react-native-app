import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import GOOGLE_API_KEY from '../env';

function MapPreview(props) {
    let imagePreviewUrl;
    if (props.location) {
        console.log(props.location)
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${GOOGLE_API_KEY.ios}`;
        console.log(imagePreviewUrl);
    }
    return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location ? <Image  style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: "100%",
        height: "100%"
    }
})

export default MapPreview;

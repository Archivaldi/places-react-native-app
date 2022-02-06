import React, {useState} from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from "expo-image-picker";


function ImgPicker(props) {
  const [pickedImage, setPickedImage] = useState();
  const takeImageHandler = async () => {
    const hasPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!hasPermission.granted) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri)

  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? 
        (<Text style={styles.text}>No image picked yet</Text>) 
        :
        (
          // <View style={styles.imageContainer}> 
          <Image style={styles.image} source={{uri: pickedImage}} /> 
          //</View>
        )}
        <Button title={!pickedImage ? "Take Image" : 'Change Image'} color={Colors.primary} onPress={takeImageHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  text: {
    marginBottom: 15
  },
  imageContainer: {
    marginTop: 15
  },
  image: {
    width: '100%',
    height: '80%'
  }
})

export default ImgPicker;

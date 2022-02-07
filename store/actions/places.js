import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces, deletePlace } from "../../db/db";
import GOOGLE_API_KEY from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const DELETE_PLACE = "DELETE_PLACE";

export const addPlace = (title, image, location) => {

    return async dispatch => {

        //converting the coordinates into human readable address
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_API_KEY.ios}`);
        if (!response.ok){
            throw new Error("Something went wrong");
        };
        const responseData = await response.json();
        if (!responseData){
            throw new Error("Something went wrong");
        };

        const address = responseData.results[0].formatted_address;

        //saving adn moving the image
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
            dispatch({ type: ADD_PLACE, placeData: { title, image: newPath, id: dbResult.insertId, coords: {lat: location.lat, lng: location.lng} } });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            const places = dbResult.rows._array;
            dispatch({ type: SET_PLACES, places })
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};

export const removePlace = (id) => {
    return async dispatch => {
        try {

            const dbResult = await deletePlace(id);
            console.log(dbResult);

            dispatch({type: DELETE_PLACE, placeId: id})
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
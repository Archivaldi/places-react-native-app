import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces, deletePlace } from "../../db/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const DELETE_PLACE = "DELETE_PLACE";

export const addPlace = (title, image) => {

    return async dispatch => {
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'dammu address', 15.6, 12.3);
            dispatch({ type: ADD_PLACE, placeData: { title, image: newPath, id: dbResult.insertId } });
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
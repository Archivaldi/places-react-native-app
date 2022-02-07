import Place from "../../models/Place";
import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from "../actions/places";
const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type){
        case ADD_PLACE: 
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image, action.placeData.adress, action.placeData.coords.lat, action.placeData.coords.lng);
            return {
                ...state,
                places: state.places.concat(newPlace)
            }
        case SET_PLACES: 
            return {
                ...state,
                places: action.places.map(place => {
                    return new Place(place.id.toString(), place.title, place.imageUri, place.adress, place.lat, place.lng)
                }
                ) 
            }
        case DELETE_PLACE: {
            const filteredPlaces = state.places.filter(place => place.id !== action.placeId);
            return {
                ...state,
                places: filteredPlaces
            }
        };
        default: 
            return state
    }
}
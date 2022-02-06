import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {init} from "./db/db";

import placesReducer from "./store/reducers/places"

import PlacesNavigator from './navigation/PlacesNavigator';

//initializing the database as soon as the app launches
init().then(() => {
  console.log("Initilized the database")
}).catch(err => {
  console.log('Initializing the db failed');
  console.log(err);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

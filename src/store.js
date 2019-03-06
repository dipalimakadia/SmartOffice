import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';


const firebaseConfig = {
    apiKey: "AIzaSyDe1AbBzEETr0JPkXMqwEMy-gGbhVQdp9Y",
    authDomain: "reactclientproject-f3c57.firebaseapp.com",
    databaseURL: "https://reactclientproject-f3c57.firebaseio.com",
    projectId: "reactclientproject-f3c57",
    storageBucket: "reactclientproject-f3c57.appspot.com",
    messagingSenderId: "901992004884"
};

//react-redux-firebaseConfig
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

//init firebase instance
firebase.initializeApp(firebaseConfig);

//init firestore
const firestore = firebase.firestore();
const settings ={ timestampsInSnapshots: true};
 firestore.settings(settings);

const createStoreWithFirebase = compose (
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});

//check for settings in local storage
if(localStorage.getItem('settings') == null){
   // default settings
   const defaultSettings = { allowRegistration: false
  }
  //set to localstorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//create intial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

//create store

const store = createStoreWithFirebase(
    rootReducer, 
    initialState, 
    compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
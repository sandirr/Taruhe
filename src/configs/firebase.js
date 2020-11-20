import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyC6X5ljOipfwatCZAOD9HW1dhbdr9zkLp0",
    authDomain: "taruhe-media.firebaseapp.com",
    databaseURL: "https://taruhe-media.firebaseio.com",
    projectId: "taruhe-media",
    storageBucket: "taruhe-media.appspot.com",
    messagingSenderId: "1066028277550",
    appId: "1:1066028277550:web:9597c55ae2f3ddd86724bf"
};

let appConfig = firebase.initializeApp(firebaseConfig);
export let fDB = appConfig.database();
export let fAuth = firebase.auth();
export let fStorage = firebase.storage();

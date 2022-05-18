import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn9setska2fITb1v9zCbqfFm8FA4wg99c",
  authDomain: "trail-tracker-image-store.firebaseapp.com",
  databaseURL: "gs://trail-tracker-image-store.appspot.com/images",
  projectId: "trail-tracker-image-store",
  storageBucket: "trail-tracker-image-store.appspot.com",
  messagingSenderId: "875270639826",
  appId: "1:875270639826:web:a01fc9fc65c3a7ed5c1d0b",
  measurementId: "G-97YV4VZ0ZS",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

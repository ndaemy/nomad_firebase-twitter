import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBM9B_Uwnrl2Hro_5R93wSPBEhU9YOCWm8',
  authDomain: 'nomad-firebase-twitter.firebaseapp.com',
  projectId: 'nomad-firebase-twitter',
  storageBucket: 'nomad-firebase-twitter.appspot.com',
  messagingSenderId: '96582522466',
  appId: '1:96582522466:web:15436d1d78b27eb16a633b',
};

const app = firebase.initializeApp(firebaseConfig);

export default app;

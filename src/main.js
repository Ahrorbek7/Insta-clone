import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Import the Firebase storage module

import './assets/main.css';
import './assets/media.css';
import './assets/normalize.css';

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: "AIzaSyCxpFord-RG601KEwEvw1k5PSLxRtcTDZk",
  authDomain: "join-web-9b1f8.firebaseapp.com",
  projectId: "join-web-9b1f8",
  storageBucket: "join-web-9b1f8.appspot.com",
  messagingSenderId: "1046190171024",
  appId: "1:1046190171024:web:3660b51437daf011830915",
  measurementId: "G-5Q8S04JHD0"
};
const firebaseConfig2 = {
  apiKey: "AIzaSyDF_FyRLRbgv6FhaE2ZweR1Dq5YkhYELo0",
  authDomain: "weather-app-451a2.firebaseapp.com",
  projectId: "weather-app-451a2",
  storageBucket: "weather-app-451a2.appspot.com",
  messagingSenderId: "251626659175",
  appId: "1:251626659175:web:ae59b3a2dfff2c5302a3c2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp2 = initializeApp(firebaseConfig2, 'second_app');
// Get a reference to the Firebase database and storage
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

const db2 = getDatabase(firebaseApp2);
const storage2 = getStorage(firebaseApp2);
const app = createApp(App);

app.use(router);

// Make the Firebase database and storage references available in all components
app.config.globalProperties.$db = db;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$db2 = db2;
app.config.globalProperties.$storage2 = storage2;

app.mount('#app');

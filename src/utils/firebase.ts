// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyDRSLx_4mw1dS6i1FeIZEvPxVmUKTftn5A',
  authDomain: 'bean-go-town.firebaseapp.com',
  projectId: 'bean-go-town',
  storageBucket: 'bean-go-town.appspot.com',
  messagingSenderId: '296185596722',
  appId: '1:296185596722:web:dd9fa3892d97e0ff6aa52b',
  measurementId: 'G-KMCSM7Q42G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics: Analytics;
// only for csr
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export const setEvent = (eventName: string, params?: object) => {
  logEvent(analytics, eventName, params);
};

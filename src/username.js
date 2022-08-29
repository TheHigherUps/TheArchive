import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, query, collection } from 'firebase/firestore'
const { initializeAppCheck, ReCaptchaV3Provider }  = require('firebase/app-check')
const firebaseConfig = {
    apiKey: "AIzaSyDnTUk73OznQKMQl4hkJB0klLrjI3vuTjI",
    authDomain: "thu-shop.firebaseapp.com",
    projectId: "thu-shop",
    storageBucket: "thu-shop.appspot.com",
    messagingSenderId: "231897879888",
    appId: "1:231897879888:web:21f214f0dbdb7c80b10855",
    measurementId: "G-X9T0NQJKWK"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const q = query(collection(db, "usernames"))
const siteKey = '6LdPnEsgAAAAAMJeffsdvV93ZSogm6rVrE2ET3z5'
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true
})
const querySnapshot = await getDocs(q);

const search = document.querySelector('.usernameSeacrh')
const input = document.querySelector('input')
search.addEventListener('submit', (e) => {
    e.preventDefault()
    var inputValue = input.value
    const x = querySnapshot.forEach((doc) => {
        if(inputValue.toUpperCase() == doc.id) {
            alert('Username Not Available')
        }
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
    });

})
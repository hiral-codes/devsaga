import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUT7PMtajyUbsbY0qdpcnz2VqxCV5UHus",
    authDomain: "devsaga-4808b.firebaseapp.com",
    projectId: "devsaga-4808b",
    storageBucket: "devsaga-4808b.firebasestorage.app",
    messagingSenderId: "695274059244",
    appId: "1:695274059244:web:521502a911c3193455fcc9",
    measurementId: "G-WQ15EWJ4S3"
  };
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
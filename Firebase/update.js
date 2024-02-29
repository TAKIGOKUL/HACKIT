import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzGLohu4cQVTdB9kBCGPFN3AVnT5eyeHI",
  authDomain: "fir-eba48.firebaseapp.com",
  projectId: "fir-eba48",
  storageBucket: "fir-eba48.appspot.com",
  messagingSenderId: "316656891183",
  appId: "1:316656891183:web:19c80a73275d7551b41dda",
  measurementId: "G-XCS92351S3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyBzGLohu4cQVTdB9kBCGPFN3AVnT5eyeHI",
    authDomain: "fir-eba48.firebaseapp.com",
    projectId: "fir-eba48",
    storageBucket: "fir-eba48.appspot.com",
    messagingSenderId: "316656891183",
    appId: "1:316656891183:web:19c80a73275d7551b41dda",
    measurementId: "G-XCS92351S3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Authentication setup
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin && googleLogin.addEventListener("click", () => {
    const radioButton = document.getElementsByClassName("client");

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            if (radioButton[0].checked) {
                // alert('lead to doc page')
                window.location.href = "../doctorSide/docPage.html";
            }
            else {
                // alert('lead to paitents page')
                window.location.href = "../patientSide/info/surveyandmap.html";
            }


        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
})

const user = auth.currentUser;

// After login user details can be taken as shown below, ID are not working replace it according to our patient page okay.
function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = userName;
    // document.getElementById("userEmail").textContent = userEmail;
    // document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    }
});
//Database Setup
const db = getFirestore(app);
//write document
const patientBtn = document.getElementById('patientBtn');
patientBtn && patientBtn.addEventListener('click', async (e) => {
    const user = auth.currentUser;
    const form = document.getElementById('patientInfo');
    const formData = new FormData(form);
    // Convert the form data to a JSON object
    const data = Object.fromEntries(formData.entries());
    // Log the form data to the console
    data.name = user.displayName;
    data.Email = user.email;
    data.Picture = user.photoURL;
    console.log(data);
    await setDoc(doc(db, "patient", "pat1"), {data});

});

//read document
const Pname =  document.getElementById('Pname');
const PAge =  document.getElementById('PAge');
const Pconscious =  document.getElementById('Pconscious');
const Pbleeding =  document.getElementById('Pbleeding');
const Pbreathing =  document.getElementById('Pbreathing');
const Pparticles =  document.getElementById('Pparticles');
const Pburns = document.getElementById('Pburns');
const Pwounds =  document.getElementById('Pwounds');
const Pfractures =  document.getElementById('Pfractures');
const Pfoaming =  document.getElementById('Pfoaming');
const Pjerking =  document.getElementById('Pjerking');
const painRange =  document.getElementById('painRange');




const getPatientInfo = document.getElementById('getPatientInfo');
getPatientInfo && getPatientInfo.addEventListener('click', async (e) => {
    
    const docRef = doc(db, "patient", "pat1");
    const docSnap = await getDoc(docRef);
    const patient = docSnap.data().data;
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().data);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    Pname.textContent = patient.name;
    PAge.textContent = patient.age;
    Pconscious.textContent = patient.conscious;
    Pbleeding.textContent = patient.bleeding;
    Pbreathing.textContent = patient.breathing;
    Pparticles.textContent = patient.particles;
    Pburns.textContent = patient.burns;
    Pwounds.textContent = patient.wounds;
    Pfractures.textContent = patient.fractures;
    Pfoaming.textContent = patient.foaming;
    Pjerking.textContent = patient.jerking;
    painRange.value = patient.painRange;
    


    
});




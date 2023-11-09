// Importer Firebase-moduler
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';


const firebaseConfig = {
    apiKey: "AIzaSyBXAGI_oHBOZNrdSbFy233x2PeUlYgMtNc",
    authDomain: "goog-90b91.firebaseapp.com",
    projectId: "goog-90b91",
    storageBucket: "goog-90b91.appspot.com",
    messagingSenderId: "462092741210",
    appId: "1:462092741210:web:f840dccad7c073a9330663",
    measurementId: "G-BGJNZZ8QYK"
  };

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Funksjoner for å vise og skjule modaler
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.toggle('show');
}

// Eksporter funksjonene for å gjøre dem tilgjengelig globalt
window.toggleModal = toggleModal;

// Funksjoner for brukerregistrering og innlogging
window.registerWithEmail = function() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Registrert!');
        // Omdiriger brukeren
        window.location.href = 'survey.html';
      })
      .catch((error) => {
        console.error('Feil under registrering:', error);
        alert(error.message);
      });
};

window.loginWithEmail = function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showLoginSuccess(); // Viser suksessmelding og omdirigerer
      })
      .catch((error) => {
        console.error('Feil under innlogging:', error);
        alert(error.message);
      });
};

window.signInWithGoogle = function() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Dette er for å håndtere registrering eller innlogging
        if (result.additionalUserInfo.isNewUser) {
          alert('Registrert med Google!');
        } else {
          alert('Logget inn med Google!');
        }
        // Omdiriger brukeren
        window.location.href = 'survey.html';
      })
      .catch((error) => {
        console.error('Feil under Google innlogging/registrering:', error);
        alert(error.message);
      });
};

function showLoginSuccess() {
  alert('Logget inn suksessfullt. Du vil bli omdirigert etter 3 sekunder.');
  setTimeout(() => {
    window.location.href = 'survey.html';
  }, 3000);
}

window.signInWithGoogle = function() {
    // Denne metoden vil fungere for både registrering og innlogging med Google
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Google Sign-In var vellykket, brukerens informasjon er i result.user
        console.log('Google Sign-In suksess:', result.user);
        // Du kan sjekke om brukeren er ny eller eksisterende
        if (result.additionalUserInfo.isNewUser) {
          alert('Velkommen! Registreringen var vellykket.');
        } else {
          alert('Velkommen tilbake!');
        }
        // Omdiriger brukeren
        window.location.href = 'survey.html';
      })
      .catch((error) => {
        console.error('Feil under Google Sign-In:', error);
        alert('Feil: ' + error.message);
      });
};

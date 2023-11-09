import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

// Funksjoner for brukerregistrering
window.registerWithEmail = function() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toggleModal('register-modal');
        console.log('Registrert!', userCredential);
      })
      .catch((error) => {
        console.error('Feil under registrering:', error);
      });
};

// Funksjoner for brukerpålogging
window.loginWithEmail = function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toggleModal('login-modal');
        console.log('Logget inn!', userCredential);
      })
      .catch((error) => {
        console.error('Feil under pålogging:', error);
      });
};

// Funksjoner for pålogging med Google
window.signInWithGoogle = function() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toggleModal('login-modal');
        console.log('Logget inn med Google!', result);
      })
      .catch((error) => {
        console.error('Feil under Google-pålogging:', error);
      });
};

// Eksponer toggleModal funksjonen globalt
window.toggleModal = toggleModal;
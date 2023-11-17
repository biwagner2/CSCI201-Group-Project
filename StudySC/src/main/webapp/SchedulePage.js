// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxIh2I5wX5qBQZejtrY7UW1CleXXbSGOo",
  authDomain: "studysc-413c1.firebaseapp.com",
  projectId: "studysc-413c1",
  storageBucket: "studysc-413c1.appspot.com",
  messagingSenderId: "314350385254",
  appId: "1:314350385254:web:e08cef4cda10efe8a5d5a7",
  measurementId: "G-JPR3JFNM7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


document.addEventListener('DOMContentLoaded', function() {
    var joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        alert('Join button clicked for ' + this.previousElementSibling.previousElementSibling.textContent);
      });
    });
  });
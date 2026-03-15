const firebaseConfig = {
  apiKey: "AIzaSyDf69bfFI-_H2lAgTmGGlKwwZy8Z-Ygebc",
  authDomain: "apollo-site1.firebaseapp.com",
  databaseURL: "https://apollo-site1-default-rtdb.firebaseio.com",
  projectId: "apollo-site1",
  storageBucket: "apollo-site1.firebasestorage.app",
  messagingSenderId: "179544841404",
  appId: "1:179544841404:web:f4583a97b747f2b2c544b9",
  measurementId: "G-1BFWMYVXKH"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Global database reference
window.apolloDB = firebase.database();

// Real-time online counter
(function trackPresence() {
  const db = window.apolloDB;
  const con = db.ref('.info/connected');

  // Sanitize hostname to use as a database key (replace '.' with '_')
  const domainKey = window.location.hostname.replace(/\./g, '_');
  const connectionsRef = db.ref(`connections/${domainKey}`);

  con.on('value', snap => {
    if (snap.val() !== true) return;
    const userConn = connectionsRef.push(true);
    userConn.onDisconnect().remove();
  });

  // Broadcast online count to any element with id="players-count" OR id="statOnline"
  connectionsRef.on('value', snap => {
    const count = snap.numChildren();
    const elIndex = document.getElementById('players-count');
    const elAdmin = document.getElementById('statOnline');
    if (elIndex) elIndex.textContent = count;
    if (elAdmin) elAdmin.textContent = count;
  });
})();


// =================================================================================
// MUHIIM: TALLAABO LAGAAGA BAAHAN YAHAY
// =================================================================================
//
// Si aad u xalliso ciladaha Firebase, WAA INAAD ku beddeshaa qiyamka hoose ee
// ku-meelgaarka ah habeynta dhabta ah ee mashruucaaga Firebase.
//
// SIDA LOO HELO HABEYNTAADA FIREBASE:
// 1. Tag mashruucaaga Firebase ee Firebase Console: https://console.firebase.google.com/
// 2. Dhinaca bidix, guji astaanta gear-ka (Project settings).
// 3. Kaarka "Your apps", dooro web app-ka aad isticmaalayso.
// 4. Qaybta "Firebase SDK snippet", dooro "Config".
// 5. Koobi ka samee object-ka habeynta oo qiyamkiisa ku dheji hoos.
//
// DIGNIIN: FAYLKAN OO AY KU JIRAAN FURAYAASHAADA RUNTA AH HA KU DARIN KEYD DADWEYNE.
// Hubi inuu ku jiro faylkaaga .gitignore.
//
// =================================================================================

window.FIREBASE_CONFIG = {
  // Ka hel Firebase Console > Project settings > General > Your apps > Web app
  apiKey: "YOUR_API_KEY", // Ku beddel furahaaga API-ga ee Firebase
  
  // Ka hel Firebase Console > Project settings > General > Your apps > Web app
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Ku beddel Auth Domain-kaaga
  
  // Ka hel Firebase Console > Project settings > General
  projectId: "YOUR_PROJECT_ID", // Ku beddel Project ID-gaaga
  
  // Ka hel Firebase Console > Project settings > General > Your apps > Web app
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Ku beddel Storage Bucket-kaaga
  
  // Ka hel Firebase Console > Project settings > General > Your apps > Web app
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Ku beddel Messaging Sender ID-gaaga
  
  // Ka hel Firebase Console > Project settings > General > Your apps > Web app
  appId: "YOUR_APP_ID", // Ku beddel App ID-gaaga
  
  // Ikhtiyaari ah: Ka hel Firebase Console > Project settings > General > Your apps > Web app
  measurementId: "YOUR_MEASUREMENT_ID" 
};

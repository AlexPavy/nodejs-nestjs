const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'codetests',
  keyFilename: 'google-credentials.json',
});

let docRef = db.collection('users').doc('alovelace');

let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

console.log("Hello firebase");

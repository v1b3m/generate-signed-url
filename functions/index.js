/* eslint-disable no-console */
const functions = require('firebase-functions');

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require('./username-password-auth-v1b3m-34f6bf022265.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://username-password-auth-v1b3m.firebaseio.com/',
});

// Import generateSignedUrl
const generateSignedUrl = require('./media/generateSignedUrl');

exports.getsignedurl = functions.https.onRequest((req, res) => {
  let { fileName } = req.query;
  if (!fileName) {
    // eslint-disable-next-line prefer-destructuring
    fileName = req.body.fileName;
  }
  const bucket = 'username-password-auth-v1b3m.appspot.com/';

  generateSignedUrl(fileName, bucket)
    .then(url => res.status(200).json({ url }))
    .catch(error => console.log(error.message));
  return true;
});

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
async function generateSignedUrl(bucketName, fileName) {
  // Import the Google cloud client library
  const { Storage } = require('@google-cloud/storage');

  // Create a client
  const storage = new Storage();

  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  };

  //  Obtain a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);
  console.log('Generated PUT signed URL:');
  console.log(url);
  console.log('You can use this URL with any user agent, for example:');
  console.log(
    "curl -X PUT -H 'Content-Type: application/octet-stream' "
    + `--upload-file my-file '${url}'`,
  );
  return url;
}

module.exports = generateSignedUrl;

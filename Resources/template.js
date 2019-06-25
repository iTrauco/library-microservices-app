// The following template was used to securely pass the credentials for a local testing connection to MongoDB
module.exports = {
    mongoURI: 'mongodb+srv://<admin-account-name>:<password>@<cluster>.mongodb.net/test?retryWrites=true&w=majority',
    secretOrKey: 'yourSECRET'
  };
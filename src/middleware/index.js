const awsS3 = require('./aws-s3');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  app.use('/s3sign', awsS3());
  // in Express, the order matters.
};

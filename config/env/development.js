
/**
 * Expose
 */

module.exports = {
  server: {
    host: process.env.OPENSHIFT_NODEJS_IP ||process.env.NODE_IP || process.env.HOST || process.env.HOSTNAME || 'localhost',
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.NODE_PORT || process.env.PORT || 3000
  },
  slack: {
    tokens: [
      '0KEBAWnAGSlzGvwwrwg4nZsR'
    ]
  },
  wipe: {
    token: 'wipeDB/8Ny"_FBP4Ty)]!x:%Y#-b%Yu%B3/maYZzEx*[Fx/K[y#&%ffX'
  }
};

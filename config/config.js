const crypto = require('crypto');

const secret = 't0ps3cur3s3cr3t'.toString('hex');

module.exports = {
  'token': {
    'secret': secret,
    'expiresIn': '480m'
  }
};

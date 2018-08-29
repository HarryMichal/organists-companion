const crypto = require('crypto');

const secret = crypto.randomBytes(256).toString('hex');

module.exports = {
  'token': {
    'secret': secret,
    'expiresIn': '480m'
  }
};

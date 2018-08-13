var bcrypt = require('bcrypt');

module.exports.hashPromise = async function(toHash, rounds) {
  return new Promise((resolve, reject) => {
    var salt = bcrypt.genSaltSync(rounds);
    
    bcrypt.hash(toHash, salt, function(err, hashed) {
      if (err) {
        reject(err);
      }
      if (!hashed) {
        reject("Error during hashing.");
      }
      if (hashed) {
        resolve(hashed);
      }
    })
  })
}

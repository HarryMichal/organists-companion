var bcrypt = require('bcrypt-nodejs');

  var user.schema = {
    local: {
      'username': String,
      'password': String,
    }
  };

// methods =======
// Password hash generator
user.schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Password validity check
user.schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

// Create user model and expose it
module.exports =

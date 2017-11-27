var bcrypt = require('bcrypt-nodejs');

module.exports = function(xxx, xxx) {
  var User = 
}

User.hook('beforeCreate', function(user, options) {
  user.password = user.generateHash(user.password);
})

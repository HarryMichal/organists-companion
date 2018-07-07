'use strict';

module.exports.toArray = function(string) {
  if (string != null) {
    var result = string.split(',').map((value) => { return parseInt(value) });
    return result;
  }
  
  else {
    var result = null;
    return result;
  }
}

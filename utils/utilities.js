'use strict';

module.exports.toArray = function(string) {
  if (typeof string == "string") {
    var result = string.split(',').map((value) => { return parseInt(value) });
    return result;
  }
  else {
    var result = [];
    return result;
  }
}

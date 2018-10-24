'use strict';

module.exports.toArray = function(string) {
  return new Promise(resolve => {
    if (string.length > 0) {
      var result = string.split(',').map((value) => { return parseInt(value) });
    }
    else {
      var result = [];
    }
    resolve(result);
  })
}

module.exports.verseToArray = function(string) {
  var result;
  try {
    result = string.split(',').map((value) => { return parseInt(value) });
  }
  finally {
    if (string.length === 0) {
      return [];
    }
    else {
      result.map((value, index) => {result.fill([value,false], index, index + 1)})
      return result
    }
  }
}

module.exports.compareArrays = function(first, second) {
  return new Promise(resolve => {
    try {
      first.map((value, index) => {
        if (second.length != 0) {
          for (var i = 0; i < second.length; i++) {
            if (value == second[i]) {
              first.fill([value, true], index, index + 1);
              break;
            }
            else if (value != second[i]) {
              first.fill([value, false], index, index + 1);
            }
            else {
              break;
            }
          }
        }
        else {
          first.fill([value, false], index, index + 1);
        }
      })
    }
    finally {
      resolve(first);
    }
  })
  
}

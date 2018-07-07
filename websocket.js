var db = require('./utils/database.js').db;

var Websocket = function() {};

Websocket.prototype.onConnection = function() {
  
};

Websocket.prototype.onMessage = function(data) {
  var data = JSON.parse(data);
  
  switch(data.type) {
    case "song":
      
      break;
    case "psalm":
      
      break;
    case "verse":
      
      break;
    default:
      
      break;
  }
}

module.exports = new Websocket();

#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('companion-server:server');
var http = require('http');
var WebSocket = require('ws');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var url = require('url');
var database = require('../utils/database.js');
var utils = require('../utils/utilities.js');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Configure WebSocket server
 */

var wss = new WebSocket.Server({
  'server': server,
  'path': "/api/ws",
  'clientTracking': true,
  'verifyClient': function(info, done) {
    var query = url.parse(info.req.url, true).query;
    // check the origin of the issued request
    if (query.token !== null) {
      query.token = Buffer.from(query.token, 'base64').toString('ascii');
      jwt.verify(query.token, config.token.secret, function(err, token) {
        if (err) {
          console.error(err);
          done(false);
        }
        if (token) {
          console.log("Connection accepted.");
          done(true);
        }
        else {
          console.log("Connection rejected.");
          done(false);
        };
      }); // end of jwt.verify
    } // end of if
    else {
      console.log("Connection rejected.");
      done(false);
    }
  }
});
 
wss.getUniqueID = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return '#' + s4();
};

wss.sendMessage = function(message, target = "all", name = null) {
  switch(target) {
    case "all":
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
      break;
    case "organist":
      wss.clients.forEach(function each(client) {
        if (client.chatRoom === "general") {
          client.send(JSON.stringify(message));
        }
      });
      break;
    case "guest":
      wss.clients.forEach(function each(client) {
        if (client.chatRoom === "guest") {
          client.send(JSON.stringify(message));
        }
      });
      break;
    case "last":
      
      break;
    case "":
      
      break;
  }
}

wss.handleConnection = function(request, ws) {
  let parameters = url.parse(request.url, true);
  let token = jwt.decode(Buffer.from(parameters.query.token, 'base64').toString('ascii'));
  
  ws.id = token.sub + wss.getUniqueID();
  ws.chatRoom = token.perm;
  
  console.log(`${ws.id} has just connected.`);
}

wss.showUsers = function() {
  let clients = [];
  wss.clients.forEach(function each(client) {
    clients.push(client.id);
  });
  console.log(clients);
}

wss.handleVerses = function(verse) {
  let verses = [];
  for (var i = 0; i < verse; i++) {
    verses[i] = i + 1;
  }
  return verses;
}

wss.sendActualData = async function(receiver = "all") {
  try {
    var meta = await database.selectPromise("type, number, verse, activeverse", "meta", "id", "1");
    var message = {};
    
    switch(meta.type) {
      case "song":
        var verse = await utils.toArray(meta.verse);
        
        var activeverse = meta.activeverse == null ? [] : await utils.toArray(meta.activeverse);
        
        verse = await utils.compareArrays(verse, activeverse);
        
        message = {
          type: meta.type,
          number: meta.number,
          verse: verse,
          activeverse: activeverse,
        };
        break;
      case "psalm":
        var psalm = await database.selectPromise("id, text", "psalms", "id", meta.number);
        
        message = {
          type: meta.type,
          number: psalm.id,
          psalmtext: psalm.text
        };
        break;
      default:
        message = {
          type: "blank",
          number: "",
          verse: [],
          activeverse: []
        };
        break;
    }
  }
  catch (e) {
    console.error(e);
  }
  finally {
    console.log(message);
    wss.sendMessage(message, receiver);
  }
}
 
wss.on('connection', function Connection(ws, req) {
  wss.handleConnection(req, ws);
  
  wss.showUsers();
  
  wss.sendActualData();
  
  ws.on('message', async function Message(data) {
    var data = JSON.parse(data);
    
    switch(data.type) {
      case "song":
        try {
          var song = await database.selectPromise("id, verse", "songs", "id", data.number);
          
          song.verse = await wss.handleVerses(song.verse);
          
          if (song) {
            var updated = await database.updatePromise("meta", "number = ?, type = ?, verse = ?, activeverse = ?", "id = 1", [`${song.id}`, `${data.type}`, `${song.verse}`, ""]);
          }
          
          var meta = await database.selectPromise("number, type, verse", "meta", "id", "1");
          
          if (song && updated && meta) {
            let message = {
              number: meta.number,
              verse: utils.verseToArray(meta.verse),
              activeverse: [],
              type: meta.type
            };
            console.log(message);
            wss.sendMessage(message, "all");
          }
        }
        catch (e) {
          console.error(e);
        }
        break;
      case "psalm":
        try {
          var psalm = await database.selectPromise("id, text", "psalms", "id", data.number);
          
          if (psalm) {
            var updated = await database.updatePromise("meta", "number = ?, type = ?, verse = ?, activeverse = ?", "id = 1", [`${psalm.id}`, `${data.type}`, "", ""])
          }
          
          var meta = await database.selectPromise("type, number", "meta", "id", "1");
          
          if (psalm && updated && meta) {
            let message = {
              type: meta.type,
              number: psalm.id,
              psalmtext: psalm.text
            };
            console.log(message);
            wss.sendMessage(message, "all");
          }
        }
        catch (e) {
          console.error(e);
        }
        break;
      case "verse":
        if (data.subtype === "add") {
          try {
            var meta = await database.selectPromise("verse, activeverse", "meta", "id", "1");
            
            var oldVerse = await utils.toArray(meta.verse);
            var oldActiveverse = await utils.toArray(meta.activeverse);
            
            var newActiveverse = oldActiveverse == [] ? await utils.toArray(data.verse) : oldActiveverse.concat(parseInt(data.verse)).sort(function(a, b){return a-b})
            var newVerse = await utils.compareArrays(oldVerse, newActiveverse);
            
            var changed = await database.updatePromise("meta", "activeverse = ?", "id = 1", [`${newActiveverse}`]);
            
            if (meta && changed) {
              var message = {
                type: data.type,
                verse: newVerse,
                activeverse: newActiveverse
              };
              console.log(message);
              wss.sendMessage(message, "all");
            }
          }
          catch (e) {
            console.error(e);
          }
        }
        
        if (data.subtype === "del") {
          try {
            var meta = await database.selectPromise("verse, activeverse", "meta", "id", "1");
            
            var oldVerse = await utils.toArray(meta.verse);
            var oldActiveverse = await utils.toArray(meta.activeverse);
            
            var toDelete = await oldActiveverse.indexOf(parseInt(data.verse));
            
            oldActiveverse.splice(toDelete, 1);
            
            var newActiveverse = oldActiveverse;
            var newVerse = await utils.compareArrays(oldVerse, oldActiveverse);
            
            var updated = await database.updatePromise("meta", "activeverse = ?", "id = 1", [`${newActiveverse}`]);
            
            if (meta && updated) {
              let message = {
                type: data.type,
                verse: newVerse,
                activeverse: newActiveverse
              };
              console.log(message);
              wss.sendMessage(message, "all");
            }
          }
          catch (e) {
            console.error(e);
          }
        }
        break;
      case "blank":
        try {
          var updated = await database.updatePromise("meta", "number = ?, type = ?, verse = ?", "id = 1", [null, null, null]);
          
          if (updated) {
            let message = {
              number: "",
              verse: "",
              activeverse: [],
              type: "blank"
            };
            wss.sendMessage(message, "all");
          }
        }
        catch (e) {
          console.error(e);
        }
        break;
      case "refresh":
        wss.sendActualData();
      default:
        console.log("Received unknown message format.");
        break;
    }
  });
  
  ws.onclose = function onClose(e) {
    console.log("Socket has been closed.");
  };
  
  ws.onerror = function onError(err) {
    console.error("Socket encountered error: ", err.message, " Closing socket.");
    ws.close();
  };
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

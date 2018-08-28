var express = require('express');
var router = express.Router();

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'react-client/build', 'index.html'))
})

module.exports = router;

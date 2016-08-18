var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var url = require('url');
var httpUtils = require('./http-helpers');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';

var server = http.createServer( function ( req, res ) {
  var method = req.method;

  if ( method === 'POST' || method === 'GET' ) {
    handler.handleRequest( req, res );
  } else {
    res.writeHead( 404, httpUtils.headers );
    res.end();
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}


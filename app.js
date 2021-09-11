'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);

  var port = process.env.PORT || 8003;
  app.listen(port);

  if (swaggerRestify.runner.swagger.paths['/home']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/home?name=Guru');
  }
});

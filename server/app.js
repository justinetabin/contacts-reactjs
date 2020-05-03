'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const config = require('./config');

const init = async () => {

  const server = Hapi.server({
    port: config.PORT,
    host: config.HOST,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../build')
      }
    }
  });

  await server.register(require('@hapi/inert'));

  server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: 'index.html'
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: (request, h) => {
        const { param } = request.params
        var match = param.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
        if (match) {
            return h.file(param);
        } else {
            return h.file('index.html');
        }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
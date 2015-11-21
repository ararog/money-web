var argv = require('yargs').default('production', false).argv;

module.exports = {
  port: process.env.PORT || 8000,
  url: argv.production ? 'https://nu-pomodoro.herokuapp.com/' : 'http://localhost:8000',
  publicPath: argv.production ? './public/production' : './public/development'
};

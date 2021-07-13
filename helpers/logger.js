const log4js = require("log4js");

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: 'debug-log',compress:false }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug' }
  }
});

const logger = log4js.getLogger()

module.exports = logger
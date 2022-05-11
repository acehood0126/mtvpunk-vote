const config = require('config');
const promise = require('bluebird');

const initOptions = {
  promiseLib: promise, // overriding the default (ES6 Promise);
  // eslint-disable-next-line no-unused-vars
  error(error, e) {
    // eslint-disable-next-line no-param-reassign
    error.DB_ERROR = true;
  },
};

const pgp = require('pg-promise')(initOptions);

// const db = pgp({ connectionString: config.get('DB_CONNECTION_STRING'), ssl: { rejectUnauthorized: false } });
const db = pgp({ connectionString: config.get('DB_CONNECTION_STRING') });

module.exports = db;

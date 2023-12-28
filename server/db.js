const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  password: '1312',
  host: 'localhost',
  port: 5433,
  database: 'tasks',
})

module.exports = pool

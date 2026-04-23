const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           
  host: '127.0.0.1',          
  database: 'endpoint',     
  password: 'Zanaoria123',          
  port: 5433,                 
});

module.exports = pool;
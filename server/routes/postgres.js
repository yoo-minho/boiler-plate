const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/do', (req, res2) => {

    console.log('aaaa')

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'minho1010',
        port: 5432,
      })
      
      client.connect();
      client.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
        client.end()
        res2.status(200).json({success:true, res});
      })

});

module.exports = router; 
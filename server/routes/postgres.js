const express = require('express');
const router = express.Router();
const config = require('../config/key')
const { Client } = require('pg');

router.post('/do', (req, res2) => {

  const client = new Client(config.postgresqlInfo);

  client.connect();

  client.query('SELECT * from chat_message', (err, res) => {
    client.end();
    res2.status(200).json({success:true, res});
  });

});

module.exports = router; 
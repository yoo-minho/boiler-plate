const express = require('express');
const router = express.Router();
const config = require('../config/key')
const { Client } = require('pg');

router.post('/add', (req, res2) => {
    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql = `INSERT INTO todo VALUES (nextval('sq_todo_srno'), $1, $2, TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), 'N') RETURNING *`;
    const values = [req.body.todoValue, req.body.userId];

    console.log(values);

    client.query(sql, values, (err, res) => {
        client.end();
        res2.status(200).json({success:true, res});
    });
});

router.post('/getList', (req, res2) => {
    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql = `SELECT * FROM todo WHERE todo_contents is not null ORDER BY todo_srno desc`;

    client.query(sql, (err, res) => {
      client.end();
      res2.status(200).json({success:true, res});
    });
});

router.post('/changeTodoStatus', (req, res2) => {
    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql = `UPDATE todo SET todo_status = (case when todo_status = 'N' then 'Y' else 'N' end) where todo_srno = $1 RETURNING *`;
    const values = [req.body.todoSrno];

    console.log(sql);
    console.log(values);

    client.query(sql, values, (err, res) => {
      client.end();
      res2.status(200).json({success:true, res});
    });
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const {data}=require('./data');

router.route('/data').post(data);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

router.get('/', controller.getMain);


module.exports = router;
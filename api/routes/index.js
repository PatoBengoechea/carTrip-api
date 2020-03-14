var router = require('express').Router();

router.use('/api/user', require('./user.routes'));

module.exports=router;
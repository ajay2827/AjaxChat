const express = require('express')
const router = express.Router()

const {sendMessage,fetchMessage} =require('../controllers/messageController')

const authenticationMiddleware =require('../middleware/auth')

// message sending api
router.route('/').post(authenticationMiddleware,sendMessage);


// fetching all message of chat
router.route('/:chatId').get(authenticationMiddleware,fetchMessage);


module.exports=router
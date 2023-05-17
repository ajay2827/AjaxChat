const express = require('express')
const router = express.Router()

const { oneOnechat,allUserChat,createGroupChat,renameGroupName,removeUserGroup,updateGroupMember}=require('../controllers/chatController')

const authenticationMiddleware =require('../middleware/auth')

// One-one chat
router.route('/').post(authenticationMiddleware,oneOnechat)

// fetching all chat of user
router.route('/').get(authenticationMiddleware,allUserChat)

// creating new chat
router.route('/group').post(authenticationMiddleware,createGroupChat)

// renameing exiting chat
router.route('/rename').put(authenticationMiddleware,renameGroupName)

//remove users
router.route('/remove').put(authenticationMiddleware,removeUserGroup)

//add user
router.route('/adduser').put(authenticationMiddleware,updateGroupMember)

module.exports=router
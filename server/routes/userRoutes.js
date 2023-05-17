const express = require('express')
const router = express.Router()

const {userRegister,userLogin,getUsers,getCurruser,updateAvatar}=require('../controllers/userController')
const authenticationMiddleware =require('../middleware/auth')

// register user route
router.route('/').post(userRegister).get(authenticationMiddleware,getUsers)

// login user route
router.route('/login').post(userLogin)

// get current user
router.route('/currentuser').get(getCurruser)

//update user avatar
router.route('/updateavatar').put(updateAvatar)

module.exports=router
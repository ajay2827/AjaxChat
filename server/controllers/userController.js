const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const cloudinary = require('../config/cloudinary')
const generatetoken = require('../config/generateToken')
const bcrypt = require('bcrypt');


// register new user
exports.userRegister = asyncWrapper(async (req, res, next) => {

   let { name, email, password, avatar } = req.body

   // checks  
   if (!name || !email || !password) {
      return next(createCustomError(`Provide necessary credentials`, 404))
   }

   // exiting user
   const exitingUser = await User.findOne({ email })

   if (exitingUser) {
      return next(createCustomError(`User already exit`, 404))
   }

   // hash password
   const salt = await bcrypt.genSalt(10);
   const hashpassword = await bcrypt.hash(password, salt);


   // default dp
   let tempImage = 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
   // cloudinary upload

   if (!avatar) {
      avatar = tempImage
   }

   password = hashpassword
   console.log(avatar)
   // creating user
   const user = await User.create({
      name,
      email,
      password,
      avatar
   })
   const token = generatetoken(user._id)

   res.status(200).json({ user, token })
})


// login user

exports.userLogin = asyncWrapper(async (req, res, next) => {

   const { email, password } = req.body
   if (!email || !password) {
      return next(createCustomError(`Provide necessary credentials`, 400))
   }

   // check user
   const user = await User.findOne({ email })
   if (!user) {
      return next(createCustomError(`Invalid Email`, 401))
   }

   // compare password
   const matchpassword = await bcrypt.compare(password, user.password)
   if (!matchpassword) {
      return next(createCustomError(`Invalid Password`, 401))
   }

   const token = generatetoken(user._id)
   res.status(200).json({ user, token })

})


// search user 

exports.getUsers = asyncWrapper(async (req, res, next) => {
   const keyword = req.query.search ?
      {
         $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
         ],
      } : {};

   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
   res.status(200).json(users);

})

// get current user

exports.getCurruser = asyncWrapper(async (req, res, next) => {
   const authHeader = req.headers.authorization
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createCustomError(`No token provided`, 401))
   }

   const token = authHeader.split(' ')[1]

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      res.status(200).json(user)
   } catch (error) {
      return next(createCustomError(`Not authorized to access this route`, 401))
   }
})

// update avatar 
exports.updateAvatar = asyncWrapper(async (req, res, next) => {
   const { userId, avatar } = req.body
   if (!avatar) {
      return next(createCustomError(`Please select avatar`, 400))
   }
   console.log(userId)
   const updateAvatar = await User.findByIdAndUpdate( userId,
      {
         avatar: avatar
      },
      {
         new: true
      })
   if(!updateAvatar)
   {
      return next(createCustomError("No such user exit",400));
   }
   res.status(200).json(updateAvatar)

})
const jwt = require('jsonwebtoken')
const { createCustomError } = require('../errors/custom-error')
const asyncWrapper = require('../middleware/async')
const User = require('../models/User')

const authenticationMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createCustomError(`No token provided`, 401))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user= await User.findById(decoded.id)
    req.user = user
    next()
  } catch (error) {
    return next(createCustomError(`Not authorized to access this route`, 401))
  }
})

module.exports = authenticationMiddleware
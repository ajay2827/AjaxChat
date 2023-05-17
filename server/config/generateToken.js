const jwt = require('jsonwebtoken')

const generatetoken=(id)=>{
    return jwt.sign({ id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      })
}

module.exports=generatetoken
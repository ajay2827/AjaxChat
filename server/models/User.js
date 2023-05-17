const moongoose = require('mongoose')
const validator = require('validator')

const userSchema = new moongoose.Schema({
    name: {
        type: String,
        require: [true, 'must provide username'],
        maxlength: [20, 'name can not be more than 20 characters'],
        minlength: [4, 'name can not be less than 4 characters']
    },
    email: {
        type: String,
        require: [true, 'must provide email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        require: [true, 'must provide password'],
        minlength: [8, 'Password must be atleast 8 characters long']
    },
    avatar: {
        type: String,
    },
},
    { timestamps: true },
)

module.exports=moongoose.model('User',userSchema)
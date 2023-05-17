const { default: mongoose } = require('mongoose')
const moongoose = require('mongoose')

const messageSchema = new moongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        content:{
            type:String,
            trim:true
        },
        chat:{
            type:moongoose.Schema.Types.ObjectId,
            ref:"Chat"
        }
    },
    {
        timestamps: true,
    }
)

module.exports=mongoose.model('Message',messageSchema)
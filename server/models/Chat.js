const moongoose = require('mongoose')

const chatSchema = new moongoose.Schema({

    chatName:
    {
        type: String,
        trim: true
    },

    isGroupChat:
    {
        type: Boolean,
        default: false
    },

    users: [
        {
            type: moongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],

    latestMessage: {
        type: moongoose.Types.ObjectId,
        ref: "Message"
    },

    groupAdmin: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    avatarGroup:
    {
        type: String,
        default:"https://w7.pngwing.com/pngs/380/670/png-transparent-group-chat-logo-blue-area-text-symbol-metroui-apps-live-messenger-alt-2-blue-text-logo-thumbnail.png"
    }
},
    { timestamps: true }
)


module.exports=moongoose.model("Chat",chatSchema)
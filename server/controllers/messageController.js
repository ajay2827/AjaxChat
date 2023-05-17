const Message = require('../models/Message')
const Chat = require('../models/Chat')
const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


// sendind message (group and one-one chat)
exports.sendMessage = asyncWrapper(async (req, res, next) => {

    let { content, chatId } = req.body

    if (!content || !chatId) {
        return next(createCustomError(`Provide necessary credentials`, 400))
    }

    let newmessage = {
        sender: req.user._id.toString(),
        content: content,
        chat: chatId
    }

    // creating message
    let message = await Message.create(newmessage);

    message = await message.populate("sender", "name avatar")
    message = await message.populate("chat")
    message = await User.populate(message, {
        path: "chat.users",
        select: "name avatar email"
    })

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.status(200).json(message)
})

// fetching all message
exports.fetchMessage = asyncWrapper(async (req, res, next) => {

    let message = await Message.find({ chat: req.params.chatId }).populate("sender", "name avatar email").populate("chat")
    res.status(200).json(message)
})
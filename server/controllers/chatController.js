const Chat =require('../models/Chat')
const User=require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


// fetching or creating one-one chat
exports.oneOnechat=asyncWrapper(async(req,res,next)=>{

    const {userId}=req.body
   console.log(req.user._id.toString())
    if(!userId)
    {
        return next(createCustomError(`Provide necessary credentials`, 400))
    }

    let oneChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id.toString()}}},
            {users:{$elemMatch:{$eq:userId}}},
        ]
    }).populate("users","-password")
    .populate("latestMessage")
   
    console.log(oneChat)

    oneChat=await User.populate(oneChat,{
        path:"latestMessage.sender",
        select:"name avatar email"
    })
    
    console.log(oneChat)

    if(oneChat.length>0)
    {
        res.status(200).json(oneChat)
    }
    else
    {
        let chatData={
            chatName:'sender',
            isGroupChat:false,
            users:[req.user._id.toString(),userId]
        }

        const createChat=await Chat.create(chatData);
        const FullChat=await Chat.findOne({_id:createChat._id}).populate(
            "users",
            "-password"
        );
        res.status(200).json(FullChat)
    }

})

// fetching all chat of user
exports.allUserChat=asyncWrapper(async(req,res,next)=>{

    const loginuser=req.user._id.toString();

    let allChat=await Chat.find({users:{$elemMatch:{$eq:loginuser}}})
    .populate('users','-password')
    .populate('groupAdmin','-password')
    .populate('latestMessage')
    .sort({updateAt:-1})
    
    allChat=await User.populate(allChat,{
        path:"latestMessage.sender",
        select:"name avatar email"
    })

    res.status(200).json(allChat)
  
})

// creating group chat
exports.createGroupChat=asyncWrapper(async(req,res,next)=>{
    if(!req.body.participant||!req.body.groupname)
    {
        return next(createCustomError('Please Fill all the feilds',400))
    }
   
    let participant=JSON.parse(req.body.participant)

    if(participant.length<2)
    {
        return next(createCustomError('More than 2 users are requires to form a group chat',400))
    }
    participant.push(req.user)
    
    let temppic="https://w7.pngwing.com/pngs/380/670/png-transparent-group-chat-logo-blue-area-text-symbol-metroui-apps-live-messenger-alt-2-blue-text-logo-thumbnail.png"
    
    if(req.body.avatar)
    {
        temppic=req.body.avatar
    }
     
    const groupchat = await Chat.create({
        chatName:req.body.groupname,
        users:participant,
        isGroupChat:true,
        groupAdmin:req.user,
        avatarGroup:temppic
    })

    const fullgroupchat=await Chat.findOne({_id:groupchat._id})
    .populate('users','-password')
    .populate('groupAdmin','-password')

    res.status(200).json(fullgroupchat)
})


// renameing exiting chat

exports.renameGroupName=asyncWrapper(async(req,res,next)=>{

    const{groupId,groupName}=req.body
    if(!groupId||!groupName)
    {
        return next(createCustomError("Please fill all fields",400));
    }

    const updateGroupName=await Chat.findByIdAndUpdate(groupId,
        {
            chatName:groupName
        },
        {
            new:true
        })
        .populate('users','-password')
        .populate('groupAdmin','-password');
    if(!updateGroupName)
    {
        return next(createCustomError('Chat does not exit',404))
    }

    res.status(200).json(updateGroupName)

})

// Remove user 

exports.removeUserGroup=asyncWrapper(async(req,res,next)=>{
    const{groupId,userId}=req.body
    if(!groupId||!userId)
    {
        return next(createCustomError('Please fill all fields',400))
    }
    const removeuser=await Chat.findByIdAndUpdate(groupId,
        {
            $pull:{users:userId}
        },
        {
            new:true
        }).populate('users','-password')
        .populate('groupAdmin','-password');

        if(!removeuser)
        {
            next(createCustomError('Chat not Found',404))
        }
        res.status(200).json(removeuser)
})


// add user to the group
exports.updateGroupMember=asyncWrapper(async(req,res,next)=>{
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
   
    if(!added)
    {
        next(createCustomError('Chat Not Found',404));
        return;
    }
    res.status(200).json(added);
})

// get chat name
export const chatName=(loggeduser,users)=>{
    return users[0]._id===loggeduser._id?users[1].name:users[0].name
}

// get other user pic

export const getUserdp=(loggeduser,users)=>{
  return users[0]._id===loggeduser._id?users[1].avatar:users[0].avatar
}

// get other user full info
export const getFulluser=(loggeduser,users)=>{
  return users[0]._id===loggeduser._id?users[1]:users[0]
}

// get group admin dp
export const getAdmindp=(chat)=>{
    return chat.avatarGroup
}

// message of current user or not
export const messageCurrmessage=(m,userId)=>{
  return m.sender._id===userId
}

export const isSameSender = (message, m, i, userId) => {
  return (
    i < message.length - 1 &&
    (message[i + 1].sender._id !== m.sender._id ||
      message[i + 1].sender._id === undefined) &&
    message[i].sender._id !== userId
  );
};

export const isLastMessage = (message, i, userId) => {
  return (
    i === message.length - 1 &&
    message[message.length - 1].sender._id !== userId &&
    message[message.length - 1].sender._id
  );
};


export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
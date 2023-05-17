const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors())
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config();


// connecting to database
connectDB()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// requiring routers
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

// using routers
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/message', messageRoutes)

// middleware
app.use(express.json({ limit: '20mb' }));
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// starting server
const port = process.env.PORT || 5000;

const server = app.listen(port,
  console.log(`Server running on PORT ${port}...`)
);

// setup socket
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})

//connection and request from client to server and vice-versa
io.on("connection", (socket) => {
  console.log("frontend is connected")

  // creating room for login_in user
  socket.on("setup",(userData)=>{
    socket.join(userData._id)
    socket.emit("connected")
  })

  // creating room for selected chat
  socket.on("joinroom",(room)=>{
     socket.join(room)
     console.log(`user added to room id ${room}`);
  })

  // sending and reciving the message
  socket.on("new message",(newMessageRecieved)=>{
      
    let chat=newMessageRecieved.chat
    if(!chat.users) return console.log('chat users do not exit');

    chat.users.forEach((user) => {
           if(user._id===newMessageRecieved.sender._id) return 
           socket.in(user._id).emit('message recieved',newMessageRecieved)
    });

  })

  socket.on("typing",(room)=>socket.in(room).emit("typing"))
  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

  socket.off("setup", () => {
    console.log("user disconnected from socket");
    socket.leave(userData._id);
  });

})

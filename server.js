// Initializing Express application

const express = require('express')
const app = express()
//set port  for server to 3030
const PORT = process.env.PORT || 3030
// starts server
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))
// An array of message objects, each containing information about pre-defined  message's in each channels

const messages = [
  {
    channel: "1",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Welcome to Tech Help!"
  },
  {
    channel: "2",
    account: "0x701C484bfb40ac628aFA487b6082f084B14AF0BD",
    text: "Let's Talk About Current Trends!"
  },
  {
    channel: "3",
    account: "0x189B9cBd4AfF470aF2C0102f365FC1823d857965",
    text: "Post Some Trolls 😊" 
  },
  
  {
    channel: "4",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Some Crypto Talks!"
  },
  {
    channel: "5",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Hello and welcome! This is the AI and Machine Learning channel, where you can discuss everything from algorithms to applications. Enjoy your stay and happy learning!"
  },
  {
    channel: "6",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "welcome to blockchain !!"
  },
  {
    channel: "7",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "welcome geeks 🧑‍💻 "
  },
  {

    channel: "8",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Cloud Computing"
  },
  {
    channel: "9",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Lets Talk About Crypto Scams"
  },
  {
    channel: "10",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Welcome to Gamers Cafe!"
  },
  {
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Price list "
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Tech Help : 0.1 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Current Trends : 0.01 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Memes :0.25 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Crypto Talks : 0.10 ETH "
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "AI and Machine Learning : 0.10 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Blockchain development : 0.10 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Cybersecurity : 0.10 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Cloud Computing : 0.10 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Crypto Scams : 0.10 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Gamers Cafe : 0.10 ETH"
           
  },{
    channel: "11",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Channel Price List : 0.00001 ETH"
           
  },]
  // importing socket.io library and start socket.io server and connectto port 3030.

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})
// logs
io.on('connection', (socket) => {
  console.log('user connected')
// send messages to frontend when call getMessage function
  socket.on('get messages', () => {
    io.emit('get messages', messages)
  })
  // recive new message from user and add display it  
  socket.on('new message', (msg) => {
    messages.push(msg)
    io.emit('new message', messages)
  })
})

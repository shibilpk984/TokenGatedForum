// importing necessary items from react and socket.io
import { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client"

// Assets
import person from '../assets/person.svg'
import send from '../assets/send.png'

//define socket connection to port 3030
const socket = io('ws://localhost:3030')
//define the Messages component

const Messages = ({ account, messages, currentChannel }) => {
  const[message, setMessage] = useState("")
  const messageEndRef = useRef(null)
 // defining function to handle sending a message
  const sendMessage = async (e) => {
    //prevent empty submission
    e.preventDefault()
    //create message object
    const messageObj = {
      channel: currentChannel.id.toString(),
      account: account,
      text: message
    }
    //checking message not empty
    //sent the message to the server

    if (message !== "")
    socket.emit('new message', messageObj)
    setMessage("")


  }
  // function to handle scrolling to the end of the messages list
  const scrollHandler = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)}
    
    useEffect(() => {
      scrollHandler()
    })
  
  
// filter and display message of selected channel
  return (
    <div className="text">
      <div className="messages">
      {currentChannel && messages.filter(message => message.channel === currentChannel.id.toString()).map((message, index) => (
          <div className="message" key={index}>
            <img src={person} alt="Person" /> //profile icon for users
            <div className="message_content">
              <h3>{message.account}</h3> //display users account address
              <p>
                {message.text} // display message
              </p>
            </div>
          </div>
        ))}


    <div ref={messageEndRef} />
    </div>

    <form onSubmit={sendMessage}> // form to input and send message
    {currentChannel && account ? (
       <input type="text"
        value={message}
         placeholder={`Message #${currentChannel.name}`}
          onChange={(e) => setMessage(e.target.value)} />
        ) : (
          <input type="text" value="" placeholder={`Please Connect Wallet / Join the Channel`} disabled />
        )}

      
      <button type="submit">
        <img src={send} alt="send message" /> //submit icon 
      </button>
   </form>


    </div>
  );
}
//export Messages componet as the default export
export default Messages;

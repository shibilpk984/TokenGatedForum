// Importing necessary libraries and components

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { io } from "socket.io-client"

// Components
import Navigation from './components/Navigation'
import Servers from './components/Servers'
import Channels from './components/Channels'
import Messages from './components/Messages'

//import ABIs
import Forum from './abis/Forum.json'

// import Config
import config from './config.json';

// socket connect to websocker server
const socket = io('ws://localhost:3030');
// function app
function App() { 
  // defining state variables 
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [forum, setForum] = useState(null)
  const [channels, setChannels] =useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [messages, setMessages] = useState([])
 //defining function to load blockchain data
  const loadBlockchainData = async () => {
    //creating web3 prvider
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    //taking network info
    const network = await provider.getNetwork()
    const forum = new ethers.Contract( config[network.chainId]. Forum.address, Forum, provider )
    setForum(forum)
    
    const totalChannels  = await forum.totalChannels()
    const channels = []
    // loop through channels and ass them to list
    for (var i = 1 ; i <= totalChannels; i++){
      const channel = await forum.getChannel(i)
      channels.push(channel)
    }
    setChannels(channels)
    
    //reload page when account change
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', async () => {
            window.location.reload();
        });
    } else {
        console.error("Ethereum object not found, install MetaMask.");
    }
};
  // useEffect hook to load blockchain data and setup socket listeners
  useEffect(() => {
    loadBlockchainData()
    //request message when socket connet
    socket.on("connect", () => {
      socket.emit('get messages')
    })
    //listen for new message and update stste
    socket.on('new message', (messages) => {
      setMessages(messages)
    })
    //listen for get message and update state
    socket.on('get messages', (messages) => {
      setMessages(messages)
    })
        
    // Cleanup function to remove socket listeners
    return () => {
      socket.off('connect')
      socket.off('new message')
      socket.off('get messages')
    }


  }, [])

  return (
    // navigation component
    <div>
     <Navigation account={account} setAccount={setAccount}/>
     <h1>{}</h1>

      <main>
        /* server component */
        <Servers/>
      /* channels component */
        <Channels
        provider={provider}
        account={account}
        forum={forum}
        channels={channels}
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
        />
      
        <Messages
        /* messages component */
        account={account}
        messages={messages}
        currentChannel={currentChannel}
         />

      </main>
    </div>
  );
}
// export App componet as default export

export default App;

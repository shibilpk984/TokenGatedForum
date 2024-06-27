import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { io } from "socket.io-client"

// Components
import Navigation from './components/Navigation'
import Servers from './components/Servers'
import Channels from './components/Channels'
import Messages from './components/Messages'

// ABIs
import Forum from './abis/Forum.json'

// Config
import config from './config.json';

// Socket
const socket = io('ws://localhost:3030');

function App() {

  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [forum, setForum] = useState(null)
  const [channels, setChannels] =useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [messages, setMessages] = useState([])

  const loadBlockchainData = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    
    const network = await provider.getNetwork()
    const forum = new ethers.Contract( config[network.chainId]. Forum.address, Forum, provider )
    setForum(forum)

    const totalChannels  = await forum.totalChannels()
    const channels = []
    for (var i = 1 ; i <= totalChannels; i++){
      const channel = await forum.getChannel(i)
      channels.push(channel)
    }
    setChannels(channels)
    

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', async () => {
            window.location.reload();
        });
    } else {
        console.error("Ethereum object not found, install MetaMask.");
    }
};

  useEffect(() => {
    loadBlockchainData()

    socket.on("connect", () => {
      socket.emit('get messages')
    })

    socket.on('new message', (messages) => {
      setMessages(messages)
    })

    socket.on('get messages', (messages) => {
      setMessages(messages)
    })

    return () => {
      socket.off('connect')
      socket.off('new message')
      socket.off('get messages')
    }


  }, [])

  return (
    <div>
     <Navigation account={account} setAccount={setAccount}/>
     <h1>{}</h1>

      <main>
        <Servers/>
      
        <Channels
        provider={provider}
        account={account}
        forum={forum}
        channels={channels}
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
        />
      
        <Messages 
        account={account}
        messages={messages}
        currentChannel={currentChannel}
         />

      </main>
    </div>
  );
}

export default App;
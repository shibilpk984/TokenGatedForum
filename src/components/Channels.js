// importing react library 
import React from 'react';
// defining component 'Channels'
const Channels = ({ provider, account, forum, channels, currentChannel, setCurrentChannel }) => {
  //when user click "Add New Forums" it will redirect to send a mail to contract owner for request create new channel
  
  const handleClick = () => {
    window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=shibilpk984@gmail.com';
  };

  
 //function to handle channel selection
  const channelHandler = async (channel) => {
    // check user has joined 
  const hasJoined = await forum.hasJoined(channel.id, account)
  if(hasJoined){
    setCurrentChannel(channel)
//if user didn't joined let them to mint token by selected channnel fees
  }else{
    const signer = await provider.getSigner()
    const transaction = await forum.connect(signer).mint (channel.id , { value : channel.cost })
    await transaction.await()
  }

}
// frontend design
  return (
    <div className="channels">
      <div className="channels__text">
        
        <h2>Channels / Forums</h2>
        <ul>
          {channels.map((channel, index) => (
            //list channels
            <li
             key={index}
             onClick={() => channelHandler(channel)}
             className={currentChannel && currentChannel.id.toString() === channel.id.toString() ? "active" : ""}
             >{channel.name}
              
            </li>
          ))}
        </ul>

      </div>
      

      <div className="add">
      <h2 onClick={handleClick} style={{ cursor: 'pointer' }}>Add New Forums</h2> // button to request for new forum
    </div>
      
    </div>
  );
}
// Export Channels component as the default export 
export default Channels;

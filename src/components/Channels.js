import React from 'react';

const Channels = ({ provider, account, forum, channels, currentChannel, setCurrentChannel }) => {

  const handleClick = () => {
    window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=shibilpk984@gmail.com';
  };

  

  const channelHandler = async (channel) => {
  const hasJoined = await forum.hasJoined(channel.id, account)
  if(hasJoined){
    setCurrentChannel(channel)

  }else{
    const signer = await provider.getSigner()
    const transaction = await forum.connect(signer).mint (channel.id , { value : channel.cost })
    await transaction.await()
  }

}
  return (
    <div className="channels">
      <div className="channels__text">
        <h2>Text Channels</h2>
        <ul>
          {channels.map((channel, index) => (
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
      <h2 onClick={handleClick} style={{ cursor: 'pointer' }}>Add New Forums</h2>
    </div>
      
    </div>
  );
}

export default Channels;
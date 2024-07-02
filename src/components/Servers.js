// importing icons
import ethereum from '../assets/ethereum.svg';
import plus from '../assets/plus.svg';

//defining component Server
const Servers = () => {
  return (
    <div className="servers">
      <div className="server">
        <img src={ethereum} alt="Ethereum Logo" />
      </div>
      <div className="server">
        <img src={plus} alt="Add Server" />
      </div>
      
    </div>
  );
}
// export Servers componet as default export

export default Servers;

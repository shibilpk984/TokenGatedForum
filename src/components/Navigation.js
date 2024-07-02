// import ethers library 
import { ethers } from 'ethers'
// import logo/icon
import icon from '../assets/icon.svg'
// define navigation componet
const Navigation = ({ account, setAccount }) => {
  //making connection to the user wallet and taking address
  const connecthandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
  }

// design navigation bar 
  return (
    <nav>
      <div className='nav__brand'> 
      <img src={icon} alt="icon" className="nav__logo" /> //logo
        <h1>Token Gated Community forum</h1> Name
      </div>
      { account ? (
        < button type="button"
        className='nav__connect'
        >
          {account.slice(0,8) + '...'+ account.slice(36,42)} // display account addrress frist and last part 

        </button>

      ) : (<button
        type="button"
        className='nav__connect'
        onClick={connecthandler}
        > Connect  </button> //button to connect to wallet

      ) }

    </nav>
  )
}
// export Navigation componet as default export
export default Navigation;

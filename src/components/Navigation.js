import { ethers } from 'ethers'
import icon from '../assets/icon.svg'
const Navigation = ({ account, setAccount }) => {
  const connecthandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
  }


  return (
    <nav>
      <div className='nav__brand'>
      <img src={icon} alt="icon" className="nav__logo" />
        <h1>Token Gated Community forum</h1>
      </div>
      { account ? (
        < button type="button"
        className='nav__connect'
        >
          {account.slice(0,8) + '...'+ account.slice(36,42)}

        </button>

      ) : (<button
        type="button"
        className='nav__connect'
        onClick={connecthandler}
        > Connect  </button>

      ) }

    </nav>
  )
}

export default Navigation;
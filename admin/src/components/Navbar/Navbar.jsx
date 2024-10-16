import "./Navbar.css"
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="none" />
      <img className='profile' src={assets.profile_image} alt="none" />
    </div>
  )
}

export default Navbar
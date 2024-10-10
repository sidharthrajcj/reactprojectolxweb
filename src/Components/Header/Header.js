import React, { useContext } from 'react'; 
import { signOut } from 'firebase/auth';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom'; 
import { FirebaseContext, AuthContext } from '../../Store/FirebaseContext';

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?"); 
    if (confirmLogout) {
      signOut(auth) 
        .then(() => {
          console.log('User signed out successfully');
          navigate('/'); 
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    }
  };

  const handleSellClick = () => {
    if (!user) {
      
      navigate('/login');
    } else {
      
      navigate('/create');
    }
  };
  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={handleLogoClick}>
          <OlxLogo />
         </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Search..." />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage" onClick={user ? handleLogout : handleLoginClick}>
          <span>{user ? 'Logout' : 'Login'}</span> 
          <hr />
        </div>

        {user && ( 
          <div className="usernameDisplay">
            <span>Welcome, {user.displayName || user.email}</span>
          </div>
        )}

        <div className="sellMenu" onClick={handleSellClick}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

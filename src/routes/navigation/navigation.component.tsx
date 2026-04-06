import { Outlet, Link } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { Fragment} from "react";
import { useSelector } from 'react-redux';
import CrwnLogo from '../../assets/crown.svg?react';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectCartIsOpen } from "../../store/cart/cart-selector";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectCartIsOpen);

  return (
    <Fragment>
      <NavigationContainer>
           <LogoContainer to='/'>
               <CrwnLogo className='logo' />
           </LogoContainer>
        
        <NavLinks>
          <NavLink to='/shop'>
              SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' to='#' onClick={signOutUser}>SIGN OUT</NavLink>
             ) : ( 
            <NavLink to='/auth'>
              SIGN IN
           </NavLink>)}
           <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
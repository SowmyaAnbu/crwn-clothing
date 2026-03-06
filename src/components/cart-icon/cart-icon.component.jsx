import { useDispatch, useSelector } from 'react-redux';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';
import { selectCartCount, selectCartIsOpen } from '../../store/cart/cart-selector.js';
import { setCartIsOpen } from '../../store/cart/cart-action.js';
const CartIcon = () => {
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectCartIsOpen);
    const dispatch = useDispatch();
    const toggleCart = () => dispatch(setCartIsOpen(!isCartOpen));
    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
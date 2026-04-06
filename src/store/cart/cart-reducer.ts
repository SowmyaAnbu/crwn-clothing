import {UnknownAction} from 'redux';
import { CART_ACTION_TYPES } from "./cart-types";
import { setCartIsOpen, setCartItems } from "./cart-action";
import { CartItem } from './cart-types';

const CART_INITIAL_STATE: CartState = {
   isCartOpen: false,
   cartItems: [],
}

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
}

export const cartReducer = (state = CART_INITIAL_STATE, action: UnknownAction): CartState => {
    if(setCartIsOpen.match(action)){
         return {...state, isCartOpen: action.payload}
    }
    if(setCartItems.match(action)){
           return {...state, cartItems:action.payload}
    }
    return state;
}


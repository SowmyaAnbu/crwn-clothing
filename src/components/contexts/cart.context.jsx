import { createContext, useReducer } from "react";
import {createAction} from "../../utils/reducer/reducer.utils";

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    cartCount:0,
    cartTotal:0,
    removeItemFromCart: () => {},
    deleteCartItem:()=>{}
});

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const INITIAL_STATE = {
   isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        
        default:
            throw new Error(`unhandled type ${type} in cartReducer`)
    }
}

export const CartProvider =  ({children}) => {
 
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (isCartOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen))
    }

 
    const updateCartItemsReducer = (newCartItems) => {
         const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
         const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity*cartItem.price), 0)
         dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,  {cartItems:newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}));
    }

   
    const addCartItem = (cartItems, productToAdd) => {
       const itemExists = cartItems.find(item => item.id === productToAdd.id);
       if(itemExists) {
            return cartItems.map(item => (item.id === productToAdd.id) 
            ? {...item, quantity: item.quantity+1} : item)
       }
       return [...cartItems, {...productToAdd, quantity:1}]
    }
     const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeCartItem = (cartItems, productToRemove) => {
        const existingCartItem = cartItems.find(item => item.id === productToRemove.id);
         if(existingCartItem.quantity === 1) {
            return cartItems.filter((item)=>item.id!=productToRemove.id)
         }
        
        return cartItems.map(item => (item.id === productToRemove.id) 
            ? {...item, quantity: item.quantity-1} : item)
       
    }

    const deleteCartItem = (cartItemToRemove) => {
      const newCartItems = cartItems.filter((item) => item.id !== cartItemToRemove.id);
      updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

  
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, deleteCartItem, cartTotal};
  
    return (<CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>);
}
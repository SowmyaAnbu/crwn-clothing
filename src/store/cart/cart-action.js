import { CART_ACTION_TYPES } from "./cart-types";
import { createAction } from "../../utils/reducer/reducer.utils";
export const setCartItems = (cartItemsArray) => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItemsArray)

export const setCartIsOpen = (isCartOpen) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)


const addCartItem = (cartItems, productToAdd) => {
       const itemExists = cartItems.find(item => item.id === productToAdd.id);
       if(itemExists) {
            return cartItems.map(item => (item.id === productToAdd.id) 
            ? {...item, quantity: item.quantity+1} : item)
       }
       return [...cartItems, {...productToAdd, quantity:1}]
    }

     const removeCartItem = (cartItems, productToRemove) => {
        const existingCartItem = cartItems.find(item => item.id === productToRemove.id);
         if(existingCartItem.quantity === 1) {
            return cartItems.filter((item)=>item.id!=productToRemove.id)
         }
        
        return cartItems.map(item => (item.id === productToRemove.id) 
            ? {...item, quantity: item.quantity-1} : item)
       
    }
     export const addItemToCart = (cartItems, productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }

   
    export const deleteCartItem = (cartItems, cartItemToRemove) => {
      const newCartItems = cartItems.filter((item) => item.id !== cartItemToRemove.id);
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }

    export const removeItemFromCart = (cartItems, productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }
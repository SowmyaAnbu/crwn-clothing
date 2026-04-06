import { CategoryItem } from "../categories/catergory-types";
import { CART_ACTION_TYPES, CartItem } from "./cart-types";
import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";


export type setIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type setCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher((cartItemsArray:CartItem[]): setCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItemsArray));

export const setCartIsOpen = withMatcher((isCartOpen: boolean): setIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
       const itemExists = cartItems.find(item => item.id === productToAdd.id);
       if(itemExists) {
            return cartItems.map(item => (item.id === productToAdd.id) 
            ? {...item, quantity: item.quantity+1} : item)
       }
       return [...cartItems, {...productToAdd, quantity:1}]
    }

     const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
        const existingCartItem = cartItems.find(item => item.id === productToRemove.id);
         if(existingCartItem && existingCartItem.quantity === 1) {
            return cartItems.filter((item)=>item.id!=productToRemove.id)
         }
        
        return cartItems.map(item => (item.id === productToRemove.id) 
            ? {...item, quantity: item.quantity-1} : item)
       
    }
     export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return setCartItems(newCartItems);
    };

   
    export const deleteCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
      const newCartItems = cartItems.filter((item) => item.id !== cartItemToRemove.id);
      return setCartItems(newCartItems);
    };

    export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        return setCartItems(newCartItems);
    };
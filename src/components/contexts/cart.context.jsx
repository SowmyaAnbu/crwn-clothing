import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../../shop-data';

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

export const CartProvider =  ({children}) => {
    const[isCartOpen, setIsCartOpen] = useState(false);
    const[cartItems, setCartItems] = useState([]);
    const[cartCount, setCartCount] = useState(0);
    const[cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

     useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity*cartItem.price), 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addCartItem = (cartItems, productToAdd) => {
       const itemExists = cartItems.find(item => item.id === productToAdd.id);
       if(itemExists) {
            return cartItems.map(item => (item.id === productToAdd.id) 
            ? {...item, quantity: item.quantity+1} : item)
       }
       return [...cartItems, {...productToAdd, quantity:1}]
    }
     const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
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
        setCartItems((cartItems) => cartItems.filter((item)=>item.id!=cartItemToRemove.id))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

  
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, deleteCartItem, cartTotal};
  
    return (<CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>);
}
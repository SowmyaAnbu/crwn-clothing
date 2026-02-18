import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../../shop-data.json';

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    cartCount:0
});

export const CartProvider =  ({children}) => {
    const[isCartOpen, setIsCartOpen] = useState(false);
    const[cartItems, setCartItems] = useState([]);
    const[cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
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

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};
  
    return (<CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>);
}
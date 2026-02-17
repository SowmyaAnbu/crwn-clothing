import { createContext, useState } from "react";
import SHOP_DATA from '../../shop-data.json';

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => null
});

export const CartProvider =  ({children}) => {
    const[isCartOpen, setIsCartOpen] = useState(false);

    const value = {isCartOpen, setIsCartOpen};
  
    return (<CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>);
}
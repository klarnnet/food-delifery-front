import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { IFood } from '../types/IFood';


interface CartContextType {
    cart: IFood[];
    plusToCart: (food: IFood, count:number) => void;
    minusToCart: (food: IFood) => void;
    resetCart:() => void;


}

export const CartContext = createContext<CartContextType>({
    cart: [],
    plusToCart: () => {},
    minusToCart: () => {},
    resetCart:() => {}

    
});

interface Props {
    children: ReactNode;
}

export const Context: React.FC<Props> = ({ children }) => {
    const [cart, setCart] = useState<IFood[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
    

    const plusToCart = (food: IFood, countNum:number) => {
        cart?.find((item: { id: string | undefined; count: number }) => item.id === food.id) ? 
        setCart(prev => prev.map(item =>{
            if(item.id === food.id){
                console.log('yes')
                return {...item, count: item.count + countNum}
            }
            return item
        })) : 
        setCart(prev => [...prev, {...food, count:1}])
    };

    const minusToCart = (food: IFood) => {
        let count = cart.find(i=>i.id === food.id)?.count

        if(count===1){
            setCart(prev=>prev.filter(i=>i.id !== food.id))
        }
        else{
            setCart(prev => prev.map(item =>{
                if(item.id === food.id ){
                    return {...item, count: item.count - 1}
                }
                return item
            }));
        }

    };
    const resetCart = () => {
        cart.length = 0
    };
    const value: CartContextType = {
        cart,
        plusToCart,
        minusToCart,
        resetCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

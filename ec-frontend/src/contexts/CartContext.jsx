import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (product) => {
      setCartItems((prevItems) => {
        const existing = prevItems.find((item) => item.id === product.id);
        if (existing) {
          // 既にあれば数量を +1
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // 初めて追加なら quantity: 1 を付ける
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    };

    // 数量を1つ増やす
    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                ? {...item, quantity: item.quantity + 1}
                : item
            )
        );
    };

    // 数量を1つ減らす（1以下になったら削除）
    const decreaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item => 
                item.id === productId
                ? {...item, quantity: item.quantity - 1}
                :item
            )
            .filter(item => item.quantity > 0)
        );
    };
  
    return (
      <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => useContext(CartContext);
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Recuperar el carrito desde localStorage al iniciar
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [message, setMessage] = useState(null); 

  useEffect(() => {
    // Guardar el carrito en localStorage cuando cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está, incrementar la cantidad
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: parseInt(item.quantity, 10) + parseInt(quantity, 10) }
            : item
        );
      } else {
        // Si no está, añadirlo al carrito
        return [...prevCart, { ...product, quantity: quantity }];
      }
    });
    setMessage(`¡${product.title} ha sido añadido a tu carrito!`);
    setTimeout(() => setMessage(null), 3000);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const resetCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const updateProductQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Evitar que la cantidad sea menor que 1
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, message, addToCart, removeFromCart, resetCart, getTotalItems, updateProductQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;

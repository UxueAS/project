import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
        .then(response => response.json())
        .then(data => {setProducts(data);})
        .catch(error => console.error("Error fetching products:", error));
  }, []);


  return (
    <ProductsContext.Provider value={{
      products
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProductsProvider;

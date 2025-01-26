import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getProducts } from '../services/api';

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => {setProducts(data);})
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

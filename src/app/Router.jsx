import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Promociones from '../pages/Promociones';
import Sorteos from '../pages/Sorteos';
import Category from '../pages/Category';
import Layout from '../components/Layout';
import Favoritos from '../pages/Favoritos';
import Carrito from '../pages/Carrito';
import Product from '../pages/Product';
import CartProvider from '../providers/CartProvider';
import FavoritesProvider from '../providers/FavoritesProvider';
import ProductsProvider from '../providers/ProductsProvider';
import ScrollToTop from '../components/ScrollToTop';
const Router = () => {
  const token = localStorage.getItem('token');
  let user = null;
  if (token)
    user = JSON.parse(localStorage.getItem('user'));
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <FavoritesProvider userId={user ? user.id : null}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/promociones" element={<Promociones />} />  
                <Route path="/sorteos" element={<Sorteos />} />  
                <Route path="/productos/todos" element={<Category />} />
                <Route path="/productos/categoria/:id" element={<Category />} />
                <Route path="/productos/:id" element={<Product type="product" />} />
                <Route path="/sorteos/:id" element={<Product type="sorteo" />} />
                <Route path="/favoritos" element={ token ? <Favoritos /> : <Navigate to="/login" />} />
                <Route path="/carrito" element={<Carrito />} />  
                <Route path="/login" element={ token ? <Navigate to="/" /> : <Login />} />  
                <Route path="*" element={<div>404</div> } />
              </Routes>
              <ScrollToTop />
            </Layout>
          </FavoritesProvider>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}
export default Router;
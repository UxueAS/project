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
const Router = () => {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/promociones" element={<Promociones />} />  
          <Route path="/sorteos" element={<Sorteos />} />  
          <Route path="/productos/todos" element={<Category />} />
          <Route path="/productos/categoria/:id" element={<Category />} />
          <Route path="/productos/:id" element={<Product type="product" />} />
          <Route path="/sorteos/:id" element={<Product type="sorteo" />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/carrito" element={<Carrito />} />  
          <Route path="/login" element={ token ? <Navigate to="/" /> : <Login />} />  
          <Route path="*" element={<div>404</div> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default Router;
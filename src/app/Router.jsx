import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Layout from '../components/Layout';
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="*" element={<div>404</div> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default Router;
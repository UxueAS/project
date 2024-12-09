import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/c/9002-276e-4420-8ca0')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
      <Link to="/login">Login</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
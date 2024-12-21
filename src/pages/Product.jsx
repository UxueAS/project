import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import FAQ from "../components/FAQ";
import images from '../assets/images';

const Product = ({ type }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [toggleReviews, setToggleReviews] = useState(false);
  useEffect(() => {
    if(type === 'sorteo') {
      fetch(`${import.meta.env.VITE_API_URL}/sorteos/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error("Error fetching products:", error));
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error("Error fetching products:", error));
    }
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));

    fetch(`${import.meta.env.VITE_API_URL}/products/${id}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error("Error fetching products:", error));
  }, [id, type]);

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className='mx-auto max-w-7xl w-full flex my-12'>
        <div className="w-1/2 pr-8">
          <img src={images[product.img]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 pl-10 pt-12">
          <h2 className="text-3xl font-bold mb-6">{ product.title }</h2>
          <div className="flex justify-between items-center mb-6">
            <p className="font-semibold text-3xl">{ product.price } €</p>
            <StarRating rating={product.rating} />
          </div>
          <div className="flex justify-between my-4 gap-4">
            <input 
              type="number" 
              className="border border-dark-grey py-1 px-2" 
              value={cantidad} 
              onChange={handleCantidadChange} 
            />
            <button className="bg-primary py-1 uppercase font-light text-lg text-black grow">Comprar</button>
          </div>
          <p>{ product.text }</p>
        </div>
      </div>
      <div className="bg-dark-grey text-white py-6">
        <div className='mx-auto max-w-7xl w-full'>
          <h3 className="text-2xl font-bold mb-6">También te podrían interesar...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.length > 4 && products.sort(() => 0.5 - Math.random()).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} element="productos" btnText="Comprar" color="bg-primary" />
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl w-full my-12 flex flex-col'>
        <h3 className="text-2xl font-bold mb-6">Opiniones de otros usuarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {reviews.map(review => (
            <div key={review.id} className=" border-b border-dark-grey p-4">
              <StarRating rating={review.rating} />
              <div className="flex justify-between items-center">
                <p>{review.name}</p>
                <p>{new Date(review.date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}</p>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
        {toggleReviews ?
          <button onClick={() => setToggleReviews(!toggleReviews)} className="underline font-semibold text-lg mx-auto">Mostrar menos opiniones</button>
          :
          <button onClick={() => setToggleReviews(!toggleReviews)} className="underline font-semibold text-lg mx-auto">Mostrar más opiniones</button>
        }
        
        <FAQ />
    </div>
    </div>
  );
};
Product.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Product;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import FAQ from "../components/FAQ";
import images from '../assets/images';
import { useCartContext } from "../providers/CartProvider";
import { useFavoritesContext } from "../providers/FavoritesProvider";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import MessageAlert from "../components/MessageAlert";
import { getProduct, getSorteo, getPromocion, getProducts } from "../services/api";

const Product = ({ type }) => {
  const { id } = useParams();
  const { addToCart, message } = useCartContext();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [showSorteoModal, setShowSorteoModal] = useState(false);
  const [sorteoMessage, setSorteoMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(type === 'sorteo') {
      getSorteo(id).then(data => setProduct(data))
        .catch(error => console.error("Error fetching products:", error));
    } else if(type === 'promocion') {
      getPromocion(id).then(data => setProduct(data))
        .catch(error => console.error("Error fetching products:", error));
    } else {
      getProduct(id).then(data => setProduct(data))
      .catch(error => console.error("Error fetching products:", error));
    }
    getProducts.then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));

    fetch(`${import.meta.env.VITE_API_URL}/products/${id}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error("Error fetching products:", error));
  }, [id, type]);

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };
  const handleConfirmar = () => {
    setShowSorteoModal(false);
    setSorteoMessage('¡Gracias por participar en el sorteo!');
    setTimeout(() => setSorteoMessage(null), 3000);
  };
  const token = localStorage.getItem('token');
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  return (
   
    <div className="flex flex-col">
      <MessageAlert message={message} />
      <MessageAlert message={sorteoMessage} />
      <div className='mx-auto max-w-7xl w-full flex my-12'>
        <div className="w-1/2 pr-8">
          <img src={images[product.img]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 pl-10 pt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-6">{ product.title }</h2>
            <button
              onClick={ token ? 
                () => isFavorite(product.id)
                  ? removeFromFavorites(product.id)
                  : addToFavorites(product)
                : () => navigate('/login')
              }
              className={`p-1 mb-6 text-3xl ${
                isFavorite(product.id) ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              {isFavorite(product.id) ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="font-semibold text-3xl">
              {product.discount ?  <><span className="line-through">{product.price}€</span> <span className="text-primary">{product.discount}€</span></> : product.price ? <span>{product.price} €</span> : null}</p>
            <StarRating rating={product.rating} />
          </div>
          <div className="flex justify-between my-4 gap-4">
            { type == 'product' &&
              <input 
                type="number" 
                className="border border-dark-grey py-1 px-2" 
                value={cantidad} 
                onChange={handleCantidadChange} 
              />
            }
            { type == 'sorteo' ?
              <><button className="bg-primary py-1 uppercase font-light text-lg text-black grow" 
              onClick={ token ? 
                () => {setShowSorteoModal(true);}
                : () => navigate('/login')
              }>Participar</button>
              {showSorteoModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white text-dark-grey text-center rounded p-6 shadow-lg w-11/12 max-w-xl">
                  <h2 className="text-xl font-bold mb-4">Condiciones del Sorteo</h2>
                  <p className="mb-6">
                    Al participar en este sorteo, aceptas los términos y condiciones. 
                    Por favor, confirma para continuar.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleConfirmar}
                      className="px-4 py-2 bg-primary text-white font-semibold  uppercase hover:bg-primary/75 transition"
                    >
                      Confirmar Participación
                    </button>
                    <button
                      onClick={() => setShowSorteoModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}</>
            : product.stock > 0 ? 
              <button className="bg-primary py-1 uppercase font-light text-lg text-black grow" onClick={() => addToCart(product, cantidad)}>Comprar</button>
             : <button className="bg-primary/40 py-1 uppercase font-light text-lg text-black grow" disabled>AGOTADO</button> }
            
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
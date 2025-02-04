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
import { getProduct, getSorteo, getPromocion } from "../services/api";
import { useProductsContext } from '../providers/ProductsProvider';
import { useSorteosContext } from "../providers/SorteosProvider";
import SorteoModal from "../components/SorteoModal";
import PromocionModal from "../components/PromocionModal";
import SubscriptionModal from "../components/SubscriptionModal";
import Timer from "../components/Timer";

const Product = ({ type }) => {
  const { id } = useParams();
  const { addToCart, message } = useCartContext();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [showSorteoModal, setShowSorteoModal] = useState(false);
  const [showPromocionModal, setShowPromocionModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [sorteoMessage, setSorteoMessage] = useState(null);
  const {products} = useProductsContext();
  const {participarSorteo} = useSorteosContext();
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
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error("Error fetching products:", error));
  }, [id, type]);

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };
  const handleConfirmar = () => {
    participarSorteo(product);
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
      <div className='mx-auto max-w-7xl w-full flex flex-wrap mb-6 lg:my-12'>
        <div className="w-full lg:w-1/2 lg:pr-8">
          <img src={images[product.img]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-1/2 px-2 lg:pl-10 pt-12">
          { product.access == 'subscription' ? <div className="mb-2"><span className='bg-primary text-white uppercase text-center py-1 px-2 text-xs rounded-full'>Premium</span></div> : (product.tag ? <span className='bg-primary text-white uppercase text-center py-1 px-2 text-xs rounded-full'>{product.tag}</span> : null) }
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
                min="0"
                className="border border-dark-grey py-1 px-2" 
                value={cantidad}
                onChange={handleCantidadChange}
              />
            }
            { type == 'sorteo' ?
              <div className="w-full flex flex-col gap-2">
                {product.due_date && <Timer date={product.due_date} />}
                <button className="bg-primary py-1 uppercase font-light text-lg text-black grow" 
              onClick={ token ? ( product.access == 'logged' ?
              () => {setShowSorteoModal(true); } : () => {setShowSubscribeModal(true)})
              : () => navigate('/login')
            }>Participar</button>
              <SorteoModal showSorteoModal={showSorteoModal} setShowSorteoModal={setShowSorteoModal} handleConfirmar={handleConfirmar} />
               <SubscriptionModal showSubscribeModal={showSubscribeModal} setShowSubscribeModal={setShowSubscribeModal} />
            </div>
            : type == 'producto' ? product.stock > 0 ? 
              <button disabled={cantidad < 1} className="bg-primary py-1 uppercase font-light text-lg text-black grow disabled:opacity-65" onClick={() => addToCart(product, cantidad)}>Comprar</button>
             : <button className="bg-primary/40 py-1 uppercase font-light text-lg text-black grow" disabled>AGOTADO</button> 
            : <div className="w-full flex flex-col gap-2">
                <button className="bg-primary py-1 uppercase font-light text-lg text-black grow" 
              onClick={ token ? ( product.access == 'logged' ?
              () => {setShowPromocionModal(true); } : () => {setShowSubscribeModal(true)})
              : () => navigate('/login')
            }>Obtener promocion</button>
              <PromocionModal showPromocionModal={showPromocionModal} setShowPromocionModal={setShowPromocionModal} />
               <SubscriptionModal showSubscribeModal={showSubscribeModal} setShowSubscribeModal={setShowSubscribeModal} />
            </div>}
            
          </div>
          <p>{ product.text }</p>
        </div>
      </div>
      <div className="bg-dark-grey text-white py-6">
        <div className='mx-auto max-w-7xl w-full px-2 lg:px-0'>
          <h3 className="text-2xl font-bold mb-6">También te podrían interesar...</h3>
          <div className="flex lg:grid grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
            {products.length > 4 && products.sort(() => 0.5 - Math.random()).slice(0, 4).map(product => (
              <div key={product.id} className="min-w-56 lg:w-auto">
                <ProductCard product={product} color="bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl w-full my-12 flex flex-col px-2 lg:px-0'>
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
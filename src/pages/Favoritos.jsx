import { useFavoritesContext } from "../providers/FavoritesProvider";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Favoritos = () => {

  const { favorites } = useFavoritesContext();
  return (
    <div className='mx-auto max-w-6xl w-full my-12 px-2 lg:px-0 flex flex-wrap'>
      <div className="w-1/4 px-8 pt-14">
        <ul className="text-xl font-semibold flex flex-col">
          <li className="border-b border-dark-grey py-4 hover:text-primary transition"><Link to="/favoritos">Mis favoritos</Link></li>
          <li className="border-b border-dark-grey py-4 hover:text-primary transition"><Link to="/mis-sorteos">Mis sorteos</Link></li>
        </ul>
      </div>
      <div className="w-3/4 flex flex-col">
        <h2 className="font-bold text-center text-3xl mb-6">Mis productos favoritos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} color="bg-primary" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;
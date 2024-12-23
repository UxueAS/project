import { useFavoritesContext } from "../providers/FavoritesProvider";
import ProductCard from "../components/ProductCard";

const Favoritos = () => {

  const { favorites } = useFavoritesContext();
  return (
    <div className='mx-auto max-w-7xl w-full my-12'>
      <h2 className="font-bold text-center text-3xl mb-6">Mis productos favoritos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} btnText="Ver" element="productos" color="bg-primary" />
        ))}
      </div>
    </div>
  );
};

export default Favoritos;
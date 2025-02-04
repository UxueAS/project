import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useSorteosContext } from "../providers/SorteosProvider";

const MisSorteos = () => {
  const { sorteos } = useSorteosContext();

  return (
    <div className='mx-auto max-w-7xl w-full my-12 px-2 lg:px-0 flex flex-wrap'>
      <div className="w-1/4 px-8 pt-14">
        <ul className="text-xl font-semibold flex flex-col">
          <li className="border-b border-dark-grey py-4 hover:text-primary transition"><Link to="/favoritos">Mis favoritos</Link></li>
          <li className="border-b border-dark-grey py-4 hover:text-primary transition"><Link to="/mis-sorteos">Mis sorteos</Link></li>
        </ul>
      </div>
      <div className="w-3/4 flex flex-col">
        <h2 className="font-bold text-center text-3xl mb-6">Mis sorteos</h2>
        {sorteos.length === 0 ?
          <div className="text-center">
            <p className="text-center mb-6">¡Vaya! Todavía no has participado en ningún sorteo</p>
            <Link to="/sorteos" className="bg-primary py-1 px-6 uppercase font-light text-lg text-black">Ver sorteos</Link>
          </div>
        : <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {sorteos.map((product) => (
            <ProductCard key={product.id} product={product} color="bg-primary" />
          ))}
        </div>
        }
      </div>
    </div>
  );
};

export default MisSorteos;
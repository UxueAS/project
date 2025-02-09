import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getNovedades, getPromociones } from "../services/api";
const Promociones = () => {

  const [promociones, setPromociones] = useState([]);
  const [novedades, setNovedades] = useState([]);
  useEffect(() => {
    getPromociones().then(data => setPromociones(data))
      .catch(error => console.error("Error fetching promociones:", error));
    getNovedades().then(data => setNovedades(data))
      .catch(error => console.error("Error fetching novedades:", error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-dark-grey text-white py-6">
        <div className='mx-auto max-w-6xl w-full px-2 lg:px-0'>
          <h3 className="text-2xl font-bold mb-6">Creemos que esto podría interesarte...</h3>
          <div className="flex flex-nowrap lg:grid lg:grid-cols-4 gap-4 overflow-auto">
            {novedades.map(product => (
              <div key={product.id} className="min-w-56 lg:w-auto">
                <ProductCard product={product} color="bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-6xl w-full py-6 px-2 lg:px-0'>
        <h2 className="font-bold text-center text-3xl mb-6">Promociones</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8">
          {promociones.map(product => (
            <ProductCard key={product.id} product={product} color="bg-dark-grey" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promociones;
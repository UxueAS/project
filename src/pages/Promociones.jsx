import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const Promociones = () => {

  const [promociones, setPromociones] = useState([]);
  const [novedades, setNovedades] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/promociones`)
      .then(response => response.json())
      .then(data => setPromociones(data))
      .catch(error => console.error("Error fetching promociones:", error));
    fetch(`${import.meta.env.VITE_API_URL}/novedades`)
      .then(response => response.json())
      .then(data => setNovedades(data))
      .catch(error => console.error("Error fetching novedades:", error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-dark-grey text-white py-6">
        <div className='mx-auto max-w-7xl w-full'>
          <h3 className="text-2xl font-bold mb-6">Creemos que esto podría interesarte...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {novedades.map(product => (
              <ProductCard key={product.id} product={product} btnText="Participar" element="sorteos" color="bg-primary" />
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl w-full py-6'>
        <h2 className="font-bold text-center text-3xl mb-6">Promociones</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {promociones.map(product => (
            <ProductCard key={product.id} product={product} btnText="Participar" element="sorteos" color="bg-dark-grey" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promociones;
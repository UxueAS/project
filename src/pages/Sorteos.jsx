import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const Sorteos = () => {

  const [sorteos, setSorteos] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sorteos`)
      .then(response => response.json())
      .then(data => setSorteos(data))
      .catch(error => console.error("Error fetching sorteos:", error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-dark-grey text-white py-6">
        <div className='mx-auto max-w-7xl w-full'>
          <h3 className="text-2xl font-bold mb-6">Creemos que estos sorteos podría interesarte...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sorteos.length > 4 && sorteos.sort(() => 0.5 - Math.random()).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} btnText="Participar" element="sorteos" color="bg-primary" />
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl w-full py-6'>
        <h2 className="font-bold text-center text-3xl mb-6">Sorteos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {sorteos.map(product => (
            <ProductCard key={product.id} product={product}btnText="Participar" element="sorteos" color="bg-dark-grey" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorteos;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const Category = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(id) {
      fetch(`${import.meta.env.VITE_API_URL}/categories/products/${id}`)
        .then(response => response.json())
        .then(data => setProducts(data.products))
        .catch(error => console.error("Error fetching products:", error));
    } else {
       fetch(`${import.meta.env.VITE_API_URL}/products`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error("Error fetching products:", error));
    }
   
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="bg-dark-grey text-white py-6">
        <div className='mx-auto max-w-7xl w-full'>
          <h3 className="text-2xl font-bold mb-6">Pensamos que te podrían interesar...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.length > 4 && products.sort(() => 0.5 - Math.random()).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} btnText="Comprar" element="products" color="bg-primary" />
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl w-full py-6'>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} element="products" btnText="Comprar" color="bg-dark-grey" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
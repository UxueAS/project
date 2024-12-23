import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { MdClose, MdFilterList } from "react-icons/md";
const Category = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState([]);
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
              <ProductCard key={product.id} product={product} btnText="Comprar" element="productos" color="bg-primary" />
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl w-full pb-6'>
        <div className="h-12 py-2 flex mb-4 justify-end">
            <button className="text-dark-grey hover:text-primary transition text-xl flex" title="Filtros" onClick={() => setShowFilters(!showFilters)}><span className="text-sm mr-2">Filtrar</span> <MdFilterList /><span className="sr-only">Filtros</span></button>
            <div className={`bg-white shadow p-4 w-1/4 flex flex-col gap-4 fixed top-0 bottom-0 right-0 ${showFilters ? 'translate-x-0' : 'translate-x-full'} transition z-10`}>
              <button className="ml-auto" onClick={() => setShowFilters(false)}><MdClose /></button>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><MdFilterList />Filtrar productos</h3>
              <label className="flex flex-col">
                Ordenar por
                <select name="order" id="order">
                  <option value="asc">Precio ascendente</option>
                  <option value="desc">Precio descendente</option>
                </select>
              </label>
              <label>
                Precio
                <div className="flex justify-between mt-1">
                  <input type="text" placeholder="Min" name="min_price" className="w-24 border rounded px-2" /> - <input type="text" placeholder="Max" name="max_price" className="w-24 border rounded px-2" />
                </div>
              </label>
              <label className="flex flex-col">
                Etiqueta
                <select name="tag" id="tag" className="border rounded px-2 mt-1">
                  <option value=""></option>
                </select>
              </label>
              <button className="bg-dark-grey text-white py-1 rounded hover:bg-primary transition duration-300">Filtrar</button>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} element="productos" btnText="Comprar" color="bg-dark-grey" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
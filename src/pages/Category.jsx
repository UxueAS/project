import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { MdClose, MdFilterList } from "react-icons/md";
import { useProductsContext } from '../providers/ProductsProvider';
import { getCategoryProducts } from "../services/api";
const Category = () => {
  const { id } = useParams();
  const { products } = useProductsContext();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sort: 'featured',
    priceRange: { min: 0, max: 100 },
    category: '',
  });

  useEffect(() => {
    if(id) {
      getCategoryProducts(id).then(data => {
          setCategoryProducts(data); setFilteredProducts(data); 
          setFeaturedProducts([...data].sort(() => 0.5 - Math.random()).slice(0, 4));})
        .catch(error => console.error("Error fetching products:", error));
    } else {
      setCategoryProducts(products);
      setFilteredProducts(products);
      setFeaturedProducts([...products].sort(() => Math.random() - 0.5).slice(0, 4));
    }
  }, [id, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: {
        ...prevFilters.priceRange,
        [name]: Number(value),
      },
    }));
  };

  const applyFilters = () => {
    const { sort, priceRange, tag } = filters;

    let updatedProducts = tag
      ? categoryProducts.filter((product) => product.tag === tag)
      : categoryProducts;

    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    if (sort === 'priceAsc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDesc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'featured') {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updatedProducts);
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col">
      {categoryProducts.length > 4 &&
        <div className="bg-dark-grey text-white py-6">
          <div className='mx-auto max-w-6xl w-full px-2 lg:px-0'>
            <h3 className="text-2xl font-bold mb-6">
              Pensamos que te podrían interesar...
            </h3>
            <div className="flex flex-nowrap lg:grid lg:grid-cols-4 gap-4 overflow-auto">
              {featuredProducts.map(product => (
                <div key={product.id} className="min-w-56 lg:w-auto">
                  <ProductCard key={product.id} product={product} color="bg-primary" />
                </div>
              ))}
            </div>
          </div>
        </div> 
      }
      <div className='mx-auto max-w-6xl w-full pb-6 px-2 lg:px-0'>
        <div className="h-12 py-2 flex mb-4 justify-end">
            <button className="text-dark-grey hover:text-primary transition text-xl flex" title="Filtros" onClick={() => setShowFilters(!showFilters)}><span className="text-sm mr-2">Filtrar</span> <MdFilterList /><span className="sr-only">Filtros</span></button>
            <div className={`bg-white shadow p-4 w-3/4 lg:w-1/4 flex flex-col gap-4 fixed top-0 bottom-0 right-0 ${showFilters ? 'translate-x-0' : 'translate-x-full'} transition z-10`}>
              <button className="ml-auto" onClick={() => setShowFilters(false)}><MdClose /></button>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><MdFilterList />Filtrar productos</h3>
              <label className="flex flex-col">
                Ordenar por
                <select
                  name="sort"
                  id="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="border rounded px-2 mt-1">
                  <option value="featured">Popular</option>
                  <option value="priceAsc">Precio ascendente</option>
                  <option value="priceDesc">Precio descendente</option>
                </select>
              </label>
              <label>
                Precio
                <div className="flex justify-between mt-1">
                  <input type="text" placeholder="Min" name="min"
                    value={filters.priceRange.min}
                    onChange={handlePriceChange} className="w-24 border rounded px-2" /> - <input type="text" placeholder="Max" name="max"
                      value={filters.priceRange.max}
                      onChange={handlePriceChange}
                      className="w-24 border rounded px-2" />
                </div>
              </label>
              <label className="flex flex-col">
                Etiqueta
                <select name="tag" id="tag"  
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="border rounded px-2 mt-1">
                  <option value="">--</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Descuento">Descuento</option>
                  <option value="Literatura Infantil">Literatura Infantil</option>
                  <option value="Historia">Historia</option>
                </select>
              </label>
              <button className="bg-dark-grey text-white py-1 rounded hover:bg-primary transition duration-300"
                onClick={applyFilters}>Filtrar</button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} color="bg-dark-grey" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
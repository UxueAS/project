import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TabCard from './TabCard';

const Tabs = () => {
  const [ofertas, setOfertas] = useState([]);
  const [sorteos, setSorteos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tab, setTab] = useState('ofertas');
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(response => response.json())
      .then(data => setProductos(data.splice(0,4)));
    fetch(`${import.meta.env.VITE_API_URL}/sorteos`)
        .then(response => response.json())
        .then(data => setSorteos(data.splice(0,4)))
        .catch(error => console.error("Error fetching sorteos:", error));   
  }, []);
  return (
    <div>
      <div className='flex justify-center gap-40 border-b mb-10 font-semibold text-3xl'>
        <button onClick={() => setTab('ofertas')} className={`px-8 py-2 ${tab === 'ofertas' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Ofertas</button>
        <button onClick={() => setTab('sorteos')} className={`px-4 py-2 ${tab === 'sorteos' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Sorteos</button>
        <button onClick={() => setTab('productos')} className={`px-4 py-2 ${tab === 'productos' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Productos</button>
      </div>
      {tab === 'ofertas' && 
        <div className='mb-6 flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-6 mb-10'>
          {ofertas.map(product => (
            <TabCard key={product.id} product={product} type="ofertas" />
          ))}
          </div>
          <Link to="" className="bg-primary py-1 uppercase font-light text-lg px-8">Ver todas las ofertas</Link>
        </div>
      }
      
      {tab === 'sorteos' && 
        <div className='mb-6 flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-6 mb-10'>
          {sorteos.map(product => (
            <TabCard key={product.id} product={product} type="sorteos" />
          ))}
          </div>
          <Link to="/sorteos" className="bg-primary py-1 uppercase font-light text-lg px-8">Ver todos los sorteos</Link>
        </div>
      }
      
      {tab === 'productos' && 
        <div className='mb-6 flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-6 mb-10'>
          {productos.map(product => (
            <TabCard key={product.id} product={product} type="productos" />
          ))}
          </div>
          <Link to="/productos/todos" className="bg-primary py-1 uppercase font-light text-lg px-8">Ver todos los productos</Link>
        </div>
      }
    </div>
  );
};

export default Tabs;
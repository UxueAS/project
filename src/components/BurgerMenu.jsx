import { useState, useEffect } from 'react';
import { MdDehaze, MdArrowForward, MdArrowBack, MdClose, MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import {Link} from 'react-router-dom';


const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [openedSubcategory, setOpenedSubcategory] = useState(null);
  useEffect(() => {
      fetch('https://dummyjson.com/c/0ff3-d1d2-4fb2-88f9')
        .then(response => response.json())
        .then(data => setMenuItems(data));
    }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openCategory = (category) => {
    console.log(category);
    setCategory(category);
  };

  const openSubcategory = (id) => {
    setOpenedSubcategory(openedSubcategory === id ? null : id);
  }

  const resetMenu = () => {
    setCategory(null);
    setOpenedSubcategory(null);
    setIsOpen(false);
  };
  return (
    <div className="burger-menu flex flex-col justify-end">
      <a className={`bg-primary text-white w-16 h-16 text-2xl flex justify-center items-center mr-4 cursor-pointer ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {isOpen ? <MdClose /> : <MdDehaze />}
      </a>
      {isOpen && <div className="fixed inset-0 z-10" onClick={resetMenu}></div>}
      <nav className={`bg-dark-grey text-white font-semibold absolute top-24 w-96 h-screen px-8 py-14 z-20 ${isOpen ? ' left-0' : '-left-96'}`}>
        {category ? (
          <ul className='text-xl flex flex-col gap-6'>
            <li><button onClick={() => setCategory(null)} className='text-2xl uppercase flex items-center'><MdArrowBack /> <span className='ml-6'>{category.name}</span></button></li>
            <li><Link to="/productos/todos" onClick={resetMenu} className='hover:underline'>Todos los productos</Link></li>
            {category.categories.map((subcategory, index) => (
              <li key={index}>
                <button onClick={() => openSubcategory(subcategory.id)} className="w-full flex justify-between items-center">
                  <span>{subcategory.name}</span>
                  {subcategory.subcategories && openedSubcategory === subcategory.id ? <MdOutlineRemove /> : <MdOutlineAdd />}
                  
                </button>
                {subcategory.subcategories && openedSubcategory === subcategory.id &&
                  <ul className='font-normal flex flex-col gap-2 mt-4 ml-6'>
                    {subcategory.subcategories.map((item, index) => (
                      <li key={index}>
                        <Link to={`/productos/categoria/${item.id}`} onClick={resetMenu} className='hover:underline'>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                }
              </li>)
            )}
          </ul>) :
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="py-2 text-2xl">
                {item.link ?
                  <Link to={item.link} className='uppercase flex justify-between items-center hover:underline' onClick={resetMenu}><span>{item.name}</span><MdArrowForward /></Link>
                :
                  <button className='uppercase w-full flex justify-between items-center hover:underline' onClick={() => openCategory(item)}>
                    <span>{item.name}</span><MdArrowForward />
                  </button>
                }
                
              </li>
            ))}
          </ul>
        }
      </nav>
    </div>
  );
};

export default BurgerMenu;
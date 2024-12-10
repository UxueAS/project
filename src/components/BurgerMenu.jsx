import { useState, useEffect } from 'react';
import { SlMenu } from "react-icons/sl";
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

  return (
    <div className="burger-menu flex flex-col justify-end">
      <a className={`bg-primary text-white w-16 h-16 text-2xl flex justify-center items-center mr-4 cursor-pointer ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <SlMenu />
      </a>
      <nav className={`bg-dark-grey text-white absolute top-24 w-96 h-screen px-8 py-14 ${isOpen ? ' left-0' : '-left-96'}`}>
        {category ? (
          <ul>
            <li><button onClick={() => setCategory(null)} className='uppercase'>{category.name}</button></li>
            {category.categories.map((subcategory, index) => (
              <li key={index}>
                <button onClick={() => openSubcategory(subcategory.id)}>{subcategory.name}</button>
                {subcategory.subcategories && openedSubcategory === subcategory.id &&
                  <ul>
                    {subcategory.subcategories.map((item, index) => (
                      <li key={index}>
                        <Link to={`/productos/categoria/${item.id}`}>{item.name}</Link>
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
                  <Link to={item.link} className='uppercase'>{item.name}</Link>
                :
                  <button className='uppercase' onClick={() => openCategory(item)}>
                    {item.name}
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
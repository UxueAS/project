import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const SorteosContext = createContext();
export const useSorteosContext = () => useContext(SorteosContext);

const SorteosProvider = ({ children, userId }) => {
  const [sorteos, setSorteos] = useState(() => {
    const storedSorteos = JSON.parse(localStorage.getItem('sorteosByUser')) || {};
    return storedSorteos[userId] || [];
  });

  // Actualiza localStorage cuando los favoritos o el userId cambian
  useEffect(() => {
    const storedSorteos = JSON.parse(localStorage.getItem('sorteosByUser')) || {};
    storedSorteos[userId] = sorteos;
    localStorage.setItem('sorteosByUser', JSON.stringify(storedSorteos));
  }, [sorteos, userId]);

  // Agregar un producto a favoritos
  const participarSorteo = (product) => {
    const storedSorteos = JSON.parse(localStorage.getItem('sorteosByUser')) || {};
    const userSorteos = storedSorteos[userId] || [];

    if (!userSorteos.some(item => item.id === product.id)) {
      const updatedSorteos = [...userSorteos, product];
      storedSorteos[userId] = updatedSorteos;
      localStorage.setItem('sorteosByUser', JSON.stringify(storedSorteos));
      setSorteos(updatedSorteos);
    }
  };

  return (
    <SorteosContext.Provider value={{
      sorteos,
      participarSorteo
    }}>
      {children}
    </SorteosContext.Provider>
  );
};
SorteosProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.number,
};

export default SorteosProvider;

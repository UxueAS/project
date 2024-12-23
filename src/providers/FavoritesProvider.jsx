import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext();
export const useFavoritesContext = () => useContext(FavoritesContext);

const FavoritesProvider = ({ children, userId }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
    return storedFavorites[userId] || [];
  });

  // Actualiza localStorage cuando los favoritos o el userId cambian
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
    storedFavorites[userId] = favorites;
    localStorage.setItem('favoritesByUser', JSON.stringify(storedFavorites));
  }, [favorites, userId]);

  // Agregar un producto a favoritos
  const addToFavorites = (product) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
    const userFavorites = storedFavorites[userId] || [];

    if (!userFavorites.some(item => item.id === product.id)) {
      const updatedFavorites = [...userFavorites, product];
      storedFavorites[userId] = updatedFavorites;
      localStorage.setItem('favoritesByUser', JSON.stringify(storedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  // Eliminar un producto de favoritos
  const removeFromFavorites = (productId) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
    const userFavorites = storedFavorites[userId] || [];

    const updatedFavorites = userFavorites.filter(item => item.id !== productId);
    storedFavorites[userId] = updatedFavorites;
    localStorage.setItem('favoritesByUser', JSON.stringify(storedFavorites));
    setFavorites(updatedFavorites);
  };

  // Verificar si un producto está en favoritos
  const isFavorite = (productId) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
    const userFavorites = storedFavorites[userId] || [];
    return userFavorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FavoritesProvider;

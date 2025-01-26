export const getProducts = fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(response => response.json())

export const getProduct = (id) => fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(response => response.json())

export const getCategories = fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(response => response.json())

export const getCategory = (id) => fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`)
      .then(response => response.json())
export const getCategoryProducts = (id) => fetch(`${import.meta.env.VITE_API_URL}/categories/${id}/products`)
      .then(response => response.json())
export const getPromociones = fetch(`${import.meta.env.VITE_API_URL}/promociones`)
      .then(response => response.json())
  
export const getPromocion = (id) => fetch(`${import.meta.env.VITE_API_URL}/promociones/${id}`)
      .then(response => response.json())

export const getSorteos = fetch(`${import.meta.env.VITE_API_URL}/sorteos`)
      .then(response => response.json())

export const getSorteo = (id) => fetch(`${import.meta.env.VITE_API_URL}/sorteos/${id}`)
      .then(response => response.json())
    
export const getFavoritos = fetch(`${import.meta.env.VITE_API_URL}/favoritos`)
      .then(response => response.json())

export const getNovedades = fetch(`${import.meta.env.VITE_API_URL}/novedades`)
      .then(response => response.json())

export const getSlides = fetch(`${import.meta.env.VITE_API_URL}/slides`)
      .then(response => response.json())
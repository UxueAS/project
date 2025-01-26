export const getProducts = async () => fetch(`${import.meta.env.VITE_API_URL}/products/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getProduct =  async (id) => fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getCategories =  async () => fetch(`${import.meta.env.VITE_API_URL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getCategory = async (id) => fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
export const getCategoryProducts = async (id) => fetch(`${import.meta.env.VITE_API_URL}/categories/${id}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
export const getPromociones = async () => fetch(`${import.meta.env.VITE_API_URL}/promociones`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
  
export const getPromocion = async (id) => fetch(`${import.meta.env.VITE_API_URL}/promociones/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getSorteos = () => fetch(`${import.meta.env.VITE_API_URL}/sorteos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getSorteo = async (id) => fetch(`${import.meta.env.VITE_API_URL}/sorteos/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
    
export const getFavoritos = async () => fetch(`${import.meta.env.VITE_API_URL}/favoritos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getNovedades = async () => fetch(`${import.meta.env.VITE_API_URL}/novedades`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())

export const getSlides = async () => fetch(`${import.meta.env.VITE_API_URL}/slides`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
import axios from 'axios';



const BACKEND_API_URL = "http://localhost:8080";


export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/api/products/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};



export const fetchProductsById = async (project) => {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/api/products/getProductById/${project}`);
        debugger
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};




export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/api/category/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};





export const searchProducts = async (query) => {
    debugger
    try {
      const response = await axios.get(`${BACKEND_API_URL}/api/category/categories/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
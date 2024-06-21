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



// Register Api
export const registerUser = async (email, password, role) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/api/register`, { email, password, role });
      // Check if response is successful
      if (response.status === 201) {
        // Success: Return success message
        console.log(response)
        return { success: true, message: response.data.message };
      } else {
        // Error: Return error message
        return { success: false, message: 'Failed to register user' };
      }
    } catch (error) {
      // Error: Log error and return error message
      console.error('Error registering user:', error);
      return { success: false, message: 'Failed to register user. Please try again later.' };
    }
  };

//   login api
export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/api/login`, { email, password });
      // Check if response is successful
      if (response.status === 200) {
        // Login successful: Return token
        return { success: true, token: response.data.token };
      } else {
        // Error: Return error message
        return { success: false, message: 'Failed to login' };
      }
    } catch (error) {
      // Error: Log error and return error message
      console.error('Error logging in:', error);
      return { success: false, message: 'Failed to login. Please try again later.' };
    }
  };
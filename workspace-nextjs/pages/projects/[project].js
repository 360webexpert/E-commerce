import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProductsById } from '../hooks/auth';

export default function Project() {
    const router = useRouter();
    const { project } = router.query;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addToWishlistError, setAddToWishlistError] = useState('');

    useEffect(() => {
        if (project) {
            const fetchProduct = async () => {
                try {
                    const productData = await fetchProductsById(project);
                    setProduct(productData);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [project]);

    const handleAddToBag = async () => {
        try {
            // Ensure project ID is valid
            if (!project) {
                throw new Error('Project ID is missing');
            }
    
            // Retrieve the token from local storage or wherever it is stored after user authentication
            const token = localStorage.getItem('token'); // Adjust this based on your token storage mechanism
            
            // Make a POST request to add the product to the cart
            const response = await fetch('http://localhost:8080/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                },
                body: JSON.stringify({ productId: project })
            });
    
            if (response.ok) {
                console.log('Product added to cart successfully');
                // Optionally, provide feedback to the user
            } else {
                // Handle non-successful response
                console.error('Failed to add product to cart:', response.statusText);
                // Optionally, provide feedback to the user
            }
        } catch (err) {
            console.error('Error adding product to cart:', err.message);
            // Optionally, provide feedback to the user
        }
    };



    const handleAddToWishlist = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/products/addToWishlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ productId: project })
          });
    
          if (!response.ok) {
            throw new Error('Failed to add product to wishlist');
          }
    
          console.log('Product added to wishlist successfully');
          // Optionally, provide feedback to the user
        } catch (err) {
          console.error('Error adding product to wishlist:', err.message);
          setAddToWishlistError('Failed to add product to wishlist');
          // Optionally, provide feedback to the user
        }
      };
    
    
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product: {error.message}</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-start">
                {product ? (
                    <>
                        <div className="w-full md:w-1/2 p-4">
                            <img
                                className="w-full h-auto"
                                src={`http://localhost:8080/${product.image}`}
                                alt="product image"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                            <p className="text-lg mb-2"><strong>Description:</strong> {product.description}</p>
                            <p className="text-lg mb-2"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                            <p className="text-lg mb-2"><strong>Category:</strong> {product.category.name}</p>
                            <div className="mt-4">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600" onClick={handleAddToBag}>
                                    ADD TO BAG
                                </button>
                                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleAddToWishlist}>
                                    WISHLISTED
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No product found.</p>
                )}
            </div>
        </div> 
    );
}

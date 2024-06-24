import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProductsById } from '../hooks/auth';
import { ToastContainer, toast } from 'react-toastify';


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

    const handleAddToCart = async () => {
        try {
            // Check if projectId is available
            if (!project) {
                console.error('Project ID is missing');
                return;
            }
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzE1ZDI3YThmYzliZmM0MDhmYmUxOCIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTIzMDMzMSwiZXhwIjoxNzE5MjMzOTMxfQ.be8zV_P-uu2d6jh3MpJ-72kmBQ5UGo6CqalapCJGb9s';
            if (!token) {
                console.error('Authentication token is missing');
                return;
            }
    
            // Send request to backend API to add product to cart
            const response = await fetch(`http://localhost:8080/api/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: project }), // Assuming project is the productId
            });
    
            // Handle response from backend
            if (response.ok) {
                const responseData = await response.json();
                console.log('Product added to cart:', responseData);
                toast.success('Product added to cart successfully', {
                    position: 'top-right',
                    autoClose: 3000, // Close the toast after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                router.push('/cart');
            } else {
                // Handle failed request (e.g., server error, validation error)
                const errorData = await response.json();
                console.error('Failed to add product to cart:', errorData.message);
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error('Error adding product to cart:', error);
            toast.error('Error adding product to cart', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    // const handleAddToBag = async () => {
    //     try {
    //         // Ensure project ID is valid
    //         if (!project) {
    //             throw new Error('Project ID is missing');
    //         }

    //         // Retrieve the token from local storage or wherever it is stored after user authentication
    //         const token = localStorage.getItem('token'); // Adjust this based on your token storage mechanism

    //         // Make a POST request to add the product to the cart
    //         const response = await fetch('http://localhost:8080/api/products/add', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}` // Include the token in the request headers
    //             },
    //             body: JSON.stringify({ productId: project })
    //         });

    //         if (response.ok) {
    //             console.log('Product added to cart successfully');
    //             // Optionally, provide feedback to the user
    //         } else {
    //             // Handle non-successful response
    //             console.error('Failed to add product to cart:', response.statusText);
    //             // Optionally, provide feedback to the user
    //         }
    //     } catch (err) {
    //         console.error('Error adding product to cart:', err.message);
    //         // Optionally, provide feedback to the user
    //     }
    // };



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
            toast.success('Product added to wishlist successfully');
        } catch (err) {
            console.error('Error adding product to wishlist:', err.message);
            toast.error('Failed to add product to wishlist');
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
                        <div class="font-sans">
                            <div class="p-4 lg:max-w-5xl max-w-lg mx-auto">
                                <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
                                    <div class="w-full lg:sticky top-0 sm:flex gap-2">
                                        <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                                            {product.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={`http://localhost:8080/${image}`}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full cursor-pointer rounded-md"
                                                />
                                            ))}
                                        </div>
                                        <img
                                            src={`http://localhost:8080/${product.images[0]}`}
                                            alt="Product"
                                            className="w-4/5 rounded-md object-cover"
                                        />
                                    </div>

                                    <div>
                                        <h2 class="text-2xl font-bold text-gray-800">{product.name}</h2>
                                        <div class="flex flex-wrap gap-4 mt-4">
                                            <p class="text-gray-800 text-xl font-bold">${product.price}</p>
                                            <p class="text-gray-400 text-xl"><strike>$16</strike> <span class="text-sm ml-1.5">Tax included</span></p>
                                        </div>

                                        <div class="flex space-x-2 mt-4">
                                            <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                            </svg>
                                            <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                            </svg>
                                            <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                            </svg>
                                            <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                            </svg>

                                        </div>

                                        <div class="mt-8">
                                            <h3 class="text-xl font-bold text-gray-800">Sizes</h3>
                                            <div class="flex flex-wrap gap-4 mt-4">
                                                <button type="button" class="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">{product.size}</button>
                                                {/* {product.size && Array.isArray(product.size) ? (
                                                    product.size.map((size, index) => (
                                                        <button key={index} type="button" className="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">
                                                            {size}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <p>No sizes available</p>
                                                )} */}
                                            </div>
                                        </div>

                                        <div className="mt-10 flex gap-6">
                                            <button onClick={handleAddToCart} className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">Add to cart</button>
                                            <button onClick={handleAddToWishlist} className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md">WishList</button>
                                        </div>

                                        <div class="mt-8">
                                            <h3 class="text-xl font-bold text-gray-800">About the item</h3>
                                            <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                                                <li>{product.description}</li>
                                                {/* <li>Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.</li>
                                                <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
                                                <li>You can add your own designs, paintings, or embroidery to make it your own.</li> */}
                                            </ul>
                                        </div>

                                        {/* <div class="mt-8">
                                            <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
                                            <div class="space-y-3 mt-4">
                                                <div class="flex items-center">
                                                    <p class="text-sm text-gray-800 font-bold">5.0</p>
                                                    <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                    </svg>
                                                    <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                                        <div class="w-2/3 h-full rounded-md bg-blue-600"></div>
                                                    </div>
                                                    <p class="text-sm text-gray-800 font-bold ml-3">66%</p>
                                                </div>

                                                <div class="flex items-center">
                                                    <p class="text-sm text-gray-800 font-bold">4.0</p>
                                                    <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                    </svg>
                                                    <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                                        <div class="w-1/3 h-full rounded-md bg-blue-600"></div>
                                                    </div>
                                                    <p class="text-sm text-gray-800 font-bold ml-3">33%</p>
                                                </div>

                                                <div class="flex items-center">
                                                    <p class="text-sm text-gray-800 font-bold">3.0</p>
                                                    <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                    </svg>
                                                    <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                                        <div class="w-1/6 h-full rounded-md bg-blue-600"></div>
                                                    </div>
                                                    <p class="text-sm text-gray-800 font-bold ml-3">16%</p>
                                                </div>

                                                <div class="flex items-center">
                                                    <p class="text-sm text-gray-800 font-bold">2.0</p>
                                                    <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                    </svg>
                                                    <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                                        <div class="w-1/12 h-full rounded-md bg-blue-600"></div>
                                                    </div>
                                                    <p class="text-sm text-gray-800 font-bold ml-3">8%</p>
                                                </div>

                                                <div class="flex items-center">
                                                    <p class="text-sm text-gray-800 font-bold">1.0</p>
                                                    <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                                    </svg>
                                                    <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                                        <div class="w-[6%] h-full rounded-md bg-blue-600"></div>
                                                    </div>
                                                    <p class="text-sm text-gray-800 font-bold ml-3">6%</p>
                                                </div>
                                            </div>

                                            <button type="button" class="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md">Read all reviews</button>
                                        </div> */}
                                    </div>
                                </div>
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

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';

export default function Cart() {
    const [cartProducts, setCartProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch cart items from the backend when the component mounts
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzE1ZDI3YThmYzliZmM0MDhmYmUxOCIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTIyODI1MCwiZXhwIjoxNzE5MjMxODUwfQ.lHd8Kf2A3RaYZ1ogVpLHydmwXEU6adsslLJ_1r3Gab8';
            const response = await fetch('http://localhost:8080/api/products/getCartData', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
            }

            const data = await response.json();
            console.log(data, 'cart data')
            setCartProducts(data.products);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzE1ZDI3YThmYzliZmM0MDhmYmUxOCIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTIyODI1MCwiZXhwIjoxNzE5MjMxODUwfQ.lHd8Kf2A3RaYZ1ogVpLHydmwXEU6adsslLJ_1r3Gab8'; // Replace with actual token from localStorage
            const response = await fetch(`http://localhost:8080/api/products/delete/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            // Update the cart items after successful removal
            await fetchCartItems();
            toast('Item removed in cart')
        } catch (error) {
            setError(error.message);
        }
    };


    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    // Calculate total discount, shipping, and tax (dummy values for demonstration)
    const totalDiscount = 0;
    const shippingCost = 2.00;
    const taxAmount = 4.00;

    // Calculate overall total including discounts, shipping, and tax
    const calculateOverallTotal = () => {
        return calculateTotalPrice() + shippingCost + taxAmount - totalDiscount;
    };


    return (
        <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
        {loading && <p>Loading cart...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && cartProducts.length === 0 && (
            <p className="text-center text-gray-800">Cart is empty. Please add products to your cart.</p>
        )}
        {!loading && !error && cartProducts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                    <hr className="border-gray-300 mt-4 mb-8" />

                    <div className="space-y-4">
                        {cartProducts.map(product => (
                            <div key={product._id} className="grid grid-cols-3 items-center gap-4">
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                        <img src={`http://localhost:8080/${product.images}`} alt='product image' className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
                                        <h6 className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => handleRemoveItem(product._id)}>Remove</h6>
                                        <div className="flex gap-4 mt-4">
                                            <div>
                                                <button type="button" className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                    {product.size}
                                                </button>
                                            </div>
                                            <div>
                                                <button type="button" className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                    {product.quantity}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <h4 className="text-base font-bold text-gray-800">${(product.price * product.quantity).toFixed(2)}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                    <div className="flex border border-blue-600 overflow-hidden rounded-md">
                        <input type="email" placeholder="Promo code"
                            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
                        <button type='button' className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white">
                            Apply
                        </button>
                    </div>

                    <ul className="text-gray-800 mt-8 space-y-4">
                        <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">${totalDiscount.toFixed(2)}</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">${shippingCost.toFixed(2)}</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">${taxAmount.toFixed(2)}</span></li>
                        <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto font-bold">${calculateOverallTotal().toFixed(2)}</span></li>
                    </ul>

                    <div className="mt-8 space-y-2">
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">Checkout</button>
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"> 
                        <Link href="/" >Continue Shopping</Link>  </button>
                    </div>
                </div>
            </div>
        )}
    </div>

    );
};

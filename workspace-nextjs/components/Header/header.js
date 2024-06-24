import Image from 'next/image'
import Link from 'next/link'
import searchProducts from "../../pages/hooks/auth"
import { useState } from 'react';
import { useAuth } from '../../pages/signin/AuthContext';
// import SignIn from "../../pages/signin/index"

export default function header() {
    const [query, setQuery] = useState('');
    // console.log(query, "?????????????????????????????????????????????")
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const { user, logout } = useAuth();

    const handleSearch = async () => {
        try {
            setLoading(true);
            const data = await searchProducts(query);
            setProducts(data); // Assuming data structure matches your API response
        } catch (error) {
            setError('Error fetching products. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='navbar_container'>
            <div className="navbar">
                <div className="logo">
                    <Link className="logo" href="/">E-Com Shop</Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link href="/about">About me</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact me</Link>
                    </li>
                    {/* <li>
                        <Link href="/blog">Blog</Link>
                    </li> */}
                    <li>
                        <Link href="/projects">Products</Link>
                    </li>
                    <li>
                        <Link href="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link href="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link href="/checkout">Checkout</Link>
                    </li>
                </ul>
                <div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button style={{ background: "black", color: "white" }} onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="cart-logo">
            {/* Your cart logo SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mt-4 h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
        </div>
            </div>

            {/* logout */}
            {/* <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
                {user ? (
                    <div>
                        <p className="text-xl mb-4">Hello, {user.email}</p>
                        <button
                            onClick={logout}
                            className="py-2 px-4 text-black bg-red-500 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-xl">You are not logged in.</p>
                )}
            </div> */}

            <div className="profile">
                <div className="products-list">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && products.length === 0 && <p></p>}
                    {!loading && !error && products.length > 0 && (
                        products.map((category) => (
                            <div key={category._id}>
                                <h3>{category.name}</h3>
                                <ul>
                                    {category.products.map((product) => (
                                        <li key={product._id}>
                                            <h4>{product.name}</h4>
                                            <p>{product.description}</p>
                                            {/* Use Next.js Image component */}
                                            <div className="w-full md:w-1/2 p-4">
                                                <img
                                                    className="w-full h-auto"
                                                    src={`http://localhost:8080/${product.images}`} // Assuming product.image contains the image path
                                                    alt={product.name}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

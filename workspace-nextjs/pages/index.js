import Image from 'next/image'
import Link from 'next/link'
import { searchProducts } from './hooks/auth';
import { useState } from 'react';
import { useAuth } from './signin/AuthContext';

export default function Home() {
    const [query, setQuery] = useState('');
    console.log(query, "?????????????????????????????????????????????")
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
                <div className="logo">ProVista Shop</div>
                <ul className="nav-links">
                    <li>
                        <Link href="/about">About me</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact me</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link href="/projects">Products</Link>
                    </li>
                    <li>
                        <Link href="/signin">Sign In</Link>
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
                    {!loading && !error && products.length === 0 && <p>No products found.</p>}
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
                                                    // src={`http://localhost:8080/${product.images}`}
                                                    // alt="product image"
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

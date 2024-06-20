import Image from 'next/image'
import Link from 'next/link'
import { searchProducts } from './hooks/auth';
import { useState } from 'react';

export default function Home() {

    const [query, setQuery] = useState('');
    console.log(query, "?????????????????????????????????????????????")
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
                                                    src={`http://localhost:8080/${product.image}`}
                                                    alt="product image"
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

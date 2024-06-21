import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchProductsById } from '../../hooks/auth'; // Import your fetchProductsById function
import ErrorPage from 'next/error';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductsById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          className="w-full h-auto"
          src={`http://localhost:8080/${product.images}`}
          alt="product image"
        />
        <div className="p-4">
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-800 font-semibold">
            Price: ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
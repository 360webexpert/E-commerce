import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../hooks/auth';
import Link from 'next/link';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProjects(data);

      // Assuming fetchCategories is a function that fetches the categories
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 p-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="mb-1">
                <Link href={`/category/${category._id}`}>
                  <div className="text-indigo-500 hover:text-indigo-600">{category.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
                key={project._id}
              >
                <Link href={`/projects/${project._id}`}>
                  <div>
                    <img
                      className="w-full h-64 object-cover"
                      src={`http://localhost:8080/${project.images}`} // Assuming product.image contains the image path
                      alt={project.name}
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                      <h5 className="text-xl font-semibold ">Colour: {project.color}</h5>
                      <h5 className="text-xl font-semibold ">Size : {project.size}</h5>
                      <h5 className="text-xl font-semibold ">Price :${project.price}</h5>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="text-indigo-500 hover:text-indigo-600">View More</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;


// export default function Projects() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const data = await fetchProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     getProducts();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//     {products.map((product) => (
//       <div
//         key={product._id}
//         className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
//       >
//         <a href="#">
//           <img
//             className="rounded-t-lg"
//             src={`http://localhost:8080/${product.images}`} // Assuming product.image contains the image path
//             alt={product.name}
//           />
//         </a>
//         <div className="p-5">
//           <a href="#">
//             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
//           </a>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Colour:{product.color}</p>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price :${product.price}</p>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.category}</p>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
//           <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//             Read more
//             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//             </svg>
//           </a>
//         </div>
//       </div>
//     ))}
//   </div>
//   );
// }

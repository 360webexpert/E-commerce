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
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 p-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="mb-2">
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
                      src={`http://localhost:8080/${project.image}`}
                      alt="project image"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
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

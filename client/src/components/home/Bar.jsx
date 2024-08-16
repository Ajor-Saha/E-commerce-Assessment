import React, { useEffect, useState } from "react";
import PriceCard from "../card/PriceCard";
import Skeleton from "../card/Skeleton";

const Bar = () => {
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products based on the selected category
  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-[640px] sm:w-full py-10 dark:bg-gray-900">
      <div className="flex justify-evenly bg-gray-100 dark:bg-gray-700 py-4 dark:text-gray-50 text-gray-800">
        {/* Map over categories and create a button for each one */}
        {categories.map((category, index) => (
          <button
            key={index}
            className="btn btn-ghost text-lg"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        // Render skeleton or loading indicator while loading is true
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 ml-3 justify-center items-center md:justify-between">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 ml-3 justify-center items-center md:justify-between">
          {/* Map over the products and render PriceCard for each product */}
          {products.map((product, index) => (
            <PriceCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bar;

import React, { useEffect, useState } from "react";
import NewProductCard from "../card/NewProductCard";
import Skeleton from "../card/Skeleton";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-10 w-[640px] sm:w-full dark:bg-darkPurple">
      <h1 className="text-center font-semibold text-lg bg-newarrival py-8 dark:text-gray-800 font-serif">Men's Clothing</h1>
      <div className="font-[sans-serif] bg-gray-100 dark:bg-darkPurple mt-5">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 justify-center items-center md:justify-between">
          {loading ? (
              <>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                
              </>
            ) : (
              // Render products once data is fetched
              products.map((product) => (
                <NewProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

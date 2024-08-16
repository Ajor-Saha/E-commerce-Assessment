import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/card/ProductCard';

const AllProducts = () => {
  const [sidebarData, setSidebarData] = useState({
    sort: 'desc',
    category: 'uncategorized',
    minPrice: '',
    maxPrice: ''
  })

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');
    const searchTermFromUrl = urlParams.get('searchTerm')?.trim() || ''; // Trim spaces from search term

    setSearchTerm(searchTermFromUrl);

    if (sortFromUrl || categoryFromUrl || minPriceFromUrl || maxPriceFromUrl) {
      setSidebarData({
        ...sidebarData,
        sort: sortFromUrl,
        category: categoryFromUrl,
        minPrice: minPriceFromUrl,
        maxPrice: maxPriceFromUrl
      });
    }

    setSearchTerm(searchTermFromUrl);

   
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();

        // Filtering by category and price range
        let filteredProducts = data;

        if (searchTerm) {
          filteredProducts = filteredProducts.filter(
            product =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) || // Trim spaces before comparing
              product.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
          );
        }
        
        if (sidebarData.category !== 'uncategorized') {
          filteredProducts = filteredProducts.filter(product => product.category === sidebarData.category);
        }

        if (sidebarData.minPrice) {
          filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(sidebarData.minPrice));
        }

        if (sidebarData.maxPrice) {
          filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(sidebarData.maxPrice));
        }

        // Sorting the products
        if (sidebarData.sort === 'asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sidebarData.sort === 'desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(filteredProducts);
        setTotalPages(Math.ceil(filteredProducts.length / perPage)); // Calculate the total number of pages
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };


    fetchProducts();

  }, [location.search, searchTerm]);

  const handleChange = (e) => {
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
    if (e.target.id === 'minPrice') {
      setSidebarData({ ...sidebarData, minPrice: e.target.value });
    }
    if (e.target.id === 'maxPrice') {
      setSidebarData({ ...sidebarData, maxPrice: e.target.value });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    urlParams.set('minPrice', sidebarData.minPrice);
    urlParams.set('maxPrice', sidebarData.maxPrice);
    urlParams.delete('searchTerm'); // Remove search term when applying filters
    navigate(`/search?${urlParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    <div className='flex flex-col w-[640px] sm:w-full md:flex-row min-h-screen pt-18 dark:bg-gray-900'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>High to Low</option>
              <option value='asc'>Low to High</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='electronics'>Electronics</option>
              <option value='jewelery'>Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Min Price:</label>
            <TextInput
              placeholder='0'
              id='minPrice'
              type='number'
              value={sidebarData.minPrice}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Max Price:</label>
            <TextInput
              placeholder='1000'
              id='maxPrice'
              type='number'
              value={sidebarData.maxPrice}
              onChange={handleChange}
            />
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Products results:
        </h1>
        <div className='p-7 flex flex-wrap justify-evenly gap-4'>
        {!loading && products.length === 0 && (
            <p className='text-xl text-gray-500'>No products found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            products &&
            products
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllProducts

import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { FaPlus, FaMinus, FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../redux/theme/themeSlice";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

 
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  

  return (
    <nav className="dark:bg-gray-800 bg-gray-100 w-full  dark:text-white text-black  fixed top-0 left-0 z-50 px-5 py-5 flex justify-between items-center">
      {/* Left section */}
      <div className="flex items-center">
        <Link to="/" className="text-lg font-semibold dark:text-gray-50">
           FashionFleet
        </Link>
      </div>

      {/* Center section */}
      <div className="flex justify-center ">
        <div className="relative w-full max-w-xs ml-2 mr-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block w-full md:w-64 lg:w-80 rounded-md bg-gray-50 dark:bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-400 pl-8 py-1"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-5.2-5.2"></path>
                <circle cx="10" cy="10" r="8"></circle>
              </svg>
            </span>
          </form>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center relative mr-5 sm:mr-0">
        <Button
          className="w-12 h-8  mr-2"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        
        <Link to="/shoppingList" className="mr-2">
          <div className="relative">
            <FaShoppingCart className="mr-4 cursor-pointer"/>
            {cartItems.length > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full text-xs">
                {cartItems.length}
              </div>
            )}
          </div>
        </Link>
        
      </div>
    </nav>
  );
};

export default Header;

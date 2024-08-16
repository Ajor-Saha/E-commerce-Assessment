import Header from "./components/header/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ShoppingList from "./pages/ShoppingList";
import Footer from "./components/footer/Footer";
import AllProducts from "./pages/AllProducts";
import AutoScroll from "./components/utils/AutoScroll";


function App() {
  

  return (
    <BrowserRouter>
    <AutoScroll />
    <Header />
       <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="/search" element={<AllProducts />} />
      </Routes>     
      <Footer /> 
    </BrowserRouter>
   
  )
}

export default App



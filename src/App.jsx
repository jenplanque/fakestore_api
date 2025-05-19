// import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import NavBar from './components/Navbar';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/products"
              element={<ProductList />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/addproduct"
              element={<AddProduct />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;

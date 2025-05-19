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
// import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <>
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
          <Route
            path="/updateproduct"
            element={<UpdateProduct />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

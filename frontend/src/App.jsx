import { useState } from 'react'
import './App.css'
import Home from './screens/Home'
import Register from './screens/Register'
import Login from './screens/Login'
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './components/ContextReducer'
import Orders from './screens/Orders'


function App() {

  return (
    <CartProvider> 
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/myorder" element={<Orders />}></Route>

      </Routes>
    </BrowserRouter>
    </CartProvider>
    
  );
}

export default App

import { useState } from 'react'
import './App.css'
import Menu from './screens/Menu'
import Register from './screens/Register'
import Login from './screens/Login'
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './components/ContextReducer'
import Orders from './screens/Orders'
import AboutUs from './screens/AboutUs'
import DashBoard from './screens/DashBoard'


function App() {

  return (
    <CartProvider> 
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DashBoard />}></Route>
        <Route exact path="/menu" element={<Menu />}></Route>
        <Route exact path="/aboutus" element={<AboutUs />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/myorder" element={<Orders />}></Route>

      </Routes>
    </BrowserRouter>
    </CartProvider>
    
  );
}

export default App

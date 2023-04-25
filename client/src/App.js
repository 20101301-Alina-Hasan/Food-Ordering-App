import React, { useState } from "react";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./view/components/navbar";
import Adminbar from "./view/admin/components/navbar";
import Register from "./view/register";
import Login from "./view/login";
import Home from "./view/home";
import Cart from "./view/cart";
import Checkout from "./view/checkout";
import BkashPayment from "./view/bkash";
import Add from "./view/admin/add";
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      {!isAdmin && <Navbar />}
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/bkash" exact element={<BkashPayment />} />
        </Routes>
        {isAdmin && <Adminbar />}
        <Routes>
          <Route path="/add" exact element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

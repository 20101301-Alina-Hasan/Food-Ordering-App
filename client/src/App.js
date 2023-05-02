import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./view/components/navbar";
import Register from "./view/register";
import Login from "./view/login";
import Home from "./view/home";
import Cart from "./view/cart";
import Checkout from "./view/checkout";
import BkashPayment from "./view/bkash";
import Add from "./view/admin/add";
import Delete from "./view/admin/delete";
//import Edit from "./view/admin/edit";
import Update from "./view/admin/update";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{textAlign: "center"}}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/bkash" exact element={<BkashPayment />} />
          <Route path="/add" exact element={<Add />} />
          <Route path="/delete" exact element={<Delete />} />
          <Route path="/update/:id" exact element={<Update />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//<Route path="/edit/:id" exact element={<Edit />}/>
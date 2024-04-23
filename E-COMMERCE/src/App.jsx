
// App.js

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./page/home/Home";
import AllProduct from './page/allproduct/AllProduct';
import Order from './page/order/Order';
import Cart from './page/cart/Cart';
import WishList from "./page/wishList/WishList";
import Dashboard from './page/admin/dashboard/Dashboard';
import NoPage from './page/nopage/NoPage';
import Layout from "./components/layout/Layout";
import Login from "./page/registration/Login"
import Signup from "./page/registration/Signup"
import MyState from "./context/data/MyState";
import ProductInfo from "./page/productInfo/ProductInfo";
import AddProduct from "./page/admin/dashboard/page/AddProduct"
import UpdateProduct from "./page/admin/dashboard/page/UpdateProduct"
import CategoryPage from "./page/categoryPage/CategoryPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/allproducts" element={<Layout><AllProduct /></Layout>} />
        <Route path="/order" element={<ProtectedRoute><Layout><Order/></Layout></ProtectedRoute>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/wishlist" element={<Layout><WishList /></Layout>} />
        <Route path="/dashboard" element={<ProtectedRouteForAdmin><Layout><Dashboard /></Layout></ProtectedRouteForAdmin>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/productinfo/:id" element={<Layout><ProductInfo/></Layout>} />
        <Route path="/recommendedProductInfo/:id" element={<Layout><ProductInfo/></Layout>} />
        <Route path="/productinfo/:id/size/:size" element={<Layout><ProductInfo/></Layout>} />
        <Route path="/addproduct" element={<ProtectedRouteForAdmin><Layout><AddProduct/></Layout></ProtectedRouteForAdmin>} />
         <Route path="/updateproduct" element={<ProtectedRouteForAdmin><Layout><UpdateProduct/></Layout></ProtectedRouteForAdmin>} />
         <Route path="/category/:category" element={<Layout><CategoryPage/></Layout>} />
        <Route path="/*" element={<Layout><NoPage /></Layout>} />

      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
  );
}

export default App;

//user protected route

export const ProtectedRoute = ({children})=>{
  const user = localStorage.getItem("user");
  if(user){
    return children
  }else{
    return <Navigate to={"/login"}/>
  }
} 

//admin protected route

export const ProtectedRouteForAdmin = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem("user"));
  if(admin?.user?.email === "admin@gmail.com"){
      return children
  }else{
    return <Navigate to={"/login"}/>
  }
}


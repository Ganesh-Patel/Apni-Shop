import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Pages/Home/Home.jsx'
import Login from './Components/Auth/Login.jsx';
import SignUp from './Components/Auth/Signup.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';
import { UserContext } from './Components/../Contexts/UserContext';
import ProtectedRoute from './Components/Routes/ProtectedRoute.jsx';
import ForgetPassword from './Components/Auth/ForgetPassword.jsx';
import VerifyEmail from './Components/Auth/VerifyEmail.jsx';
import ContatcForm from './Components/Pages/ContactPage/ContactForm.jsx';
import Shop from './Components/Pages/Shop/Shop.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import ManageUsers from './Components/Admin/ManageUsers/ManageUsers.jsx';
import ManageProducts from './Components/Admin/ManageProducts/ManageProducts.jsx';
import AboutUs from './Components/AboutUs/AboutUs.jsx'
import Details from './Components/Pages/ProductDetails/Details.jsx';
import Cart from './Components/Pages/Cart/Cart.jsx';
import WishList from './Components/Pages/WishList/WishList.jsx';
import ManageCoupons from './Components/Admin/ManageCoupons/ManageCoupons.jsx';
import CheckoutPage from './Components/Pages/CheckoutPage/CheckoutPage.jsx';
import OrdersPage from './Components/Pages/Orders/OrdersPage.jsx';
import ChatBots from './Chatbot/ChatBoats.jsx';
import OrderDashboard from './Components/Admin/OrderDashboard/OrderDashboard.jsx';
import SalesDashBoard from './Components/Admin/Sales/SalesDashBoard.jsx';

function App() {
  const { isLoggedIn } = useContext(UserContext);


  const location = useLocation();
  // Pages that should NOT have the Header and Footer
  const noHeaderFooterRoutes = ['/login', '/signup', '/forgotpassword', '/verifyemail', '/VerifyEmail', '/admin-dashboard'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and Footer if the route is not in noHeaderFooterRoutes */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
      <div className="flex-grow">
        <ChatBots className="fixed bottom-0 right-0 z-1000" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/contact" element={<ContatcForm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes - only accessible if logged in */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coupons"
            element={
              <ProtectedRoute>
                <ManageCoupons />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/cart"
            element={
              <ProtectedRoute>
                  <Cart />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminorders"
            element={
              <ProtectedRoute>
                <OrderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <SalesDashBoard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}
export default App;

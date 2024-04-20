import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./page/admin/adminHome"
import LoginForm from "./page/login"
import ForgotPassword from './page/forgotPassword';
import RegisterForm from './page/register';
import ManageAccount from './page/admin/manageAccount';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHome from './page/customer/customerHome';
import ProfileCustomer from './page/customer/profileCustomer';
import AdminMovie from './page/admin/adminMovie';
import AdminShowTime from './page/admin/adminShowTime';
import AdminSchedule from './page/admin/adminSchedule';
import AdminCinema from './page/admin/adminCinema';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="admin/manage_accounts" element={<ManageAccount />} />
          <Route path="/admin/manage_movie" element={<AdminMovie />} />
          <Route path="/admin/manage_time_show" element={<AdminShowTime />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/profile" element={<ProfileCustomer />} />
          <Route path="/admin/schedule" element={<AdminSchedule />} />
          <Route path="/admin/cinema" element={<AdminCinema />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

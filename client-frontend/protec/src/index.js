import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import AboutUs from './pages/AboutUs';
import Machines from './pages/Machines';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShoppingCart from './pages/ShoppingCart';
import Logout from './pages/Logout';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <AboutUs />,
  },
  {
    path: "aboutus",
    element: <AboutUs />,
  },
  {
    path: "machines",
    element: <Machines />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "shoppingcart",
    element: <ShoppingCart />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

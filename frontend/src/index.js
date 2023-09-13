import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Perfil from './pages/Perfil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/search/:title',
        element: <Search />
      },
      {
        path: '/perfil/',
        element: <Perfil />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

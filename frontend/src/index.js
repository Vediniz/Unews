import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Perfil from './pages/Perfil';
import Authentication from './pages/Authentication';
import { UserProvider } from './context/UserContext';

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
  },
  {
    path: '/auth',
    element: <Authentication />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Perfil from './pages/Perfil';
import Authentication from './pages/Authentication';
import News from './pages/News';
import EditNews from './pages/EditNews';
import ForgetPassword from './pages/ForgetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    errorElement: <ErrorPage />,
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
        path: '/news',
        element: <News />
      },
      {
        path: '/news/edit/:id',
        element: <EditNews />
      },
      {
        path: '/auth',
        element: <Authentication />,
      },
      {
        path: '/auth/reset-password',
        element: <ForgetPassword />,
      },
      {
        path: '/perfil',
        element: <Perfil />
      }
    ]
  },
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

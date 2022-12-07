import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import EditPage from '../pages/EditPage';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: '/', element: <HomePage /> },
    { id: 2, link: '/admin', element: <AdminPage /> },
    { id: 3, link: '/products', element: <ProductsPage /> },
    { id: 4, link: '/products/:id', element: <EditPage /> },
    { id: 5, link: '*', element: <h1>NOT FOUND</h1> },
  ];

  return (
    <Routes>
      {PUBLIC_ROUTES.map((route) => (
        <Route key={route.id} path={route.link} element={route.element} />
      ))}
    </Routes>
  );
};

export default MainRoutes;

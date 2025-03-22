import './index.css'
import App from './App.tsx'
import Layout from './ui/Layout.tsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import Product from './page/Product.tsx';
import Category from './page/Category.tsx';
import Cart from './page/Cart.tsx';
import Orders from './page/Orders.tsx';
import Favorite from './page/Favorite.tsx';
import Profile from './page/Profile.tsx';
import Success from './page/Success.tsx';
import Cancel from './page/Cancel.tsx';
import NotFound from './page/NotFound.tsx';

const RouterLayout =()=>{
  return(
    <Layout>
      <Outlet />
    </Layout>
  );
}

const router = createBrowserRouter([{
  path: '/',
  element: <RouterLayout />,
  children: [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/product',
      element: <Product />
    },
    {
      path: '/product/:id',
      element: <Product />
    },
    {
      path: '/category/:id',
      element: <Category />
    },
    {
      path: '/cart',
      element: <Cart />
    },
    {
      path: 'orders',
      element: <Orders />
    },
    {
      path: 'favorite',
      element: <Favorite />
    },
    {
      path: 'profile',
      element:<Profile />
    },
    {
      path: 'success',
      element:<Success />
    },
    {
      path: 'cancel',
      element:<Cancel />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
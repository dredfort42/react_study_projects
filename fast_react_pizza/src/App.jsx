import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Cart from './features/cart/Cart';
import Menu from './features/menu/Menu';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
// import CreateUser from './features/user/CreateUser';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/menu', element: <Menu /> },
    { path: '/cart', element: <Cart /> },
    { path: '/order/new', element: <CreateOrder /> },
    { path: '/order/:orderID', element: <Order /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

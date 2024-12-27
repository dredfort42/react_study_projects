import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GlobalStyles from '../src/styles/GlobalStyles';

import Dashboard from '../src/pages/Dashboard';
import Booking from '../src/pages/Bookings';
import Account from '../src/pages/Account';
import Cabins from '../src/pages/Cabins';
import Login from '../src/pages/Login';
import PageNotFound from '../src/pages/PageNotFound';
import Settings from '../src/pages/Settings';
import Users from '../src/pages/Users';

export default function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Navigate replace to="dashboard" />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="account" element={<Account />} />
                    <Route path="cabins" element={<Cabins />} />
                    <Route path="login" element={<Login />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="users" element={<Users />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyles from '../src/styles/GlobalStyles';

import AppLayout from './ui/AppLayout';
import Dashboard from '../src/pages/Dashboard';
import Bookings from '../src/pages/Bookings';
import Booking from '../src/pages/Booking';
import Account from '../src/pages/Account';
import Cabins from '../src/pages/Cabins';
import Login from '../src/pages/Login';
import PageNotFound from '../src/pages/PageNotFound';
import Settings from '../src/pages/Settings';
import Users from '../src/pages/Users';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 10000, // Data is fresh for 10 seconds
            cacheTime: 60000, // Cache data for 1 minute
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            // refetchInterval: 5000, // Poll every 5 seconds
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route
                            path="bookings/:bookingId"
                            element={<Booking />}
                        />
                        <Route path="account" element={<Account />} />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="users" element={<Users />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>

            <Toaster
                position="bottom-right"
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: '16px',
                        maxWidth: '500px',
                        padding: '16px 24px',
                        backgroundColor: 'var(--color-gray-0)',
                        color: 'var(--color-gray-700)',
                    },
                }}
            />
        </QueryClientProvider>
    );
}

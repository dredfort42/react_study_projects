import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CitiesProvider } from './contexts/CitiesContext';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import AppLayout from './pages/AppLayout';
// import NotFound from './pages/NotFound';
// import Login from './pages/Login';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const NotFound = lazy(() => import('./pages/NotFound'));

// dist/index.html                   0.52 kB │ gzip:   0.33 kB
// dist/assets/index-BvAjQGVA.css   30.47 kB │ gzip:   5.06 kB
// dist/assets/index-fmjiHkrr.js   507.00 kB │ gzip: 147.70 kB

export default function App() {
    return (
        <CitiesProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    index
                                    element={<Navigate replace to="cities" />}
                                />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={<CountryList />}
                                />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </CitiesProvider>
    );
}

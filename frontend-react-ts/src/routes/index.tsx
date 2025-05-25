//import useContext
import { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import view home
import Home from "../views/home/index.tsx";

//import view register
import Register from "../views/auth/register.tsx";

//import view login
import Login from "../views/auth/login.tsx";

import Dashboard from "../views/admin/dashboard/index.tsx";

import UsersIndex from "../views/admin/users/index.tsx";
import UsersCreate from '../views/admin/users/create.tsx';
import UsersEdit from '../views/admin/users/edit.tsx';

// product routes
import BooksIndex from '../views/admin/books/index.tsx';
import BooksCreate from '../views/admin/books/create.tsx';
import BooksEdit from '../views/admin/books/edit.tsx';
export default function AppRoutes() {

    // Menggunakan useContext untuk mendapatkan nilai dari AuthContext
    const auth = useContext(AuthContext);

    // Menggunakan optional chaining untuk menghindari error jika auth tidak ada
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/users/edit/:id" element={
                isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/books" */}
            <Route path="/admin/books" element={
                isAuthenticated ? <BooksIndex /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/books/create" element={
                isAuthenticated ? <BooksCreate /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/books/edit/:id" element={
                isAuthenticated ? <BooksEdit /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
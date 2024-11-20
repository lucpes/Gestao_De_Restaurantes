import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import Stock from "./pages/Stock";
import Employer from "./pages/Employer";
import Config from "./pages/Config";
import SignUp from "./pages/SignUp";
import Output from "./pages/Output";
import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import AddProduct from "./pages/addProduct";
import Report from "./pages/Report"; // Importando o componente Report

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home/" element={<Layout />}>
                    <Route path="stock" element={<Stock />} />
                    <Route path="output" element={<Output />} />
                    <Route path="employer" element={<Employer />} />
                    <Route path="config" element={<Config />} />
                    <Route path="add-restaurant" element={<AddRestaurant />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="report" element={<Report />} /> {/* Nova rota */}
                    <Route path="" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
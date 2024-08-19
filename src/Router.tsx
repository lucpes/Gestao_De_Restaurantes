import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home/" element={<Layout />}>
                    <Route path="stock" element={<>stock</>} />
                    <Route path="employer" element={<>emplo</>} />
                    <Route path="config" element={<>config</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

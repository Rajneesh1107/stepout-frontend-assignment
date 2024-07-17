import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";

import Login from "../pages/Login";
import { PrivateRoute } from "./privateRoute";
import Register from "../pages/SignUp";
import LogOut from "../pages/LogOut";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h3>Page Not Found</h3>} />
    </Routes>
  );
};

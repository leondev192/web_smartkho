// src/routes/AppRoutes.js
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Use `isAuthenticated` change to redirect to the appropriate page
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]); // Triggers on `isAuthenticated` change

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

export default AppRoutes;

// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Layout } from "antd";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Wrap with AuthProvider */}
        <Layout style={{ minHeight: "100vh" }}>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;

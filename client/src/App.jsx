import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain min-h-screen">
      <Toaster />

      <Routes>
        {/* ✅ If logged in, go to Home; otherwise to Login */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
        />

        {/* ✅ If logged in, redirect to Home (not Login again) */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />

        {/* ✅ Protected Profile route */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;

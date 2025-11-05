import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DataDashboard from "./Data_dashboard.jsx";
import LaunchDetail from "./LaunchDetail.jsx";
import Sidebar from "./Sidebar.jsx";

function App() {
  return (
    <div className="app-shell" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<DataDashboard />} />
          <Route path="/launch/:id" element={<LaunchDetail />} />
          {}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./admin.css";

function AdminHome() {
  return (
    <div className="admin-page-container">
      <Header />
      <div className="admin-main-content">
        <h1 className="admin-welcome">Welcome, Admin</h1>
        <p className="admin-intro">
          You have full control over the platform. Use the tools below to manage users, vehicles, and view analytics.
        </p>

        <div className="admin-dashboard-cards">
          <div className="admin-card">
            <h3>👥 User Management</h3>
            <p>View all users (Leasers and Owners), block/unblock, and remove users.</p>
            <button onClick={() => window.location.href = "/admin/users"}>Manage Users</button>
          </div>

          <div className="admin-card">
            <h3>🚗 Vehicle Management</h3>
            <p>Review and oversee all vehicles listed by owners across the platform.</p>
            <button onClick={() => window.location.href = "/admin/vehicles"}>Manage Vehicles</button>
          </div>

          <div className="admin-card">
            <h3>📊 Analytics</h3>
            <p>Analyze booking trends and generate insights.</p>
            <button onClick={() => window.location.href = "/admin/analytics"}>View Analytics</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminHome;

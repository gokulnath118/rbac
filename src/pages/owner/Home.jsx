import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./owner.css";

function OwnerHome() {
  return (
    <div className="owner-page-container">
      <Header />
      <div className="owner-main-content">
        <h1 className="home-owner-welcome">Welcome, Owner</h1>
        <p className="home-owner-intro">
          Manage your vehicles, review booking requests, and update your profile to keep your listings fresh.
        </p>

        <div className="home-owner-dashboard-cards">
          <div className="home-owner-card">
            <h3>🚗 Vehicle Management</h3>
            <p>View, add, or remove vehicles from your listings.</p>
            <button onClick={() => window.location.href = "/owner/manage-vehicles"}>Manage Vehicles</button>
          </div>

          <div className="home-owner-card">
            <h3>📅 Booking Management</h3>
            <p>Approve or reject booking requests from leasers.</p>
            <button onClick={() => window.location.href = "/owner/manage-bookings"}>Manage Bookings</button>
          </div>

          <div className="home-owner-card">
            <h3>📂 My Profile</h3>
            <p>Update your profile information, including your vehicle listings.</p>
            <button onClick={() => window.location.href = "/owner/profile"}>Edit Profile</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OwnerHome;
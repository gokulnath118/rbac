import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function LeaserHome() {
  return (
    <div className="leaser-page-container">
      <Header />
      <div className="leaser-main-content">
        <h1 className="leaser-welcome">Welcome, Leaser</h1>
        <p className="leaser-intro">
          Find the best vehicles to rent. Manage your bookings and explore all the available listings.
        </p>

        <div className="leaser-dashboard-cards">
          <div className="leaser-card">
            <h3>🔍 Search Vehicles</h3>
            <p>Browse available vehicles and filter by type, location, and date.</p>
            <button onClick={() => window.location.href = "/leaser/search"}>Search Vehicles</button>
          </div>

          <div className="leaser-card">
            <h3>📅 Manage Bookings</h3>
            <p>Review and cancel your upcoming or pending bookings.</p>
            <button onClick={() => window.location.href = "/leaser/manage-bookings"}>Manage Bookings</button>
          </div>

          <div className="leaser-card">
            <h3>📂 My Profile</h3>
            <p>View and edit your profile details.</p>
            <button onClick={() => window.location.href = "/leaser/profile"}>Edit Profile</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LeaserHome;

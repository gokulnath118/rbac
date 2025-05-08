// analytics.jsx
import React, { useState, useEffect } from "react";
import "./admin.css";
import Header from "./Header";
import Footer from "./Footer";

function Analytics() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.status === statusFilter));
    }
  }, [statusFilter, bookings]);

  return (
    <div className="admin-page-container">
      <Header />
      <div className="admin-main-content">
        <h2>Analytics</h2>
        <p>View the platform analytics, bookings, and usage trends.</p>

        <div className="analytics-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            className="status-filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="analytics-booking-list">
          {filteredBookings.length > 0 ? (
            <div className="analytics-booking-cards-container">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="analytics-booking-card">
                  <h4>{booking.vehicleName}</h4>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Leaser:</strong> {booking.leaserName}</p>
                  <p><strong>Owner:</strong> {booking.ownerName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings available for the selected filter.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Analytics;

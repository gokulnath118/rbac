import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import "./owner.css";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleApprove = (bookingId) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: "approved" } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const handleReject = (bookingId) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: "rejected" } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const pending = bookings.filter(b => b.status === "pending");
  const processed = bookings.filter(b => b.status !== "pending");
  const filteredProcessed = processed.filter(b =>
    statusFilter === "all" ? true : b.status === statusFilter
  );

  return (
    <div className="owner-page-container">
      <Header />
      <div className="owner-main-content">
        <h1>Booking Management</h1>

        {/* Pending Bookings Section */}
        <div className="pending-section">
          <h2>Pending Bookings</h2>
          {pending.length > 0 ? (
            <div className="booking-cards-grid">
              {pending.map((b) => (
                <div key={b.id} className="booking-card">
                  <h4>{b.vehicleName}</h4>
                  <p><strong>Status:</strong> {b.status}</p>
                  <p><strong>Leaser:</strong> {b.leaserName}</p>
                  <button onClick={() => handleApprove(b.id)} className="bm-approve-button">
                    Approve
                  </button>
                  <button onClick={() => handleReject(b.id)} className="bm-reject-button">
                    Reject
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending bookings.</p>
          )}
        </div>
      </div>

      {/* Processed Bookings Section - OUTSIDE main content */}
      <div className="processed-section">
        <div className="processed-header">
          <h2>Processed Bookings</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filteredProcessed.length > 0 ? (
          <div className="booking-cards-row">
            {filteredProcessed.map((b) => (
              <div key={b.id} className="booking-card processed">
                <h4>{b.vehicleName}</h4>
                <p><strong>Leaser:</strong> {b.leaserName}</p>
                <p className={b.status === "approved" ? "status-approved" : "status-rejected"}>
                  {b.status.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-processed-text">No processed bookings found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

// managebookings.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./leaser.css";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="leaser-page-container">
      <Header />
      <div className="leaser-main-content">
        <h1>Manage Bookings</h1>
        <div className="leaser-booking-list">
          {bookings.length > 0 ? (
            <div className="leaser-booking-cards-container">
              {bookings.map((booking) => (
                <div key={booking.id} className="leaser-booking-card">
                  <h4>{booking.vehicleName}</h4>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Owner:</strong> {booking.ownerName}</p>
                  {booking.status === "pending" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="cancel-button"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings to manage.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

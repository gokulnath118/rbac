import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./leaser.css";

export default function SearchBookings() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState("car");
  const [date, setDate] = useState("");

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    console.log(storedVehicles); // Debugging step to see the full data in the console
    setVehicles(storedVehicles);
  }, []);

  useEffect(() => {
    const filtered = vehicles.filter(
      (vehicle) => vehicle.type === vehicleType && vehicle.availability === "yes"
    );
    setFilteredVehicles(filtered);
  }, [vehicleType, vehicles]);

  const handleSearch = () => {
    const filtered = vehicles.filter(
      (vehicle) =>
        vehicle.type === vehicleType &&
        vehicle.availability === "yes" &&
        (!date || vehicle.date === date)
    );
    setFilteredVehicles(filtered);
  };

  const handleBooking = (vehicleId) => {
    const newBooking = {
      id: Date.now(),
      vehicleId,
      leaserName: "Leaser Name", // Get from leaser's state or profile
      ownerName: "Owner Name",   // Get from vehicle owner data
      vehicleName: vehicles.find(v => v.id === vehicleId).name,
      status: "pending",
    };

    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === vehicleId ? { ...vehicle, availability: "no" } : vehicle
    );
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));

    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    storedBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(storedBookings));

    setFilteredVehicles(updatedVehicles.filter(
      (vehicle) => vehicle.type === vehicleType && vehicle.availability === "yes"
    ));
  };

  return (
    <div className="leaser-page-container">
      <Header />
      <div className="leaser-main-content">
        <h1>Search and Book Vehicles</h1>

        <div className="search-filters">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="search-select"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="search-date"
          />

          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="vehicle-list">
          <h3>Available Vehicles</h3>
          <div className="leaser-vehicle-card-container">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="vehicle-card">
                  <h3>{vehicle.name}</h3>
                  <p><strong>Type:</strong> {vehicle.type}</p>
                  <p><strong>Rent per Day:</strong> ${vehicle.rentPerDay}</p>
                  <p><strong>Description:</strong> {vehicle.description}</p>
                  <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
                  {/* Ensure that mobileNumber and vehicleNumber exist in vehicle object */}
                  <p><strong>Vehicle Number:</strong> {vehicle.vehicleNo || "Not Provided"}</p>
                  <p><strong>Owner Contact:</strong> {vehicle.mobileNo || "Not Provided"}</p>
                  <p className={`vehicle-status ${vehicle.availability === "yes" ? "available" : "not-available"}`}>
                    {vehicle.availability === "yes" ? "Available" : "Not Available"}
                  </p>
                  <button
                    onClick={() => handleBooking(vehicle.id)}
                    disabled={vehicle.availability === "no"}
                    className="book-button"
                  >
                    Book
                  </button>
                </div>
              ))
            ) : (
              <p>No vehicles available based on your search criteria.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./admin.css";
import Header from "./Header";
import Footer from "./Footer";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    setVehicles(storedVehicles);
  }, []);

  const handleDelete = (vehicleId) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
  };

  return (
    <div className="admin-page-container">
      <Header />
      <div className="admin-main-content">
        <h2>Vehicle Management</h2>
        <p>Here you can manage all vehicles listed by owners.</p>
        <div className="admin-vehicles-card-container">
          {[...vehicles].reverse().map((vehicle) => (
            <div className="admin-vehicle-card" key={vehicle.id}>
              <h3>{vehicle.name}</h3>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Mobile Number:</strong> {vehicle.mobileNo}</p>
              <p><strong>Vehicle Number:</strong> {vehicle.vehicleNo}</p>
              <p><strong>Rent per Day:</strong> ₹{vehicle.rentPerDay}</p>
              <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
              <p><strong>Date Available:</strong> {vehicle.dateAvailable}</p>
              <p><strong>Availability:</strong> 
                <span className={vehicle.availability === "yes" ? "available" : "not-available"}>
                  {vehicle.availability === "yes" ? " Available" : " Not Available"}
                </span>
              </p>
              <p><strong>Description:</strong> {vehicle.description}</p>
              <button
                className="admin-delete-button"
                onClick={() => handleDelete(vehicle.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VehicleManagement;

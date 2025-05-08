import React, { useState, useEffect } from "react";
import "./owner.css";
import Header from './Header';
import Footer from './Footer';

export default function VehicleManagement() {
  const [name, setName] = useState("");
  const [type, setType] = useState("car");
  const [mobileNo, setMobileNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [availability, setAvailability] = useState("yes");
  const [vehicles, setVehicles] = useState([]);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    setVehicles(storedVehicles);
  }, []);

  const handleAddVehicle = () => {
    const newVehicle = {
      id: editMode || Date.now(),
      name,
      type,
      mobileNo,
      vehicleNo,
      rentPerDay,
      description,
      mileage,
      availability,
    };

    let updatedVehicles;
    if (editMode) {
      updatedVehicles = vehicles.map((vehicle) =>
        vehicle.id === editMode ? newVehicle : vehicle
      );
    } else {
      updatedVehicles = [...vehicles, newVehicle];
    }

    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles)); // ✅ Save updated state
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setType("car");
    setMobileNo("");
    setVehicleNo("");
    setRentPerDay("");
    setDescription("");
    setMileage("");
    setAvailability("yes");
    setEditMode(null);
  };

  const handleEdit = (vehicleId) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    setName(vehicle.name);
    setType(vehicle.type);
    setMobileNo(vehicle.mobileNo);
    setVehicleNo(vehicle.vehicleNo);
    setRentPerDay(vehicle.rentPerDay);
    setDescription(vehicle.description);
    setMileage(vehicle.mileage);
    setAvailability(vehicle.availability);
    setEditMode(vehicleId);
  };

  const handleDelete = (vehicleId) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
  };

  return (
    <div className="owner-page-container">
      <Header />
      <div className="owner-main-content">
        <p>List your vehicles and manage their bookings efficiently.</p>
        <form onSubmit={(e) => { e.preventDefault(); handleAddVehicle(); }}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vehicle Name" required />
          
          <select className="owner-vehicle-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>

          <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder="Mobile No." required />
          <input type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="Vehicle No." required />
          <input type="number" value={rentPerDay} onChange={(e) => setRentPerDay(e.target.value)} placeholder="Rent per Day" required />
          
          <textarea
            className="owner-vehicle-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>

          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="Mileage" />

          <select className="owner-vehicle-select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="yes">Available</option>
            <option value="no">Not Available</option>
          </select>

          <button type="submit" className="submit-btn">
            {editMode ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>

        <br /><br />
        <h3>Your Vehicles</h3>
        <div className="vehicles-container">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <h3>{vehicle.name} ({vehicle.type})</h3>
              <p><strong>Mobile No:</strong> {vehicle.mobileNo}</p>
              <p><strong>Vehicle No:</strong> {vehicle.vehicleNo}</p>
              <p><strong>Rent per Day:</strong> ${vehicle.rentPerDay}</p>
              <p><strong>Description:</strong> {vehicle.description}</p>
              <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
              <p className={`vehicle-status ${vehicle.availability === "yes" ? "available" : "not-available"}`}>
                {vehicle.availability === "yes" ? "Available" : "Not Available"}
              </p>
              <button onClick={() => handleEdit(vehicle.id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(vehicle.id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

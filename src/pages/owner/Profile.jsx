import React, { useState, useEffect } from 'react';
import "./owner.css";
import Header from './Header';
import Footer from './Footer';

export default function Profile() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser?.role === "owner") setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  };

  return (
    <div className="owner-page-container">
      <Header />
      <div className="owner-main-content">
        <h1>Owner Profile</h1>
        {editing ? (
          <div>
            <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
            <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            <input type="file" name="photo" onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <img src={user.photo} alt="Profile" width={100} />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Footer />
    </div>
  );
}

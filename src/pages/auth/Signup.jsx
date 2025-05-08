import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Optional: Styling for the Signup page

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("leaser");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);
    if (exists) {
      setError("User already exists. Please log in.");
      return;
    }

    // Validate mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileNo)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    const newUser = { name,email, password, role, gender, mobileNo };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1 className="logo">AutoMates</h1>
        <nav>
          <button className="back-button" onClick={() => navigate("/")}>← Back</button>
        </nav>
      </header>

      <main className="auth-main">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-field"
          required
        />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-field"
            required
          />
          
          <input
            type="text"
            placeholder="Gender (e.g., Male, Female)"
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={e => setMobileNo(e.target.value)}
            className="input-field"
            required
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="role-select"
          >
            <option value="leaser">Leaser</option>
            <option value="owner">Owner</option>
          </select>
          <button type="submit" className="submit-button">Signup</button>
        </form>
        <p className="existing-user">
          Already a user? <span className="login-link" onClick={() => navigate("/login")}>Log in here</span>
        </p>
      </main>

      <footer className="auth-footer">
        &copy; {new Date().getFullYear()} AutoMates. All rights reserved.
      </footer>
    </div>
  );
};

export default Signup;

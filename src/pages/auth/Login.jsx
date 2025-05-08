import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const hardcodedUsers = [
  { email: "owner@gmail.com", password: "owner123", role: "owner" },
  { email: "leaser@gmail.com", password: "leaser123", role: "leaser" },
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...hardcodedUsers, ...localUsers];

    const user = allUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("token", "mock-jwt-token");
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loggedInUser", JSON.stringify(user)); 

      if (user.role === "owner") navigate("/owner/dashboard");
      else if (user.role === "leaser") navigate("/leaser/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <h1 className="logo">AutoMates</h1>
        <button className="back-button" onClick={() => navigate("/")}>← Back</button>
      </header>

      {/* Login Form */}
      <main className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="login-footer">
        &copy; {new Date().getFullYear()} AutoMates. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;

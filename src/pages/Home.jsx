import { Link } from "react-router-dom";
import "./Home.css"; // optional styling

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>AutoMates</h1>
        <nav>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Signup</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <h2>Welcome to AutoMates</h2>
        <p>
          AutoMates is a vehicle leasing platform where Owners can list vehicles,
          Leasers can search and book them, and Admins can oversee the operations.
          Manage bookings, track usage, and streamline your vehicle rental business.
        </p>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        &copy; {new Date().getFullYear()} AutoMates. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

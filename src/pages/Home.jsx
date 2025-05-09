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
    AutoMates is your all-in-one vehicle leasing and rental platform that connects vehicle Owners with potential Leasers, all under the supervision of Admins. Whether you're looking to earn by listing your idle vehicle or find a reliable ride on rent, AutoMates makes it simple and efficient.
  </p>

  <h3>For Owners</h3>
  <p>
    List your vehicles with ease by providing essential details like type, model, rent per day, and availability. Get notified of booking requests, manage approvals or rejections, and monitor usage — all from a user-friendly dashboard.
  </p>

  <h3>For Leasers</h3>
  <p>
    Search and filter available vehicles based on type, availability dates, and rent range. Book the perfect ride in just a few clicks and manage your bookings seamlessly. You can also cancel unapproved bookings and view past rentals in your profile.
  </p>

  <h3>For Admins</h3>
  <p>
    Oversee the entire platform with access to analytics, user management, and booking oversight. Admins can view all user profiles, filter by roles, block or remove users, and ensure a smooth and secure platform experience for everyone.
  </p>

  <h3>Key Features</h3>
  <ul>
    <li>Role-based dashboards for Owner, Leaser, and Admin</li>
    <li>Vehicle listing and booking workflow</li>
    <li>Approval and cancellation management</li>
    <li>Profile editing with photo upload</li>
    <li>Admin-level analytics and user control</li>
    <li>Fully responsive and modern user interface</li>
  </ul>
</main>
      {/* Footer */}
      <footer className="home-footer">
        &copy; {new Date().getFullYear()} AutoMates. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

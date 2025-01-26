import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Users Page</h1>
      <p>Explore users and their associated cities and countries.</p>
      <div className="home-actions">
        <Link to="/users" className="home-link">
          <button className="action-button">View Users</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
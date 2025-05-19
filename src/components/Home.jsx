import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-hero">
      <div className="home-content">
        <h1 className="home-title">Welcome to FakeStore!</h1>
        <p className="home-subtitle">
          Discover, shop, and manage products with a beautiful modern interface.
        </p>
        <Link
          className="home-cta-btn"
          to="/products"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}

export default Home;

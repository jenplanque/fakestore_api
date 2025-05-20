import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './ProductList.css';

function renderStars(rate) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      stars.push(
        <img
          key={i}
          src="/star-full.svg"
          alt="★"
          className="star-icon"
        />
      );
    } else if (rate >= i - 0.5) {
      stars.push(
        <img
          key={i}
          src="/star-half.svg"
          alt="☆"
          className="star-icon"
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src="/star-empty.svg"
          alt="☆"
          className="star-icon"
        />
      );
    }
  }
  return stars;
}

function ProductList() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col
            key={product.id}
            md={4}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="product-card">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="product-card-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-card-title">
                  {product.title}
                </Card.Title>
                <Card.Text className="mb-2">${product.price}</Card.Text>
                <div className="details-rating mb-2">
                  {renderStars(product.rating?.rate)}
                  <span className="details-rating-score ms-2">
                    {product.rating?.rate?.toFixed(1)}
                  </span>
                  <span className="details-rating-count ms-2">
                    ({product.rating?.count})
                  </span>
                </div>
                <Link
                  className="details-btn mt-auto"
                  to={`/products/${product.id}`}
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;

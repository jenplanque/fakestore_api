import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './ProductList.css'; 

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
    <>
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
    </>
  );
}

export default ProductList;

import axios from 'axios';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import './AddProduct.css';

function AddProduct() {
  const [product, setProduct] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://fakestoreapi.com/products',
        formData
      );
      setProduct(response.data);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      setError(`Error submitting form. Please try again: ${error.message}`);
      setSubmitted(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="details-card mx-auto my-5">
        <Card.Body>
          <h2 className="details-title mb-4">Add Product</h2>

          {submitted && product && (
            <Alert
              variant="success"
              dismissible
              onClose={() => {
                setSubmitted(false);
                setProduct(null);
                setFormData({
                  title: '',
                  description: '',
                  category: '',
                  price: '',
                  image: '',
                });
              }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="details-image me-4"
                  style={{ width: 120, height: 120 }}
                />
                <div>
                  <h4
                    className="details-title mb-2"
                    style={{ fontSize: '1.5rem', textAlign: 'left' }}
                  >
                    {product.title}
                  </h4>
                  <div className="mb-1">
                    <strong>Description:</strong> {product.description}
                  </div>
                  <div className="mb-1">
                    <strong>Category:</strong> {product.category}
                  </div>
                  <div className="mb-1">
                    <strong>Price:</strong> ${product.price}
                  </div>
                  <div className="mt-2 text-success fw-bold">
                    Product added successfully!
                  </div>
                </div>
              </div>
            </Alert>
          )}

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Hide form if submitted */}
          {!submitted && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter an image url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="details-actions mt-4">
                <Button
                  className="details-btn me-2"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className="details-btn details-btn-secondary"
                  type="button"
                  onClick={() =>
                    setFormData({
                      title: '',
                      description: '',
                      category: '',
                      price: '',
                      image: '',
                    })
                  }
                >
                  Clear
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddProduct;

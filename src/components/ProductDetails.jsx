import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './ProductDetails.css';
import { useCart } from '../components/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cartMsg, setCartMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setFormData({
          title: response.data.title || '',
          description: response.data.description || '',
          category: response.data.category || '',
          price: response.data.price || '',
          image: response.data.image || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  const deleteProduct = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setDeleted(true);
      })
      .catch(() => {
        setError('Failed to delete product.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://fakestoreapi.com/products/${id}`,
        formData
      );
      setProduct(response.data);
      setSubmitted(true);
      setShowUpdateForm(false);
    } catch (error) {
      setError(`Error updating product. Please try again: ${error.message}`);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setCartMsg('Item added to cart!');
    setTimeout(() => setCartMsg(''), 2000);
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (deleted)
    return (
      <Container>
        <Alert
          variant="success"
          className="mt-5"
        >
          Product has been deleted successfully!
        </Alert>
      </Container>
    );

  // Show confirmation box after update
  if (submitted && product) {
    return (
      <Container>
        <Card className="details-card mx-auto my-5">
          <Card.Img
            className="details-image"
            variant="top"
            src={product.image}
            alt={product.title}
          />
          <Card.Body>
            <Card.Title className="details-title">{product.title}</Card.Title>
            <Card.Text className="details-description">
              {product.description}
            </Card.Text>
            <div className="details-meta">
              <span className="details-category">{product.category}</span>
              <span className="details-price">${product.price}</span>
            </div>
            <Alert
              variant="success"
              className="mt-3"
            >
              Product updated successfully!
            </Alert>
            {cartMsg && (
              <Alert
                variant="success"
                className="mt-3"
                onClose={() => setCartMsg('')}
                dismissible
              >
                {cartMsg}
              </Alert>
            )}
            <div className="details-actions mt-4">
              <Button
                className="details-btn me-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                className="details-btn details-btn-secondary me-2"
                onClick={() => {
                  setShowUpdateForm(true);
                  setSubmitted(false);
                  setFormData({
                    title: product.title || '',
                    description: product.description || '',
                    category: product.category || '',
                    price: product.price || '',
                    image: product.image || '',
                  });
                }}
              >
                Update Product
              </Button>
              <Button
                className="details-btn details-btn-danger"
                onClick={deleteProduct}
              >
                Delete Product
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Show update form if requested
  if (showUpdateForm) {
    return (
      <Container className="mt-5">
        <Card className="details-card mx-auto my-5">
          <Card.Body>
            <h2 className="details-title mb-4">Update Product</h2>
            <Form onSubmit={handleUpdateSubmit}>
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
                  onClick={() => setShowUpdateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Show product card
  return (
    <Container>
      <Card className="details-card mx-auto my-5">
        <Card.Img
          className="details-image"
          variant="top"
          src={product.image}
          alt={product.title}
        />
        <Card.Body>
          <Card.Title className="details-title">{product.title}</Card.Title>
          <Card.Text className="details-description">
            {product.description}
          </Card.Text>
          <div className="details-meta">
            <span className="details-category">{product.category}</span>
            <span className="details-price">${product.price}</span>
          </div>
          {cartMsg && (
            <Alert
              variant="success"
              className="mt-3"
              onClose={() => setCartMsg('')}
              dismissible
            >
              {cartMsg}
            </Alert>
          )}
          <div className="details-actions mt-4">
            <Button
              className="details-btn me-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              className="details-btn details-btn-secondary me-2"
              onClick={() => {
                setShowUpdateForm(true);
                setFormData({
                  title: product.title || '',
                  description: product.description || '',
                  category: product.category || '',
                  price: product.price || '',
                  image: product.image || '',
                });
              }}
            >
              Update Product
            </Button>
            <Button
              className="details-btn details-btn-danger"
              onClick={deleteProduct}
            >
              Delete Product
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './UpdateProduct.css';

function UpdateProduct() {
  const { id } = useParams();
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
      })
      .catch(() => {
        setError('Failed to load product details.');
      });
  }, [id]);

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
      const response = await axios.patch(
        `https://fakestoreapi.com/products/${id}`,
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
      <h2 className="mt-5">Update Product</h2>

      {submitted && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSubmitted(false)}
        >
          {product?.title} updated successfully!
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

      <Form onSubmit={handleSubmit}>
        {/* Title */}
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

        {/* Description */}
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

        {/* Category */}
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

        {/* Price */}
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

        {/* Image URL */}
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

        <Button
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProduct;

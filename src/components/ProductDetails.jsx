import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
// import UpdateProduct from './UpdateProduct';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);

  const deleteProduct = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setDeleted(true);
        console.log('Product ' + id + ' has been deleted.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProduct = () => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, {
        title: product.title + ' (Updated)',
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      })
      .then((response) => {
        setProduct(response.data);
        setUpdated(true);
        setTimeout(() => setUpdated(false), 2000); 
      })
      .catch(() => {
        setError('Failed to update product.');
      });
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (deleted)
    return (
      <Alert variant="success">Product has been deleted successfully!</Alert>
    );

  return (
    <Container>
      {updated && (
        <Alert variant="info">Product has been updated successfully!</Alert>
      )}
      <Card className="product-card">
        <Card.Img
          className="product-image"
          variant="top"
          src={product.image}
          alt={product.title}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
          <Card.Text>{product.category}</Card.Text>
          <Button className="mx-2">Add to Cart</Button>
          <Button
            className="mx-2"
            onClick={updateProduct}
          >
            Update Product
          </Button>
          <Button onClick={deleteProduct}>Delete Product</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;

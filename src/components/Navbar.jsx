import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import { useCart } from './CartContext';

function NavBar() {
  const { cartQuantity } = useCart();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar"
      fixed="top"
    >
      <Navbar.Brand
        href="#home"
        className="ms-3"
      >
        Fakestore API
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="me-3"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto me-3">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown
            title="Products"
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item href="/products">View Products</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/addproduct">Add Product</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            href="/viewcart"
            className="position-relative"
          >
            <img
              src="/cart-icon.svg"
              alt="Cart"
              className="navbar-cart-icon"
            />
            {cartQuantity > 0 && (
              <span className="navbar-cart-badge">{cartQuantity}</span>
            )}{' '}
            View Cart
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;


import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router";

import logo from "../../imgs/logo.png";

export default function MadEatsNavbar(props) {
    return (
    <>
      <Navbar expand="sm" className="navbar shadow-sm" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} alt="logo" style={{ width: "120px" }} fluid />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto gap-4">
              <Nav.Link as={Link} to="/">Discover</Nav.Link>
              <Nav.Link as={Link} to="/save-for-later">Saved ♡</Nav.Link>
              <Nav.Link as={Link} to="/review">Reviewed ✎</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

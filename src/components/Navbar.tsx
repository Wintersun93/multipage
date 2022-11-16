import React from "react";
import { Navbar as NavbarBS, Container, Nav } from "react-bootstrap";
function Navbar() {
  return (
    <NavbarBS
      bg="dark"
      variant="dark"
      className="shadow-lg mb-3 border-bottom-1"
      onToggle={() => true}
      sticky="top"
      expand="lg"
    >
      <Container>
        <NavbarBS.Brand  href="/">
          React
        </NavbarBS.Brand>
        <Nav className="me-auto text-light">
          <Nav.Link  href="/todo">
            Todo-List
          </Nav.Link>
          <Nav.Link href="/Minesweeper">
            Minesweeper
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;

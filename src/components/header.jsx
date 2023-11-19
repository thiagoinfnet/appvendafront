import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import FormSearch from "./formSearch";

export default function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  const isActive = route => location.pathname.startsWith(route);

  return (
    <header>
      <Navbar {...args}>
        <NavbarBrand tag={Link} to="/">AppVenda</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/vendedor/" active={isActive('/vendedor')}>Vendedor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/produto/" active={isActive('/produto')}>Produto</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/lanterna/" active={isActive('/lanterna')}>Lanterna</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/ferramenta/" active={isActive('/ferramenta')}>Ferramenta</NavLink>
            </NavItem>
          </Nav>
          <FormSearch/>
        </Collapse>
      </Navbar>
    </header>
  )
}

import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContex";
import "./header.css"; // Asegúrate de agregar estilos específicos si lo necesitas.

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleNavClick = () => {
    setIsNavbarExpanded(false);
    setActiveDropdown(null);
  };

  const handleToggleClick = () => {
    setIsNavbarExpanded((prev) => !prev);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setIsNavbarExpanded(true);
  };

  const handleMouseEnter = (dropdownName: string) => {
    if (window.innerWidth >= 992) setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 992) setActiveDropdown(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsNavbarExpanded(false);
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    if (isNavbarExpanded) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNavbarExpanded]);

  return (
    <Navbar
      expand="lg"
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme === "dark" ? "dark" : "light"}
      expanded={isNavbarExpanded}
      ref={navRef}
      className="fixed-top"
    >
      <div className="container">
        <Navbar.Brand as={Link} to="/" className="fw-bold" onClick={handleNavClick}>
            DrEnvios Reto
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" onClick={handleToggleClick} />

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleNavClick}>
            Artículos
            </Nav.Link>

          
            
            <Nav.Link as={Link} to="/subida" onClick={handleNavClick}>
            Subida
            </Nav.Link>
          </Nav>

        
          <button className="btn btn-outline-secondary ms-3" onClick={toggleTheme}>
            {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;

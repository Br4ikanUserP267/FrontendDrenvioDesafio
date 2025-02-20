import React from "react";
import { Container } from "react-bootstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/themeContex";

const FooterComponent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer text-center py-4 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Container>
        <p className="mb-1">🚀 Braikan Piña - Estudiante de Ingeniería de Sistemas</p>
        <p className="mb-1"><FaMapMarkerAlt /> Colombia</p>
        <p className="mb-1">
          <FaPhone /> <a href="tel:+573001234567" className={`text-${theme === "dark" ? "light" : "dark"}`}>+57 300 123 4567</a>
        </p>
        <p className="mb-1">
          <FaEnvelope /> <a href="mailto:braikanpisa2604@gmail.com" className={`text-${theme === "dark" ? "light" : "dark"}`}>braikanpisa2604@gmail.com</a>
        </p>
        <div className="social-icons">
          <a href="https://github.com/Br4ikanUserP267" target="_blank" rel="noopener noreferrer" className={`text-${theme === "dark" ? "light" : "dark"} mx-2`}>
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/braikan-pi%C3%B1a-salcedo-456169182/" target="_blank" rel="noopener noreferrer" className={`text-${theme === "dark" ? "light" : "dark"} mx-2`}>
            <FaLinkedin size={22} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;

import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalHelperProps {
  show: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalHelper: React.FC<ModalHelperProps> = ({ show, title = "Confirmación", message, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHelper;

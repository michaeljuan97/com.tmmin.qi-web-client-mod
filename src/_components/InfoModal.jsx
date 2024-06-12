import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function InfoModal({
  handleProceed,
  showModal,
  handleCloseModal,
  confirmation,
}) {
  const onHandleProceed = () => {
    handleProceed();
  };

  const onHandleClose = () => {
    handleCloseModal();
  };

  return (
    <>
      <Modal show={showModal} onHide={onHandleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Proceed with all POS data</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmation}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onHandleProceed}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

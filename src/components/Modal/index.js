import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBtn({ show, handleClose, handleDelete, textHeader, textBody, textFooter }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{textHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{textBody}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="lg" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="danger" size="lg" onClick={handleDelete}>
                    {textFooter}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalBtn;

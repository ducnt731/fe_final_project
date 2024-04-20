import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DeleteCinema = (props) => {

    const { show, handleClose, dataCinemaDelete, handleCinemaDelete } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Show Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataCinemaDelete.name}</b>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleCinemaDelete(dataCinemaDelete)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteCinema
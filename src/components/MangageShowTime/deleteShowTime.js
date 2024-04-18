import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DeleteShowTime = (props) => {

    const { show, handleClose, dataShowTimeDelete, handleShowTimeDelete } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Show Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataShowTimeDelete.name}</b>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleShowTimeDelete(dataShowTimeDelete)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteShowTime
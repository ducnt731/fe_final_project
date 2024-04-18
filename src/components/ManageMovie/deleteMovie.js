import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DeleteMovie = (props) => {

    const { show, handleClose, dataMovieDelete, handleMovieDelete } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataMovieDelete.name}</b>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleMovieDelete(dataMovieDelete)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteMovie
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteFood = (props) => {

    const {show, handleClose, dataDeleteFood, handleDeleteFood} = props

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataDeleteFood.name}</b>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleDeleteFood(dataDeleteFood)}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteFood
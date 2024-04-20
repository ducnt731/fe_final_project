import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ChangePassword = (props) => {

    const { show, handleClose } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <div style={{ backgroundColor: "slategrey" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Chagne Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add'>
                        <div className="mb-3">
                            <label className="form-label">Current password</label>
                            <input type="text" required className="form-control" name='name' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New password</label>
                            <input type="text" required className="form-control" name='name' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm new password</label>
                            <input type="email" required className="form-control" name='email' />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </div>

        </Modal>
    )
}

export default ChangePassword
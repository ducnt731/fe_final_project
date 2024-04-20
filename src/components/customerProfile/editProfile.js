import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const EditProfile = (props) => {

    const { show, handleClose } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <div style={{ backgroundColor: "slategrey" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" required className="form-control" name='name' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" required className="form-control" name='email' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" required className="form-control" name='phone' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of birth</label>
                            <input type="date" required name='dateOfBirth' className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Gender</label>
                            <select className="form-select" required name='gender'>
                                <option >Choose gender</option>
                                <option value={"female"}>Female</option>
                                <option value={"male"}>Male</option>
                                <option value={"other"}>Other</option>
                            </select>
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

export default EditProfile
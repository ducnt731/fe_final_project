import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { changePassword } from '../../service/userService';

const ChangePassword = (props) => {

    const { show, handleClose } = props
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSaveNewPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        try {
            const res = await changePassword(currentPassword, newPassword);
            if (!res.data) {
                toast.success("Password successfully changed!");
                handleClose();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Failed to change password!");
        }
    };

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
                            <input type="password" required className="form-control"
                                value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New password</label>
                            <input type="password" required className="form-control"
                                value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm new password</label>
                            <input type="password" required className="form-control"
                                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewPassword}>
                        Save
                    </Button>
                </Modal.Footer>
            </div>

        </Modal>
    )
}

export default ChangePassword
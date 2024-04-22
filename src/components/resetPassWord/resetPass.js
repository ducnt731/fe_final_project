import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../service/userService';

const ResetPassword = () => {
    const [loadingAPI, setLoadingAPI] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            setToken(token);
        }
    }, [location]);

    const handleSaveNewPassword = async (e) => {
        e.preventDefault();  // Prevent the default form submit action
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        setLoadingAPI(true);
        try {
            const res = await resetPassword(token, newPassword);
            if (res.status === 200) {
                toast.error("Error changing password!");
            } else {
                toast.success("Password changed successfully!");
                navigate("/");
            }
        } catch (error) {
            toast.error("Failed to change password!");
        } finally {
            setLoadingAPI(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="login-form">
                <form onSubmit={handleSaveNewPassword}>
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password" required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password" required
                        />
                    </div>
                    <button type="submit">
                        {loadingAPI && <i className="fa fa-spinner fa-spin"></i>} Save password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

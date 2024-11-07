import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import './Register.css';
import * as authService from '../../services/authService';

const cx = classNames.bind(styles);

const CreateAccount = () => {
    const navigate = useNavigate();
    
    // State lưu trữ giá trị form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Hàm validate form
    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSignUp = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            // Thực hiện xử lý đăng ký tại đây, ví dụ gọi API
            const data= { name, email, password };
            try {
                const result = await authService.signup(data);
                if (result.success === true) {
                    // window.location.reload();
                } else {
                }
            } catch (error) {
                console.error(error);
            }
            navigate('/login');
        }
    };

    return (
        <div className="login-container">
            {/* Circle Design */}
            <div>
                <img
                    src="http://res.cloudinary.com/dlkm9tiem/image/upload/v1729680942/uykbohqa9gx5l4a0bdzy.png"
                    height={'auto'}
                    width={'100%'}
                    alt=""
                />
            </div>

            <div className="signup-header">
                <div>
                    <span>Create Your Account</span>
                    <span>
                        <AiOutlineUser />
                    </span>
                </div>
                <p style={{ fontSize: '13px', fontWeight: '500', marginTop: '5px' }}>
                    Create your account to start your journey
                </p>
            </div>

            <div className="login-brand">
                <h1>
                    Mini<span style={{ marginLeft: '15px' }}>Shop</span>
                </h1>
            </div>

            <form onSubmit={handleSignUp}>
                <div style={{ padding: '0 25px', width: '100vw' }} className="form-container">
                    <div className={cx('flex', 'div-input')}>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Cập nhật giá trị name
                        />
                    </div>
                    <div className={cx('flex', 'div-input')}>
                        <input
                            type="email"
                            className="input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị email
                        />
                    </div>
                    <div className={cx('flex', 'div-input')}>
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị password
                        />
                    </div>
                    <div className={cx('flex', 'div-input')}>
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter your confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Cập nhật giá trị confirm password
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
                    <div className="forgot-password" style={{ marginBottom: '25px' }}>
                        Forget Password ?
                    </div>
                    <button type="submit" className="login-button">
                        Sign Up
                    </button>
                </div>
            </form>

            <div className="register-link">
                <p>
                    Already have account?{' '}
                    <Link to={`/login`} style={{ color: '#fc2b54' }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CreateAccount;

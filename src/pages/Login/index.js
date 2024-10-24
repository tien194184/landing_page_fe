import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import './Login.css';
import * as authService from '../../services/authService';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill in both email and password.');
            return false;
        }
        setError('');
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = { email, password };
            try {
                const result = await authService.login(data);
                console.log(result);
                console.log(result);
                const { token, role, expiration } = result;
                console.log(token, role, expiration)
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('expiration', expiration);
                // if (result.success === true) {
                //     window.location.reload();
                // } else {
                // }
            } catch (error) {
                console.error(error);
            }
            // Thực hiện xử lý đăng nhập tại đây, ví dụ gọi API
            // navigate('/dashboard');
        }
    };

    return (
        <div className="login-container">
            <div>
                <img
                    src="http://res.cloudinary.com/dlkm9tiem/image/upload/v1729680942/uykbohqa9gx5l4a0bdzy.png"
                    height={'auto'}
                    width={'100%'}
                    alt=""
                />
            </div>

            <div className="login-header">
                <div>
                    <span>Login Account</span>
                    <span>
                        <AiOutlineUser />
                    </span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: '500', marginTop: '5px' }}>Welcome back!</p>
            </div>

            <div className="login-brand">
                <h1>
                    Mini<span style={{ marginLeft: '15px' }}>Shop</span>
                </h1>
            </div>

            <form onSubmit={handleLogin}>
                <div style={{ padding: '0 25px', width: '100vw' }} className="form-container">
                    <div className={cx('flex', 'div-phone')} style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị
                        />
                    </div>
                    <div className={cx('flex', 'div-phone')}>
                        <input
                            className="input"
                            type="password" // Đổi thành type "password" cho mật khẩu
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
                    <div className="forgot-password" style={{ marginBottom: '25px' }}>
                        Forget Password ?
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
            </form>

            <div className="register-link">
                <p>
                    Not registered yet?{' '}
                    <Link to={`/signup`} style={{ color: '#fc2b54' }}>
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

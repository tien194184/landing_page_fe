// GetProduct.jsx
import React from 'react';
import { Link } from 'react-scroll';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { IoChevronBackSharp } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { FaCamera } from 'react-icons/fa';
import Image from '../../components/Image';
import { LuStore } from 'react-icons/lu';
import { TbMessageCircle } from 'react-icons/tb';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';
import { LuPlus } from 'react-icons/lu';
import { RiSubtractFill } from 'react-icons/ri';
import { IoTicket } from 'react-icons/io5';
import { FaToggleOn } from 'react-icons/fa';

const cx = classNames.bind(styles);

function AddAddress() {
    return (
        <>
            <header className={cx('nav-payment', 'flex')}>
                <div
                    xs={1}
                    className={cx('icon-header')}
                    style={{ left: '11px', fontSize: '26px', position: 'absolute' }}
                >
                    <span>
                        <IoChevronBackSharp />
                    </span>
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    <div className={cx('title-page')} style={{ textAlign: 'center' }}>
                        Thêm địa chỉ mới
                    </div>
                </div>
            </header>

            <div className={cx('container')}>
                <div>
                    <p>Thông tin liên hệ</p>
                    <input type="number" placeholder="Họ và tên" />
                    <div>VN +84</div>
                    <input type="text" placeholder="Nhập số điện thoại hợp lệ" />
                </div>
                <div>
                    <p>Thông tin địa chỉ</p>
                    <input type="text" placeholder="Việt Nam" />
                    <input type="text" placeholder="Chọn khu vực" />
                    <input type="text" placeholder="Tên đường, Tòa nhà, Số nhà" />
                </div>
                <div>
                    <p>Cài đặt</p>
                    <div className="flex" style={{ justifyContent: 'space-between' }}>
                        <div>Đặt làm mặc định</div>
                        <div>
                            <span>
                                <FaToggleOn />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('container-policy')}>
                <p>
                    Nhấn vào Lưu nghĩa là bạn xác nhận đã đọc<span>Chính sách quyền riêng tư của TikTok.</span>
                </p>
            </div>

            <div className={cx('fixed-bottom', 'footer')}>
                <div className={cx('flex', 'content-center', 'div-btn')}>
                    <button type="button" className={cx('btn-order')}>
                        Lưu
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddAddress;

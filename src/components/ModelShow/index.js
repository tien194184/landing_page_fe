import React from 'react';
import Modal from 'react-modal';
import './SlideModal.css';
import { IoChevronBackSharp } from 'react-icons/io5';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { FaToggleOn } from 'react-icons/fa';

Modal.setAppElement('#root'); // Ensure accessibility

const cx = classNames.bind(styles);

function SlideModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="slide-modal" overlayClassName="slide-overlay">
            <div style={{ backgroundColor: '#f5f5f5', height: '100vh' }}>
                <div className={cx('nav-payment', 'flex')}>
                    <div
                        xs={1}
                        className={cx('icon-header')}
                        style={{ left: '11px', fontSize: '26px', position: 'absolute', zIndex: '50' }}
                        onClick={onClose}
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
                </div>

                <div className={cx('container')}>
                    <div style={{ marginBottom: '20px' }}>
                        <p className={cx('info')}>Thông tin liên hệ</p>
                        <input type="number" placeholder="Họ và tên" />
                        <div className={cx('flex', 'div-phone')}>
                            <p style={{ padding: '14px 15px' }}>VN +84</p>
                            <input type="text" placeholder="Nhập số điện thoại hợp lệ" />
                        </div>
                    </div>
                    <div>
                        <p className={cx('info')}>Thông tin địa chỉ</p>
                        <input type="text" placeholder="Việt Nam" />
                        <input type="text" placeholder="Chọn khu vực" />
                        <input type="text" placeholder="Tên đường, Tòa nhà, Số nhà" />
                    </div>
                    <div>
                        <p className={cx('info')}>Cài đặt</p>
                        <div
                            className={cx('setting', 'flex')}
                            style={{ justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ color: 'black', fontSize: '15px' }}>Đặt làm mặc định</div>
                            <div>
                                <span style={{ fontSize: '45px', color: '#0be09a' }}>
                                    <FaToggleOn />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('fixed-bottom')}>
                    <div className={cx('line')}></div>
                    <div className={cx('footer')}>
                        <p style={{ textAlign: 'center', fontSize: '13px' }}>
                            Nhấn vào Lưu nghĩa là bạn xác nhận đã đọc
                            <span className={cx('bold')}>&nbsp;Chính sách Quyền riêng tư của TikTok.</span>
                        </p>
                        <div className={cx('flex', 'content-center', 'div-btn')}>
                            <button type="button" className={cx('btn-save-address')}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default SlideModal;

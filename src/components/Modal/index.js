import React, { useState } from 'react';
import './modal.scss'; // Giả sử bạn có SCSS cho modal

const ModalComponent = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Thêm địa chỉ giao hàng</h3>
                        <p>
                            Tài khoản của bạn không có địa chỉ giao hàng. Thêm địa chỉ để
                            tiến hành thanh toán.
                        </p>
                        <div className="modal-actions">
                            <button className="modal-later" onClick={handleClose}>
                                Để sau
                            </button>
                            <button className="modal-add">Thêm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalComponent;

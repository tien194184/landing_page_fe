import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

function SuccessPopup() {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <DotLottieReact
                    src="https://lottie.host/563f72de-c208-4656-9ab8-95e296936186/qxrBXxe9aH.json"
                    loop
                    autoplay
                    style={styles.animation}
                />
                <p style={styles.message}>Tạo sản phẩm thành công</p>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },
    popup: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '90%',
        maxWidth: '400px',
    },
    animation: {
        border: 'none',
    },
    message: {
        fontWeight: '600',
        fontSize: '16px',
        margin: '15px 0',
    },
    button: {
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
    },
};

export default SuccessPopup;

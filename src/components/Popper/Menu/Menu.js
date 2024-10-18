import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '../../Popper';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';
import * as authService from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);

    const navigate = useNavigate();

    const current = history[history.length - 1];

    const handleFormSubmitLogout = async (event) => {
        try {
            // await authService.getLogout();
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.title === 'Đăng xuất') {
                            handleFormSubmitLogout();
                        } else if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={() => {
                            setHistory((prev) => prev.slice(0, prev.length - 1));
                        }}
                    />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 6]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;

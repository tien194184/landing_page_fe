// ManageOrder.jsx
import React, { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate, useParams } from 'react-router-dom'; // Renaming Link from react-router-dom
import { PiClipboardTextFill, PiClipboardTextLight, PiEye, PiEyeBold } from 'react-icons/pi';

import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoChevronBackSharp, IoLocationSharp } from 'react-icons/io5';
import { RiHome4Fill, RiHome4Line, RiMenuFill, RiSearchLine } from 'react-icons/ri';
import { TbShare3 } from 'react-icons/tb';
import { FaEllipsis } from 'react-icons/fa6';
import { MdFlashOn } from 'react-icons/md';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { IoMdTrophy } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import CommentItem from '../../components/CommentItem';
import { FaCamera } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../../components/Image';
import { IoTicket } from 'react-icons/io5';
import * as authService from '../../services/authService';
import { Col, Container, Row } from 'react-bootstrap';
import { AiFillAppstore, AiOutlineAppstore } from 'react-icons/ai';
import { formatTime } from '../../utils/countdownHelper';
import { FormControl, MenuItem, Select } from '@mui/material';
import { BsPersonSquare } from 'react-icons/bs';
import './index.css';
import Load from '../../components/Load';

const cx = classNames.bind(styles);

function ManageOrder() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChangeStatusOrder = (orderId, newStatus) => {
        handleSubmitStatusChange(orderId, newStatus);
    };
    // Hàm đổi status thành text
    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Chờ xác nhận';
            case 2:
                return 'Giao hàng';
            case 3:
                return 'Thành công';
            case 4:
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const fetchOrder = async () => {
        try {
            // Make the API call to fetch the product
            const response = await authService.getListOrder();

            setOrders(response.data.orders);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrder();
    }, []);

    const handleSubmitStatusChange = async (orderId, status) => {
        try {
            setLoading(true);
            const result = await authService.updateStatusOrder(orderId, { status });
            if (result.success) {
                setLoading(false);
                setOrders((prevOrders) =>
                    prevOrders.map((order) => (order._id === orderId ? { ...order, status } : order)),
                );
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    return (
        <>
            {orders.length && !loading ? (
                <>
                    <header className={cx('nav', 'conten-center')}>
                        <Container className={'container-header'}>
                            <Row className={('nav-ul', 'flex')}>
                                <Col className={'nav-li'} xs={3}>
                                    <p className={cx('flex', 'content-center', 'icon-header')}>
                                        <RiHome4Line />
                                        {/* <RiHome4Fill /> */}
                                    </p>
                                    <p className={cx('store', 'text-center', 'text-header')}>Trang chủ</p>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <Link to="/user/manage-product">
                                        <p className={cx('flex', 'content-center', 'icon-header')}>
                                            <AiOutlineAppstore />
                                            {/* <AiFillAppstore /> */}
                                        </p>
                                        <p className={cx('chat', 'text-center', 'text-header')}>Sản phẩm</p>
                                    </Link>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <Link to="/user/manage-order">
                                        <p className={cx('flex', 'content-center', 'icon-header', 'header-active')}>
                                            {/* <PiClipboardTextLight /> */}
                                            <PiClipboardTextFill />
                                        </p>
                                        <p className={cx('chat', 'text-center', 'text-header', 'header-active')}>
                                            Đơn hàng
                                        </p>
                                    </Link>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <p className={cx('flex', 'content-center', 'icon-header')}>
                                        <RiMenuFill />
                                    </p>
                                    <p className={cx('chat', 'text-center', 'text-header')}>Menu</p>
                                </Col>
                            </Row>
                        </Container>
                    </header>
                    <div className={cx('line')}></div>
                    <div className={cx('container-order')}>
                        <div
                            className="container-order"
                            style={{
                                padding: '15px 13px',
                            }}
                        >
                            {orders.map((order, index) => (
                                <div className={cx('item-order')} key={index}>
                                    <div className="flex">
                                        <div style={{ marginRight: '10px' }}>
                                            <img className={cx('image-product')} src={order.productId.image1} alt="" />
                                        </div>
                                        <div
                                            className="flex"
                                            style={{
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div>
                                                <p className={cx('name-prod')}>
                                                    {order.productId.productName}{' '}
                                                    <span className={cx('quantity')}>({order.quantity})</span>
                                                </p>
                                                <p className={cx('time-order')}>{formatTime(order.createdAt)}</p>
                                            </div>
                                            <div className="flex">
                                                <div>
                                                    <p
                                                        style={{
                                                            justifyContent: 'right',
                                                            display: 'flex',
                                                            fontSize: '12px',
                                                        }}
                                                    >
                                                        Giảm giá:
                                                    </p>
                                                    <p style={{ justifyContent: 'right', display: 'flex' }}>
                                                        Tổng tiền:
                                                    </p>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p style={{ color: '#fe2c55', fontSize: '12px' }}>
                                                            -<u>đ</u>
                                                            {order.tiktokShopDiscount}
                                                        </p>
                                                        <p className={cx('total-monney')}>
                                                            <u>đ</u>
                                                            {order.tiktokShopDiscount}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <FormControl sx={{ m: 1, maxWidth: 120 }}>
                                            <Select
                                                value={order.status}
                                                onChange={(e) => handleChangeStatusOrder(order._id, e.target.value)}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                style={{ fontSize: '13px' }}
                                            >
                                                {/* <MenuItem value="" style={{ fontSize: '13px' }}>
                                                    <em>{getStatusText(order.status)}</em>
                                                </MenuItem> */}
                                                <MenuItem value={1} style={{ fontSize: '13px' }}>
                                                    Chờ xác nhận
                                                </MenuItem>
                                                <MenuItem value={2} style={{ fontSize: '13px' }}>
                                                    Giao hàng
                                                </MenuItem>
                                                <MenuItem value={3} style={{ fontSize: '13px' }}>
                                                    Thành công
                                                </MenuItem>
                                                <MenuItem value={4} style={{ fontSize: '13px' }}>
                                                    Đã hủy
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <div className={cx('div-info', 'name')}>
                                            <span
                                                className="flex"
                                                style={{
                                                    fontSize: '13px',
                                                    alignItems: 'center',
                                                    marginRight: '4px',
                                                }}
                                            >
                                                <BsPersonSquare />
                                            </span>
                                            <span style={{ marginTop: '1px' }}>{order.name}</span>
                                        </div>
                                        <div className={cx('div-info', 'phone')}>
                                            <span
                                                className="flex"
                                                style={{
                                                    fontSize: '13px',
                                                    alignItems: 'center',
                                                    marginRight: '4px',
                                                }}
                                            >
                                                <FaPhoneAlt />
                                            </span>
                                            <span>{order.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={cx('div-info', 'address')} style={{ fontSize: '12px' }}>
                                            <p className="flex" style={{ fontSize: '13px', alignItems: 'center' }}>
                                                <IoLocationSharp />
                                            </p>
                                            <p style={{ marginTop: '1px' }}>{order.address}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Load />
                </>
            )}
        </>
    );
}

export default ManageOrder;

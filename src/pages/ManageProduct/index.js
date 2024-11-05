import React, { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate, useParams } from 'react-router-dom'; // Renaming Link from react-router-dom
import { PiClipboardTextFill, PiClipboardTextLight, PiEye, PiEyeBold } from 'react-icons/pi';

import classNames from 'classnames/bind';
import styles from './ManageProduct.module.scss';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoChevronBackSharp, IoLocationSharp } from 'react-icons/io5';
import { RiHome4Fill, RiHome4Line, RiMenuFill, RiSearchLine } from 'react-icons/ri';
import { TbShare3 } from 'react-icons/tb';
import { FaEllipsis } from 'react-icons/fa6';
import { MdFlashOn } from 'react-icons/md';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { IoIosAddCircleOutline, IoMdTrophy } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { FaCheckCircle, FaEdit, FaPhoneAlt } from 'react-icons/fa';
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
import { BsArrowUpRightSquare, BsPersonSquare } from 'react-icons/bs';
import './index.css';
import Load from '../../components/Load';

const cx = classNames.bind(styles);

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        try {
            // Make the API call to fetch the product
            const response = await authService.getListProduct();

            setProducts(response.data.products);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            {products.length && !loading ? (
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
                                        <p className={cx('flex', 'content-center', 'icon-header', 'header-active')}>
                                            {/* <AiOutlineAppstore /> */}
                                            <AiFillAppstore />
                                        </p>
                                        <p className={cx('chat', 'text-center', 'text-header', 'header-active')}>
                                            Sản phẩm
                                        </p>
                                    </Link>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <Link to="/user/manage-order">
                                        <p className={cx('flex', 'content-center', 'icon-header')}>
                                            <PiClipboardTextLight />
                                            {/* <PiClipboardTextFill /> */}
                                        </p>
                                        <p className={cx('chat', 'text-center', 'text-header')}>Đơn hàng</p>
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
                    <div className={cx('container-product')}>
                        <div className={cx('btn-add-product')}>
                            <Link to={`/user/product/create`} className={cx('link-add-product')}>
                                <p className="flex" style={{ fontSize: '30px', alignItems: 'center' }}>
                                    <IoIosAddCircleOutline />
                                </p>
                                <p style={{display: 'flex', alignItems:'center', paddingTop: '2px'}}>Add Product</p>
                            </Link>
                        </div>
                        <div
                            style={{
                                padding: '15px 13px',
                            }}
                        >
                            {products.map((product, index) => (
                                <div className={cx('item-product')} key={index}>
                                    <div className="flex">
                                        <div style={{ marginRight: '10px' }}>
                                            <img className={cx('image-product')} src={product.image1} alt="" />
                                        </div>
                                        <div
                                            className="flex"
                                            style={{
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <p>{product.productName}</p>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className={cx('btn-product')}>
                                            <Link
                                                to={`/user/product/edit/${product.slug}`}
                                                className={cx('link-product')}
                                            >
                                                <span
                                                    className="flex"
                                                    style={{ fontSize: '20px', alignItems: 'center' }}
                                                >
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                        </div>
                                        <div className={cx('btn-product')}>
                                            <Link to={`/product/${product.slug}`} className={cx('link-product')}>
                                                <span
                                                    className="flex"
                                                    style={{ fontSize: '17px', alignItems: 'center' }}
                                                >
                                                    <BsArrowUpRightSquare />
                                                </span>
                                            </Link>
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

export default ManageProduct;

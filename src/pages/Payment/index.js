// GetProduct.jsx
import { useEffect, useState } from 'react';
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
import SlideModal from '../../components/ModelShow';
import { LuStore } from 'react-icons/lu';
import { TbMessageCircle } from 'react-icons/tb';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';
import { LuPlus } from 'react-icons/lu';
import { RiSubtractFill } from 'react-icons/ri';
import { IoTicket } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import * as authService from '../../services/authService';

const cx = classNames.bind(styles);

function Payment() {
    const navigate = useNavigate();
    const { slug } = useParams();
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Make the API call to fetch the product
                const response = await authService.getProduct(slug);

                // Update the product state
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const openModal = () => {
        setIsModalOpen(true);
    };
    // Function to toggle modal visibility
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <header className={cx('nav-payment', 'flex')}>
                <div
                    xs={1}
                    className={cx('icon-header')}
                    style={{ left: '11px', fontSize: '26px', position: 'absolute', zIndex: '11' }}
                    onClick={() => navigate(-1)}
                >
                    <span>
                        <IoChevronBackSharp />
                    </span>
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    <div className={cx('title-page')} style={{ textAlign: 'center' }}>
                        Tổng quan đơn hàng
                    </div>

                    <div className="flex" style={{ justifyContent: 'center', color: '#70b496' }}>
                        <span>
                            <IoShieldCheckmarkOutline />
                        </span>
                        <span style={{ fontSize: '11px' }}>Thông tin của bạn sẽ được bảo mật và mã hóa</span>
                    </div>
                </div>
            </header>

            <div className={cx('container-address')} style={{ margin: '27px 18px' }} onClick={openModal}>
                <span className={cx('icon-plus')}>
                    <HiOutlinePlusSm />
                </span>
                <span>Thêm địa chỉ giao hàng</span>
            </div>
            {isModalOpen && <SlideModal isOpen={isModalOpen} onClose={closeModal} />}

            <div className={cx('line')}></div>

            <div className={cx('container-product')}>
                <div className={cx('info-shop', 'flex')}>
                    <div className={cx('flex')}>
                        <Image
                            className={cx('avatar-shop')}
                            src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_12_11_638378641466845781_avatar-anime.jpg"
                            alt=""
                        />
                        <div style={{ marginLeft: '8px' }} className={cx('items-center', 'flex')}>
                            <p className={cx('name')}>Shop gia dụng</p>
                        </div>
                    </div>
                </div>
                <div className={cx('flex')}>
                    <div>
                        <Image
                            className={cx('image-product')}
                            src={product?.image1}
                            alt=""
                        />
                    </div>
                    <div style={{ marginLeft: '15px', width: '100%' }}>
                        <p className={cx('name-product')}>{product?.productName}</p>
                        <p className={cx('type-product')}>{product?.productType}</p>
                        <div className={cx('flex')}>
                            <div className={cx('div-icon-check')}>
                                <span className={cx('icon-check')}>
                                    <IoShieldCheckmarkSharp />
                                </span>
                                <span>Tự tin mua sắm</span>
                            </div>
                            <div className={cx('div-icon-check')}>
                                <span className={cx('icon-check')}>
                                    <FaCheckCircle />
                                </span>
                                <span>Trả hàng miễn phí</span>
                            </div>
                        </div>
                        <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                            <div>
                                <p className={cx('price')}>
                                    {product?.price}<u style={{ fontSize: '18px' }}>đ</u>
                                </p>
                                <p className={cx('price-old')}>
                                    {product?.oldPrice}
                                    <u style={{ fontSize: '13px', textDecorationColor: 'rgba(0, 0, 0, 0.5)' }}>đ</u>
                                </p>
                            </div>
                            <div className={cx('flex')} style={{ height: '25px', marginTop: '10px' }}>
                                <div className={cx('icon-sub-product')}>
                                    <span>
                                        <RiSubtractFill />
                                    </span>
                                </div>
                                <div className={cx('number-product')} style={{ padding: '0px 18px' }}>
                                    <span>0</span>
                                </div>
                                <div className={cx('icon-add-product')}>
                                    <span>
                                        <LuPlus />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={cx('flex')}
                    style={{ justifyContent: 'space-between', color: '#585858', marginTop: '12px' }}
                >
                    <div className="flex" style={{ alignItems: 'center' }}>
                        Tin nhắn
                    </div>
                    <div>
                        <span>Tùy chọn</span>
                        <span style={{ fontSize: '20px' }}>
                            <MdKeyboardArrowRight />
                        </span>
                    </div>
                </div>
            </div>

            <div className={cx('line')}></div>
            <div className={cx('voucher', 'flex')}>
                <div style={{ marginRight: '10px' }}>
                    <span style={{ fontSize: '20px', color: '#fc2b53' }}>
                        <IoTicket />
                    </span>
                </div>
                <div className="flex" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <div className={cx('title')}>Chiếu khấu của TikTok Shop</div>
                        <div className={cx('')}>Voucher và khuyến mãi</div>
                    </div>

                    <div class={cx('items-center')}>
                        <div style={{ justifyContent: 'right', display: 'flex' }}>
                            <span style={{ fontSize: '20px' }}>
                                <MdKeyboardArrowRight />
                            </span>
                        </div>
                        <div>
                            <span>Đã quy đổi 1</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('line')}></div>

            <div className={cx('container-order')}>
                <div className={cx('title')}>Tóm tắt đơn hàng</div>
                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <div>Tổng tiền hàng</div>
                    <div>
                        <p className={cx('price')}>
                            125.000<u style={{ fontSize: '18px' }}>đ</u>
                        </p>
                    </div>
                </div>
                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <div>Tổng tiền phí vận chuyển</div>
                    <div>
                        <p className={cx('price')}>
                            32.700<u style={{ fontSize: '18px' }}>đ</u>
                        </p>
                    </div>
                </div>
                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <div>Giảm giá phí vận chuyển</div>
                    <div>
                        <p className={cx('price')}>
                            32.700<u style={{ fontSize: '18px' }}>đ</u>
                        </p>
                    </div>
                </div>
                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <div>Chiết khấu của TikTok Shop</div>
                    <div>
                        <p className={cx('price')}>
                            12.700<u style={{ fontSize: '18px' }}>đ</u>
                        </p>
                    </div>
                </div>
                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <div>Tổng</div>
                    <div>
                        <p className={cx('price')}>
                            132.700<u style={{ fontSize: '18px' }}>đ</u>
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('line')}></div>

            <div className={cx('container-payment-method')}>
                <div className={cx('title')}>Phương thức thanh toán</div>

                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <p style={{ margin: '5px 0 17px 0' }}>
                        <span
                            style={{
                                backgroundColor: 'rgb(58, 182, 125)',
                                color: '#fff',
                                padding: '4px',
                                borderRadius: '2px',
                                fontSize: '12px',
                                marginRight: '6px',
                            }}
                        >
                            COD
                        </span>
                        <span style={{ color: 'rgb(115, 115, 115)', fontSize: '15px' }}>Thanh toán khi nhận hàng</span>
                    </p>
                    <div>
                        <input type="radio" />
                    </div>
                </div>
            </div>

            <div className={cx('container-policy')}>
                <p>
                    Bằng cách đặt đơn hàng, bạn đồng ý với <span>Điều khoản Sử dụng và Bán hàng của TikTok Shop</span>
                    và xác nhận rằng bạn đã đọc <span>Chính sách quyền riêng tư của TikTok.</span> Thanh toán sẽ được
                    PIPO xử lý riêng theo <span>Chính sách quyền riêng tư của PIPO.</span>
                </p>
            </div>

            <div className={cx('line')}></div>

            <div className={cx('fixed-bottom', 'footer')}>
                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                    <p className={cx('flex', 'content-center', 'icon-footer')}>Tổng</p>
                    <p className={cx('price')}>
                        132.700<u style={{ fontSize: '18px' }}>đ</u>
                    </p>
                </div>
                <div className={cx('flex')} style={{ justifyContent: 'end' }}>
                    <p className={cx('flex', 'content-center', 'icon-footer')}>Bạn đã tiết kiệm được</p>
                    <p className={cx('price')}>
                        132.700<u style={{ fontSize: '18px' }}>đ</u>
                    </p>
                </div>
                <div className={cx('flex', 'content-center', 'div-btn')}>
                    <button type="button" className={cx('btn-order')}>
                        Đặt hàng
                    </button>
                </div>
            </div>
        </>
    );
}

export default Payment;

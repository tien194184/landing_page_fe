// GetProduct.jsx
import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Renaming Link from react-scroll
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'; // Renaming Link from react-router-dom

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { Container, Col, Row } from 'react-bootstrap';
import SwiperComponent from '../../components/Swiper';
import {
    formatNumberPriceInput,
    formatNumberWithSuffix,
    formatNumberWithSuffixB,
    useCountdown,
} from '../../utils/countdownHelper';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoChevronBackSharp } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';
import { TbShare3 } from 'react-icons/tb';
import { FaEllipsis } from 'react-icons/fa6';
import { MdFlashOn } from 'react-icons/md';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { IoMdTrophy } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import CommentItem from '../../components/CommentItem';
import { FaCamera } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../../components/Image';
import { LuStore } from 'react-icons/lu';
import { TbMessageCircle } from 'react-icons/tb';
import { IoTicket } from 'react-icons/io5';
import * as authService from '../../services/authService';

const cx = classNames.bind(styles);

function GetProduct() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buttonState, setButtonState] = useState('Nhận');
    const handleButtonClick = () => {
        if (buttonState === 'Nhận') {
            setButtonState('Sử dụng');
        } else if (buttonState === 'Sử dụng') {
            navigate(`/payment/product/${slug}`);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Make the API call to fetch the product
                const response = await authService.getProduct(slug);

                // Update the product state
                setProduct(response.data.product);
                setComments(response.data.comments);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);
    const { minutes, seconds } = useCountdown(58);
    console.log(product);
    const price = product?.price ? formatNumberPriceInput(String(product?.price)) : null;
    const oldPrice = product?.oldPrice ? formatNumberPriceInput(String(product?.oldPrice)) : null;
    const storeRevenue = product?.storeRevenue ? formatNumberWithSuffix(String(product?.storeRevenue)) : null;
    const reviewCount = product?.reviewCount ? formatNumberWithSuffix(String(product?.reviewCount)) : null;
    const soldAmount = product?.soldAmount ? formatNumberWithSuffixB(String(product?.soldAmount)) : null;
    const discount = product?.discount ? formatNumberWithSuffixB(String(product?.discount)) : null;
    const photoReviewCount = product?.photoReviewCount
        ? formatNumberWithSuffix(String(product?.photoReviewCount))
        : null;
    const reviewCountStore = product?.reviewCountStore
        ? formatNumberWithSuffix(String(product?.reviewCountStore))
        : null;
    const fiveStarCount = product?.fiveStarCount ? formatNumberWithSuffix(String(product?.fiveStarCount)) : null;
    const fourStarCount = product?.fourStarCount ? formatNumberWithSuffix(String(product?.fourStarCount)) : null;
    const threeStarCount = product?.threeStarCount ? formatNumberWithSuffix(String(product?.threeStarCount)) : null;
    const productImages = [
        product?.image1,
        product?.image2,
        product?.image3,
        product?.image4,
        product?.image5,
        product?.image6,
        product?.image7,
        product?.image8,
        product?.image9,
        product?.image10,
    ];

    const slides = productImages.filter((image) => image);

    return (
        <>
            {product ? (
                <>
                    <header className={cx('nav', 'conten-center')}>
                        <div className={cx('flex')} style={{ width: '100%', padding: '10px' }}>
                            <Col
                                xs={1}
                                className={cx('icon-header', 'flex', 'items-center', 'content-center')}
                                style={{ fontSize: '26px', marginRight: '5px' }}
                            >
                                <span>
                                    <IoChevronBackSharp />
                                </span>
                            </Col>
                            <Col xs={7} className={cx('search', 'flex')}>
                                <div className={cx('search-btn')}>
                                    <div>
                                        <span style={{ fontSize: '23px' }}>
                                            <RiSearchLine />
                                        </span>
                                    </div>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <input
                                        type="text"
                                        className={cx('input-search')}
                                        value={product.productName}
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col
                                xs={4}
                                className="flex"
                                style={{ justifyContent: 'space-between', fontSize: '24px', padding: '0 14px' }}
                            >
                                <div className={cx('flex', 'items-center', 'content-center')}>
                                    <span>
                                        <TbShare3 />
                                    </span>
                                </div>
                                <div className={cx('flex', 'items-center', 'content-center')}>
                                    <span>
                                        <MdOutlineShoppingCart />
                                    </span>
                                </div>
                                <div className={cx('flex', 'items-center', 'content-center')}>
                                    <span>
                                        <FaEllipsis />
                                    </span>
                                </div>
                            </Col>
                        </div>
                        <Container className={'nav__container__actions'}>
                            <Row className={('nav-ul', 'flex')}>
                                <Col className={'nav-li'} xs={3}>
                                    <ScrollLink
                                        activeClass="active"
                                        smooth
                                        spy
                                        to="about"
                                        className="flex"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        Tổng quan
                                    </ScrollLink>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <ScrollLink
                                        activeClass="active"
                                        smooth
                                        spy
                                        to="projects"
                                        className="flex"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        Đánh giá
                                    </ScrollLink>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <ScrollLink
                                        activeClass="active"
                                        smooth
                                        spy
                                        to="blog"
                                        className="flex"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        Mô tả
                                    </ScrollLink>
                                </Col>
                                <Col className={'nav-li'} xs={3}>
                                    <ScrollLink
                                        activeClass="active"
                                        smooth
                                        spy
                                        to="contact"
                                        className="flex"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        Đề xuất
                                    </ScrollLink>
                                </Col>
                            </Row>
                        </Container>
                    </header>
                    <div id={'about'}>
                        <SwiperComponent slides={slides} />
                    </div>

                    <div className={cx('flex', 'items-center', 'text-white', 'banner')}>
                        <div class={cx('flex')}>
                            <span className={cx('icon-sale')}>
                                <MdFlashOn />
                            </span>
                            <p className={cx('text')}>Flash Sale</p>
                        </div>
                        <div class="flex">
                            <p className={cx('text-end')}>Kết thúc sau</p>
                            <div class={cx('countdown')}>
                                <span id="hours">18</span>&nbsp;:&nbsp;
                                <span>{minutes < 10 ? '0' + minutes : minutes}</span>&nbsp;:&nbsp;
                                <span>{seconds < 10 ? '0' + seconds : seconds}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={cx('container-prod')}>
                            <div class="flex">
                                <div style={{ fontSize: '21px', color: '#fe2c55' }}>
                                    <IoTicket />
                                </div>
                                <div className={cx('price')}>
                                    <span>
                                        {price}
                                        <u className={cx('icon-price')}>đ</u>
                                    </span>
                                </div>
                                <div className={cx('price-old')}>
                                    <span>{oldPrice}</span>
                                    <u style={{ fontSize: '13px', textDecorationColor: 'rgba(0, 0, 0, 0.5)' }}>đ</u>
                                </div>
                                <div className={cx('percent')}>
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </div>
                            </div>
                            <div className={cx('shopping', 'items-center', 'flex')}>
                                <span className={cx('icon-shopping')}>
                                    <HiMiniShoppingBag />
                                </span>
                                <span className={cx('text-shopping')}>Ưu đãi chớp nhoáng do TikTok Shop cung cấp</span>
                            </div>
                            <div className={cx('flex')}>
                                <span className={cx('name')}>{product.productName}</span>
                                <span style={{ fontSize: '15px' }}>
                                    {/* <FontAwesomeIcon icon="fa-regular fa-bookmark" /> */}
                                </span>
                            </div>
                            <div className={cx('flex', 'quantity')}>
                                <div>
                                    <span className={cx('star')}>
                                        <FaStar />
                                    </span>
                                    <span>
                                        <span style={{ fontWeight: '600' }}> 4.9 /5</span>
                                        <span className={cx('number-star')}> ({reviewCount})</span>
                                    </span>
                                </div>
                                <span style={{ margin: '0 10px', width: '1px', backgroundColor: '#ccc' }}></span>
                                <div>
                                    <span style={{ color: '#737171', fontSize: '13px' }}>Đã bán</span>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}> {soldAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('about-product')}>
                        <span className={cx('icon-trophy')}>
                            <IoMdTrophy />
                        </span>
                        <span className={cx('text-trophy')}>Sản phẩm tốt . </span>
                        <span className={cx('text-top')} style={{ fontWeight: '500', fontSize: '14px' }}>
                            Top sản phẩm bán chạy
                        </span>
                        <span style={{ fontSize: '20px' }}>
                            <MdKeyboardArrowRight />
                        </span>
                    </div>
                    <div className={cx('flex', 'about-policy')}>
                        <div className={cx('flex', 'content-center', 'items-center')}>
                            <span className={cx('icon')}>
                                <MdFactCheck />
                            </span>
                            <span className={cx('text-about')}>Thanh toán bảo mật</span>
                        </div>
                        <div className={cx('flex', 'content-center', 'items-center')}>
                            <span className={cx('icon')}>
                                <FaCheckCircle />
                            </span>
                            <span className={cx('text-about')}>Trả hàng miễn phí trong 15 ngày</span>
                        </div>
                        <span style={{ fontSize: '20px' }}>
                            <MdKeyboardArrowRight />
                        </span>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('voucher')}>
                        <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                            <div className={cx('title')}>Voucher & Khuyến mãi</div>
                            <span className="flex" style={{ fontSize: '20px', alignItems: 'center' }}>
                                <MdKeyboardArrowRight />
                            </span>
                        </div>

                        <div class={cx('flex', 'div-voucher', 'items-center')}>
                            <div>
                                <div>
                                    <span className={cx('bold')} style={{ fontSize: '14px' }}>
                                        Giảm {discount}
                                        <u>đ</u>
                                    </span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Đối với các đơn hàng có giá trị trên 50K</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className={cx('primary', 'small', { 'out-line': buttonState === 'Sử dụng' })}
                                    onClick={handleButtonClick}
                                >
                                    {buttonState}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('line')}></div>

                    <div className={cx('policy')}>
                        <div>
                            <p className={cx('title')}>Hình thức thanh toán</p>
                            <p style={{ margin: '10px 0 17px 0' }}>
                                <span
                                    style={{
                                        backgroundColor: 'rgb(58, 182, 125)',
                                        color: '#fff',
                                        padding: '3px',
                                        borderRadius: '2px',
                                        fontSize: '9px',
                                        marginRight: '4px',
                                    }}
                                >
                                    COD
                                </span>
                                <span style={{ color: 'rgb(115, 115, 115)' }}>Thanh toán bằng tiền mặt (COD)</span>
                            </p>
                            <div className={cx('line-small')} style={{ margin: '5px 0;' }}></div>
                            <div className={cx('flex')} style={{ margin: '12px 0', justifyContent: 'space-between' }}>
                                <div className={cx('title')}>Vận chuyển</div>

                                <div className={cx('flex')} style={{ fontSize: '13px', justifyContent: 'center' }}>
                                    <span
                                        className="flex"
                                        style={{
                                            fontSize: '13px',
                                            textDecoration: 'line-through',
                                            color: '#737171',
                                            alignItems: 'center',
                                        }}
                                    >
                                        30.000
                                        <u style={{ fontSize: '13px', textDecorationColor: 'rgba(0, 0, 0, 0.5)' }}>đ</u>
                                    </span>
                                    <span
                                        className="flex"
                                        style={{ color: '#fe2c55', alignItems: 'center', margin: '0 10px 0 5px' }}
                                    >
                                        Free
                                    </span>
                                    <p style={{ fontSize: '18px' }}>
                                        <MdKeyboardArrowRight />
                                    </p>
                                </div>
                            </div>
                            <div style={{ color: 'rgb(115, 115, 115)', marginBottom: '10px' }}>
                                <span
                                    className={cx('a')}
                                    style={{
                                        color: 'rgb(26, 205, 193)',
                                        border: '1px solid rgb(26, 205, 193)',
                                        padding: '1px 3px',
                                    }}
                                >
                                    Voucher giảm phí vận chuyển
                                </span>
                                <span>
                                    &nbsp;Giảm 30.000<u>đ</u> phí vận chuyển, Không có số tiền chi tiêu tối thiểu
                                </span>
                            </div>
                            <p style={{ color: 'rgb(115, 115, 115)' }}>Từ Hà Nội</p>
                            <p style={{ color: 'rgb(115, 115, 115)' }}>Ngày giao hàng dự kiến: 2-3 ngày</p>
                            <div className={cx('line-small')} style={{ margin: '10px 0' }}></div>
                            <p className={cx('title')} style={{ marginBottom: '6px' }}>
                                Chính sách đổi trả
                            </p>
                            <p style={{ color: 'rgb(115, 115, 115)' }}>Trả hàng trong vòng 7 ngày. Hủy đơn dễ dàng</p>
                        </div>
                    </div>
                    <div className={cx('line')}></div>
                    <div id={'projects'}>
                        <div className={cx('container-evaluate')}>
                            <div>
                                <div>
                                    <div
                                        className={cx('flex')}
                                        style={{ justifyContent: 'space-between', marginBottom: '7px' }}
                                    >
                                        <div className={cx('title')}>Đánh giá của khách hàng ({reviewCount})</div>
                                        <div>
                                            <span style={{ color: '#737373' }}>Xem thêm</span>
                                            <span style={{ fontSize: '20px' }}>
                                                <MdKeyboardArrowRight />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <span style={{ fontSize: '17px', fontWeight: '600' }}>4.9</span>
                                            <span style={{ fontSize: '12px', padding: '0 5px' }}>/5</span>
                                        </div>
                                        <div className="flex">
                                            <span
                                                className={cx('star')}
                                                style={{
                                                    fontSize: '15px',
                                                    marginRight: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <FaStar />
                                            </span>
                                            <span
                                                className={cx('star')}
                                                style={{
                                                    fontSize: '15px',
                                                    marginRight: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <FaStar />
                                            </span>
                                            <span
                                                className={cx('star')}
                                                style={{
                                                    fontSize: '15px',
                                                    marginRight: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <FaStar />
                                            </span>
                                            <span
                                                className={cx('star')}
                                                style={{
                                                    fontSize: '15px',
                                                    marginRight: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <FaStar />
                                            </span>
                                            <span
                                                className={cx('star')}
                                                style={{
                                                    fontSize: '15px',
                                                    marginRight: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <FaStar />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {comments.map((comment, index) => (
                                <CommentItem
                                    key={index} // Use the index as a key, though ideally a unique id should be used if available
                                    avatar={comment.avatar} // Provide a default avatar URL if none
                                    username={comment.username} // Default to 'Anonymous' if no username
                                    type={comment?.productType}
                                    content={comment?.comment}
                                    images={[
                                        comment?.imageRating1,
                                        comment?.imageRating2,
                                        comment?.imageRating3,
                                        comment?.imageRating4,
                                    ].filter(Boolean)}
                                />
                            ))}

                            <div className={cx('line-small')} style={{ marginBottom: '14px' }}></div>
                            <p className={cx('title')}>
                                Đánh giá của khách hàng dành cho cửa hàng ({reviewCountStore})
                            </p>

                            <div style={{ margin: '10px 0' }}>
                                <div className={cx('flex')} style={{ marginBottom: '7px' }}>
                                    <div className={cx('flex', 'content-center', 'div-number-star')}>
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '11px',
                                                marginRight: '3px',
                                            }}
                                        >
                                            <FaCamera />
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', fontSize: '11px' }}>
                                            Có chứa ảnh hoặc video({photoReviewCount})
                                        </span>
                                    </div>
                                    <div className={cx('flex', 'content-center', 'div-number-star')}>
                                        <span style={{ display: 'flex', alignItems: 'center', fontSize: '11px' }}>
                                            5
                                        </span>
                                        <span
                                            className={cx('star')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '10px',
                                                margin: '0 2px',
                                            }}
                                        >
                                            <FaStar />
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', fontSize: '11px' }}>
                                            {' '}
                                            ({fiveStarCount})
                                        </span>
                                    </div>
                                    <div className={cx('flex', 'content-center', 'div-number-star')}>
                                        <span style={{ fontSize: '11px' }}>4</span>
                                        <span
                                            className={cx('star')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '10px',
                                                margin: '0 2px',
                                            }}
                                        >
                                            <FaStar />
                                        </span>
                                        <span style={{ fontSize: '11px' }}> ({fourStarCount})</span>
                                    </div>
                                </div>
                                <div className={cx('flex')}>
                                    <div className={cx('flex', 'content-center', 'div-number-star')}>
                                        <span style={{ fontSize: '11px' }}>3</span>
                                        <span
                                            className={cx('star')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '10px',
                                                margin: '0 2px',
                                            }}
                                        >
                                            <FaStar />
                                        </span>
                                        <span style={{ fontSize: '11px' }}>({threeStarCount})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('line')}></div>

                    <div id={'blog'} style={{ margin: '15px 18px' }}>
                        <div className={cx('info-shop')}>
                            <div className={cx('flex')}>
                                <Image
                                    className={cx('avatar-shop')}
                                    src="https://res.cloudinary.com/dlkm9tiem/image/upload/v1715619497/yj5ya4u0yeh92a3gnzen.png"
                                    alt=""
                                />
                                <div style={{ marginLeft: '15px' }} className={cx('items-center', 'flex')}>
                                    <div>
                                        <p className={cx('name')}>Shop gia dụng</p>
                                        <p>
                                            <span className={cx('star')} style={{ color: '#4ea97e' }}>
                                                <FaStar />
                                            </span>{' '}
                                            <span>4.9</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('flex', 'items-center')}>
                                <button className={cx('btn-info-shop')}>Truy cập</button>
                            </div>
                        </div>
                        <div className={cx('info-total', 'flex')}>
                            <div className={cx('container-item')}>
                                <p className={cx('bold')}>{product.productCount}</p>
                                <p className={cx('info-item')} style={{ paddingRight: '10px', minWidth: '65px' }}>
                                    Sản phẩm
                                </p>
                            </div>
                            <div className={cx('line-item')}></div>
                            <div className={cx('container-item')} style={{ padding: '0 10px' }}>
                                <p className={cx('bold')}>{storeRevenue}</p>
                                <p className={cx('info-item')}>Tổng doanh số</p>
                            </div>
                            <div className={cx('line-item')}></div>
                            <div className={cx('container-item')} style={{ padding: '0 10px', minWidth: '114px' }}>
                                <p className={cx('bold')}>
                                    <span>99%</span>{' '}
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#fe2c55',
                                            background: 'rgba(254, 44, 85, 0.06)',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Cao
                                    </span>
                                </p>
                                <p className={cx('info-item')}>Tỉ lệ trả lời 24 giờ</p>
                            </div>
                            <div className={cx('line-item')}></div>
                            <div className={cx('container-item')} style={{ paddingLeft: '10px' }}>
                                <p className={cx('bold')}>98%</p>
                                <p className={cx('info-item')}>Xuất kho trong 48 giờ</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('line')}></div>

                    <div id={'contact'} style={{ marginTop: '20px' }}>
                        <div className={cx('title')} style={{ fontSize: '15px', margin: '0 18px 7px 18px' }}>
                            Giới thiệu về sản phẩm này
                        </div>
                        <div style={{ margin: '0 18px 18px 18px' }}>
                            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                        </div>
                        <div>
                            {slides.map((slide, index) => (
                                <img className={cx('image-product')} key={index} src={slide} alt="" />
                            ))}
                        </div>
                    </div>

                    <div className={cx('line')}></div>

                    <div className={cx('fixed-bottom', 'footer', 'flex')}>
                        <div>
                            <p className={cx('flex', 'content-center', 'icon-footer')}>
                                <LuStore />
                            </p>
                            <p className={cx('store', 'text-center')}>Cửa hàng</p>
                        </div>
                        <div>
                            <p className={cx('flex', 'content-center', 'icon-footer')}>
                                <TbMessageCircle />
                            </p>
                            <p className={cx('chat', 'text-center')}>Trò chuyện</p>
                        </div>
                        <div className={cx('flex', 'content-center', 'div-btn')}>
                            <button type="button" className={cx('btn-add-card')}>
                                {/* <RouterLink to={`/mua-hang/${slug}`}> */}
                                    <p>Thêm vào</p>
                                    <p>giỏ hàng</p>
                                {/* </RouterLink> */}
                            </button>
                        </div>
                        <div className={cx('flex', 'content-center', 'div-btn')}>
                            <RouterLink to={`/mua-hang/${slug}`}>
                                <button type="button" className={cx('btn-order')}>
                                    Mua với voucher
                                </button>
                            </RouterLink>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div class={cx('container-load')}>
                        <span class={cx('tiktok-loader')}></span>
                    </div>
                </>
            )}
        </>
    );
}

export default GetProduct;

// GetProduct.jsx
import React from 'react';
import { Link } from 'react-scroll';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { Container, Col, Row } from 'react-bootstrap';
import SwiperComponent from '../../components/Swiper';
import { useCountdown } from '../../utils/countdownHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { IoTicket } from "react-icons/io5";


const cx = classNames.bind(styles);

function GetProduct() {
    const slides = [
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
        'https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye-800x534.jpg',
    ];
    const { minutes, seconds } = useCountdown(58);
    const comments = [
        {
            avatar: 'https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437777/wdoecxbaro6aqmxq8llz.jpg',
            username: 'u**7',
            time: '2024-10-10 12:34',
            type: 'Red',
            content: 'Great product!',
            images: [
                'https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437777/wdoecxbaro6aqmxq8llz.jpg',
                'https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437777/wdoecxbaro6aqmxq8llz.jpg',
                'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA',
            ],
        },
        {
            avatar: 'https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437777/wdoecxbaro6aqmxq8llz.jpg',
            username: 'P**g',
            time: '2024-10-09 11:30',
            type: 'Blue',
            content: 'I love it!',
            images: [
                'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA',
            ],
        },
    ];

    return (
        <>
            <header className={cx('nav', 'conten-center')}>
                <div className={cx('flex')} style={{ width: '100%' }}>
                    <Col
                        xs={1}
                        className={cx('icon-header', 'flex', 'items-center', 'content-center')}
                        style={{ marginLeft: '17px', fontSize: '26px', marginRight: '5px' }}
                    >
                        <span>
                            <IoChevronBackSharp />
                        </span>
                    </Col>
                    <Col xs={7} className={cx('search', 'flex')}>
                        <div className={cx('search-btn')}>
                            <div>
                                <span>
                                    <RiSearchLine />
                                </span>
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            <input
                                type="text"
                                className={cx('input-search')}
                                value="Quạt tích điện mini kẹp bàn"
                                disabled
                            />
                        </div>
                    </Col>
                    <Col xs={1} className={cx('icon-header', 'flex', 'items-center', 'content-center')}>
                        <span>
                            <TbShare3 />
                        </span>
                    </Col>
                    <Col xs={1} className={cx('icon-header', 'flex', 'items-center', 'content-center')}>
                        <span>
                            <MdOutlineShoppingCart />
                        </span>
                    </Col>
                    <Col xs={1} className={cx('icon-header', 'flex', 'items-center', 'content-center')}>
                        <span>
                            <FaEllipsis />
                        </span>
                    </Col>
                </div>
                <Container className={'nav__container__actions'}>
                    <Row className={('nav-ul', 'flex')}>
                        <Col className={'nav-li'} xs={3}>
                            <Link activeClass="active" smooth spy to="about">
                                Tổng quan
                            </Link>
                        </Col>
                        <Col className={'nav-li'} xs={3}>
                            <Link activeClass="active" smooth spy to="projects">
                                Đánh giá
                            </Link>
                        </Col>
                        <Col className={'nav-li'} xs={3}>
                            <Link activeClass="active" smooth spy to="blog">
                                Mô tả
                            </Link>
                        </Col>
                        <Col className={'nav-li'} xs={3}>
                            <Link activeClass="active" smooth spy to="contact">
                                Đề xuất
                            </Link>
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
                    <div class="col-12 col-sm-12">
                        <span><IoTicket/></span>
                        <span className={cx('price')}>
                            125.000<u style={{ fontSize: '18px' }}>đ</u>
                        </span>
                        <span className={cx('price-old')}>
                            169.000<u style={{ fontSize: '13px', textDecorationColor: 'rgba(0, 0, 0, 0.5)' }}>đ</u>
                        </span>
                        <span className={cx('percent')}>-30%</span>
                    </div>
                    <div className={cx('shopping', 'items-center', 'flex')}>
                        <span className={cx('icon-shopping')}>
                            <HiMiniShoppingBag />
                        </span>
                        <span className={cx('text-shopping')}>Ưu đãi chớp nhoáng do TikTok Shop cung cấp</span>
                    </div>
                    <div className={cx('flex')}>
                        <span className={cx('name')}>Quạt tích điện mini kẹp bàn (4 màu)</span>
                        <span style={{ fontSize: '15px' }}>
                            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                        </span>
                    </div>
                    <div className={cx('flex', 'quantity')}>
                        <div>
                            <span className={cx('star')}>
                                <FaStar />
                            </span>
                            <span>
                                <span style={{ fontWeight: '600' }}> 4.9 /5</span>
                                <span className={cx('number-star')}> (8.6k)</span>
                            </span>
                        </div>
                        <span style={{ margin: '0 10px', width: '1px', backgroundColor: '#ccc' }}></span>
                        <div>
                            <span style={{ color: '#737171', fontSize: '13px' }}>Đã bán</span>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}> 15.5k</span>
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
                <div className={cx('flex')}>
                    <div className={cx('title')}>Voucher & Khuyến mãi</div>
                    <span style={{ fontSize: '20px' }}>
                        <MdKeyboardArrowRight />
                    </span>
                </div>

                <div class={cx('flex', 'div-voucher', 'items-center')}>
                    <div>
                        <div>
                            <span className={cx('bold')} style={{ fontSize: '14px' }}>
                                Giảm 19.999<u>đ</u>
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '12px' }}>Đối với các đơn hàng có giá trị trên 50K</span>
                        </div>
                    </div>
                    <div>
                        <button className={cx('primary', 'small')}>Nhận</button>
                    </div>
                </div>
            </div>

            <div className={cx('line')}></div>

            <div className={cx('policy')}>
                <div>
                    <p className={cx('title')}>Hình thức thanh toán</p>
                    <p style={{ margin: '5px 0 17px 0' }}>
                        <span
                            style={{
                                backgroundColor: 'rgb(58, 182, 125)',
                                color: '#fff',
                                padding: '3px',
                                borderRadius: '2px',
                                fontSize: '11px',
                                marginRight: '4px',
                            }}
                        >
                            COD
                        </span>
                        <span style={{ color: 'rgb(115, 115, 115)' }}>Thanh toán bằng tiền mặt (COD)</span>
                    </p>
                    <div className={cx('line-small')} style={{ margin: '5px 0;' }}></div>
                    <div className={cx('flex')} style={{ margin: '12px 0' }}>
                        <div className={cx('title')}>Vận chuyển</div>

                        <div className={cx('flex')} style={{ fontSize: '13px' }}>
                            <span
                                style={{
                                    fontSize: '13px',
                                    textDecoration: 'line-through',
                                    color: '#737171',
                                    margin: '0 10px',
                                }}
                            >
                                30.000<u style={{ fontSize: '13px', textDecorationColor: 'rgba(0, 0, 0, 0.5)' }}>đ</u>
                            </span>
                            <span style={{ color: '#fe2c55' }}>Free</span>
                            <span style={{ fontSize: '20px' }}>
                                <MdKeyboardArrowRight />
                            </span>
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
                            <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                                <div className={cx('title')}>Đánh giá của khách hàng (8.6k)</div>
                                <div>
                                    <span style={{ color: '#fe2c55' }}>Xem thêm</span>
                                    <span style={{ fontSize: '20px' }}>
                                        <MdKeyboardArrowRight />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span>4.9</span>
                                <span>/5</span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* {{#each comment}} */}
                    {comments.map((comment, index) => (
                        <CommentItem
                            key={index}
                            username={comment.username}
                            avatar={comment.avatar}
                            type={comment.type}
                            content={comment.content}
                            images={comment.images}
                        />
                    ))}

                    <div className={cx('line-small')} style={{ marginBottom: '14px' }}></div>
                    <p className={cx('title')}>Đánh giá của khách hàng dành cho cửa hàng (32.9k)</p>

                    <div style={{ margin: '10px 0' }}>
                        <div className={cx('flex')} style={{ marginBottom: '7px' }}>
                            <div className={cx('flex', 'content-center', 'div-number-star')}>
                                <span>
                                    <FaCamera />
                                </span>
                                <span>Có chứa ảnh hoặc video (6.9k)</span>
                            </div>
                            <div className={cx('flex', 'content-center', 'div-number-star')}>
                                <span>5</span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span> (31.6k)</span>
                            </div>
                            <div className={cx('flex', 'content-center', 'div-number-star')}>
                                <span>4</span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span> (1.2k)</span>
                            </div>
                        </div>
                        <div className={cx('flex')}>
                            <div className={cx('flex', 'content-center', 'div-number-star')}>
                                <span>3</span>
                                <span className={cx('star')}>
                                    <FaStar />
                                </span>
                                <span>(134)</span>
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
                        <p className={cx('bold')}>28</p>
                        <p className={cx('info-item')} style={{ paddingRight: '10px', minWidth: '65px' }}>
                            Sản phẩm
                        </p>
                    </div>
                    <div className={cx('line-item')}></div>
                    <div className={cx('container-item')} style={{ padding: '0 10px' }}>
                        <p className={cx('bold')}>39k1</p>
                        <p className={cx('info-item')}>Tổng doanh số</p>
                    </div>
                    <div className={cx('line-item')}></div>
                    <div className={cx('container-item')} style={{ padding: '0 10px', minWidth: '114px' }}>
                        <p className={cx('bold')}>
                            <span>96%</span> <span>Cao</span>
                        </p>
                        <p className={cx('info-item')}>Tỉ lệ trả lời 24 giờ</p>
                    </div>
                    <div className={cx('line-item')}></div>
                    <div className={cx('container-item')} style={{ paddingLeft: '10px' }}>
                        <p className={cx('bold')}>96%</p>
                        <p className={cx('info-item')}>Xuất kho trong 48 giờ</p>
                    </div>
                </div>
            </div>

            <div className={cx('line')}></div>

            <div id={'contact'} style={{ marginTop: '20px' }}>
                <div className={cx('title')} style={{ fontSize: '15px', margin: '0 18px' }}>
                    Giới thiệu về sản phẩm này
                </div>
                <div>
                    <div>
                        {/* {{#each productsImage}} */}
                        <img src="{{this}}" alt="" />
                        {/* {{/each}} */}
                    </div>
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
                        <p>Thêm vào</p>
                        <p>giỏ hàng</p>
                    </button>
                </div>
                <div className={cx('flex', 'content-center', 'div-btn')}>
                    <button type="button" className={cx('btn-order')} data-toggle="modal" data-target="#ModalCenter">
                        Mua với voucher
                    </button>
                </div>
            </div>
        </>
    );
}

export default GetProduct;

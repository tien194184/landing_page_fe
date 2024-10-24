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
import Modal from 'react-modal';
import './SlideModal.css';
import { FaToggleOn } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa6';

Modal.setAppElement('#root'); // Ensure accessibility

const cx = classNames.bind(styles);
const schema = yup.object().shape({
    name: yup.string().required('Tên sản phẩm là bắt buộc'),
    phone: yup.number().required('Giá là bắt buộc'),
    province: yup.number().required('Giá cũ là bắt buộc'),
    district: yup.number().required('Voucher giảm giá là bắt buộc'),
    commune: yup.number().required('Số lượng đã bán là bắt buộc'),
    house: yup.number().required('Số lượt đánh giá sản phẩm là bắt buộc'),
});

function Payment() {
    const navigate = useNavigate();
    const { slug } = useParams();
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const shippingCost = 32700;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value.trim());
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await authService.getProduct(slug);

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
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModalAddress = () => {
        setIsModalAddressOpen(true);
    };
    const closeModalAddress = () => {
        setIsModalAddressOpen(false);
    };
    const discount = product?.discount || 0; // Assuming discount is part of product data

    // Calculate the total price based on quantity
    const totalPrice = product?.price * quantity;

    // Calculate the TikTok Shop discount (shipping - voucher discount)
    const tiktokShopDiscount = shippingCost + discount;

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [activeTab, setActiveTab] = useState('city');
    // Fetch the data from the API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
                );
                setCities(response.data); // Load cities data
            } catch (error) {
                console.error('Error fetching address data', error);
            }
        };

        fetchData();
    }, []);

    const handleCityChange = (city) => {
        setSelectedCity(city.Name);
        setDistricts(city.Districts);
        setActiveTab('district');

        setDistricts(city.Districts);
        setSelectedDistrict(''); // Reset district when city changes
        setWards([]); // Clear wards when city changes
    };

    // Handle district selection
    const handleDistrictChange = (district) => {
        setSelectedDistrict(district.Name);
        setWards(district.Wards);
        setSelectedWard(''); // Reset ward when district changes
        setActiveTab('ward');
    };

    // Handle ward selection
    const handleWardChange = (ward) => {
        setSelectedWard(ward.Name);
    };

    const handleFormSubmit = async () => {
        const data = {
            name,
            phone,
            selectedCity,
            selectedDistrict,
            selectedWard,
            quantity,
            discount,
            totalPrice,
            tiktokShopDiscount,
        };
        console.log(data);
        try {
            const result = await authService.postOrder(product.slug, data);
            console.log(result);
            // if (result.success === true) {
            //     window.location.reload();
            // } else {
            // }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit((e) => console.log(e))}>
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
                {isModalOpen && (
                    <>
                        <div>
                            <Modal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                className="slide-modal"
                                overlayClassName="slide-overlay"
                            >
                                <div
                                    className={cx('container-modal-address')}
                                    style={{ backgroundColor: '#f5f5f5', height: '100vh' }}
                                >
                                    <div className={cx('nav-payment', 'flex')}>
                                        <div
                                            xs={1}
                                            className={cx('icon-header')}
                                            style={{
                                                left: '11px',
                                                fontSize: '26px',
                                                position: 'absolute',
                                                zIndex: '50',
                                            }}
                                            onClick={closeModal}
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
                                            <input
                                                type="number"
                                                placeholder="Họ và tên"
                                                {...register('name')}
                                                style={{ border: errors.name ? '1px solid red' : 'none' }}
                                                value={name}
                                                onChange={handleNameChange}
                                            />
                                            <div className={cx('flex', 'div-phone')}>
                                                <p style={{ padding: '14px 15px' }}>VN +84</p>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập số điện thoại hợp lệ"
                                                    {...register('phone')}
                                                    style={{ border: errors.phone ? '1px solid red' : 'none' }}
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className={cx('info')}>Thông tin địa chỉ</p>
                                            <div
                                                style={{
                                                    backgroundColor: '#fff',
                                                    border: 'none',
                                                    borderRadius: '2px',
                                                    padding: '14px 15px',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                {!selectedCity && !selectedDistrict && !selectedWard ? (
                                                    <div className="flex">
                                                        <div
                                                            onClick={openModalAddress}
                                                            style={{
                                                                width: '100%',
                                                                fontSize: '15px',
                                                            }}
                                                        >
                                                            Chọn khu vực
                                                        </div>
                                                        <div>
                                                            <span>
                                                                <FaAngleDown />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <div>{selectedCity}</div>
                                                            <div>{selectedDistrict}</div>
                                                            <div>{selectedWard}</div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            {isModalAddressOpen && (
                                                <Modal
                                                    isOpen={isModalOpen}
                                                    onRequestClose={closeModalAddress}
                                                    className="slide-modal-address"
                                                    overlayClassName="slide-overlay-address"
                                                >
                                                    <div className={cx('container-model-info-address')}>
                                                        <div
                                                            className={cx('flex')}
                                                            style={{ justifyContent: 'center' }}
                                                        >
                                                            <span className={cx('title-address')}>
                                                                {!selectedCity && !selectedDistrict && !selectedWard
                                                                    ? 'Chọn Tỉnh'
                                                                    : ''}
                                                                {selectedCity && !selectedDistrict && !selectedWard
                                                                    ? 'Chọn Huyện'
                                                                    : ''}
                                                                {selectedCity && selectedDistrict && !selectedWard
                                                                    ? 'Chọn Xã'
                                                                    : ''}
                                                            </span>
                                                        </div>

                                                        {/* Tab Navigation */}
                                                        <div className="tabs">
                                                            <div
                                                                className={activeTab === 'city' ? 'active' : ''}
                                                                onClick={() => setActiveTab('city')}
                                                            >
                                                                {selectedCity ? selectedCity : 'Tỉnh'}
                                                            </div>
                                                            <div
                                                                className={activeTab === 'district' ? 'active' : ''}
                                                                onClick={() => setActiveTab('district')}
                                                                disabled={!selectedCity}
                                                            >
                                                                {selectedDistrict ? selectedDistrict : 'Huyện'}
                                                            </div>
                                                            <div
                                                                className={activeTab === 'ward' ? 'active' : ''}
                                                                onClick={() => setActiveTab('ward')}
                                                                disabled={!selectedDistrict}
                                                            >
                                                                {selectedWard ? selectedWard : 'Xã'}
                                                            </div>
                                                        </div>

                                                        <div className="tab-content">
                                                            {/* City Tab */}
                                                            {activeTab === 'city' && (
                                                                <div>
                                                                    {cities.map((city) => (
                                                                        <div
                                                                            key={city.Id}
                                                                            className="location-item"
                                                                            onClick={() => handleCityChange(city)}
                                                                        >
                                                                            {city.Name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* District Tab */}
                                                            {activeTab === 'district' && (
                                                                <div>
                                                                    {districts.map((district) => (
                                                                        <div
                                                                            key={district.Id}
                                                                            className="location-item"
                                                                            onClick={() =>
                                                                                handleDistrictChange(district)
                                                                            }
                                                                        >
                                                                            {district.Name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Ward Tab */}
                                                            {activeTab === 'ward' && (
                                                                <div>
                                                                    {wards.map((ward) => (
                                                                        <div
                                                                            key={ward.Id}
                                                                            className="location-item"
                                                                            onClick={() => handleWardChange(ward)}
                                                                        >
                                                                            {ward.Name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* <div>
                                                            <label htmlFor="city">Tỉnh/Thành phố</label>
                                                            <select
                                                                id="city"
                                                                value={selectedCity}
                                                                onChange={handleCityChange}
                                                            >
                                                                <option value="">Chọn tỉnh/thành phố</option>
                                                                {cities.map((city) => (
                                                                    <option key={city.Id} value={city.Name}>
                                                                        {city.Name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="district">Quận/Huyện</label>
                                                            <select
                                                                id="district"
                                                                value={selectedDistrict}
                                                                onChange={handleDistrictChange}
                                                                disabled={!selectedCity}
                                                            >
                                                                <option value="">Chọn quận/huyện</option>
                                                                {districts.map((district) => (
                                                                    <option key={district.Id} value={district.Name}>
                                                                        {district.Name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="ward">Xã/Phường</label>
                                                            <select
                                                                id="ward"
                                                                value={selectedWard}
                                                                onChange={handleWardChange}
                                                                disabled={!selectedDistrict}
                                                            >
                                                                <option value="">Chọn xã/phường</option>
                                                                {wards.map((ward) => (
                                                                    <option key={ward.Id} value={ward.Name}>
                                                                        {ward.Name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>  */}
                                                    </div>
                                                </Modal>
                                            )}
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

                                    <div className={cx('fixed-bottom')} style={{ zIndex: '30' }}>
                                        <div className={cx('line')}></div>
                                        <div className={cx('footer')}>
                                            <p style={{ textAlign: 'center', fontSize: '13px' }}>
                                                Nhấn vào Lưu nghĩa là bạn xác nhận đã đọc
                                                <span className={cx('bold')}>
                                                    &nbsp;Chính sách Quyền riêng tư của TikTok.
                                                </span>
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
                        </div>
                    </>
                )}
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
                            <Image className={cx('image-product')} src={product?.image1} alt="" />
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
                                        {product?.price}
                                        <u style={{ fontSize: '18px' }}>đ</u>
                                    </p>
                                    <p className={cx('price-old')}>
                                        {product?.oldPrice}
                                        <u style={{ fontSize: '13px', textDecorationColor: 'rgba(0, 0, 0, 0.5)' }}>đ</u>
                                    </p>
                                </div>
                                <div className={cx('flex')} style={{ height: '25px', marginTop: '10px' }}>
                                    <div className={cx('icon-sub-product')} onClick={handleDecrement}>
                                        <span>
                                            <RiSubtractFill />
                                        </span>
                                    </div>
                                    <div className={cx('number-product')} style={{ padding: '0px 18px' }}>
                                        <span>{quantity}</span>
                                    </div>
                                    <div className={cx('icon-add-product')} onClick={handleIncrement}>
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
                                {totalPrice.toLocaleString()}
                                <u style={{ fontSize: '18px' }}>đ</u>
                            </p>
                        </div>
                    </div>
                    <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                        <div>Chiết khấu của TikTok Shop</div>
                        <div>
                            <p className={cx('price')}>
                                - {tiktokShopDiscount.toLocaleString()}
                                <u style={{ fontSize: '18px' }}>đ</u>
                            </p>
                        </div>
                    </div>
                    <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                        <div>Tổng</div>
                        <div>
                            <p className={cx('price')}>
                                {(totalPrice - tiktokShopDiscount).toLocaleString()}
                                <u style={{ fontSize: '18px' }}>đ</u>
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
                            <span style={{ color: 'rgb(115, 115, 115)', fontSize: '15px' }}>
                                Thanh toán khi nhận hàng
                            </span>
                        </p>
                        <div>
                            <input type="radio" />
                        </div>
                    </div>
                </div>

                <div className={cx('container-policy')}>
                    <p>
                        Bằng cách đặt đơn hàng, bạn đồng ý với{' '}
                        <span>Điều khoản Sử dụng và Bán hàng của TikTok Shop</span>
                        và xác nhận rằng bạn đã đọc <span>Chính sách quyền riêng tư của TikTok.</span> Thanh toán sẽ
                        được PIPO xử lý riêng theo <span>Chính sách quyền riêng tư của PIPO.</span>
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
                        <button type="button" className={cx('btn-order')} onClick={handleFormSubmit}>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Payment;

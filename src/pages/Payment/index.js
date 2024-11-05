// GetProduct.jsx
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { IoLocationOutline, IoLocationSharp, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { IoChevronBackSharp } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePlusSm } from 'react-icons/hi';
import Image from '../../components/Image';
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
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa6';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { BsExclamationTriangle } from 'react-icons/bs';
import Load from '../../components/Load';
Modal.setAppElement('#root');

const cx = classNames.bind(styles);

function Payment() {
    const navigate = useNavigate();
    const { slug } = useParams();
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
    const [isModalSetAddressOpen, setIsModalSetAddressOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const shippingCost = 32700;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [house, setHouse] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmidAddress, setIsSubmidAddress] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value.trim());
    };
    const handleHouseChange = (event) => {
        setHouse(event.target.value);
    };

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

    const openModalSetAddress = () => {
        setIsModalSetAddressOpen(true);
    };

    // Function to close the modal
    const closeModalSetAddress = () => {
        setIsModalSetAddressOpen(false);
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

    const handleFormSubmit = async (event) => {
        if (!name || !validatePhone(phone) || !house || !selectedCity || !selectedDistrict || !selectedWard) {
            setIsModalSetAddressOpen(true);
            return;
        }
        event.preventDefault();
        const data = {
            name,
            phone,
            house,
            selectedCity,
            selectedDistrict,
            selectedWard,
            quantity,
            discount,
            totalPrice,
            tiktokShopDiscount,
            sellerId: product.userId,
        };
        console.log(data);
        try {
            const result = await authService.postOrder(product.slug, data);
            console.log(result);
            if (result.success === true) {
                setSuccess(true);
            } else {
            }
        } catch (error) {
            console.error(error);
        }
    };
    const validatePhone = (phone) => {
        const phonePattern = /^0\d{9}$/;
        return phonePattern.test(phone);
    };
    return (
        <>
            {!loadingAddress ? (
                <>
                    {success && (
                        <div>
                            <div>
                                <DotLottieReact
                                    src="https://lottie.host/563f72de-c208-4656-9ab8-95e296936186/qxrBXxe9aH.json"
                                    loop
                                    autoplay
                                />
                            </div>
                            <div
                                style={{
                                    fontSize: '17px',
                                    fontWeight: '600',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    marginBottom: '15px',
                                }}
                            >
                                Cảm ơn bạn đã đặt hàng
                            </div>
                            <div
                                style={{
                                    padding: '0 50px',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    textAlign: 'center',
                                }}
                            >
                                Bạn sẽ nhận được điện thoại xác nhận đơn hàng sớm nhất từ chúng tôi
                            </div>
                        </div>
                    )}
                    {!success && (
                        <div>
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

                                    <div
                                        className="flex"
                                        style={{ justifyContent: 'center', color: '#70b496', alignItems: 'center' }}
                                    >
                                        <span style={{ fontSize: '13px', marginRight: '3px' }}>
                                            <IoShieldCheckmarkOutline />
                                        </span>
                                        <span style={{ fontSize: '11px' }}>
                                            Thông tin của bạn sẽ được bảo mật và mã hóa
                                        </span>
                                    </div>
                                </div>
                            </header>

                            {name &&
                            validatePhone(phone) &&
                            house &&
                            selectedCity &&
                            selectedDistrict &&
                            selectedWard ? (
                                <>
                                    <div
                                        className="flex"
                                        onClick={openModal}
                                        style={{
                                            fontSize: '15px',
                                            justifyContent: 'space-between',
                                            padding: '15px 18px',
                                        }}
                                    >
                                        <div className="flex">
                                            <p className="flex" style={{ fontSize: '18px', marginRight: '5px' }}>
                                                <HiOutlineLocationMarker />
                                            </p>
                                            <div>
                                                <p style={{ fontWeight: '600' }}>
                                                    <span>{name}</span> <span>{phone}</span>
                                                </p>
                                                <p style={{ fontSize: '14px' }}>{house}</p>
                                                <p style={{ fontSize: '14px' }}>
                                                    {selectedWard + ', ' + selectedDistrict + ', ' + selectedCity}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '20px' }}>
                                                <MdKeyboardArrowRight />
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={cx('container-address')}
                                        style={{ margin: '27px 18px' }}
                                        onClick={openModal}
                                    >
                                        <span className={cx('icon-plus')}>
                                            <HiOutlinePlusSm />
                                        </span>
                                        <span style={{ marginTop: '3px' }}>Thêm địa chỉ giao hàng</span>
                                    </div>

                                    {isModalSetAddressOpen ? (
                                        <Modal
                                            isOpen={openModalSetAddress}
                                            onRequestClose={closeModalSetAddress}
                                            style={customStyles}
                                            overlayClassName="slide-overlay"
                                        >
                                            <h4 style={{ fontWeight: '600' }}>Thêm địa chỉ giao hàng</h4>
                                            <p>
                                                Tài khoản của bạn không có địa chỉ giao hàng. Thêm địa chỉ để tiến hành
                                                thanh toán.
                                            </p>
                                            <div className={cx('button-container')}>
                                                <button onClick={closeModalSetAddress} className={cx('cancel-button')}>
                                                    Để sau
                                                </button>
                                                <button
                                                    className={cx('add-button')}
                                                    onClick={() => setIsModalOpen(true)}
                                                >
                                                    Thêm
                                                </button>
                                            </div>
                                        </Modal>
                                    ) : (
                                        ''
                                    )}
                                </>
                            )}

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
                                                        <div
                                                            className={cx('title-page')}
                                                            style={{ textAlign: 'center' }}
                                                        >
                                                            Thêm địa chỉ mới
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={cx('container')}>
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <p className={cx('info')}>Thông tin liên hệ</p>
                                                        <input
                                                            type="text"
                                                            placeholder="Họ và tên"
                                                            value={name}
                                                            onChange={handleNameChange}
                                                        />
                                                        <div className={cx('flex', 'div-phone')}>
                                                            <p style={{ padding: '14px 15px' }}>VN +84</p>
                                                            <input
                                                                type="number"
                                                                placeholder="Nhập số điện thoại hợp lệ"
                                                                value={phone}
                                                                onChange={handlePhoneChange}
                                                            />
                                                        </div>
                                                        {isSubmidAddress && !validatePhone(phone) ? (
                                                            <div className="error flex">
                                                                <p style={{ marginRight: '7px', fontSize: '15px' }}>
                                                                    <BsExclamationTriangle />
                                                                </p>
                                                                <p style={{ paddingTop: '3px' }}>
                                                                    Nhập số điện thoại hợp lệ
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={cx('info')}>Thông tin địa chỉ</p>
                                                        <div
                                                            style={{
                                                                backgroundColor: '#fff',
                                                                border: 'none',
                                                                borderRadius: '2px',
                                                                padding: '18px 15px',
                                                                justifyContent: 'space-between',
                                                                marginBottom: '0.5px',
                                                            }}
                                                        >
                                                            {!selectedCity && !selectedDistrict && !selectedWard ? (
                                                                <div className="flex">
                                                                    <div
                                                                        style={{
                                                                            width: '100%',
                                                                            fontSize: '15px',
                                                                        }}
                                                                        onClick={openModalAddress}
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
                                                                    <div
                                                                        className="flex"
                                                                        onClick={openModalAddress}
                                                                        style={{ justifyContent: 'space-between' }}
                                                                    >
                                                                        <div
                                                                            style={{ justifyContent: 'space-between' }}
                                                                        >
                                                                            <div>{selectedCity}</div>
                                                                            <div>{selectedDistrict}</div>
                                                                            <div>{selectedWard}</div>
                                                                        </div>
                                                                        <div>
                                                                            <span>
                                                                                <FaAngleDown />
                                                                            </span>
                                                                        </div>
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
                                                                            {!selectedCity &&
                                                                            !selectedDistrict &&
                                                                            !selectedWard
                                                                                ? 'Chọn Tỉnh'
                                                                                : ''}
                                                                            {selectedCity &&
                                                                            !selectedDistrict &&
                                                                            !selectedWard
                                                                                ? 'Chọn Huyện'
                                                                                : ''}
                                                                            {selectedCity &&
                                                                            selectedDistrict &&
                                                                            !selectedWard
                                                                                ? 'Chọn Xã'
                                                                                : ''}
                                                                        </span>
                                                                    </div>

                                                                    {/* Tab Navigation */}
                                                                    <div className="tabs">
                                                                        <div
                                                                            className={
                                                                                activeTab === 'city' ? 'active' : ''
                                                                            }
                                                                            onClick={() => setActiveTab('city')}
                                                                        >
                                                                            {selectedCity ? selectedCity : 'Tỉnh'}
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                activeTab === 'district' ? 'active' : ''
                                                                            }
                                                                            onClick={() => setActiveTab('district')}
                                                                            disabled={!selectedCity}
                                                                        >
                                                                            {selectedDistrict
                                                                                ? selectedDistrict
                                                                                : 'Huyện'}
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                activeTab === 'ward' ? 'active' : ''
                                                                            }
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
                                                                                        onClick={() =>
                                                                                            handleCityChange(city)
                                                                                        }
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
                                                                                            handleDistrictChange(
                                                                                                district,
                                                                                            )
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
                                                                                        onClick={() =>
                                                                                            handleWardChange(ward)
                                                                                        }
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
                                                        <input
                                                            type="text"
                                                            placeholder="Tên đường, Tòa nhà, Số nhà"
                                                            value={house}
                                                            onChange={handleHouseChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className={cx('info')}>Cài đặt</p>
                                                        <div
                                                            className={cx('setting', 'flex')}
                                                            style={{
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <div style={{ color: 'black', fontSize: '15px' }}>
                                                                Đặt làm mặc định
                                                            </div>
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
                                                            <button
                                                                type="button"
                                                                className={cx('btn-save-address')}
                                                                onClick={() => {
                                                                    setIsSubmidAddress(true);
                                                                    if (validatePhone(phone)) {
                                                                        setIsModalOpen(false);
                                                                        setLoadingAddress(true);
                                                                        closeModal();
                                                                        setTimeout(() => {
                                                                            setLoadingAddress(false);
                                                                        }, 500);
                                                                    }
                                                                }}
                                                                disabled={
                                                                    !name ||
                                                                    !phone ||
                                                                    !house ||
                                                                    !selectedCity ||
                                                                    !selectedDistrict ||
                                                                    !selectedWard
                                                                }
                                                            >
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
                                        <Image className={cx('avatar-shop')} src={product?.imageShop} alt="" />
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
                                                    <u
                                                        style={{
                                                            fontSize: '13px',
                                                            textDecorationColor: 'rgba(0, 0, 0, 0.5)',
                                                        }}
                                                    >
                                                        đ
                                                    </u>
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
                                        <div className={cx('')}>Voucher vận chuyển</div>
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
                                    <div>Vận chuyển</div>
                                    <div>
                                        <p className={cx('price')}>
                                            {totalPrice.toLocaleString()}
                                            <u style={{ fontSize: '18px' }}>đ</u>
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('flex')} style={{ justifyContent: 'space-between' }}>
                                    <div>Chiết khấu phí vận chuyển</div>
                                    <div>
                                        <p className={cx('price')}>
                                            {totalPrice.toLocaleString()}
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
                                        <input type="radio" checked />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('container-policy')}>
                                <p>
                                    Bằng cách đặt đơn hàng, bạn đồng ý với{' '}
                                    <span>Điều khoản Sử dụng và Bán hàng của TikTok Shop</span>
                                    và xác nhận rằng bạn đã đọc <span>Chính sách quyền riêng tư của TikTok.</span> Thanh
                                    toán sẽ được PIPO xử lý riêng theo <span>Chính sách quyền riêng tư của PIPO.</span>
                                </p>
                            </div>

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
                        </div>
                    )}
                </>
            ) : (
                <>
                    <Load />
                </>
            )}
        </>
    );
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        width: '60%',
        maxWidth: '400px',
        borderRadius: '10px',
        textAlign: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

export default Payment;

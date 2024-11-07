// GetProduct.jsx
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { IoLocationOutline, IoLocationSharp, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { IoChevronBackSharp } from 'react-icons/io5';
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
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { FormControlLabel, RadioGroup } from '@mui/material';
Modal.setAppElement('#root');

const cx = classNames.bind(styles);

function BpRadio(props) {
    return <Radio {...props} />;
}

function PaymentSmall() {
    const navigate = useNavigate();
    const { slug } = useParams();
    // State to manage modal visibility
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [house, setHouse] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

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

    const openModalAddress = () => {
        setIsModalAddressOpen(true);
    };
    const closeModalAddress = () => {
        setIsModalAddressOpen(false);
    };

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [activeTab, setActiveTab] = useState('city');
    const [option, setOption] = useState(''); // State to store the selected option

    const handleOptionChange = (event) => {
        setOption(event.target.value); // Update state when the radio option changes
    };

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
            return;
        }
        // event.preventDefault();
        const data = {
            name,
            phone,
            house,
            selectedCity,
            selectedDistrict,
            selectedWard,
            sellerId: product.userId,
            option,
        };
        console.log(option);
        try {
            setLoading(true);
            const result = await authService.postOrder(product.slug, data);
            if (result.success === true) {
                setLoading(false);
                setSuccess(true);
            } else {
                setLoading(true);
            }
        } catch (error) {
            setLoading(true);
            console.error(error);
        }
    };
    const validatePhone = (phone) => {
        const phonePattern = /^0\d{9}$/;
        return phonePattern.test(phone);
    };
    return (
        <>
            {!loading ? (
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
                                        Xác nhận đơn hàng
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

                            <>
                                <div>
                                    <div
                                        className={cx('container-modal-address')}
                                        style={{ backgroundColor: '#f5f5f5', height: '100vh' }}
                                    >
                                        <div className={cx('container')}>
                                            <div style={{ marginBottom: '15px', paddingTop: '10px' }}>
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
                                                {!validatePhone(phone) && isSubmit ? (
                                                    <div className="error flex">
                                                        <p style={{ marginRight: '7px', fontSize: '15px' }}>
                                                            <BsExclamationTriangle />
                                                        </p>
                                                        <p style={{ paddingTop: '3px' }}>Nhập số điện thoại hợp lệ</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
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
                                                                <div style={{ justifyContent: 'space-between' }}>
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
                                                        isOpen={isModalAddressOpen}
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
                                            <div className={cx('option')} style={{ marginBottom: '15px' }}>
                                                <p className={cx('info')}>Chọn mua combo</p>
                                                <div
                                                    style={{
                                                        padding: '15px',
                                                        backgroundColor: '#fff',
                                                        fontSize: '15px !important',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {/* <Radio {...controlProps('a')} />
                                                    <Radio {...controlProps('b')} color="secondary" />
                                                    <Radio {...controlProps('c')} color="success" />
                                                    <Radio {...controlProps('d')} color="default" /> */}
                                                    {/* <Radio
                                                        {...controlProps('e')}
                                                        sx={{
                                                            color: pink[800],
                                                            '&.Mui-checked': {
                                                                color: pink[600],
                                                            },
                                                        }}
                                                    /> */}
                                                    <RadioGroup
                                                        // defaultValue="female"
                                                        aria-labelledby="demo-customized-radios"
                                                        name="option"
                                                        onChange={handleOptionChange}
                                                    >
                                                        {product?.option1 && (
                                                            <FormControlLabel
                                                                value={product?.option1}
                                                                control={<BpRadio color="secondary" />}
                                                                label={product?.option1}
                                                            />
                                                        )}
                                                        {product?.option2 && (
                                                            <FormControlLabel
                                                                value={product?.option2}
                                                                control={<BpRadio color="success" />}
                                                                label={product?.option2}
                                                            />
                                                        )}
                                                        {product?.option3 && (
                                                            <FormControlLabel
                                                                value={product?.option3}
                                                                control={<BpRadio color="secondary" />}
                                                                label={product?.option3}
                                                            />
                                                        )}
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                            <div className={cx('flex', 'content-center', 'div-btn')}>
                                                <button
                                                    type="button"
                                                    className={cx('btn-save-address')}
                                                    onClick={() => {
                                                        setIsSubmit(true);
                                                        handleFormSubmit();
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
                                                    Xác nhận đặt hàng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
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

export default PaymentSmall;

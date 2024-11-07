import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { IoChevronBackSharp } from 'react-icons/io5';
import styles from './CreateProduct.module.scss'; // SCSS file của bạn
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as authService from '../../services/authService';
import Image from '../../components/Image';
import { FaStar, FaUpload } from 'react-icons/fa6';
import { LuImagePlus } from 'react-icons/lu';
import TextField from '@mui/material/TextField';
import { MdModeEditOutline } from 'react-icons/md';
import SuccessPopup from '../../components/SuccessPopup';
import './index.css';
import Load from '../../components/Load';

const cx = classNames.bind(styles);

function CreateProduct() {
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmit1, setIsSubmit1] = useState(false);
    const [isSubmit2, setIsSubmit2] = useState(false);
    const [isSubmit3, setIsSubmit3] = useState(false);
    const [isSubmit4, setIsSubmit4] = useState(false);
    const [isShowStep1, setIsShowStep1] = useState(true);
    const [isShowStep2, setIsShowStep2] = useState(false);
    const [isShowStep3, setIsShowStep3] = useState(false);
    const [isShowStep4, setIsShowStep4] = useState(false);
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [nameShop, setNameShop] = useState('');
    const [price, setPrice] = useState();
    const [oldPrice, setOldPrice] = useState();
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [discount, setDiscount] = useState();
    const [soldAmount, setSoldAmount] = useState();
    const [reviewCount, setReviewCount] = useState();
    const [storeRevenue, setStoreRevenue] = useState();
    const [productCount, setProductCount] = useState();
    const [reviewCountStore, setReviewCountStore] = useState();
    const [photoReviewCount, setPhotoReviewCount] = useState();
    const [fiveStarCount, setFiveStarCount] = useState();
    const [fourStarCount, setFourStarCount] = useState();
    const [threeStarCount, setThreeStarCount] = useState();
    const [productType1, setProductType1] = useState();
    const [comment1, setComment1] = useState();
    const [productType2, setProductType2] = useState();
    const [comment2, setComment2] = useState();
    const [productType3, setProductType3] = useState();
    const [comment3, setComment3] = useState();
    const [productType4, setProductType4] = useState();
    const [comment4, setComment4] = useState();
    const [productType5, setProductType5] = useState();
    const [comment5, setComment5] = useState();
    const [productType6, setProductType6] = useState();
    const [comment6, setComment6] = useState();

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };
    const handleNameShopChange = (event) => {
        setNameShop(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value.trim());
    };
    const handleOldPriceChange = (event) => {
        setOldPrice(event.target.value.trim());
    };
    const handleOption1Change = (event) => {
        setOption1(event.target.value);
    };
    const handleOption2Change = (event) => {
        setOption2(event.target.value);
    };
    const handleOption3Change = (event) => {
        setOption3(event.target.value);
    };
    const handleDiscountChange = (event) => {
        setDiscount(event.target.value.trim());
    };
    const handleSoldAmountChange = (event) => {
        setSoldAmount(event.target.value.trim());
    };
    const handleReviewCountChange = (event) => {
        setReviewCount(event.target.value.trim());
    };
    const handleStoreRevenueChange = (event) => {
        setStoreRevenue(event.target.value.trim());
    };
    const handleProductCountChange = (event) => {
        setProductCount(event.target.value.trim());
    };
    const handleReviewCountStoreChange = (event) => {
        setReviewCountStore(event.target.value.trim());
    };
    const handlePhotoReviewCountChange = (event) => {
        setPhotoReviewCount(event.target.value.trim());
    };
    const handleFiveStarCountChange = (event) => {
        setFiveStarCount(event.target.value.trim());
    };
    const handleFourStarCountChange = (event) => {
        setFourStarCount(event.target.value.trim());
    };
    const handleThreeStarCountChange = (event) => {
        setThreeStarCount(event.target.value.trim());
    };
    const handleProductTypeChange1 = (event) => {
        setProductType1(event.target.value);
    };
    const handleCommentChange1 = (event) => {
        setComment1(event.target.value);
    };
    const handleProductTypeChange2 = (event) => {
        setProductType2(event.target.value);
    };
    const handleCommentChange2 = (event) => {
        setComment2(event.target.value);
    };
    const handleProductTypeChange3 = (event) => {
        setProductType3(event.target.value);
    };
    const handleCommentChange3 = (event) => {
        setComment3(event.target.value);
    };
    const handleProductTypeChange4 = (event) => {
        setProductType4(event.target.value);
    };
    const handleCommentChange4 = (event) => {
        setComment4(event.target.value);
    };
    const handleProductTypeChange5 = (event) => {
        setProductType5(event.target.value);
    };
    const handleCommentChange5 = (event) => {
        setComment5(event.target.value);
    };
    const handleProductTypeChange6 = (event) => {
        setProductType6(event.target.value);
    };
    const handleCommentChange6 = (event) => {
        setComment6(event.target.value);
    };

    const [imageProducts, setImageProducts] = useState([]);
    const [imageShop, setImageShop] = useState('');
    const [imagesComment1, setImagesComment1] = useState([]);
    const [imagesComment2, setImagesComment2] = useState([]);
    const [imagesComment3, setImagesComment3] = useState([]);
    const [imagesComment4, setImagesComment4] = useState([]);
    const [imagesComment5, setImagesComment5] = useState([]);
    const [imagesComment6, setImagesComment6] = useState([]);

    // Xử lý khi người dùng chọn một ảnh
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImageProducts(files);
    };
    const handleImageShopChange = (event) => {
        const file = event.target.files[0];
        setImageShop(file);
    };
    const handleImagesCommentChange1 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImagesComment1(files);
    };
    const handleImagesCommentChange2 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an
        setImagesComment2(files);
    };
    const handleImagesCommentChange3 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImagesComment3(files);
    };
    const handleImagesCommentChange4 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImagesComment4(files);
    };
    const handleImagesCommentChange5 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImagesComment5(files);
    };
    const handleImagesCommentChange6 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImagesComment6(files);
    };

    const handleNextStep1 = async () => {
        if (
            productName &&
            price &&
            oldPrice &&
            discount &&
            soldAmount &&
            reviewCount &&
            imageProducts.length &&
            option1
        ) {
            setIsShowStep1(false);
            setIsShowStep2(true);
        }
        setIsSubmit1(true);
    };
    const handleNextStep2 = async () => {
        if (
            nameShop &&
            storeRevenue &&
            productCount &&
            reviewCountStore &&
            photoReviewCount &&
            fiveStarCount &&
            fourStarCount &&
            threeStarCount &&
            imageShop
        ) {
            setIsShowStep2(false);
            setIsShowStep3(true);
        }
        setIsSubmit2(true);
    };
    const handleNextStep3 = async () => {
        if (
            productType1 &&
            comment1 &&
            productType2 &&
            comment2 &&
            productType3 &&
            comment3 &&
            productType4 &&
            comment4 &&
            productType5 &&
            comment5 &&
            productType6 &&
            comment6
        ) {
            setIsShowStep3(false);
            setIsShowStep4(true);
        }
        setIsSubmit3(true);
    };
    const handlePrevStep2 = async () => {
        setIsShowStep1(true);
        setIsShowStep2(false);
    };
    const handlePrevStep3 = async () => {
        setIsShowStep2(true);
        setIsShowStep3(false);
    };
    const handlePrevStep4 = async () => {
        setIsShowStep3(true);
        setIsShowStep4(false);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsSubmit4(true);
        const data = new FormData();
        imageProducts.forEach((image) => {
            data.append('imageProducts[]', image); // Append each image to the FormData as an array
        });
        data.append('imageShop', imageShop);
        data.append('nameShop', nameShop);
        data.append('productName', productName);
        data.append('price', price);
        data.append('oldPrice', oldPrice);
        data.append('discount', discount);
        data.append('soldAmount', soldAmount);
        data.append('reviewCount', reviewCount);
        data.append('storeRevenue', storeRevenue);
        data.append('productCount', productCount);
        data.append('reviewCountStore', reviewCountStore);
        data.append('photoReviewCount', photoReviewCount);
        data.append('fiveStarCount', fiveStarCount);
        data.append('fourStarCount', fourStarCount);
        data.append('threeStarCount', threeStarCount);
        data.append('description', description);
        data.append('option1', option1 || '');
        data.append('option2', option2 || '');
        data.append('option3', option3 || '');

        imagesComment1.forEach((image) => {
            data.append('imagesComment1[]', image); // Append each image to the FormData as an array
        });
        data.append('productType1', productType1);
        data.append('comment1', comment1);

        imagesComment2.forEach((image) => {
            data.append('imagesComment2[]', image); // Append each image to the FormData as an array
        });
        data.append('productType2', productType2);
        data.append('comment2', comment2);

        imagesComment3.forEach((image) => {
            data.append('imagesComment3[]', image); // Append each image to the FormData as an array
        });
        data.append('productType3', productType3);
        data.append('comment3', comment3);

        imagesComment4.forEach((image) => {
            data.append('imagesComment4[]', image); // Append each image to the FormData as an array
        });
        data.append('productType4', productType4);
        data.append('comment4', comment4);

        imagesComment5.forEach((image) => {
            data.append('imagesComment5[]', image); // Append each image to the FormData as an array
        });
        data.append('productType5', productType5);
        data.append('comment5', comment5);

        imagesComment6.forEach((image) => {
            data.append('imagesComment6[]', image); // Append each image to the FormData as an array
        });
        data.append('productType6', productType6);
        data.append('comment6', comment6);

        try {
            setLoading(true);
            const result = await authService.post(data);
            if (result?.success) {
                setLoading(false);
                setShowPopup(true);
            } else {
            }
        } catch (error) {
            setLoading(true);
            console.error(error);
        }
    };

    return (
        <>
            {showPopup && <SuccessPopup />}
            {!loading ? (
                <div className="container-create" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
                    <div className={cx('nav-payment', 'flex')}>
                        <div
                            xs={1}
                            className={cx('icon-header')}
                            style={{ left: '11px', fontSize: '26px', position: 'absolute', zIndex: '1' }}
                        >
                            <span>
                                <IoChevronBackSharp />
                            </span>
                        </div>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <div className={cx('title-page')} style={{ textAlign: 'center' }}>
                                Tạo sản phẩm mới
                            </div>
                        </div>
                    </div>

                    <div className="flex" style={{ justifyContent: 'space-between', width: '100%' }}>
                        <div className={cx('step-item')}>
                            <div className={cx('step')}>
                                <span className={cx('step-counter')}>1</span>
                            </div>
                            <div>Sản phẩm</div>
                        </div>
                        <div className={cx('step-item')}>
                            <div className={cx('step')}>
                                <span className={cx('step-counter', isShowStep1 ? 'disable-step' : '')}>2</span>
                            </div>
                            <div>Cửa hàng</div>
                        </div>
                        <div className={cx('step-item')}>
                            <div className={cx('step')}>
                                <span className={cx('step-counter', isShowStep2 || isShowStep1 ? 'disable-step' : '')}>
                                    3
                                </span>
                            </div>
                            <div>Bình luận</div>
                        </div>
                        <div className={cx('step-item')}>
                            <div className={cx('step')}>
                                <span className={cx('step-counter', !isShowStep4 ? 'disable-step' : 'step-4')}>4</span>
                            </div>
                            <div>Hoàn thành</div>
                        </div>
                        <div className={cx('line-step')}></div>
                    </div>

                    {isShowStep1 ? (
                        <div className={cx('container')}>
                            <div style={{ marginBottom: '20px' }}>
                                <p className={cx('info')}>Thông tin sản phẩm</p>
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit1 && !productName}
                                        id="productName"
                                        label="Tên sản phẩm"
                                        variant="outlined"
                                        value={productName}
                                        onChange={handleProductNameChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                id="productName"
                                placeholder="Tên sản phẩm"
                                className={errors.productName ? 'input-error' : 'input-field'}
                                style={{ border: errors.productName ? '1px solid red' : 'none' }}
                                value={productName}
                                onChange={handleProductNameChange}
                                />
                                <label htmlFor="productName" className="input-label">
                                Tên sản phẩm
                                </label> */}

                                <div className={cx('flex', 'div-phone')} style={{ marginBottom: '10px' }}>
                                    <div style={{ paddingRight: '10px', backgroundColor: 'rgb(245, 245, 245)' }}>
                                        <TextField
                                            error={isSubmit1 && !price}
                                            id="price"
                                            label="Giá"
                                            variant="outlined"
                                            value={price}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            error={isSubmit1 && !oldPrice}
                                            id="oldPrice"
                                            label="Giá cũ"
                                            variant="outlined"
                                            value={oldPrice}
                                            onChange={handleOldPriceChange}
                                        />
                                    </div>
                                    {/* <input
                                    type="number"
                                    placeholder="Giá"
                                    {...register('price')}
                                    style={{ border: errors.price ? '1px solid red' : 'none' }}
                                    value={price}
                                    onChange={handlePriceChange}
                                    /> */}
                                    {/* <input
                                    type="number"
                                    placeholder="Giá cũ"
                                    {...register('oldPrice')}
                                    style={{ border: errors.oldPrice ? '1px solid red' : 'none' }}
                                    value={oldPrice}
                                    onChange={handleOldPriceChange}
                                    /> */}
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit1 && !option1}
                                        id="option1"
                                        label="Lựa chọn mua thứ nhất"
                                        variant="outlined"
                                        value={option1}
                                        onChange={handleOption1Change}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        // error={isSubmit1 && !option2}
                                        id="option2"
                                        label="Lựa chọn mua thứ hai"
                                        variant="outlined"
                                        value={option2}
                                        onChange={handleOption2Change}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        // error={isSubmit1 && !option3}
                                        id="option3"
                                        label="Lựa chọn mua thứ ba"
                                        variant="outlined"
                                        value={option3}
                                        onChange={handleOption3Change}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit1 && !discount}
                                        id="discount"
                                        label="Voucher giảm giá"
                                        variant="outlined"
                                        value={discount}
                                        onChange={handleDiscountChange}
                                    />
                                </div>
                                {/* <input
                                type="number"
                                placeholder="Voucher giảm giá"
                                {...register('discount')}
                                style={{ border: errors.discount ? '1px solid red' : 'none' }}
                                value={discount}
                                onChange={handleDiscountChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit1 && !soldAmount}
                                        id="soldAmount"
                                        label="Số lượng đã bán"
                                        variant="outlined"
                                        value={soldAmount}
                                        onChange={handleSoldAmountChange}
                                    />
                                </div>
                                {/* <input
                                type="number"
                                placeholder="Số lượng đã bán"
                                {...register('soldAmount')}
                                style={{ border: errors.soldAmount ? '1px solid red' : 'none' }}
                                value={soldAmount}
                                onChange={handleSoldAmountChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit1 && !reviewCount}
                                        id="reviewCount"
                                        label="Số lượt đánh giá"
                                        variant="outlined"
                                        value={reviewCount}
                                        onChange={handleReviewCountChange}
                                    />
                                </div>
                                {/* <input
                                type="number"
                                placeholder="Số lượt đánh giá"
                                {...register('reviewCount')}
                                style={{ border: errors.reviewCount ? '1px solid red' : 'none' }}
                                value={reviewCount}
                                onChange={handleReviewCountChange}
                                /> */}
                            </div>

                            <div>
                                <p className={cx('info')}>Hình ảnh</p>
                                <label
                                    htmlFor="imageProductUpload"
                                    className={cx(
                                        'label-images-product',
                                        !imageProducts.length && isSubmit1 ? 'error' : '',
                                    )}
                                >
                                    <span>
                                        Tải ảnh lên <LuImagePlus size={24} />
                                    </span>
                                </label>
                                <input
                                    id="imageProductUpload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange} // Bắt sự kiện khi chọn file
                                    style={{ display: 'none' }}
                                />

                                <div>
                                    <div>
                                        {imageProducts.length > 0 &&
                                            imageProducts.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Selected ${index}`}
                                                    style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: '215px', marginTop: '20px' }}>
                                <p className={cx('info')}>Mô tả sản phẩm</p>

                                <div className="flex" style={{ height: '100px' }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data);
                                        }}
                                        config={{
                                            toolbar: {
                                                items: [
                                                    'undo',
                                                    'redo',
                                                    '|',
                                                    'heading',
                                                    '|',
                                                    'fontSize',
                                                    'fontFamily',
                                                    'fontColor',
                                                    'fontBackgroundColor',
                                                    '|',
                                                    'bold',
                                                    'italic',
                                                    'strikethrough',
                                                    'subscript',
                                                    'superscript',
                                                    'code',
                                                    '-', // break point
                                                    '|',
                                                    'alignment',
                                                    'link',
                                                    'uploadImage',
                                                    'blockQuote',
                                                    'codeBlock',
                                                    '|',
                                                    'bulletedList',
                                                    'numberedList',
                                                    'todoList',
                                                    'outdent',
                                                    'indent',
                                                ],

                                                shouldNotGroupWhenFull: true,
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {isShowStep2 ? (
                        <div className={cx('container')}>
                            <div>
                                <p className={cx('info')}>Thông tin cửa hàng</p>
                                <div className="flex" style={{ marginBottom: '10px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="imageShop"
                                            style={{ display: 'none' }}
                                            type="file"
                                            onChange={handleImageShopChange}
                                        />
                                        {imageShop ? (
                                            <div className={cx('preview-image-shop')}>
                                                <img
                                                    src={URL.createObjectURL(imageShop)}
                                                    alt={`Selected`}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="imageShop"
                                                className={cx(
                                                    'label-image-shop',
                                                    !imageShop && isSubmit2 ? 'error' : '',
                                                )}
                                            >
                                                <span style={{ color: 'black' }}>
                                                    <FaUpload size={27} />
                                                </span>
                                            </label>
                                        )}

                                        <label htmlFor="imageShop" className={cx('label-image-edit')}>
                                            <span style={{ color: '#fc2b54' }}>
                                                <MdModeEditOutline size={18} />
                                            </span>
                                        </label>
                                    </div>
                                    <div className={cx('div-name-shop')}>
                                        <TextField
                                            error={isSubmit2 && !nameShop}
                                            id="nameShop"
                                            label="Tên Shop"
                                            variant="outlined"
                                            value={nameShop}
                                            onChange={handleNameShopChange}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !storeRevenue}
                                        id="storeRevenue"
                                        label="Tổng doanh số của cửa hàng"
                                        variant="outlined"
                                        value={storeRevenue}
                                        onChange={handleStoreRevenueChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Tổng doanh số của cửa hàng"
                                {...register('storeRevenue')}
                                style={{ border: errors.storeRevenue ? '1px solid red' : 'none' }}
                                value={storeRevenue}
                                onChange={handleStoreRevenueChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !productCount}
                                        id="productCount"
                                        label="Số sản phẩm"
                                        variant="outlined"
                                        value={productCount}
                                        onChange={handleProductCountChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Số sản phẩm"
                                {...register('productCount')}
                                style={{ border: errors.productCount ? '1px solid red' : 'none' }}
                                value={productCount}
                                onChange={handleProductCountChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !reviewCountStore}
                                        id="reviewCountStore"
                                        label="Số đánh giá dành cho cửa hàng"
                                        variant="outlined"
                                        value={reviewCountStore}
                                        onChange={handleReviewCountStoreChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Số đánh giá dành cho cửa hàng"
                                {...register('reviewCountStore')}
                                style={{ border: errors.reviewCountStore ? '1px solid red' : 'none' }}
                                value={reviewCountStore}
                                onChange={handleReviewCountStoreChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !photoReviewCount}
                                        id="photoReviewCount"
                                        label="Số đánh giá chứa ảnh hoặc video"
                                        variant="outlined"
                                        value={photoReviewCount}
                                        onChange={handlePhotoReviewCountChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Số đánh giá chứa ảnh hoặc video"
                                {...register('photoReviewCount')}
                                style={{ border: errors.photoReviewCount ? '1px solid red' : 'none' }}
                                value={photoReviewCount}
                                onChange={handlePhotoReviewCountChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !fiveStarCount}
                                        id="fiveStarCount"
                                        label="Số đánh giá 5 sao"
                                        variant="outlined"
                                        value={fiveStarCount}
                                        onChange={handleFiveStarCountChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Số đánh giá 5 sao"
                                {...register('fiveStarCount')}
                                style={{ border: errors.fiveStarCount ? '1px solid red' : 'none' }}
                                value={fiveStarCount}
                                onChange={handleFiveStarCountChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !fourStarCount}
                                        id="fourStarCount"
                                        label="Số đánh giá 4 sao"
                                        variant="outlined"
                                        value={fourStarCount}
                                        onChange={handleFourStarCountChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Số đánh giá 4 sao"
                                {...register('fourStarCount')}
                                style={{ border: errors.fourStarCount ? '1px solid red' : 'none' }}
                                value={fourStarCount}
                                onChange={handleFourStarCountChange}
                                /> */}
                                <div style={{ marginBottom: '10px' }}>
                                    <TextField
                                        error={isSubmit2 && !threeStarCount}
                                        id="threeStarCount"
                                        label="Số đánh giá 3 sao"
                                        variant="outlined"
                                        value={threeStarCount}
                                        onChange={handleThreeStarCountChange}
                                    />
                                </div>
                                {/* <input
                                type="text"
                                placeholder="Số đánh giá 3 sao"
                                {...register('threeStarCount')}
                                style={{ border: errors.threeStarCount ? '1px solid red' : 'none' }}
                                value={threeStarCount}
                                onChange={handleThreeStarCountChange}
                                /> */}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}

                    {isShowStep3 ? (
                        <>
                            <div className={cx('container-comment')}>
                                <p className={cx('info')} style={{ marginLeft: '0' }}>
                                    Tạo đánh giá
                                </p>
                                <div style={{ marginBottom: '20px' }}>
                                    <div className={cx('account-item', 'flex', 'items-center')}>
                                        <Image className={cx('avatar')} src={''} />
                                        <div className={cx('item-info')}>
                                            <p className={cx('nickname')}>a**a</p>
                                        </div>
                                    </div>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <span className={cx('star')} key={index}>
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        id="imageCommentUpload1"
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        onChange={handleImagesCommentChange1}
                                    />
                                    <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%' }}>
                                        <TextField
                                            error={isSubmit3 && !productType1}
                                            id="productType1"
                                            label="Loại mặt hàng"
                                            variant="outlined"
                                            value={productType1}
                                            onChange={handleProductTypeChange1}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType1')}
                                        style={{ border: errors.productType1 ? '1px solid red' : 'none' }}
                                        value={productType1}
                                        onChange={handleProductTypeChange1}
                                        /> */}
                                    </div>
                                    <div className="flex" style={{ color: 'black', position: 'relative' }}>
                                        <TextField
                                            error={isSubmit3 && !comment1}
                                            id="comment1"
                                            label="Nhận xét của bạn"
                                            variant="outlined"
                                            value={comment1}
                                            onChange={handleCommentChange1}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment1')}
                                        style={{ border: errors.comment1 ? '1px solid red' : 'none' }}
                                        value={comment1}
                                        onChange={handleCommentChange1}
                                    /> */}
                                        <label htmlFor="imageCommentUpload1" className={cx('label-images-comment')}>
                                            <span>
                                                <LuImagePlus size={24} />
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            {imagesComment1.length > 0 &&
                                                imagesComment1.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div className={cx('account-item', 'flex', 'items-center')}>
                                        <Image className={cx('avatar')} src={''} />
                                        <div className={cx('item-info')}>
                                            <p className={cx('nickname')}>a**a</p>
                                        </div>
                                    </div>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <span className={cx('star')} key={index}>
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        id="imageCommentUpload2"
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        onChange={handleImagesCommentChange2}
                                    />
                                    <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%' }}>
                                        <TextField
                                            error={isSubmit3 && !productType2}
                                            id="productType2"
                                            label="Loại mặt hàng"
                                            variant="outlined"
                                            value={productType2}
                                            onChange={handleProductTypeChange2}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType2')}
                                        style={{ border: errors.productType2 ? '1px solid red' : 'none' }}
                                        value={productType2}
                                        onChange={handleProductTypeChange2}
                                        /> */}
                                    </div>
                                    <div style={{ color: 'black', position: 'relative' }}>
                                        <TextField
                                            error={isSubmit3 && !comment2}
                                            id="comment2"
                                            label="Nhận xét của bạn"
                                            variant="outlined"
                                            value={comment2}
                                            onChange={handleCommentChange2}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment2')}
                                        style={{ border: errors.comment2 ? '1px solid red' : 'none' }}
                                        value={comment2}
                                        onChange={handleCommentChange2}
                                        /> */}
                                        <label htmlFor="imageCommentUpload2" className={cx('label-images-comment')}>
                                            <span>
                                                <LuImagePlus size={24} />
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            {imagesComment2.length > 0 &&
                                                imagesComment2.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div className={cx('account-item', 'flex', 'items-center')}>
                                        <Image className={cx('avatar')} src={''} />
                                        <div className={cx('item-info')}>
                                            <p className={cx('nickname')}>a**a</p>
                                        </div>
                                    </div>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <span className={cx('star')} key={index}>
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        id="imageCommentUpload3"
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        onChange={handleImagesCommentChange3}
                                    />
                                    <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                                        <TextField
                                            error={isSubmit3 && !productType3}
                                            id="productType3"
                                            label="Loại mặt hàng"
                                            variant="outlined"
                                            value={productType3}
                                            onChange={handleProductTypeChange3}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType3')}
                                        style={{ border: errors.productType3 ? '1px solid red' : 'none' }}
                                        value={productType3}
                                        onChange={handleProductTypeChange3}
                                        /> */}
                                    </div>
                                    <div style={{ color: 'black', position: 'relative' }}>
                                        <TextField
                                            error={isSubmit3 && !comment3}
                                            id="comment3"
                                            label="Nhận xét của bạn"
                                            variant="outlined"
                                            value={comment3}
                                            onChange={handleCommentChange3}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment3')}
                                        style={{ border: errors.comment3 ? '1px solid red' : 'none' }}
                                        value={comment3}
                                        onChange={handleCommentChange3}
                                        /> */}
                                        <label htmlFor="imageCommentUpload3" className={cx('label-images-comment')}>
                                            <span>
                                                <LuImagePlus size={24} />
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            {imagesComment3.length > 0 &&
                                                imagesComment3.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div className={cx('account-item', 'flex', 'items-center')}>
                                        <Image className={cx('avatar')} src={''} />
                                        <div className={cx('item-info')}>
                                            <p className={cx('nickname')}>a**a</p>
                                        </div>
                                    </div>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <span className={cx('star')} key={index}>
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        id="imageCommentUpload4"
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        onChange={handleImagesCommentChange4}
                                    />
                                    <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                                        <TextField
                                            error={isSubmit3 && !productType4}
                                            id="productType4"
                                            label="Loại mặt hàng"
                                            variant="outlined"
                                            value={productType4}
                                            onChange={handleProductTypeChange4}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType4')}
                                        style={{
                                            border: errors.productType4 ? '1px solid red' : 'none',
                                            }}
                                            value={productType4}
                                            onChange={handleProductTypeChange4}
                                            /> */}
                                    </div>
                                    <div style={{ color: 'black', position: 'relative' }}>
                                        <TextField
                                            error={isSubmit3 && !comment4}
                                            id="comment4"
                                            label="Nhận xét của bạn"
                                            variant="outlined"
                                            value={comment4}
                                            onChange={handleCommentChange4}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment4')}
                                        style={{ border: errors.comment4 ? '1px solid red' : 'none' }}
                                        value={comment4}
                                        onChange={handleCommentChange4}
                                        /> */}
                                        <label htmlFor="imageCommentUpload4" className={cx('label-images-comment')}>
                                            <span>
                                                <LuImagePlus size={24} />
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            {imagesComment4.length > 0 &&
                                                imagesComment4.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div className={cx('account-item', 'flex', 'items-center')}>
                                        <Image className={cx('avatar')} src={''} />
                                        <div className={cx('item-info')}>
                                            <p className={cx('nickname')}>a**a</p>
                                        </div>
                                    </div>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <span className={cx('star')} key={index}>
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        id="imageCommentUpload5"
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        onChange={handleImagesCommentChange5}
                                    />
                                    <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                                        <TextField
                                            error={isSubmit3 && !productType5}
                                            id="productType5"
                                            label="Loại mặt hàng"
                                            variant="outlined"
                                            value={productType5}
                                            onChange={handleProductTypeChange5}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType5')}
                                        style={{ border: errors.productType5 ? '1px solid red' : 'none' }}
                                        value={productType5}
                                        onChange={handleProductTypeChange5}
                                        /> */}
                                    </div>
                                    <div style={{ color: 'black', position: 'relative' }}>
                                        <TextField
                                            error={isSubmit3 && !comment5}
                                            id="comment5"
                                            label="Nhận xét của bạn"
                                            variant="outlined"
                                            value={comment5}
                                            onChange={handleCommentChange5}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment5')}
                                        style={{ border: errors.comment5 ? '1px solid red' : 'none' }}
                                        value={comment5}
                                        onChange={handleCommentChange5}
                                        /> */}
                                        <label htmlFor="imageCommentUpload5" className={cx('label-images-comment')}>
                                            <span>
                                                <LuImagePlus size={24} />
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            {imagesComment5.length > 0 &&
                                                imagesComment5.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div className={cx('account-item', 'flex', 'items-center')}>
                                        <Image className={cx('avatar')} src={''} />
                                        <div className={cx('item-info')}>
                                            <p className={cx('nickname')}>a**a</p>
                                        </div>
                                    </div>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <span className={cx('star')} key={index}>
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        id="imageCommentUpload6"
                                        style={{ display: 'none' }}
                                        type="file"
                                        multiple
                                        onChange={handleImagesCommentChange6}
                                    />
                                    <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                                        <TextField
                                            error={isSubmit3 && !productType6}
                                            id="productType6"
                                            label="Loại mặt hàng"
                                            variant="outlined"
                                            value={productType6}
                                            onChange={handleProductTypeChange6}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType6')}
                                        style={{ border: errors.productType6 ? '1px solid red' : 'none' }}
                                        value={productType6}
                                        onChange={handleProductTypeChange6}
                                        /> */}
                                    </div>
                                    <div style={{ color: 'black', position: 'relative' }}>
                                        <TextField
                                            error={isSubmit3 && !comment6}
                                            id="comment6"
                                            label="Nhận xét của bạn"
                                            variant="outlined"
                                            value={comment6}
                                            onChange={handleCommentChange6}
                                        />
                                        {/* <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment6')}
                                        style={{ border: errors.comment6 ? '1px solid red' : 'none' }}
                                        value={comment6}
                                        onChange={handleCommentChange6}
                                        /> */}
                                        <label htmlFor="imageCommentUpload6" className={cx('label-images-comment')}>
                                            <span>
                                                <LuImagePlus size={24} />
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            {imagesComment6.length > 0 &&
                                                imagesComment6.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected ${index}`}
                                                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                    {isShowStep4 ? (
                        <>
                            <p className={cx('info')}>Thêm pixel</p>
                        </>
                    ) : (
                        ''
                    )}
                    {isShowStep1 ? (
                        <div className={cx('fixed-bottom', 'footer')}>
                            <button
                                className={cx('button-inline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handleNextStep1}
                            >
                                Kiểm tra thông tin
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                    {isShowStep2 ? (
                        <div className={cx('fixed-bottom', 'footer')}>
                            <button
                                className={cx('button-inline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handleNextStep2}
                            >
                                Kiểm tra thông tin
                            </button>
                            <button
                                className={cx('button-outline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handlePrevStep2}
                            >
                                Quay về trang Sản phẩm
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                    {isShowStep3 ? (
                        <div className={cx('fixed-bottom', 'footer')}>
                            <button
                                className={cx('button-inline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handleNextStep3}
                            >
                                Kiểm tra thông tin
                            </button>
                            <button
                                className={cx('button-outline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handlePrevStep3}
                            >
                                Quay về trang Cửa hàng
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                    {isShowStep4 ? (
                        <div className={cx('fixed-bottom', 'footer')}>
                            <button
                                className={cx('button-inline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handleFormSubmit}
                            >
                                Đăng sản phẩm
                            </button>
                            <button
                                className={cx('button-outline')}
                                style={{ fontSize: '16px', padding: '10px' }}
                                onClick={handlePrevStep4}
                            >
                                Quay về trang Bình luận
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}

export default CreateProduct;

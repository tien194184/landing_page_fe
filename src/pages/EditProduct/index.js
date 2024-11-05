import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { IoChevronBackSharp } from 'react-icons/io5';
import styles from './EditProduct.module.scss'; // SCSS file của bạn
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
import { useParams } from 'react-router';
import { FaTimesCircle } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import { PiUploadSimple } from 'react-icons/pi';

const cx = classNames.bind(styles);

function EditProduct() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
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

    // product image
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [image6, setImage6] = useState('');
    const [image7, setImage7] = useState('');
    const [image8, setImage8] = useState('');
    const [image9, setImage9] = useState('');
    const [image10, setImage10] = useState('');

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

    const handleImage1Change = (event) => {
        const file = event.target.files[0];
        setImage1(file);
    };
    const handleImage2Change = (event) => {
        const file = event.target.files[0];
        setImage2(file);
    };
    const handleImage3Change = (event) => {
        const file = event.target.files[0];
        setImage3(file);
    };
    const handleImage4Change = (event) => {
        const file = event.target.files[0];
        setImage4(file);
    };
    const handleImage5Change = (event) => {
        const file = event.target.files[0];
        setImage5(file);
    };
    const handleImage6Change = (event) => {
        const file = event.target.files[0];
        setImage6(file);
    };
    const handleImage7Change = (event) => {
        const file = event.target.files[0];
        setImage7(file);
    };
    const handleImage8Change = (event) => {
        const file = event.target.files[0];
        setImage8(file);
    };
    const handleImage9Change = (event) => {
        const file = event.target.files[0];
        setImage9(file);
    };
    const handleImage10Change = (event) => {
        const file = event.target.files[0];
        setImage10(file);
    };

    const [imageShop, setImageShop] = useState('');
    const [imagesComment1, setImagesComment1] = useState([]);
    const [imagesComment2, setImagesComment2] = useState([]);
    const [imagesComment3, setImagesComment3] = useState([]);
    const [imagesComment4, setImagesComment4] = useState([]);
    const [imagesComment5, setImagesComment5] = useState([]);
    const [imagesComment6, setImagesComment6] = useState([]);

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
        if (productName && price && oldPrice && discount && soldAmount && reviewCount) {
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
            threeStarCount
            // && imageShop
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
        data.append('image1', image1);
        data.append('image2', image2);
        data.append('image3', image3);
        data.append('image4', image4);
        data.append('image5', image5);
        data.append('image6', image6);
        data.append('image7', image7);
        data.append('image8', image8);
        data.append('image9', image9);
        data.append('image10', image10);
        data.append('imageShop', imageShop);
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
            const result = await authService.editProduct(slug, data);
            console.log(result);
            if (result?.success) {
                setShowPopup(true);
            } else {
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Make the API call to fetch the product
                const response = await authService.getProduct(slug);

                // Update the product state
                const product = response.data.product;
                const comments = response.data.comments;
                setProduct(product);
                setProductName(product?.productName);
                setPrice(product?.price);
                setOldPrice(product?.oldPrice);
                setDiscount(product?.discount);
                setSoldAmount(product?.soldAmount);
                setReviewCount(product?.reviewCount);
                setNameShop(product.shop);
                setStoreRevenue(product.storeRevenue);
                setProductCount(product.productCount);
                setReviewCountStore(product.reviewCountStore);
                setPhotoReviewCount(product.photoReviewCount);
                setFiveStarCount(product.fiveStarCount);
                setFourStarCount(product.fourStarCount);
                setThreeStarCount(product.threeStarCount);
                setProductType1(comments[0].productType);
                setComment1(comments[0].comment);
                setProductType2(comments[1].productType);
                setComment2(comments[1].comment);
                setProductType3(comments[2].productType);
                setComment3(comments[2].comment);
                setProductType4(comments[3].productType);
                setComment4(comments[3].comment);
                setProductType5(comments[4].productType);
                setComment5(comments[4].comment);
                setProductType6(comments[5].productType);
                setComment6(comments[5].comment);
                setDescription(product.description);
                // setLoading(false);
            } catch (err) {
                // setError(err.message);
                // setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleDeleteImageProduct = async (image) => {
        const response = await authService.handleDeleteImageProduct(slug, { image: image });
    };
    return (
        <>
            {showPopup && <SuccessPopup />}
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
                            Thay đổi thông tin sản phẩm
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
                                    variant="standard"
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
                                        variant="standard"
                                        value={price}
                                        onChange={handlePriceChange}
                                    />
                                </div>
                                <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
                                    <TextField
                                        error={isSubmit1 && !oldPrice}
                                        id="oldPrice"
                                        label="Giá cũ"
                                        variant="standard"
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
                                    error={isSubmit1 && !discount}
                                    id="discount"
                                    label="Voucher giảm giá"
                                    variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                            <div className={cx('product-images')}>
                                <div className={cx('container-image')}>
                                    {!image1 && product?.image1 && (
                                        <label htmlFor="image1">
                                            <img className={cx('product-image')} src={product.image1} alt={``} />
                                        </label>
                                    )}
                                    {image1 && (
                                        <label htmlFor="image1">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image1)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image1 && !image1 && (
                                        <label htmlFor="image1" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image1"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage1Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image1: '',
                                            }));
                                            setImage1('');
                                            handleDeleteImageProduct(1);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image2 && product?.image2 && (
                                        <label htmlFor="image2">
                                            <img className={cx('product-image')} src={product.image2} alt={``} />
                                        </label>
                                    )}
                                    {image2 && (
                                        <label htmlFor="image2">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image2)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image2 && !image2 && (
                                        <label htmlFor="image2" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image2"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage2Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image2: '',
                                            }));
                                            setImage2('');
                                            handleDeleteImageProduct(2);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image3 && product?.image3 && (
                                        <label htmlFor="image3">
                                            <img className={cx('product-image')} src={product.image3} alt={``} />
                                        </label>
                                    )}
                                    {image3 && (
                                        <label htmlFor="image3">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image3)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image3 && !image3 && (
                                        <label htmlFor="image3" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image3"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage3Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image3: '',
                                            }));
                                            setImage3('');
                                            handleDeleteImageProduct(3);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image4 && product?.image4 && (
                                        <label htmlFor="image4">
                                            <img className={cx('product-image')} src={product.image4} alt={``} />
                                        </label>
                                    )}
                                    {image4 && (
                                        <label htmlFor="image4">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image4)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image4 && !image4 && (
                                        <label htmlFor="image4" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image4"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage4Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image4: '',
                                            }));
                                            setImage4('');
                                            handleDeleteImageProduct(4);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image5 && product?.image5 && (
                                        <label htmlFor="image5">
                                            <img className={cx('product-image')} src={product.image5} alt={``} />
                                        </label>
                                    )}
                                    {image5 && (
                                        <label htmlFor="image5">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image5)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image5 && !image5 && (
                                        <label htmlFor="image5" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image5"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage5Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image5: '',
                                            }));
                                            setImage5('');
                                            handleDeleteImageProduct(5);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image6 && product?.image6 && (
                                        <label htmlFor="image6">
                                            <img className={cx('product-image')} src={product.image6} alt={``} />
                                        </label>
                                    )}
                                    {image6 && (
                                        <label htmlFor="image6">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image6)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image6 && !image6 && (
                                        <label htmlFor="image6" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image6"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage6Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image6: '',
                                            }));
                                            setImage6('');
                                            handleDeleteImageProduct(6);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image7 && product?.image7 && (
                                        <label htmlFor="image7">
                                            <img className={cx('product-image')} src={product.image7} alt={``} />
                                        </label>
                                    )}
                                    {image7 && (
                                        <label htmlFor="image7">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image7)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image7 && !image7 && (
                                        <label htmlFor="image7" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image7"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage7Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image7: '',
                                            }));
                                            setImage7('');
                                            handleDeleteImageProduct(7);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image8 && product?.image8 && (
                                        <label htmlFor="image8">
                                            <img className={cx('product-image')} src={product.image8} alt={``} />
                                        </label>
                                    )}
                                    {image8 && (
                                        <label htmlFor="image8">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image8)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image8 && !image8 && (
                                        <label htmlFor="image8" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image8"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage8Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image8: '',
                                            }));
                                            setImage8('');
                                            handleDeleteImageProduct(8);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image9 && product?.image9 && (
                                        <label htmlFor="image9">
                                            <img className={cx('product-image')} src={product.image9} alt={``} />
                                        </label>
                                    )}
                                    {image9 && (
                                        <label htmlFor="image9">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image9)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image9 && !image9 && (
                                        <label htmlFor="image9" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image9"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage9Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image9: '',
                                            }));
                                            setImage9('');
                                            handleDeleteImageProduct(9);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                                <div className={cx('container-image')}>
                                    {!image10 && product?.image10 && (
                                        <label htmlFor="image10">
                                            <img className={cx('product-image')} src={product.image10} alt={``} />
                                        </label>
                                    )}
                                    {image10 && (
                                        <label htmlFor="image10">
                                            <img
                                                className={cx('product-image')}
                                                src={URL.createObjectURL(image10)}
                                                alt={``}
                                            />
                                        </label>
                                    )}
                                    {!product?.image10 && !image10 && (
                                        <label htmlFor="image10" className={cx('label-image-product')}>
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
                                        </label>
                                    )}
                                    <input
                                        id="image10"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleImage10Change}
                                    />
                                    <span
                                        className={cx('icon-remove-image')}
                                        onClick={() => {
                                            setProduct((product) => ({
                                                ...product,
                                                image10: '',
                                            }));
                                            setImage10('');
                                            handleDeleteImageProduct(10);
                                        }}
                                    >
                                        <FaTimesCircle />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ height: '215px', marginBottom: '70px' }}>
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
                                            className={cx('label-image-shop', !imageShop && isSubmit2 ? 'error' : '')}
                                        >
                                            <div>
                                                <p
                                                    style={{
                                                        color: 'black',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <PiUploadSimple size={27} />
                                                </p>
                                                <p>Tải ảnh lên</p>
                                            </div>
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
                                        variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                                    variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
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
        </>
    );
}

export default EditProduct;

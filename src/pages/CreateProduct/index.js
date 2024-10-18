import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { IoChevronBackSharp } from 'react-icons/io5';
import styles from './CreateProduct.module.scss'; // SCSS file của bạn
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CommentItem from '../../components/CommentItem';
import GetProduct from './../Product/index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as authService from '../../services/authService';
import Image from '../../components/Image';
import { FaStar } from 'react-icons/fa6';

const cx = classNames.bind(styles);

const schema = yup.object().shape({
    productName: yup.string().required('Tên sản phẩm là bắt buộc'),
    price: yup.number().required('Giá là bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    oldPrice: yup.number().required('Giá cũ là bắt buộc'),
    discount: yup.number().required('Voucher giảm giá là bắt buộc'),
    soldAmount: yup.number().required('Số lượng đã bán là bắt buộc'),
    reviewCount: yup.number().required('Số lượt đánh giá sản phẩm là bắt buộc'),
    storeRevenue: yup.string().required('Tổng doanh số của cửa hàng là bắt buộc'),
    productCount: yup.string().required('Số sản phẩm là bắt buộc'),
    reviewCountStore: yup.string().required('Số đánh giá dành cho cửa hàng là bắt buộc'),
    photoReviewCount: yup.string().required('Số đánh giá chứa ảnh hoặc video là bắt buộc'),
    fiveStarCount: yup.string().required('Số đánh giá 5 sao là bắt buộc'),
    fourStarCount: yup.string().required('Số đánh giá 4 sao là bắt buộc'),
    threeStarCount: yup.string().required('Số đánh giá 3 sao là bắt buộc'),
});

function CreateProduct() {
    const [isShowStep1, setIsShowStep1] = useState(true);
    const [isShowStep2, setIsShowStep2] = useState(false);
    const [isShowStep3, setIsShowStep3] = useState(false);
    const [isShowStep4, setIsShowStep4] = useState(false);
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
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

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
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

    const [imageProducts, setImageProducts] = useState([]);
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
    const handleImagesCommentChange1 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
        setImagesComment1(files);
    };
    const handleImagesCommentChange2 = (event) => {
        const files = Array.from(event.target.files); // Convert the FileList to an array
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleNextStep1 = async () => {
        setIsShowStep1(false);
        setIsShowStep2(true);
    };
    const handleNextStep2 = async () => {
        setIsShowStep2(false);
        setIsShowStep3(true);
    };
    const handleNextStep3 = async () => {
        setIsShowStep3(false);
        setIsShowStep4(true);
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
    const handleFormSubmit = async () => {
        const data = new FormData();
        imageProducts.forEach((image) => {
            data.append('imageProducts[]', image); // Append each image to the FormData as an array
        });
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
            const result = await authService.post(data);
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
        <form onSubmit={handleSubmit((e) => console.log(e))}>
            <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
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

                <div className="flex" style={{ justifyContent: 'space-between', padding: '0 15px' }}>
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
                </div>
                <div className={cx('line-step')}></div>

                {isShowStep1 ? (
                    <div className={cx('container')}>
                        <div style={{ marginBottom: '20px' }}>
                            <p className={cx('info')}>Thông tin sản phẩm</p>
                            <input
                                type="text"
                                placeholder="Tên sản phẩm"
                                {...register('productName')}
                                style={{ border: errors.productName ? '1px solid red' : 'none' }}
                                value={productName}
                                onChange={handleProductNameChange}
                            />

                            <div className={cx('flex', 'div-phone')}>
                                <input
                                    type="number"
                                    placeholder="Giá"
                                    {...register('price')}
                                    style={{ border: errors.price ? '1px solid red' : 'none' }}
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                                <input
                                    type="number"
                                    placeholder="Giá cũ"
                                    {...register('oldPrice')}
                                    style={{ border: errors.oldPrice ? '1px solid red' : 'none' }}
                                    value={oldPrice}
                                    onChange={handleOldPriceChange}
                                />
                            </div>
                            <input
                                type="number"
                                placeholder="Voucher giảm giá"
                                {...register('discount')}
                                style={{ border: errors.discount ? '1px solid red' : 'none' }}
                                value={discount}
                                onChange={handleDiscountChange}
                            />
                            <input
                                type="number"
                                placeholder="Số lượng đã bán"
                                {...register('soldAmount')}
                                style={{ border: errors.soldAmount ? '1px solid red' : 'none' }}
                                value={soldAmount}
                                onChange={handleSoldAmountChange}
                            />
                            <input
                                type="number"
                                placeholder="Số lượt đánh giá sản phẩm"
                                {...register('reviewCount')}
                                style={{ border: errors.reviewCount ? '1px solid red' : 'none' }}
                                value={reviewCount}
                                onChange={handleReviewCountChange}
                            />
                        </div>

                        <div>
                            <p className={cx('info')}>Hình ảnh sản phẩm</p>
                            <input
                                type="file"
                                multiple
                                // accept="image/*"
                                onChange={handleImageChange} // Bắt sự kiện khi chọn file
                            />

                            <div>
                                {/* Hiển thị ảnh đã chọn */}
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
                            <input
                                type="text"
                                placeholder="Tổng doanh số của cửa hàng"
                                {...register('storeRevenue')}
                                style={{ border: errors.storeRevenue ? '1px solid red' : 'none' }}
                                value={storeRevenue}
                                onChange={handleStoreRevenueChange}
                            />
                            <input
                                type="text"
                                placeholder="Số sản phẩm"
                                {...register('productCount')}
                                style={{ border: errors.productCount ? '1px solid red' : 'none' }}
                                value={productCount}
                                onChange={handleProductCountChange}
                            />
                            <input
                                type="text"
                                placeholder="Số đánh giá dành cho cửa hàng"
                                {...register('reviewCountStore')}
                                style={{ border: errors.reviewCountStore ? '1px solid red' : 'none' }}
                                value={reviewCountStore}
                                onChange={handleReviewCountStoreChange}
                            />
                            <input
                                type="text"
                                placeholder="Số đánh giá chứa ảnh hoặc video"
                                {...register('photoReviewCount')}
                                style={{ border: errors.photoReviewCount ? '1px solid red' : 'none' }}
                                value={photoReviewCount}
                                onChange={handlePhotoReviewCountChange}
                            />
                            <input
                                type="text"
                                placeholder="Số đánh giá 5 sao"
                                {...register('fiveStarCount')}
                                style={{ border: errors.fiveStarCount ? '1px solid red' : 'none' }}
                                value={fiveStarCount}
                                onChange={handleFiveStarCountChange}
                            />
                            <input
                                type="text"
                                placeholder="Số đánh giá 4 sao"
                                {...register('fourStarCount')}
                                style={{ border: errors.fourStarCount ? '1px solid red' : 'none' }}
                                value={fourStarCount}
                                onChange={handleFourStarCountChange}
                            />
                            <input
                                type="text"
                                placeholder="Số đánh giá 3 sao"
                                {...register('threeStarCount')}
                                style={{ border: errors.threeStarCount ? '1px solid red' : 'none' }}
                                value={threeStarCount}
                                onChange={handleThreeStarCountChange}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}

                {isShowStep3 ? (
                    <>
                        <div style={{ marginBottom: '20px' }}>
                            <p className={cx('info')}>Tạo đánh giá</p>
                            <div>
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
                                <input type="file" multiple onChange={handleImagesCommentChange1} />
                                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                                    Mặt hàng:{' '}
                                    <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType1')}
                                        style={{ border: errors.productType1 ? '1px solid red' : 'none' }}
                                        value={productType1}
                                        onChange={handleProductTypeChange1}
                                    />
                                </p>
                                <p style={{ color: 'black' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment1')}
                                        style={{ border: errors.comment1 ? '1px solid red' : 'none' }}
                                        value={comment1}
                                        onChange={handleCommentChange1}
                                    />
                                </p>
                            </div>

                            <div>
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
                                <input type="file" multiple onChange={handleImagesCommentChange2} />
                                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                                    Mặt hàng:{' '}
                                    <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType2')}
                                        style={{ border: errors.productType2 ? '1px solid red' : 'none' }}
                                        value={productType2}
                                        onChange={handleProductTypeChange2}
                                    />
                                </p>
                                <p style={{ color: 'black' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment2')}
                                        style={{ border: errors.comment2 ? '1px solid red' : 'none' }}
                                        value={comment2}
                                        onChange={handleCommentChange2}
                                    />
                                </p>
                            </div>
                            <div>
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
                                <input type="file" multiple onChange={handleImagesCommentChange3} />
                                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                                    Mặt hàng:{' '}
                                    <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType3')}
                                        style={{ border: errors.productType3 ? '1px solid red' : 'none' }}
                                        value={productType3}
                                        onChange={handleProductTypeChange3}
                                    />
                                </p>
                                <p style={{ color: 'black' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment3')}
                                        style={{ border: errors.comment3 ? '1px solid red' : 'none' }}
                                        value={comment3}
                                        onChange={handleCommentChange3}
                                    />
                                </p>
                            </div>
                            <div>
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
                                <input type="file" multiple onChange={handleImagesCommentChange4} />
                                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                                    Mặt hàng:{' '}
                                    <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType4')}
                                        style={{ border: errors.productType4 ? '1px solid red' : 'none' }}
                                        value={productType4}
                                        onChange={handleProductTypeChange4}
                                    />
                                </p>
                                <p style={{ color: 'black' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment4')}
                                        style={{ border: errors.comment4 ? '1px solid red' : 'none' }}
                                        value={comment4}
                                        onChange={handleCommentChange4}
                                    />
                                </p>
                            </div>
                            <div>
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
                                <input type="file" multiple onChange={handleImagesCommentChange5} />
                                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                                    Mặt hàng:{' '}
                                    <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType5')}
                                        style={{ border: errors.productType5 ? '1px solid red' : 'none' }}
                                        value={productType5}
                                        onChange={handleProductTypeChange5}
                                    />
                                </p>
                                <p style={{ color: 'black' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment5')}
                                        style={{ border: errors.comment5 ? '1px solid red' : 'none' }}
                                        value={comment5}
                                        onChange={handleCommentChange5}
                                    />
                                </p>
                            </div>
                            <div>
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
                                <input type="file" multiple onChange={handleImagesCommentChange6} />
                                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                                    Mặt hàng:{' '}
                                    <input
                                        type="text"
                                        placeholder="Loại mặt hàng"
                                        {...register('productType6')}
                                        style={{ border: errors.productType6 ? '1px solid red' : 'none' }}
                                        value={productType6}
                                        onChange={handleProductTypeChange6}
                                    />
                                </p>
                                <p style={{ color: 'black' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhận xét của bạn"
                                        {...register('comment6')}
                                        style={{ border: errors.comment6 ? '1px solid red' : 'none' }}
                                        value={comment6}
                                        onChange={handleCommentChange6}
                                    />
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    ''
                )}
                {isShowStep4 ? (
                    <>
                        <p className={cx('info')}>Xem trước nội dung sản phẩm</p>

                        <div className={cx('scrollable-div')}>
                            <GetProduct />
                        </div>
                    </>
                ) : (
                    ''
                )}
                {isShowStep1 ? (
                    <div>
                        <button style={{ fontSize: '16px', padding: '10px' }} onClick={handleNextStep1}>
                            Kiểm tra thông tin
                        </button>
                    </div>
                ) : (
                    ''
                )}
                {isShowStep2 ? (
                    <div>
                        <button style={{ fontSize: '16px', padding: '10px' }} onClick={handleNextStep2}>
                            Kiểm tra thông tin
                        </button>
                        <button style={{ fontSize: '16px', padding: '10px' }} onClick={handlePrevStep2}>
                            Quay về trang thông tin
                        </button>
                    </div>
                ) : (
                    ''
                )}
                {isShowStep3 ? (
                    <div>
                        <button style={{ fontSize: '16px', padding: '10px' }} onClick={handleNextStep3}>
                            Kiểm tra thông tin
                        </button>
                        <button style={{ fontSize: '16px', padding: '10px' }} onClick={handlePrevStep3}>
                            Quay về trang Bình luận
                        </button>
                    </div>
                ) : (
                    ''
                )}
                {isShowStep4 ? (
                    <div>
                        <button type="submit" style={{ fontSize: '16px', padding: '10px' }} onClick={handleFormSubmit}>
                            Submit
                        </button>
                        <button style={{ fontSize: '16px', padding: '10px' }} onClick={handlePrevStep4}>
                            Quay về trang Xem trước
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </form>
    );
}

export default CreateProduct;

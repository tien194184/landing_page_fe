import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import Image from '../Image';
import { FaStar } from 'react-icons/fa6';

const cx = classNames.bind(styles);
function CommentItem({ avatar, username, type, content, images = [] }) {
    return (
        <>
            <div className={cx('comment-item')}>
                <div className={cx('account-item', 'flex', 'items-center')}>
                    <Image className={cx('avatar')} src={avatar} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>{username}</p>
                    </div>
                </div>
                <div>
                    {[...Array(5)].map((_, index) => (
                        <span className={cx('star')} key={index}>
                            <FaStar />
                        </span>
                    ))}
                </div>
                <p style={{ fontSize: '12px', marginTop: '5px', marginBottom: "5px" }}>Mặt hàng: {type}</p>
                <p style={{ color: 'black' }}>{content}</p>
                {images.length ? (
                    <div className={cx('comment-images')}>
                        {images.map((image, idx) => (
                            <Image
                                key={idx}
                                src={image}
                                alt={`Comment Image ${idx + 1}`}
                                className={cx('comment-image')}
                            />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default CommentItem;

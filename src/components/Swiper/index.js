import './Swiper.module.scss'; // Ensure styles are imported
import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css'; // Swiper styles

register();

const SwiperComponent = ({ slides }) => {
    return (
        <>
            <div>
                <swiper-container
                    space-between="10"
                    slides-per-view="1"
                    pagination
                    pagination-type="fraction" // Use fraction pagination
                    // navigation="true"
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                        "margin": "0"
                    }}
                >
                    {slides.map((slide, index) => (
                        <swiper-slide key={index} lazy="true" style={{ margin: "0 !important" }}>
                            <img
                                src={slide}
                                alt={`Slide ${index + 1}`}
                                style={{ width: '100%', height: '100vw', objectFit: 'cover' }}
                                loading="lazy"
                            />
                        </swiper-slide>
                    ))}
                </swiper-container>
            </div>
        </>
    );
};

export default SwiperComponent;

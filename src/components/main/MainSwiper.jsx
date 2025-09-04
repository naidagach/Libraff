import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

function MainSwiper() {
    const path = 'src/assets/'
    const images = ['cinayet.webp', 'elxan.webp', 'drakula.webp', 'idiot.webp', 'martin-iden.webp', 'Hero.webp']

    return (
        <div>
            <div>
                <Swiper
                    pagination={{
                        el: '.swiper-pagination-custom',
                        clickable: true}}
                    modules={[Pagination, Autoplay]}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                className="mySwiper">
                    {
                        images.map((item, i) => <SwiperSlide><img className='h-[500px] object-cover' key={i} src={path + item} alt="" /></SwiperSlide> )
                    }
                </Swiper>
                <div className="swiper-pagination-custom mt-4 flex justify-center" />
            </div>
        </div>
    )
}

export default MainSwiper

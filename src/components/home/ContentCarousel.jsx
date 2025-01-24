import React, { useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Autoplay, Navigation, Virtual } from 'swiper/modules';
import axios from 'axios';

const ContentCarousel = () => {
  //javascript
  const [data, setData] = useState([])

  useEffect(() => {
    hdlGetImage()
  }, [])

  const hdlGetImage = () => {
    axios.get('https://picsum.photos/v2/list?page=1&limit=20')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md mb-5"
      >
        {
          data?.map((item, index) =>
            <SwiperSlide key= {index}>
              <img src={item.download_url}  />
            </SwiperSlide>
          )
        }
      </Swiper>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        virtual
        modules={[Pagination, Autoplay, Navigation, Virtual]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper object-cover rounded-md"
      >
        {
          data?.map((item, index) =>
            <SwiperSlide key={index}>
              <img                
                className='rounded-md'
                src={item.download_url}
                 />
            </SwiperSlide>
          )
        }
      </Swiper>

    </div>
  )
}

export default ContentCarousel
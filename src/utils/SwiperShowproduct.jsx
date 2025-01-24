import React, { useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Autoplay, Navigation, Virtual } from 'swiper/modules';


const SwiperShowproduct = ({children}) => {
  return (
    <div>
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
                breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    1080: {
                      slidesPerView: 6,
                      spaceBetween: 50,
                    },
                    1320: {
                      slidesPerView: 7,
                      spaceBetween: 50,
                    },
                  }}
                className="mySwiper object-cover rounded-md"
              >
                {children}
              </Swiper>
    </div>
  )
}

export default SwiperShowproduct
import React, { useState, useEffect } from 'react'
import { listProductBy } from '../../api/Product';
import ProductCard from '../../components/card/ProductCard'
import SwiperShowproduct from '../../utils/SwiperShowproduct';
import { SwiperSlide } from 'swiper/react';


const NewProduct = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()

    }, [])

    const loadData = () => {
        listProductBy('updatedAt', "desc", 12)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (

        <SwiperShowproduct>
            {
                data?.map((item, index) =>
                    <SwiperSlide key={index}>

                        <ProductCard item={item}  />
                    </SwiperSlide>

                )
            }
        </SwiperShowproduct>



    )
}

export default NewProduct
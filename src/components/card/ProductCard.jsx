import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { numberFormat } from '../../utils/number';
import { motion } from "motion/react"


const ProductCard = ({ item }) => {
    const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

    return (
        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} 
        >
        <div className='border rounded-md shadow-md p-2 w-48'>
            <div>

                {
                    item.images && item.images.length > 0
                        ? <img src={item.images[0].url}
                            className='rounded-md w-full h-25 object-cover
                            hover:scale-110 hover:duration-200'/>
                        : <div className='w-full h-32 bg-gray-200 rounded-md
                            text-center flex items-center justify-center'>
                            No Image
                        </div>
                }

            </div>

            <div className='py-2'>
                <p className='text-1 font-bold truncate'>{item.title}</p>
                <p className='test-sm text-gray-500 truncate'
                >{item.description}</p>
            </div>

            <div className='flex justify-between items-center'>
                <span className='text-md font-bold'>{numberFormat(item.price)}</span>
                <button
                    onClick={() => actionAddtoCart(item)}
                    className='bg-gray-100 p-1 rounded-sm hover:bg-gray-400 shadow-md'
                ><ShoppingCart /></button>
            </div>
        </div>

        </motion.button>
    )
}

export default ProductCard
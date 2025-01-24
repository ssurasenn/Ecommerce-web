import React from 'react'
import { Trash2, Minus, Plus, } from 'lucide-react';
import { Link } from 'react-router-dom'
import useEcomStore from '../../store/ecom-store';
import { numberFormat } from '../../utils/number';
const CartCard = () => {
    // javascript
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    console.log(carts)
    return (
        <div>
            <h1 className='text-2xl font-bold'>ตะกร้าสินค้า</h1>
            {/* Border */}
            <div className='border p-2 '>

                {/* Card */}
                {
                    carts.map((item, index) =>

                        <div key={index}
                            className='bg-white p-2 rounded-md shadow-lg mb-4'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-4'>
                                {/* left */}
                                <div className='flex gap-2 items-center'>

                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-16 h-16 rounded-md'
                                                src={item.images[0].url} />
                                            : <div className=' w-16 h-16 bg-gray-200 rounded-md
                                                flex items-center text-center hover:scale-110'>
                                                No Image
                                            </div>

                                    }

                                    <div >
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div
                                    onClick={() => actionRemoveProduct(item.id)}
                                    className='flex items-center mr-3 text-red-600 hover:scale-125'>
                                    <Trash2 className='rounded-sm hover:bg-red-200' />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className='flex justify-between'>
                                {/* Left */}
                                <div className='flex items-center border rounded-md px-1 py-1 shadow-md'>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                        className='px-2 py-1 bg-gray-200 rounded-sm shadow-md
                            hover:bg-gray-300'>
                                        <Minus size={16} />
                                    </button>

                                    <span className='px-4'>{item.count}</span>

                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                        className='px-2 py-1 bg-gray-200 rounded-sm shadow-md
                            hover:bg-gray-300'>
                                        <Plus size={16} />
                                    </button>
                                </div>

                                {/* Right */}
                                <div className='flex text-center font-bold text-blue-400 mr-3 mt-3'>
                                    {numberFormat(item.price * item.count)}
                                </div>

                            </div>

                        </div>
                    )
                }

                {/* Total */}
                <div className='flex justify-between px-2'>
                    <span>รวม</span>
                    <span>{numberFormat(getTotalPrice())}</span>
                </div>

                {/* Button */}
                <Link to='/cart'>
                    <button className='mt-2 py-2 bg-green-500 hover:bg-green-700 w-full 
                text-white rounded shadow-md'>
                        ดำเนินการชำระเงิน
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CartCard
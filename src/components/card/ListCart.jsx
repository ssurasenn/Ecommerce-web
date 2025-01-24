import React from 'react'
import { ListChecks } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number';
const ListCart = () => {
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    const navigate = useNavigate()


    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success('บันทึกสินค้าใส่ตะกร้าเรียยบร้อยแล้วค่ะ')
                navigate('/checkout')
            })
            .catch((err) => {
                console.log('err---', err)
                toast.warning(err.response.data.message)
            })
    }

    return (
        <div className='bg-gray-200 rounded-md p-4 '>
            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <ListChecks size={38} />
                <p className='text-2xl font-bold'>รายการสินค้า: {cart.length} รายการ</p>
            </div>
            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2'>
                    {/* Card */}
                    {cart.map((item, index) =>
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
                                        <p className='text-sm'>{numberFormat(item.price)} x {item.count}</p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div>
                                    <div className='flex text-center font-bold text-blue-400 mr-3 mt-3'>
                                        {numberFormat(item.price)} * {item.count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>

                {/* Right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-3'>
                    <p className='text-2xl font-bold'>ยอดรวม</p>
                    <div className='flex justify-between'>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl'>{numberFormat(getTotalPrice())}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {user
                            ? <Link>
                                <button
                                    disabled= {cart.length < 1}
                                    onClick={handleSaveCart}
                                    className='bg-red-500 w-full rounded-md
                    text-white py-2 shadow-md hover:bg-red-600 '>
                                    สั่งซื้อ
                                </button>
                            </Link>
                            : <Link to={'/login'}>
                                <button className='bg-blue-500 w-full rounded-md
                    text-white py-2 shadow-md hover:bg-blue-600 '>
                                    Login
                                </button>
                            </Link>

                        }

                        <Link to={'/shop'}>
                            <button className='bg-gray-400 w-full rounded-md
                    text-white py-2 shadow-md hover:bg-gray-500 '>
                                แก้ไขสินค้า
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCart
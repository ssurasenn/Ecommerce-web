import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { dateFormat } from '../../utils/dateFormat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])
  // console.log(token)
  useEffect(() => {
    //code
    hdlgetOrder(token)
  }, [])

  const hdlgetOrder = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res)
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Process':
        return 'bg-gray-300'
      case 'Processing':
        return 'bg-blue-300'
      case 'Completed':
        return 'bg-green-300'
      case 'Canceled':
        return 'bg-red-300'
    }
  }
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Order History</h1>
      {/* คลุม  */}
      <div className='space-y-4'>
        {/* card loop order*/}
        {
          orders?.map((item, index) => {
            // console.log(item)
            return (
              <div
                key={index}
                className='bg-gray-100 p-4 rounded-md shadow-md'>
                <div className='space-y-4'>
                  {/*  header*/}
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-sm'> Order Date</p>
                      <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                    </div>
                    <div>
                      <span className={`${getStatusColor(item.orderStatus)} 
                      px-2 py-1 rounded-full cursor-pointer`}>
                        {item.orderStatus}
                      </span>
                    </div>
                  </div>
                  {/* table loop product*/}
                  <div>
                    <table className='border w-full '>
                      <thead>

                        <tr className='bg-blue-100'>
                          <th className='w-1/2'>LIST PRODUCT</th>
                          <th >PRICE</th>
                          <th >QUANTITY</th>
                          <th >TOTAL</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          item.products?.map((product, index) => {
                            // console.log('product--->',product)
                            return (
                              <tr key={index}>
                                <td className='px-2 py-1'>{product.product.title}</td>
                                <td className='text-center'>{numberFormat(product.product.price)}</td>
                                <td className='text-center'>{product.count}</td>
                                <td className='text-center'>{numberFormat(product.count * product.product.price)}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>

                    </table>
                  </div>
                  {/* Total */}
                  <div>
                    <div className='text-right mr-4'>
                      <p className=' test-lg'>Net Price</p>
                      <p className='font-bold test-lg'>{numberFormat(item.cartTotal)}</p>
                    </div>
                  </div>

                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default HistoryCard
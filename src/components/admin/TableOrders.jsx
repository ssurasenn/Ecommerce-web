import React, { useEffect, useState } from 'react'
import { getOrdersAdmin, changeOrderStatus } from '../../api/admin.jsx'
import useEcomStore from '../../store/ecom-store.jsx'
import { toast } from 'react-toastify'
// import  numeral from 'numeral'
import { numberFormat } from '../../utils/number.jsx'
import { dateFormat } from '../../utils/dateFormat.jsx'

const TableOrders = () => {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    hdlGetOrder(token)

  }, [])
  const hdlGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const hdlChangeOrderStatus = (token, orderId, orderStatus) => {
    console.log('orderId, orderStatus--->', orderId, orderStatus)
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res)
        toast.success('Update Status Success!!')
        hdlGetOrder(token)
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
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-200'>
              <th>No.</th>
              <th>User</th>
              <th>Address</th>
              <th>Date</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {
              orders?.map((item, index) => {
                console.log('item--->', item)
                return (
                  <tr key={index} className='border'>
                    <td className='text-center'>{index + 1}</td>
                    <td className='text-center'>{item.orderedBy.email}</td>
                    <td className='text-center'>{item.orderedBy.address}</td>


                    <td className='text-center'>{dateFormat(item.createdAt) }</td>


                    <td className='px-2 py-3'>
                      {
                        item.products?.map((product, index) =>
                          <li key={index}>
                            {product.product.title}
                            <span className='text-sm'> จำนวน : {product.count} x {numberFormat(product.product.price) } </span>
                          </li>
                        )
                      }
                    </td>
                    <td className='text-center'>
                      { numberFormat(item.cartTotal)}
                    </td>

                    <td className='text-center'>
                      <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                        {item.orderStatus}
                      </span>
                    </td>



                    <td className='text-center'>
                      <select
                        value={item.orderStatus}
                        onChange={(e) =>
                          hdlChangeOrderStatus(token, item.id, e.target.value)}
                      >
                        <option>Not Process</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                      </select>

                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default TableOrders
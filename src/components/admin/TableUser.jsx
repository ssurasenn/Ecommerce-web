import React, { useState, useEffect } from 'react'
import {
    getListAllUsers,
    changeUsersStatus,
    changeUsersRole
} from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const TableUser = () => {
    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        hdlGetUsers(token)

    }, [])
    const hdlGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const hdlChangeUsersStatus = (userId, userStatus) => {
        console.log("userId, userStatus--->>", userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUsersStatus(token, value)
            .then((res) => {
                console.log(res)
                hdlGetUsers(token)
                toast.success('Update Status Success!!')
            })
            .catch(err => console.log(err))
    }
    const hdlChangeUsersRole = (userId, userRole) => {

        const value = {
            id: userId,
            role: userRole
        }
        changeUsersRole(token, value)
            .then((res) => {
                console.log(res)
                hdlGetUsers(token)
                toast.success('Update Role Success!!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md">
            <table className='w-full'>
                <thead>
                    <tr className='bg-blue-100'>
                        <th>No.</th>
                        <th>Email</th>
                        <th>Role</th>
                        {/* <th>Last Updated Date</th> */}
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>

                <tbody>
                    {users?.map((item, index) =>
                        <tr key={item.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{item.email}</td>
                            <td className='text-center'>
                                <select 
                                onChange={(e)=>hdlChangeUsersRole(item.id,e.target.value)}
                                value={item.role}>
                                    <option>user</option>
                                    <option>admin</option>
                                </select>
                            </td>
                            {/* <td>{item.updatedAt}</td> */}
                            <td className='text-center'>
                                {item.enabled ? 'Active' : 'Inactive'}
                            </td>
                            <td className='text-center'>
                                <button
                                    className='bg-orange-300 p-1 rounded-md text-white'
                                    onClick={() => hdlChangeUsersStatus(item.id, item.enabled)}>
                                    {item.enabled ? 'Disable' : 'Enable'}
                                </button>
                            </td>
                        </tr>
                    )
                    }

                </tbody>


            </table>
        </div>
    )
}

export default TableUser

import { useEffect, useState } from 'react'
import Title from '../ui/Title'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const status = ["payment", "preparing", "on the way", "delivered"]
    const { data: session } = useSession();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
                setOrders(res.data.filter((order) => order.customer === currentUser?.fullName));
            } catch (err) {
                console.log(err);
            }
        }
        getOrders()
    }, [currentUser])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
                setCurrentUser(res.data.filter((user) => user.email === session.user.email)[0]);
            } catch (err) {
                console.log(err);
            }
        }
        getUsers()
    }, [session])

    console.log(orders)
    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Order</Title>
            <div className='flex w-full md:overflow-visible overflow-x-scroll'>
                <table className="w-full text-sm text-center text-gray-500 mt-5">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">ADDRESS</th>
                            <th scope="col" className="py-3 px-6">DATE</th>
                            <th scope="col" className="py-3 px-6">TOTAL</th>
                            <th scope="col" className="py-3 px-6">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all" key={order._id}>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {order._id.substring(0, 8)}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {order.address}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {order.total}$
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {status[order.status]}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default Order
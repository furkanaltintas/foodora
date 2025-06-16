import { useEffect, useState } from "react"
import Title from "../ui/Title"
import axios from "axios"

const Order = () => {
    const [orders, setOrders] = useState([])
    const status = ["payment", "preparing", "on the way", "delivered"]

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
                setOrders(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getOrders()
    }, [])

    const handleStatus = async (id) => {
        const item = orders.find((order) => order._id === id);
        const currentStatus = item.status;

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { status: currentStatus + 1 });
            setOrders(orders.map((order) => order._id === id ? res.data : order))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Order</Title>
            <div className='flex w-full h-[350px] md:overflow-auto overflow-x-scroll'>
                <table className="w-full text-sm text-center text-gray-500 mt-5 md:min-w-[1000px]">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">PRODUCT</th>
                            <th scope="col" className="py-3 px-6">CUSTOMER</th>
                            <th scope="col" className="py-3 px-6">TOTAL</th>
                            <th scope="col" className="py-3 px-6">PAYMENT</th>
                            <th scope="col" className="py-3 px-6">STATUS</th>
                            <th scope="col" className="py-3 px-6">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 && orders
                                .sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
                                .map((order) => (
                                    <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all" key={order._id}>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                            {order?._id.substring(0, 6)}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                            {order?.customer}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                            {order?.total}$
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                            {order?.method === 0 ? "Cash" : "Card"}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                            {status[order?.status]}
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                            <button
                                                className="btn-primary !bg-success"
                                                onClick={() => handleStatus(order?._id)}
                                                disabled={order?.status === 3}>Next Stage</button>
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
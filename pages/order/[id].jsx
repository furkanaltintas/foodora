import axios from "axios";
import Image from "next/image"

const Index = ({ order }) => {

    const status = order?.status;
    const statusClass = (index) => {
        if (index === status) return "animate-pulse";
        return "";
    }

    return (
        <div className="min-h-[calc(100vh_-_433px)] flex justify-center md:items-center flex-col py-5 md:p-10">
            <div className="flex items-center flex-1 md:w-full max-h-28">
                <table className="w-full text-sm text-center text-gray-500 md:min-w-[1000px]">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">ORDER ID</th>
                            <th scope="col" className="py-3 px-6">CUSTOMER</th>
                            <th scope="col" className="py-3 px-6">ADDRESS</th>
                            <th scope="col" className="py-3 px-6">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all">
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all flex items-center justify-center gap-x-1">
                                {order?._id.substring(0, 6)}
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                {order?.customer}
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                {order?.address}
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                {order?.total}$
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between w-full bg-primary p-10 mt-6">
                <div className={`flex flex-col items-center ${statusClass(0)}`}>
                    <Image src="/images/paid.png" alt="" width={40} height={40} objectFit="contain" />
                    <span>Payment</span>
                </div>
                <div className={`flex flex-col items-center ${statusClass(1)}`}>
                    <Image src="/images/bake.png" alt="" width={40} height={40} objectFit="contain" />
                    <span>Preparing</span>
                </div>
                <div className={`flex flex-col items-center ${statusClass(2)}`}>
                    <Image src="/images/bike.png" alt="" width={40} height={40} objectFit="contain" />
                    <span>On the way</span>
                </div>
                <div className={`flex flex-col items-center ${statusClass(3)}`}>
                    <Image src="/images/delivered.png" alt="" width={40} height={40} objectFit="contain" />
                    <span>Delivered</span>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`);
    return {
        props: {
            order: res.data ? res.data : null
        },
    };
};

export default Index
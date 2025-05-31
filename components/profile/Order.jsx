import Title from '../ui/Title'

const Order = () => {
    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Order</Title>
            <div className='flex w-full md:overflow-visible overflow-x-scroll'>
                <table className="w-full text-sm text-center text-gray-500 md:min-w-[1000px] mt-5">
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
                        <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all">
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                63107...
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                İstanbul
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                01-09-2022
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                20$
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                Preparing
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default Order
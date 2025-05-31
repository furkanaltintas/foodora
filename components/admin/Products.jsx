import Image from 'next/image'
import Title from '../ui/Title'

const Products = () => {
    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Products</Title>
            <div className='flex w-full md:overflow-visible overflow-x-scroll'>
                <table className="w-full text-sm text-center text-gray-500 md:min-w-[1000px] mt-5">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">IMAGE</th>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">TITLE</th>
                            <th scope="col" className="py-3 px-6">PRICE</th>
                            <th scope="col" className="py-3 px-6">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all">
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all flex justify-center">
                                <Image src="/images/f1.png" width={50} height={50} objectFit='cover' />
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                6304e92...
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                Gooz Pizza
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                20$
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                <button className='btn-primary !bg-danger'>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products
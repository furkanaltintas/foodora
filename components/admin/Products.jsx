import Image from 'next/image'
import Title from '../ui/Title'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Products = ({ products, setProducts }) => {
    const getProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            setProducts(res.data);
        } catch (err) {
            console.error("Product fetch failed:", err);
        }
    };

    useEffect(() => {
        getProducts();
    }, [])


    const handleDelete = async (id) => {
        try {
            const confirmDelete = confirm("Are you sure you want to delete this product?");
            if (!confirmDelete) return;

            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
            if (res.status === 200) {
                toast.success("Product deleted successfully");
                // Ürünü localden kaldırmak için filtreleme:
                setProducts((prev) => prev.filter((p) => p._id !== id));
            }
        } catch (err) {
            console.error("Product delete failed:", err);
            toast.error("Failed to delete product");
        }
    };

    return (
        <>
            <Title className="text-[40px] text-center md:text-start">Products</Title>
            <div className='flex w-full h-[350px] md:overflow-auto overflow-x-scroll'>
                <table className="w-full text-sm text-center text-gray-500 mt-5 md:min-w-[1000px]">
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
                        {
                            products.length > 0 && products.map((product) => (
                                <tr key={product._id} className="bg-secondary border-gray-700 hover:bg-primary transition-all">
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all flex justify-center">
                                        <Image src={product.img} width={50} height={50} objectFit='cover' />
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {product._id.substring(0, 8)}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {product.title}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        {product.prices[0]}$
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                        <button className='btn-primary !bg-danger' onClick={() => handleDelete(product._id)}>Delete</button>
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

export default Products
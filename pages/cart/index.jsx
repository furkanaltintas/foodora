import Title from "@/components/ui/Title"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { resetCart } from "@/redux/cartSlice"

const Index = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="min-h-[calc(100vh_-_433px)]">
            <div className="flex justify-between items-center md:flex-row flex-col">
                <div className="w-full md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 md:p-10 overflow-x-auto">
                    <table className="w-full text-sm text-center text-gray-500 md:min-w-[1000px]">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="py-3 px-6">PRODUCT</th>
                                <th scope="col" className="py-3 px-6">EXTRAS</th>
                                <th scope="col" className="py-3 px-6">PRICE</th>
                                <th scope="col" className="py-3 px-6">QUANTITY</th>
                            </tr>
                        </thead>
                        {
                            cart.products.length > 0 ? (
                                <tbody>
                                    {
                                        cart.products.map((product) => (
                                            <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all" key={product.id}>
                                                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all flex items-center justify-center gap-x-1">
                                                    <Image src="/images/f1.png" alt="" width={50} height={50} />
                                                    <span>{product.name}</span>
                                                </td>
                                                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                                    <span>{product.extras.map((item) => item.name).join(", ")}</span>
                                                </td>
                                                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">{product.price}$</td>
                                                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">{product.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all">
                                        <td colSpan={4} className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all text-center">No products</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center">
                    <Title className="text-[40px]">CART TOTAL</Title>

                    <div className="mt-6">
                        <span><b>Subtotal: </b>{cart.total}$</span> <br />
                        <span className="inline-block"><b>Discount: </b>0.00$</span> <br />
                        <span className="inline-block my-1"><b>Total: </b>{cart.total}$</span>
                    </div>

                    <div>
                        <button className="btn-primary mt-4 md:w-auto w-52" onClick={() => dispatch(resetCart())}>CHECKOUT NOW!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
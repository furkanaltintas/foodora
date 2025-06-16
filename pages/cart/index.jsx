import Title from "@/components/ui/Title"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { resetCart } from "@/redux/cartSlice"
import axios from "axios"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const Index = ({ userList }) => {
    const { data: session } = useSession();
    const user = userList.find((user) => user.email === session?.user?.email);
    const router = useRouter();

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const newOrder = {
        customer: user?.fullName,
        address: user?.address ? user?.address : "No Address",
        total: cart.total,
        method: 0,
        status: 0
    };

    const createOrder = async () => {
        try {
            if (session) {
                if (confirm("Are you sure to order ?")) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder);
                    if (res.data) {
                        dispatch(resetCart());
                        toast.success("Order created successfully", { autoClose: 1000 });
                        router.push(`/order/${res.data._id}`)
                    }
                }
            } else {
                toast.error("Please login first", { autoClose: 1000 });
            }
        } catch (err) {
            toast.error("Please login first", { autoClose: 1000 });
            console.log(err);
        }
    }

    return (
        <div className="min-h-[calc(100vh_-_433px)]">
            <div className="flex justify-between items-center md:flex-row flex-col">
                <div className="w-full md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 md:p-10 overflow-x-auto">
                    <div className="max-h-52 overflow-auto w-full">
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
                                cart?.products?.length > 0 ? (
                                    <tbody>
                                        {
                                            cart.products.map((product, index) => (
                                                <tr className="bg-secondary border-gray-700 hover:bg-primary transition-all" key={index}>
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all flex items-center justify-center gap-x-1">
                                                        <Image src={product.img} alt="" width={50} height={50} />
                                                        <span>{product.title}</span>
                                                    </td>
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white transition-all">
                                                        {
                                                            product.extras.length > 0 ? (
                                                                <span>{product.extras.map((item) => item.text).join(", ")}</span>
                                                            ) : (
                                                                <span>no extras</span>
                                                            )
                                                        }
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
                </div>
                <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center">
                    <Title className="text-[40px]">CART TOTAL</Title>

                    <div className="mt-6">
                        <span><b>Subtotal: </b>{cart.total}$</span> <br />
                        <span className="inline-block"><b>Discount: </b>0.00$</span> <br />
                        <span className="inline-block my-1"><b>Total: </b>{cart.total}$</span>
                    </div>

                    <div>
                        <button className="btn-primary mt-4 md:w-auto w-52" onClick={createOrder}>CHECKOUT NOW!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

    return {
        props: {
            userList: res.data ? res.data : []
        },
    };
};

export default Index
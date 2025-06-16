import AddProduct from "@/components/admin/AddProduct"
import Categories from "@/components/admin/Categories"
import Footer from "@/components/admin/Footer"
import Order from "@/components/admin/Order"
import Products from "@/components/admin/Products"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Profile = () => {
    const { push } = useRouter()
    const [tabs, setTabs] = useState(0)
    const [isReady, setIsReady] = useState(false) // yüklenme kontrolü
    const [isProductModal, setIsProductModal] = useState(false)

    const [products, setProducts] = useState([])

    const closeAdminAccount = async () => {
        try {
            if (confirm("Are you sure you want to log out?")) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
                if (res.status === 200) {
                    push("/admin")
                    toast.success("Admin account closed.")
                }
            }
        } catch (err) {
            console.log(err);

        }
    }

    // İlk render'da localStorage'dan tabs değerini al
    useEffect(() => {
        const oldTabs = localStorage.getItem("adminTabs")
        if (oldTabs) {
            setTabs(Number(oldTabs))
        }
        setIsReady(true) // veri okuma tamamlandı
    }, [])

    // tabs değiştiğinde localStorage'a yaz
    useEffect(() => {
        if (isReady) {
            localStorage.setItem("adminTabs", tabs)
        }
    }, [tabs, isReady])

    const activeTabs = (newTabs) => {
        const activeClassName = `border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${newTabs === tabs ? "bg-primary text-white" : ""} `;
        return activeClassName;
    }

    return (
        <div className="flex p-10 lg:flex-row flex-col">
            <div className="lg:w-80 w-full flex-shrink-0">
                <div className="md:border relative flex flex-col items-center px-10 py-5">
                    <Image src="/images/admin.png" alt="" width={100} height={100} objectFit="cover" className="rounded-full hover:scale-105 transition-all cursor-pointer" />
                    <b className="text-2xl mt-1 cursor-pointer">Admin</b>
                </div>
                <ul className="">
                    <li className={activeTabs(0)} onClick={() => setTabs(0)}>
                        <i className="fa fa-cutlery"></i>
                        <button className="ml-2">
                            Products
                        </button>
                    </li>
                    <li className={activeTabs(1)} onClick={() => setTabs(1)}>
                        <i className="fa fa-shopping-cart"></i>
                        <button className="ml-2">
                            Orders
                        </button>
                    </li>
                    <li className={activeTabs(2)} onClick={() => setTabs(2)}>
                        <i className="fa fa-book"></i>
                        <button className="ml-2">
                            Categories
                        </button>
                    </li>
                    <li className={activeTabs(3)} onClick={() => setTabs(3)}>
                        <i className="fa fa-pencil"></i>
                        <button className="ml-2">
                            Footer
                        </button>
                    </li>
                    <li className={activeTabs(4)} onClick={closeAdminAccount}>
                        <i className="fa fa-sign-out"></i>
                        <button className="ml-2">
                            Exit
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <div className="py-5 md:px-10">
                    {
                        !isReady ? (
                            <div className="flex justify-center items-center h-96">
                                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                            </div>
                        ) : (
                            tabs === 0 ? <Products products={products} setProducts={setProducts} /> : tabs === 1 ? <Order /> : tabs === 2 ? <Categories /> : tabs === 3 ? <Footer /> : null
                        )
                    }
                    {
                        isProductModal && (
                            <AddProduct setIsProductModal={setIsProductModal} setProducts={setProducts} />
                        )
                    }
                    <button className="btn-primary w-12 h-12 !p-0 absolute bottom-14 right-10 text-4xl" onClick={() => setIsProductModal(true)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.token
    if (!token) {
        return {
            redirect: {
                destination: "/admin",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default Profile
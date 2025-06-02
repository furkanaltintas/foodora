import Account from "@/components/profile/Account"
import Order from "@/components/profile/Order"
import Password from "@/components/profile/Password"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Index = ({ user }) => {
    const { data: session } = useSession()
    const [tabs, setTabs] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const { push } = useRouter()

    const handleSignOut = async () => {
        if (confirm("Are you sure you want to sign out?")) {
            toast.success("You have successfully logged out.")
            await signOut({ redirect: false })
            await new Promise((resolve) => setTimeout(resolve, 500))
            localStorage.removeItem("tabs")
            push("/auth/login")
        }
    }

    useEffect(() => {
        if (!session) {
            push("/auth/login")
        }
    }, [session, push])

    useEffect(() => {
        const storedTab = localStorage.getItem("tabs")
        if (storedTab) {
            setTabs(Number(storedTab))
        }
        setIsReady(true)
    }, [])

    useEffect(() => {
        if (isReady) {
            localStorage.setItem("tabs", tabs)
        }
    }, [tabs, isReady])

    const activeTabs = (index) =>
        `border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${index === tabs ? "bg-primary text-white" : ""
        }`

    const renderTabContent = () => {
        switch (tabs) {
            case 0:
                return <Account user={user} />
            case 1:
                return <Password user={user} />
            case 2:
                return <Order user={user} />
            default:
                return null
        }
    }

    return (
        <div className="flex p-10 lg:flex-row flex-col">
            <aside className="lg:w-80 w-full flex-shrink-0">
                <div className="md:border relative flex flex-col items-center px-10 py-5">
                    <Image
                        src={user.image ? user.image : "/images/admin.png"}
                        alt="Profile"
                        width={100}
                        height={100}
                        objectFit="cover"
                        className="rounded-full hover:scale-105 transition-all cursor-pointer"
                    />
                    <b className="text-2xl mt-1 cursor-pointer">{user.fullName}</b>
                </div>
                <ul>
                    <li className={activeTabs(0)} onClick={() => setTabs(0)}>
                        <i className="fa fa-home" /> <span className="ml-2">Account</span>
                    </li>
                    <li className={activeTabs(1)} onClick={() => setTabs(1)}>
                        <i className="fa fa-key" /> <span className="ml-2">Password</span>
                    </li>
                    <li className={activeTabs(2)} onClick={() => setTabs(2)}>
                        <i className="fa fa-shopping-cart" /> <span className="ml-2">Orders</span>
                    </li>
                    <li className={activeTabs(3)} onClick={handleSignOut}>
                        <i className="fa fa-sign-out" /> <span className="ml-2">Exit</span>
                    </li>
                </ul>
            </aside>
            <main className="flex-1 py-5 md:px-10">
                {!isReady ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                    </div>
                ) : (
                    renderTabContent()
                )}
            </main>
        </div>
    )
}

export async function getServerSideProps({ req, params }) {
    console.log("params", params)
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`)

    return {
        props: {
            user: user ? user.data : null,
        },
    }
}

export default Index

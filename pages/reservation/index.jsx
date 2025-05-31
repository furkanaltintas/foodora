import Reservation from "@/components/Reservation"
import Head from "next/head"

const Index = () => {
    return (
        <>
            <Head>
                <title>Foodora | Reservation</title>
            </Head>
            <div>
                <Reservation />
            </div>
        </>
    )
}

export default Index
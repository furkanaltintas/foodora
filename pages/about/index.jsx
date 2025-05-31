import About from "@/components/About"
import Head from "next/head"

const Index = () => {
    return (
        <>
        <Head>
            <title>Foodora | About</title>
        </Head>
            <div>
                <About backgroundColor="bg-white" color="text-black" />
            </div>
        </>
    )
}

export default Index
import MenuWrapper from "@/components/product/MenuWrapper"
import Head from "next/head"

const Index = () => {
    return (
        <>
            <Head>
                <title>Foodora | Menu</title>
            </Head>
            <div className="pt-10">
                <MenuWrapper />
            </div></>
    )
}

export default Index
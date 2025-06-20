import MenuWrapper from "@/components/product/MenuWrapper"
import axios from "axios";
import Head from "next/head"

const Index = ({categoryList, productList}) => {
    return (
        <>
            <Head>
                <title>Foodora | Menu</title>
            </Head>
            <div className="pt-10">
                <MenuWrapper categoryList={categoryList} productList={productList} />
            </div></>
    )
}

export const getServerSideProps = async (context) => {
    const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

    return {
        props: {
            categoryList: category.data ? category.data : [],
            productList: product.data ? product.data : [],
        },
    };
};

export default Index
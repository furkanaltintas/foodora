import { useEffect, useState } from "react"
import Title from "../ui/Title"
import MenuItem from "./MenuItem"

const MenuWrapper = ({ categoryList, productList }) => {
    const [active, setActive] = useState(-1)
    const [filter, setFilter] = useState([])
    const [visibleCount, setVisibleCount] = useState(3)

    useEffect(() => {
        setVisibleCount(3)
    }, [filter]) // Yeni filtre geldiğinde sıfırla

    useEffect(() => {
        if (active === -1) {
            setFilter(productList)
            return;
        }
        setFilter(productList.filter((product) => product.category === categoryList[active].title.toLowerCase()))
    }, [categoryList, productList, active])

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center mb-16">
                <Title className="text-[40px]">Our Menu</Title>
                <div className="mt-10">
                    <button
                        key={0}
                        onClick={() => {
                            setActive(-1);
                            setVisibleCount(3);
                        }}
                        className={`px-6 py-2 rounded-3xl ${active === -1 ? "bg-secondary text-white" : "bg-white text-secondary"}`}>All</button>
                    {
                        filter && categoryList.map((category, index) => (
                            <button
                                key={category._id}
                                onClick={() => setActive(index)}
                                className={`px-6 py-2 rounded-3xl ${active === index ? "bg-secondary text-white" : "bg-white text-secondary"}`}>{category.title}</button>
                        ))
                    }
                </div>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10 place-content-center">
                    {
                        filter.length > 0 ? (
                            filter.slice(0, visibleCount).map((product) => (
                                <MenuItem product={product} key={product._id} />
                            ))
                        ) : (
                            <div className="col-span-3 flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold">No products found</p>
                            </div>
                        )
                    }
                </div>
                {
                    visibleCount < filter.length && (
                        <div className="flex justify-center items-center w-full">
                            <button
                                className="btn-primary mt-4"
                                onClick={() => setVisibleCount(prev => prev + 3)}>
                                View More
                            </button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default MenuWrapper
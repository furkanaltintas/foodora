import Title from "../ui/Title"
import MenuItem from "./MenuItem"

const MenuWrapper = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center mb-16">
                <Title className="text-[40px]">Our Menu</Title>
                <div className="mt-10">
                    <button className="px-6 py-2 rounded-3xl bg-secondary text-white">All</button>
                    <button className="px-6 py-2 rounded-3xl">Burger</button>
                    <button className="px-6 py-2 rounded-3xl">Pizza</button>
                    <button className="px-6 py-2 rounded-3xl">Drink</button>
                </div>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                </div>
            </div>
        </div>
    )
}

export default MenuWrapper
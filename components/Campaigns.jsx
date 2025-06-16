import Image from "next/image";
import Title from "./ui/Title";
import { FaShoppingCart } from "react-icons/fa";

const CampaignItem = () => {
    return <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4 mb-5 sm:mb-0">
        <div className="relative md:w-44 md:h-44 w-40 h-40 after:content-[''] after:absolute after:w-full after:h-full after:border-[5px] after:border-primary after:rounded-full overflow-hidden">
            <Image src="/images/f6.png" alt="f1" fill priority className="hover:scale-105 transition-all duration-200" />
        </div>
        <div className="text-white">
            <Title className="text-2xl">Tasty Thursdays</Title>
            <div className="font-dancing my-1">
                <span className="text-[40px]">20% </span>
                <span className="text-sm inline-block ml-1">Off</span>
            </div>
            <button className="btn-primary flex items-center gap-x-2">
                Order Now <FaShoppingCart size={15} />
            </button>
        </div>
    </div>
}

const Campaigns = () => {
    return (
        <div className="sm:flex justify-between container mx-auto py-20 gap-6">
            <CampaignItem />
            <CampaignItem />
        </div>
    )
}

export default Campaigns;
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";

const Search = ({ setIsSearchModal }) => {

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen
         after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
            <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
                <div className="w-full h-full grid place-content-center">
                    <div className="relative z-50  md:w-[600px] w-[400px] bg-white border-2 p-10 rounded-3xl">
                        <Title className="text-[40px] text-center">Search</Title>
                        <input type="text" placeholder="Search..." className="border border-primary w-full p-3 my-10" />
                        <div>
                            <ul className="mt-10">
                                <li className="flex items-center justify-between p-2 hover:bg-primary transition-all">
                                    <div className="relative w-10 h-10">
                                        <Image src="/images/f1.png" alt="" width={48} height={48} />
                                    </div>
                                    <span className="font-bold">Good Pizza</span>
                                    <span className="font-bold">$10</span>
                                </li>
                                <li className="flex items-center justify-between p-2 hover:bg-primary transition-all">
                                    <div className="relative w-10 h-10">
                                        <Image src="/images/f2.png" alt="" width={48} height={48} />
                                    </div>
                                    <span className="font-bold">Delicious Burger</span>
                                    <span className="font-bold">$15</span>
                                </li>
                                <li className="flex items-center justify-between p-2 hover:bg-primary transition-all">
                                    <div className="relative w-10 h-10">
                                        <Image src="/images/f3.png" alt="" width={48} height={48} />
                                    </div>
                                    <span className="font-bold">Delicious Pizza</span>
                                    <span className="font-bold">$10</span>
                                </li>
                            </ul>
                            <button className="absolute top-4 right-4" onClick={() => setIsSearchModal(false)}>
                                <GiCancel size={23} className="hover:text-primary transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default Search
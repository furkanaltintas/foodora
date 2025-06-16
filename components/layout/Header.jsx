import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
    const [isSearchModal, setIsSearchModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);
    const cart = useSelector((state) => state.cart);

    const router = useRouter();

    // Aktif olan sayfayı kontrol etmek için fonksiyon
    const isActive = (path) => router.asPath === path && 'text-primary';

    return (
        <div className={`h-[5.5rem] z-50 absolute w-full ${router.asPath === '/' ? 'bg-transparent' : 'bg-red-800 !fixed'}`}>
            <div className="container mx-auto text-white flex justify-between items-center h-full">
                <Logo />
                <nav className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden z-50 ${isMenuModal === true && '!grid place-content-center'}`}>
                    <ul className="flex uppercase gap-x-2 sm:flex-row flex-col items-center">
                        <li
                            className={`px-[5px] py-[20px] hover:text-primary transition-all cursor-pointer ${isActive('/')}`}
                            onClick={() => setIsMenuModal(false)}>
                            <Link href="/">Home</Link>
                        </li>
                        <li
                            className={`px-[5px] py-[20px] hover:text-primary transition-all cursor-pointer ${isActive('/menu')}`}
                            onClick={() => setIsMenuModal(false)}>
                            <Link href="/menu">Menu</Link>
                        </li>
                        <li
                            className={`px-[5px] py-[20px] hover:text-primary transition-all cursor-pointer ${isActive('/about')}`}
                            onClick={() => setIsMenuModal(false)}>
                            <Link href="/about">About</Link>
                        </li>
                        <li
                            className={`px-[5px] py-[20px] hover:text-primary transition-all cursor-pointer ${isActive('/reservation')}`}
                            onClick={() => setIsMenuModal(false)}>
                            <Link href="/reservation">Book Table</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex gap-x-4 items-center">
                    <Link href="/profile" className={(router.asPath.includes("profile") || router.asPath.includes("auth")) && "text-primary"}>
                        <FaUserAlt className="hover:text-primary transition-all cursor-pointer" />
                    </Link>
                    <Link href="/cart" className={isActive("/cart")}>
                        <span className="relative">
                            <FaShoppingCart className="hover:text-primary transition-all cursor-pointer" />
                            {cart.products.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:scale-125 transition-all duration-300">
                                    {cart.products.length}
                                </span>
                            )}
                        </span>
                    </Link>
                    <button onClick={() => setIsSearchModal(true)}>
                        <FaSearch className="hover:text-primary transition-all" />
                    </button>
                    <Link href="#" className="md:inline-block hidden">
                        <button className="btn-primary">Order Online</button>
                    </Link>
                    <button className="sm:hidden inline-block" onClick={() => setIsMenuModal(true)}>
                        <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
                    </button>
                    {isMenuModal && (
                        <button className="absolute top-4 right-4 z-50" onClick={() => setIsMenuModal(false)}>
                            <GiCancel size={25} className="text-black hover:text-primary transition-all" />
                        </button>
                    )}
                </div>
            </div>
            {isSearchModal && (
                <Search setIsSearchModal={setIsSearchModal} />
            )}
        </div>
    );
}

export default Header
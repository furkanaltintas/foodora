import Image from "next/image";
import Slider from "react-slick";
import Title from "./ui/Title";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoPlaySpeed: 10000,
        vertical: false,
        appendDots: dots => (
            <div>
                <ul>{dots}</ul>
            </div>
        ),
        customPaging: (i) => (
            <div className=" w-4 h-2 bg-white rounded-full hidden sm:block"></div>
        )
    };

    return (
        <div className="h-screen w-full -mt-[88px] relative">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="relative h-full w-full">
                    <Image src="/images/slider.jpg" alt="slider" fill priority objectFit="cover" />
                </div>
            </div>
            <Slider {...settings}>
                <div>
                    <div className="container mx-auto mt-48 text-white flex flex-col items-start gap-y-10">
                        <Title className="text-6xl">Fast Food Restaurant</Title>
                        <p className="text-sm sm:w-2/5 w-full">
                            Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia
                            laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat
                            dolore, iste magni quos nihil ducimus libero ipsam.
                        </p>
                        <button className="btn-primary">Order Now</button>
                    </div>
                </div>
                <div>
                    <div className="container mx-auto mt-48 text-white flex flex-col items-start gap-y-10">
                        <Title className="text-5xl">Fast Food Restaurant</Title>
                        <p className="text-sm sm:w-2/5 w-full">
                            Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia
                            laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat
                            dolore, iste magni quos nihil ducimus libero ipsam.
                        </p>
                        <button className="btn-primary">Order Now</button>
                    </div>
                </div>
                <div>
                    <div className="container mx-auto mt-48 text-white flex flex-col items-start gap-y-10">
                        <Title className="text-5xl">Fast Food Restaurant</Title>
                        <p className="text-sm sm:w-2/5 w-full">
                            Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia
                            laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat
                            dolore, iste magni quos nihil ducimus libero ipsam.
                        </p>
                        <button className="btn-primary">Order Now</button>
                    </div>
                </div>
            </Slider>
        </div >
    )
}

export default Carousel
import Image from "next/image"
import Title from "./ui/Title"

const About = ({ backgroundColor = "bg-secondary", color = "text-white" }) => {
    return (
        <div className={`${backgroundColor} py-14`}>
            <div className={`container mx-auto flex items-center ${color} gap-20 justify-center flex-wrap-reverse`}>
                <div className="flex justify-center hidden sm:block">
                    <div className="relative sm:w-[445px] sm:h-[600px] w-[300px] h-[500px] flex justify-center">
                        <Image src="/images/about-img.png" alt="img" fill />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <Title className="text-[40px]">We Are Feane</Title>
                    <p className="text-[16px] my-5">
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by injected humour,
                        or randomised words which don't look even slightly believable.
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of text. All
                    </p>
                    <button className="btn-primary">Read More</button>
                </div>
            </div>
        </div>
    )
}

export default About
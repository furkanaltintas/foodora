import Link from "next/link"
import Title from "../ui/Title"

const Footer = () => {
  return <div className="bg-secondary text-white">
    <div className="container mx-auto pt-16 pb-16">
      <div className="flex flex-wrap md:gay-y-0 gap-y-6 md:justify-between justify-center text-center">
        <div className="md:flex-1">
          <Title className="text-[30px]">Contact Us</Title>
          <div className="flex flex-col gap-y-2 mt-3">
            <div>
              <i className="fa fa-map-marker"></i>
              <span className="inline-block ml-2">Location</span>
            </div>
            <div>
              <span>
                <i className="fa fa-phone"></i>
                <span className="inline-block ml-2">Call +1 123 456 789</span>
              </span>
            </div>
            <div>
              <span>
                <i className="fa fa-envelope"></i>
                <span className="inline-block ml-2">demo@gmail.com</span>
              </span>
            </div>
          </div>
        </div>
        <div className="md:flex-1">
          <Title className="text-[30px]">
            <Link href="/" className="hover:text-primary transition cursor-pointer">Foodora</Link>
          </Title>
          <div className="flex flex-col gap-y-2 mt-3">
            <p>
              Necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with
            </p>
            <div className="flex justify-center items-center gap-x-2 mt-6">
              <a href="#" className="bg-white rounded-full w-8 h-8 text-secondary grid place-content-center hover:bg-primary transition-all duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 text-secondary grid place-content-center hover:bg-primary transition-all duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 text-secondary grid place-content-center hover:bg-primary transition-all duration-200">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 text-secondary grid place-content-center hover:bg-primary transition-all duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 text-secondary grid place-content-center hover:bg-primary transition-all duration-200">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="md:flex-1">
          <Title className="text-[30px]">Opening Hours</Title>
          <div className="flex flex-col gap-y-2 mt-3">
            <div>
              <span className="inline-block ml-2">Everyday</span>
              <p>10.00 Am - 10.00 Pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-center">@ {new Date().getFullYear()} All Rights Reserved By <Link href="/" className="text-primary underline underline-offset-1">Foodora</Link></p>
      </div>
    </div>
  </div>
}

export default Footer
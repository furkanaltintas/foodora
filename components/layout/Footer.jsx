import Link from "next/link"
import Title from "../ui/Title"
import { useEffect, useState } from "react"
import axios from "axios";

const Footer = () => {
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
        console.log(res.data)
        setFooter(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getFooter();
  }, [])

  return <div className="bg-secondary text-white">
    <div className="container mx-auto pt-16 pb-16">
      <div className="flex flex-wrap md:gay-y-0 gap-y-6 md:justify-between justify-center text-center">
        <div className="md:flex-1">
          <Title className="text-[30px]">Contact Us</Title>
          <div className="flex flex-col gap-y-2 mt-3">
            <a href={footer?.location} target="_blank" rel="noreferrer">
              <i className="fa fa-map-marker"></i>
              <span className="inline-block ml-2">Location</span>
            </a>
            <a href={`tel:${footer?.phoneNumber}`}>
              <i className="fa fa-phone"></i>
              <span className="inline-block ml-2">Call +90 {footer?.phoneNumber}</span>
            </a>
            <a href={`mailto:${footer?.email}`}>
              <i className="fa fa-envelope"></i>
              <span className="inline-block ml-2">{footer?.email}</span>
            </a>
          </div>
        </div>
        <div className="md:flex-1">
          <Title className="text-[30px]">
            <Link href="/" className="hover:text-primary transition cursor-pointer">Foodora</Link>
          </Title>
          <div className="flex flex-col gap-y-2 mt-3">
            <p>
              {footer?.desc}
            </p>
            <div className="flex justify-center items-center gap-x-2 mt-6">
              {
                footer?.socialMedia?.map((item) => (
                  <a 
                  href={item.link} 
                  key={item._id} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-white rounded-full w-8 h-8 text-secondary grid place-content-center hover:bg-primary hover:text-white transition-all duration-200">
                    <i className={item.icon}></i>
                  </a>
                ))
              }
            </div>
          </div>
        </div>
        <div className="md:flex-1">
          <Title className="text-[30px]">Opening Hours</Title>
          <div className="flex flex-col gap-y-2 mt-3">
            <div>
              <span className="inline-block ml-2">{footer?.openingHours?.day}</span>
              <p>{footer?.openingHours?.hour}</p>
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
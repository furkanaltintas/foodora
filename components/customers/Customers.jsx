import Title from '../ui/Title'
import CustomerItem from './CustomerItem'
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Customers = () => {

  function NextBtn({ onClick }) {
    return <button className='' onClick={onClick}>
      <IoIosArrowForward className='text-white  bg-primary absolute -bottom-12 left-1/2 flex items-center justify-center w-10 h-10 rounded-full ml-5' />
    </button>;
  }

  function PrevBtn({ onClick }) {
    return <button className='' onClick={onClick}>
      <IoIosArrowBack className='text-white  bg-primary absolute -bottom-12 right-1/2 flex items-center justify-center w-10 h-10 rounded-full mr-5' />
    </button>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className='container mx-auto mb-20 mt-12'>
      <Title className="text-[40px] text-center mb-10">What Says Our Customers</Title>
      <div>
        <Slider {...settings}>
          <CustomerItem imgSrc="/images/client1.jpg" className="ml-auto" />
          <CustomerItem imgSrc="/images/client2.jpg" className="mr-auto" />
          <CustomerItem imgSrc="/images/client2.jpg" className="ml-auto"/>
          <CustomerItem imgSrc="/images/client2.jpg" className="mr-auto" />
        </Slider>

      </div>
    </div>
  )
}

export default Customers
import About from '@/components/About'
import Campaigns from '@/components/Campaigns'
import Carousel from '@/components/Carousel'
import Customers from '@/components/customers/Customers'
import MenuWrapper from '@/components/product/MenuWrapper'
import Reservation from '@/components/Reservation'
import React from 'react'

const Index = () => {
  return (
    <>
      <Carousel />
      <Campaigns />
      <MenuWrapper />
      <About />
      <Reservation />
      <Customers />
    </>
  )
}

export default Index


/*
Bu dosya, ana sayfa içeriğini oluşturuyor. Slider, kampanyalar, menü, hakkımızda
gibi bileşenleri gösteriyor.
Burası sayfanın UI kısmını oluşturuyor ama <title> gibi <head> içeriği burada tanımlanmamış.
*/
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import images from '../assets/images';
import { getSlides } from "../services/api";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Slider = () => {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    getSlides().then(data =>{ setSlides(data)});
  }, []);
  return (
    <div className="h-72 lg:h-96 w-full mb-4">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}
        containerClass="carousel-container min-h-full"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        sliderClass="h-full"
        itemClass="carousel-item-padding-40-px h-72 lg:h-96">
          {slides.map((slide, index) => (
            <div key={index} className="relative bg-black h-full w-full">
              <img src={images[slide.img]} alt={slide.title} className="opacity-80 object-cover h-full w-full" />
              <div className="absolute top-0 bottom-0 right-0 left-0 text-right py-10 px-6 lg:px-32">
                <div className="text-primary font-light text-base lg:text-xl uppercase">{slide.tag}{ slide.access == 'subscription' ? ' | Premium' : ''}</div>
                <h2 className="text-white text-xl lg:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="w-full lg:w-1/2 ml-auto text-white font-bold text-lg md:text-3xl leading-8">{slide.text}</p>
                <Link to={`/${slide.type == 'promocion' ? 'promociones' : (slide.type == 'producto' ? 'productos' : 'ofertas')}/${slide.id}`} className="bg-primary px-6 py-1 mt-4 inline-block font-light text-lg uppercase">Ver más</Link>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import images from '../assets/images';

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
    fetch(`${import.meta.env.VITE_API_URL}/slides`)
      .then(response => response.json())
      .then(data =>{ setSlides(data)});
  }, []);
  return (
    <div className="h-96 w-full">
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
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
          {slides.map((slide, index) => (
            <div key={index} className="relative bg-black">
              <img src={images[slide.img]} alt={slide.title} className="opacity-80" />
              <div className="absolute top-0 bottom-0 right-0 left-0 text-right py-10 px-32">
                <div className="text-primary font-light text-xl uppercase">{slide.tag}</div>
                <h2 className="text-white text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="w-1/2 ml-auto text-white font-bold text-3xl leading-8">{slide.text}</p>
                <Link to={`/${slide.type}/${slide.id}`} className="bg-primary px-6 py-1 mt-4 inline-block font-light text-lg uppercase">Ver más</Link>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
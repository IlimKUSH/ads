import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Image } from '../../models/ads';

interface SwiperProps {
  images: Image[];
}

const Swiper: React.FC<SwiperProps> = ({ images }) => (
  <Carousel
    showArrows
    swipeable
    autoPlay
    emulateTouch
    infiniteLoop
    showThumbs={false}
    interval={5000}
    dynamicHeight
  >
    {images?.map((image, index) => (
      <Box
        component="img"
        src={image.image}
        sx={{
          width: '100%',
          height: '30%',
          objectFit: 'cover',
        }}
        alt={`Slide ${index}`}
      />
    ))}
  </Carousel>
);

export default Swiper;

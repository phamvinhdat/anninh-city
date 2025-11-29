import React from "react";
import { Carousel, Card } from "antd";

export const Banner: React.FC = () => (
  <Carousel
    autoplay
    autoplaySpeed={4000}
    dots
    draggable
    arrows
    className="carousel-style"
  >
    <Card cover={<img src="/images/1.png" alt="welcome 1" />} />
    <Card cover={<img src="/images/2.png" alt="welcome 2" />} />
    <Card cover={<img src="/images/3.png" alt="welcome 3" />} />
  </Carousel>
);

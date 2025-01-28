"use client";
import "./Panelhome.css";
import { Carousel } from "react-bootstrap";
import mob1 from "../../../public/Images/new/home/1-banner/mob1.webp";
import desc1 from "../../../public/Images/new/home/1-banner/desc1.webp";
import mob2 from "../../../public/Images/new/home/1-banner/mob2.webp";
import desc2 from "../../../public/Images/new/home/1-banner/desc2.webp";
export default function Panelhome() {
  return (
    <section className="hero-section">
      <Carousel className="slider">
        <Carousel.Item className="slider-item">
          <picture>
            <source media="(max-width: 767px)" srcSet={mob1.src} />
            <source
              media="(min-width: 766px) and (max-width: 1230px)"
              srcSet={desc1.src}
            />
            <img src={desc1.src} alt="frada ksa" />
          </picture>
        </Carousel.Item>
        <Carousel.Item className="slider-item">
          <picture>
            <source media="(max-width: 767px)" srcSet={mob2.src} />
            <source
              media="(min-width: 766px) and (max-width: 1230px)"
              srcSet={desc2.src}
            />
            <img src={desc2.src} alt="frada ksa" />
          </picture>
        </Carousel.Item>
      </Carousel>
      <div className="caption">
        <h5>إحصــل علــي إطلالــة رجاليــة لا تنســي</h5>
        <h6>&quot;رجــال واثقــون&quot;</h6>
        <button className="btn">تسـوق الأن</button>
      </div>
    </section>
  );
}

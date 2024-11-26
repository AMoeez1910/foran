import Image from "next/image";
import React, { useEffect } from "react";
import Typography from "../typography";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles.module.css";
import AutoScroll from "embla-carousel-auto-scroll";
const logos = [
  { src: `/images/1.png` },

  { src: `/images/2.png` },
  {
    src: `/images/3.png`,
  },
  {
    src: `/images/4.png`,
  },

  {
    src: `/images/5.png`,
  },

  {
    src: `/images/6.png`,
  },
];

export default function CompaniesMarquee() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      playOnInit: true,
      startDelay: 0,
      speed: 0.75,
      stopOnInteraction: false,
    }),
  ]);
  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    emblaApi
      .on("autoScroll:play", () => {})
      .on("autoScroll:stop", () => {})
      .on("reInit", () => {});
  }, [emblaApi]);
  const handleMouseEnter = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    autoScroll?.stop();
  };
  const handleMouseLeave = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    autoScroll?.play();
  };
  return (
    <section className={styles.embla}>
      <div
        className={`${styles.embla__viewport}`}
        ref={emblaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <div className={styles.embla__container}>
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`${styles.embla__slide} flex items-center justify-center`}
            >
              <Image
                src={logo.src}
                width={300}
                height={100}
                alt={"Company Logo"}
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

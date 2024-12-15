import React from "react";
import styles from "./styles.module.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Card from "../card";
import { DotButton, useDotButton } from "./DotButton";
export default function TestimonialsCarousel({
  cardInfo,
}: {
  cardInfo: {
    titleTop: string;
    titleBottom: string;
    description: string;
  }[];
}) {
  const options = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <section
      className={`${styles.embla} mt-[1.5rem] sm:mr-0 -mr-[1rem] md:mt-[1rem] gap-3  `}
    >
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {cardInfo.map((card, idx) => (
            <div
              className={`${styles.embla__slide} ${
                idx !== selectedIndex ? "cursor-pointer" : ""
              }`}
              key={idx}
              onClick={() => {
                const cardCount = cardInfo.length;
                if (idx > selectedIndex) {
                  if (idx === cardCount - 1 && selectedIndex === 0) {
                    emblaApi?.scrollPrev();
                  } else {
                    emblaApi?.scrollTo(idx);
                  }
                } else if (idx < selectedIndex) {
                  if (selectedIndex === cardCount - 1 && idx === 0) {
                    emblaApi?.scrollNext();
                  } else {
                    emblaApi?.scrollTo(idx);
                  }
                }
              }}
            >
              <Card
                key={idx}
                variant="work"
                className={`md:w-auto max-md:w-full bg-[#f2f5f8] sm:p-8 xl:p-12 h-full
                     ${
                       selectedIndex === idx
                         ? "shadow-large scale-100"
                         : "scale-95 opacity-60"
                     } transition-transform duration-300 ease-in-out
                  `}
                cardInfo={card}
                header={
                  <Card.Header className="max-w-full whitespace-pre-line tracking-wide text-center mx-auto text-primary font-handyRegular" />
                }
                body={
                  <Card.Body className="text-center font-handyOblique tracking-wide sm:text-[1.75rem] leading-[2rem] whitespace-pre-line text-[#1c3f60] mt-[2rem]" />
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla__dots}>
          {scrollSnaps.length > 1 &&
            scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`${styles.embla__dot} ${
                  index === selectedIndex ? `bg-primary ` : "bg-[#b9babc]"
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

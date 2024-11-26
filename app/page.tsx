"use client";
import Card from "@/components/card";
import CompaniesMarquee from "@/components/marquee";
import Typography from "@/components/typography";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

const heroData: CarouselItem[] = [
  {
    titleTop: "The Last Mile, Perfected",
    titleBottom: `fullfilling your logistics, forun <br/><span class="text-[#afc1d0]">nation wide</span>`,
    imageTop: "/images/logo-secondary.png",
    image: "/images/carousel-1.png",
    width: 500,
    height: 500,
  },
  {
    titleBottom: "empowering small businesses with COD",
    imageTop: "/images/logo.png",
    imageTopStyles: "relative sm:top-[30px]",
    imageCenter: "/images/carousel-2-center.png",
    width: 400,
    height: 500,
    image: "/images/carousel-2.png",
  },
  {
    titleTop: "easy payment solutions",
    titleTopStyle: "text-[#afc1d0]",
    titleBottom: `cleared within 24 hrs <br/>COD / Online`,
    imageTop: "/images/logo.png",
    image: "/images/carousel-3.png",
    width: 500,
    height: 400,
  },
  {
    titleTop: "“Sustainable Choices for a Healthier Lifestyle”",
    titleTopStyle: "text-[#afc1d0]",
    titleBottom: `delivered forun`,
    imageTop: "/images/forun-store.png",
    imageTopStyles: "w-[150px] h-auto",
    image: "/images/carousel-4.png",
    width: 500,
    height: 400,
  },
];
const cardText = [
  {
    description: "Reliable and efficient delivery",
    image: "/svg/credible.svg",
  },
  {
    description: "Versatile and scalable solutions",
    image: "/svg/portfolio.svg",
  },
  {
    description: "Enhanced customer experience",
    image: "/svg/customer-experience.svg",
  },
  {
    description: "24/7 customer support",
    image: "/svg/support.svg",
  },
];
const workCard = [
  {
    titleTop: "easy payment",
    titleBottom: "solutions",
    description: `enabling COD for small businesses, payments are cleared with 24 hrs`,
  },
  {
    titleTop: "60 mins",
    titleBottom: "delivery",
    description: `delivery anything, anywhere in just 60 mins
    Isl / Rwp only
    `,
  },
  {
    titleTop: "same day,",
    titleBottom: "following day",
    description: `need to send something urgently, schedule a same day or following day delivery
    `,
  },
  {
    titleTop: "last mile",
    titleBottom: "perfected",
    description: `we pick up orders from our clients warehouse and deliver them to their customers
    `,
  },
  {
    titleTop: "last mile",
    titleBottom: "perfected",
    description: `we pick up orders from our clients warehouse and deliver them to their customers
    `,
  },
];
export default function Component() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 114000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full"
        id="Carousel"
      >
        <CarouselContent>
          {heroData.map((hero, index) => (
            <CarouselItem key={index}>
              <div className="max-w-full h-full  mx-auto bg-primary ">
                <div className="flex mx-auto max-w-7xl flex-col-reverse gap-[2rem] md:flex-row md:gap-[8rem] h-full p-4 sm:p-6 lg:p-8 lg:pl-[2.5rem] overflow-hidden relative max-lg:ml-[1rem] ">
                  <div className="flex items-center md:w-[50%]">
                    <div className="text-white w-full flex flex-col max-sm:items-center sm:gap-2">
                      <Image
                        src={hero.imageTop}
                        alt={hero.titleTop || "heroImage"}
                        width={120}
                        height={120}
                        className={hero.imageTopStyles}
                        objectFit="contain"
                        priority
                      />
                      {hero.titleTop && (
                        <Typography
                          as={"h1"}
                          className={`text-4xl font-bold my-4 font-handyRegular max-sm:text-center ${hero.titleTopStyle}`}
                        >
                          {hero.titleTop}
                        </Typography>
                      )}
                      {hero.imageCenter && (
                        <Image
                          src={hero.imageCenter}
                          alt={hero.titleTop || "heroImage"}
                          width={400}
                          height={160}
                          className="max-sm:max-w-[170px] max-w-[300px] my-2"
                          objectFit="contain"
                          priority
                        />
                      )}
                      <Typography
                        as={"h2"}
                        className="text-xl font-handyRegular font-bold mb-4"
                        dangerouslySetInnerHTML={{
                          __html: hero.titleBottom || "",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center ">
                    <Image
                      src={hero.image}
                      alt={hero.titleTop || "heroImage"}
                      width={hero.width}
                      height={hero.height}
                      className="sm:max-h-[300px] max-w-[300px] max-h-[250px] max-sm:w-auto"
                      objectFit="cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                api?.scrollTo(index);
              }}
              className={`h-2 w-2 rounded-full ${
                index + 1 === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </Carousel>
      {/* Comapnies we work with */}
      <div
        className="px-[1rem] md:p-[2.5rem] md:py-[0] 2xl:px-[4rem] bg-[#507CA5]"
        id="Comapnies we work with"
      >
        <div className="max-w-7xl mx-auto">
          <CompaniesMarquee />
        </div>
      </div>
      {/* Why Choose Us  */}
      <div
        className="px-[1rem] pt-[2rem] md:p-[2.5rem] md:pb-0 2xl:px-[4rem] 2xl:pt-[3.5rem]"
        id="Why Choose Us"
      >
        <div className="max-w-7xl mx-auto">
          <Typography
            as="h2"
            theme="primary"
            className="text-center font-handyOblique font-semibold"
          >
            Why Choose Us
          </Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 justify-center ">
            {cardText.map((card, idx) => (
              <Card
                key={idx}
                className="md:w-auto w-[17.5rem]"
                cardInfo={card}
                image={
                  <Card.Image>
                    <Image
                      src={card.image}
                      height={70}
                      width={70}
                      alt={"expertise-image"}
                      className="h-[5rem] w-[5rem] sm:h-[7rem] sm:w-[7rem] 2xl:h-[7.5rem] 2xl:w-[7.5rem]"
                    />
                  </Card.Image>
                }
                header={
                  <Card.Header
                    className="uppercase max-w-full w-[18rem] text-center mx-auto"
                    theme={"primary"}
                  />
                }
                body={
                  <Card.Body className="text-center font-handyRegular font-semibold" />
                }
              />
            ))}
          </div>
        </div>
      </div>
      {/* Solutions we Offer */}
      <div
        className="px-[1rem] py-[2rem] md:p-[2.5rem] 2xl:px-[4rem] 2xl:py-[3.5rem]"
        id="Solutions we Offer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography
            as="h2"
            theme="primary"
            className="text-center font-semibold font-handyOblique"
          >
            Solutions we Offer
          </Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[5rem] pt-[1.5rem] sm:pt-[3rem]">
            {workCard.map((card, idx) => (
              <div className="relative" key={idx}>
                <Card
                  key={idx}
                  variant="work"
                  className="md:w-auto max-md:w-full bg-[#1c3f60] sm:p-8 lg:p-12 h-full"
                  cardInfo={card}
                  header={
                    <Card.Header className="max-w-full whitespace-pre-line tracking-wide text-center mx-auto text-primary-foreground font-handyRegular" />
                  }
                  body={
                    <Card.Body className="text-center font-handyOblique tracking-wide sm:text-[1.75rem] leading-[2rem] whitespace-pre-line text-primary-foreground mt-[2rem]" />
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Locations */}
      <div
        className="pt-[2rem] md:pt-[2.5rem] 2xl:pt-[3.5rem] bg-[#fcfcfc]"
        id="locations"
      >
        <div className="max-w-7xl mx-auto pb-[3rem]">
          <Typography
            as="h2"
            theme="primary"
            className="text-center font-handyOblique font-semibold"
          >
            Our Locations
          </Typography>
        </div>
        <Image
          src="/video/map-video.gif"
          alt="Map GIF"
          className="h-full w-full max-w-7xl mx-auto"
          layout="responsive"
          width={1080}
          height={720}
          unoptimized
        />
      </div>
    </div>
  );
}

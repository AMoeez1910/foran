"use client";
import Card from "@/components/card";
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
    imageTop: "/images/logo.png",
    image: "/images/carousel-1.png",
    width: 500,
    height: 500,
  },
  {
    titleBottom: "empowering small businesses with COD",
    imageTop: "/images/logo.png",
    imageTopStyles: "relative top-[70px]",
    imageCenter: "/images/carousel-2-center.png",
    width: 400,
    height: 500,
    image: "/images/carousel-2.png",
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
    titleTop: "Fulfillment ",
    titleBottom: "and Warehousing",
    description: `Our facilities worldwide 
    can store, stock, label, fulfill, 
    and barcode several orders 
    accurately and on time`,
    img: "/images/package.png",
    style:
      "md:bottom-[-35px] max-md:w-[100px] md:right-[-60px] max-md:top-[-50px] max-md:left-[-20px]",
    width: 150,
    height: 150,
  },
  {
    titleTop: "Last-Mile ",
    titleBottom: "Delivery",
    description: `Our last mile delivery 
    service ensures that youorders 
    on time and in perfect condition
    `,
    img: "/images/delivery-truck.png",
    style:
      "md:top-[-80px] max-md:w-[150px] md:right-[-60px] max-md:bottom-[-50px] max-md:left-[-20px]",
    width: 200,
    height: 180,
  },
  {
    titleTop: "Same-Day ",
    titleBottom: "Delivery",
    description: `Our same
    day delivery service is
    designed to deliver your
    orders within the same day
    `,
    img: "/images/airplane-and-packages.png",
    style:
      "md:bottom-[-100px] md:left-[-60px] bottom-[-90px] max-md:right-[-35px] max-md:w-[200px]",
    width: 300,
    height: 300,
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
            delay: 1224000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {heroData.map((hero, index) => (
            <CarouselItem key={index}>
              <div className="max-w-full min-h-[600px] h-full  mx-auto bg-primary ">
                <div className="flex mx-auto w-[108rem] max-w-full flex-col-reverse justify-evenly md:flex-row md:justify-between h-full p-4 pl-6 sm:p-6 sm:pl-8 lg:p-8 lg:pl-12 overflow-hidden relative max-lg:ml-[1rem] ">
                  <div className="flex items-center md:w-1/3">
                    <div className="text-white w-full flex flex-col gap-2">
                      <Image
                        src={hero.imageTop}
                        alt={hero.titleTop || "heroImage"}
                        width={120}
                        height={120}
                        className={hero.imageTopStyles}
                        objectFit="contain"
                        priority
                      />
                      <Typography
                        as={"h1"}
                        className="text-4xl font-bold mb-4 font-handyRegular"
                      >
                        {hero.titleTop}
                      </Typography>
                      {hero.imageCenter && (
                        <Image
                          src={hero.imageCenter}
                          alt={hero.titleTop || "heroImage"}
                          width={400}
                          height={160}
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
                  <div className="flex justify-center ">
                    <Image
                      src={hero.image}
                      alt={hero.titleTop || "heroImage"}
                      width={hero.width}
                      height={hero.height}
                      className="sm:max-h-[550px]"
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
      {/* Forun Delivery Solutions  */}
      <div className="px-[1rem] py-[2rem] md:p-[2.5rem] 2xl:px-[4rem] 2xl:py-[3.5rem]">
        <div className="w-[108rem] max-w-full mx-auto">
          <Typography
            as="h2"
            theme="primary"
            className="text-center font-semibold"
          >
            Forun Delivery Solutions
          </Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 justify-center ">
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
                body={<Card.Body className="text-center font-semibold" />}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Our Work */}
      <div
        className="px-[1rem] py-[2rem] md:p-[2.5rem] 2xl:px-[4rem] 2xl:py-[3.5rem]"
        id="Our Work"
      >
        <div className="w-[108rem] max-w-full mx-auto">
          <Typography
            as="h2"
            theme="primary"
            className="text-center font-semibold"
          >
            Our Work
          </Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[5rem] pt-[1.5rem] sm:pt-[3rem]">
            {workCard.map((card, idx) => (
              <div className="relative" key={idx}>
                <Card
                  key={idx}
                  variant="work"
                  className="md:w-auto lg:h-[380px] max-md:w-full bg-[#1c3f60]"
                  cardInfo={card}
                  header={
                    <Card.Header className="max-w-full whitespace-pre-line tracking-wide text-center mx-auto text-primary-foreground font-handyRegular" />
                  }
                  body={
                    <Card.Body className="text-center font-handyOblique tracking-wide sm:text-[1.75rem] leading-[2rem] whitespace-pre-line text-primary-foreground mt-[2rem]" />
                  }
                />
                {card.img && (
                  <Image
                    src={card.img}
                    height={card.width}
                    width={card.height}
                    alt="card-image"
                    className={`absolute z-10 ${card.style}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Locations */}
      <div className="pt-[2rem] md:pt-[2.5rem] 2xl:pt-[3.5rem]" id="locations">
        <div className="w-[108rem] max-w-full mx-auto pb-[3rem]">
          <Typography
            as="h2"
            theme="primary"
            className="text-center font-semibold"
          >
            Our Locations
          </Typography>
        </div>
        <div className="bg-white">
          <Image
            src="/video/map-video.gif"
            alt="Map GIF"
            className="bg-white h-full w-full max-w-[90rem] mx-auto"
            layout="responsive"
            width={1080}
            height={720}
          />
        </div>
      </div>
    </div>
  );
}

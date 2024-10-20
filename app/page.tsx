"use client";
import Card from "@/components/card";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

const heroData = [
  {
    titleTop: "Delivery you can trust ",
    titleBottom: "“We Got This”",
    description: "e-commerce logistics and last-mile delivery specialists",
    image: "/images/courier.png",
    cta: "See Locations",
    width: 500,
    height: 300,
    scrollId: "locations",
  },
  {
    titleTop: "Fast and reliable delivery",
    titleBottom: "services",
    description: "We deliver your packages on time and in perfect condition",
    width: 600,
    height: 500,
    image: "/images/van.png",
    cta: "What we do",
    scrollId: "Our Work",
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
      "md:bottom-[-35px] max-md:w-[100px] md:right-[-60px] top-[-50px] left-[-20px]",
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
      "md:top-[-80px] max-md:w-[150px] md:right-[-60px] bottom-[-50px] left-[-20px]",
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
      "md:bottom-[-100px] md:left-[-60px] bottom-[-90px] right-[-35px] max-md:w-[200px]",
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
            delay: 10000000,
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
              <div className=" w-[108rem] max-w-full h-full  mx-auto bg-[#0497CE]">
                <div className="flex flex-col lg:flex-row lg:justify-between h-full lg:h-[600px] overflow-hidden relative max-lg:ml-[1rem] ">
                  <div className="flex justify-center">
                    <Image
                      src={hero.image}
                      alt={hero.titleTop || "heroImage"}
                      width={hero.width}
                      height={hero.height}
                      className="max-lg:w-full"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <Typography as={"h2"} className="text-4xl font-bold mb-4">
                        {hero.titleTop}
                      </Typography>
                      <Typography as={"h2"} className="text-4xl font-bold mb-4">
                        {hero.titleBottom}
                      </Typography>
                      <p className="text-xl mb-6">{hero.description}</p>
                      <Button
                        variant={"secondary"}
                        size={"lg"}
                        className="bg-primary text-lg text-primary-foreground hover:text-primary"
                        onClick={() => {
                          if (hero.scrollId) {
                            const element = document.getElementById(
                              hero.scrollId
                            );
                            element?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        {hero.cta}
                      </Button>
                    </div>
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
                  className="md:w-auto lg:h-[380px] max-md:w-full bg-[#0497CE]"
                  cardInfo={card}
                  header={
                    <Card.Header className="max-w-full whitespace-pre-line text-center mx-auto text-primary-foreground" />
                  }
                  body={
                    <Card.Body className="text-center sm:text-[1.3rem] leading-[2rem] whitespace-pre-line text-primary-foreground mt-[2rem]" />
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
            size="large"
            theme="primary"
            className="text-center font-semibold"
          >
            Our Locations
          </Typography>
        </div>
        <div className="map-container bg-slate-100">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1gJIX1auoN7WS2bgDztDhbs6i7Ak5rFQ&ehbc=2E312F"
            className="map-iframe"
          />
        </div>
      </div>
    </div>
  );
}

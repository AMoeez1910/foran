"use client";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Typography from "./typography";

export default function Navbar() {
  const navItems = [
    { name: "Home", scrollId: "Carousel" },
    { name: "Solutions", scrollId: "Why Choose Us" },
    { name: "Services", scrollId: "Solutions we Offer" },
    { name: "Contact", scrollId: "#" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = (scrollId: string) => {
    if (scrollId) {
      const element = document.getElementById(scrollId);
      if (element) {
        const offset = 40;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary" : "bg-[#1c3f60]"
      } text-primary-foreground`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={80}
                height={80}
              />
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger>
                <Menu className="h-6 w-6 cursor-pointer" />
              </DrawerTrigger>
              <DrawerContent className="bg-primary border-none md:hidden">
                <DrawerClose className="flex justify-end p-4">
                  <X className="h-6 w-6 cursor-pointer text-white" />
                </DrawerClose>
                <div className="flex flex-col items-start space-y-4 p-4">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        handleScroll(item.scrollId);
                      }}
                      className="py-1 text-white rounded-md font-handyOblique text-lg relative group w-fit cursor-pointer"
                    >
                      {item.name}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px]  bg-white transition-all duration-300 ease-out w-0 group-hover:w-full `}
                      />
                    </div>
                  ))}
                  <Link href="/book-a-delivery">
                    <Button
                      className={`h-auto text-xl bg-[#25537e]`}
                    >
                      <Typography
                        as={"h4"}
                        className="text-sm font-handyRegular font-bold"
                      >
                        Deliver Now
                      </Typography>
                    </Button>
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  handleScroll(item.scrollId);
                }}
                className="py-1 rounded-md text-lg font-handyOblique relative group w-fit cursor-pointer"
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full`}
                />
              </div>
            ))}
            <Link href="/book-a-delivery">
              <Button
                className={`h-auto  ${scrolled && "bg-[#1c3f60] hover:bg-[#25537e]"}`}
              >
                <Typography
                  as={"h4"}
                  className="text-sm font-handyRegular font-bold"
                >
                  Deliver Now
                </Typography>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client"
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

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
  ];
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? "bg-primary" : "bg-[#0497CE]"
      } text-primary-foreground`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={150}
                height={150}
              />
            </a>
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
                    <Link
                      key={item.name}
                      href={item.href}
                      className="py-2 text-white rounded-md text-md font-medium relative group w-fit"
                    >
                      {item.name}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full `}
                      />
                    </Link>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="py-2 rounded-md text-md font-medium relative group w-fit"
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

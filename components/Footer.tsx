"use client";
import Image from "next/image";
import Link from "next/link";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const navItems = [
    { name: "Home", scrollId: "Carousel", page: "/" },
    { name: "Solutions", scrollId: "Why Choose Us", page: "/" },
    { name: "Services", scrollId: "Solutions we Offer", page: "/" },
  ];
  const handleScroll = async (scrollId: string, page: string) => {
    if (page) await router.push(page);
    if (scrollId) {
      const element = document.getElementById(scrollId);
      if (element) {
        const offset = 20;
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
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src={"/images/logo.png"}
              width={150}
              height={150}
              alt="Logo"
            />
          </div>
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  handleScroll(item.scrollId, item.page);
                }}
                className="py-1 rounded-md text-lg font-handyOblique relative group w-fit cursor-pointer"
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full `}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex lg:flex-row flex-col text-sm max-md:gap-4 justify-between items-center">
          <div className="flex space-x-6">
            <Link
              href={"https://www.linkedin.com/company/forun_cs/"}
              className="
                hover:text-slate-500
                transition-colors
            "
            >
              <LinkedInLogoIcon className="h-8 w-8" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={"https://www.instagram.com/forun.pk?igsh=Nmw3c295amxlNjRz/"}
              className="
                hover:text-slate-500
                transition-colors
            "
            >
              <InstagramLogoIcon className="h-8 w-8" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          © 2024 Forun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

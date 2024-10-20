import Image from "next/image";
import Link from "next/link";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
  ];
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src={"/images/logo.png"}
              width={200}
              height={200}
              alt="Logo"
            />
          </div>
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="py-2 rounded-md text-md font-medium relative group w-fit"
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full `}
                />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex lg:flex-row flex-col max-md:gap-4 justify-between">
          <div className="flex space-x-6 mx-12">
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

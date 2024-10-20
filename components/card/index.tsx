import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import { CardImage as Image } from "./CardImage";
import { CardHeader as Header } from "./CardHeader";
import { CardBody as Body } from "./CardBody";
import CardContext from "./CardContext";

const cardVariants = cva("", {
  variants: {
    variant: {
      default:
        "px-[1rem] py-[1.5rem] sm:px-[1.5rem] sm:py-[3rem] rounded-[0.5rem] bg-white shadow-small w-[31.25rem] max-w-full flex flex-col items-center hover:shadow-large mb-[0.35rem]",
      work: "px-[1rem] py-[1.5rem] sm:px-[1.5rem] sm:py-[2rem] rounded-[0.5rem] shadow-small w-[31.25rem] max-w-full flex flex-col items-center  mb-[0.35rem]",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  image?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  cardInfo: CardInfo;
}

const Card: React.FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, image, header, body, cardInfo, ...props }) => {
    if (variant === "work") {
      return (
        <CardContext.Provider value={{ cardInfo }}>
          <div {...props} className={cn(cardVariants({ variant }), className)}>
            <div
              className={`w-full h-full flex-1 flex flex-col items-center z-[10] relative`}
            >
              {image}
              {header}
              {body}
              <div className="border-[3px] w-[107%] sm:w-[105%] md:w-[112%] h-[120%] border-primary absolute top-[-20px] left-[0px] rounded-[0.5rem]" />
            </div>
          </div>
        </CardContext.Provider>
      );
    }
    return (
      <CardContext.Provider value={{ cardInfo }}>
        <div {...props} className={cn(cardVariants({ variant }), className)}>
          <div
            className={`w-full h-full flex-1 flex flex-col items-center z-[10]`}
          >
            {image}
            {header}
            {body}
          </div>
        </div>
      </CardContext.Provider>
    );
  }
);

Card.displayName = "Card";

export default Object.assign(Card, {
  Image,
  Header,
  Body,
});

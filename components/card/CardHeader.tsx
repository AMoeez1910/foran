import { HTMLAttributes } from "react";
import Typography from "../typography";
import { useCardContext } from "./CardContext";
import { cn } from "@/lib/utils";

interface CardHeaderProps
  extends HTMLAttributes<HTMLHeadingElement & HTMLParagraphElement> {
  shrinkSizeOnMobile?: boolean;
  img?: string;
  theme?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  shrinkSizeOnMobile = false,
  className,
  theme,
  ...props
}) => {
  const { cardInfo } = useCardContext();
  return (
    <Typography
      as="h3"
      theme={theme}
      className={cn(
        className,
        "text-center mx-auto",
        shrinkSizeOnMobile
          ? "sm:text-[1.5rem] sm:leading-[2rem] text-[1.25rem] leading-[1.875rem]"
          : "text-[1.3rem] leading-[1.875rem] sm:text-[1.4rem] sm:leading-[1.875rem] md:text-[1.6rem] md:leading-[1.75rem] 2xl:text-[2rem] 2xl:leading-[2.25rem]"
      )}
      {...props}
    >
      <span>
        {cardInfo.titleTop}{" "}
        {cardInfo.titleBottom && (
          <span>
            <br />
            {cardInfo.titleBottom}
          </span>
        )}
      </span>
    </Typography>
  );
};

export { CardHeader };

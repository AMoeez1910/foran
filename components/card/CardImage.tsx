import { useCardContext } from "./CardContext";
import { HTMLAttributes } from "react";

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
  variant?: "normal" | "rounded" | "default" | "logo";
}

const CardImage: React.FC<CardImageProps> = ({
  rounded = false,
  variant = "default",
  ...props
}) => {
  const { cardInfo } = useCardContext();
  const className =
    variant === "normal"
      ? `mb-[1rem] 2xl:mb-[2rem]`
      : variant === "logo"
      ? `2xl:mb-[1rem]`
      : rounded
      ? `2xl:w-[11.25rem] 2xl:h-[11.25rem] sm:w-[9.75rem] sm:h-[9.75rem] w-[8.75rem] h-[8.75rem] mb-[1rem] sm:mb-[2rem]`
      : `sm:w-[6.5rem] sm:h-[6.5rem] 2xl:w-[7.5rem] 2xl:h-[7.5rem] w-[5rem] h-[5rem] mb-[1rem] sm:mb-[2rem]`;

  return (
    <div className={className} {...props}>
      {cardInfo.image && props.children}
    </div>
  );
};

export { CardImage };

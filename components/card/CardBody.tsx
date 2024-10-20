import { HTMLAttributes } from "react";
import { useCardContext } from "./CardContext";
import Typography from "../typography";

const CardBody: React.FC<HTMLAttributes<HTMLHeadingElement & HTMLParagraphElement>> = ({ className, ...props }) => {
  const { cardInfo } = useCardContext();

  return (
    <Typography as={"p"} size={"large"} className={className} {...props}>
      {cardInfo.description}
    </Typography>
  );
};

export { CardBody };

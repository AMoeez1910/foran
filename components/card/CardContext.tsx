import { createContext, useContext } from "react";

const CardContext = createContext<{ cardInfo: CardInfo } | null>(null);

export function useCardContext() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error(
      "Card.* component must be rendered as child of Card component"
    );
  }
  return context;
}

export default CardContext;

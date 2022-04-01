import { useReducer } from "react";
import CardContext from "./CardContext";

const initialCardState = {
  cards: [],
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      console.log(action.payload.card);
      const newCard = action.payload.card;
      return {
        cards: [newCard, ...state.cards],
      };

    case "DELETE_CARD":
      return {
        cards: state.cards.filter(card => card.id !== action.payload),
      };

    default:
      return state;
  }
};

const CardContextProvider = props => {
  const [cardState, dispatch] = useReducer(cardReducer, initialCardState);

  return (
    <CardContext.Provider value={{ cardState, dispatch }}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;

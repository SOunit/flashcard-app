import { useReducer, createContext } from "react";
import { getCards, addCard, deleteCard } from "../api/api";

export const CardContext = createContext();

const dispatchMiddleware = (dispatch) => {
  return async (action) => {
    switch (action.type) {
      case "GET_ALL_CARDS": {
        try {
          dispatch({ type: "SEND" });
          const loadedCards = await getCards();
          dispatch({ ...action, payload: loadedCards });
          dispatch({ type: "SUCCESS" });
        } catch (err) {
          dispatch({ type: "ERROR", payload: err });
        }
        break;
      }
      case "ADD_CARD": {
        try {
          dispatch({ type: "SEND" });
          await addCard(action.payload);
          const loadedCards = await getCards();
          dispatch({ type: "GET_ALL_CARDS", payload: loadedCards });
          dispatch({ type: "SUCCESS" });
        } catch (err) {
          dispatch({ type: "ERROR", payload: err });
        }
        break;
      }
      case "DELETE_CARD": {
        try {
          dispatch({ type: "SEND" });
          await deleteCard(action.payload);
          dispatch(action);
          dispatch({ type: "SUCCESS" });
        } catch (err) {
          dispatch({ type: "ERROR", payload: err });
        }
        break;
      }

      default:
        return dispatch(action);
    }
  };
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_CARDS": {
      return {
        ...state,
        data: action.payload
      };
    }

    case "DELETE_CARD":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
        status: "deleted"
      };

    case "SEND":
      return {
        ...state,
        status: "pending"
      };

    case "SUCCESS":
      return {
        ...state,
        status: "completed"
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
        status: "error"
      };

    default:
      return state;
  }
};

export const CardProvider = ({ children }) => {
  const initialState = {
    data: null,
    error: null,
    status: ""
  };

  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  return (
    <CardContext.Provider
      value={{ dispatch: dispatchMiddleware(dispatch), ...httpState }}
    >
      {children}
    </CardContext.Provider>
  );
};

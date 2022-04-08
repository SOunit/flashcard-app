import { useState, useReducer, useCallback, useEffect, Context, createContext } from "react";


const CardContext = createContext()

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        ...state,
        status: "pending",
      };

    case "SUCCESS":
      return {
        ...state,
        data: action.responseData,
        status: "completed",
      };

    case "ERROR":
      return {
        ...state,
        error: action.errorMessage,
        status: "error",
      };

    case "DELETE":
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload),
        status: "deleted",
      };

    default:
      return state;
  }
};

export const CardProvider = ({ children }) => {
  const [startWithPending, setStartWithPending] = useState(false)
  const [requestFunction, setRequestFunction] = useState(null)
  const initialState = {
    data: null,
    error: null,
    status: startWithPending ? "pending" : null,
  };

  // const initializer = (initialValue = initialState) => JSON.parse(localStorage.getItem("localCard")) || initialValue;

  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  // useEffect(() => {
  //   console.log("Cart updated, persisting to local storage", httpState);
  //   localStorage.setItem("localCard", JSON.stringify(httpState));
  // }, [httpState]);

  const sendRequest = useCallback(
    async (reqData1, reqData2) => {
      dispatch({ type: "SEND" });

      try {
        const resData = await requestFunction(reqData1, reqData2);
        dispatch({ type: "SUCCESS", responseData: resData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  // return { sendRequest, dispatch, ...httpState };
    return(
      <CardContext.Provider value={{ setRequestFunction, setStartWithPending, sendRequest, dispatch, ...httpState }}>
      {children}
      </CardContext.Provider>
    )
};

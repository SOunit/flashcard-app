import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        data: null,
        error: null,
        status: "pending",
      };

    case "SUCCESS":
      return {
        data: action.responseData,
        error: null,
        status: "completed",
      };

    case "ERROR":
      return {
        data: null,
        error: action.errorMessage,
        status: "completed",
      };

    default:
      return state;
  }
};

const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    status: startWithPending ? "pending" : null,
  });

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

  return { sendRequest, ...httpState };
};

export default useHttp;

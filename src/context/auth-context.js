import { createContext, useEffect, useState, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { addUser, getUser } from "../api/user-api";

export const AuthContext = createContext();

const dispatchMiddleware = dispatch => {
  return async action => {
    switch (action.type) {
      case "GET_USER":
        try {
          dispatch({ type: "SEND" });
          const loadedUser = await getUser(action.payload);
          dispatch({ type: "GET_USER", payload: loadedUser });
          dispatch({ type: "SUCCESS" });
        } catch (err) {
          dispatch({ type: "ERROR", payload: err });
        }

        break;

      case "ADD_USER":
        try {
          dispatch({ type: "SEND" });
          const loadedUser = await addUser(action.payload);
          dispatch({ type: "SET_USER", payload: loadedUser });
          dispatch({ type: "SUCCESS" });
        } catch (err) {
          dispatch({ type: "ERROR", payload: err });
        }

        break;

      default:
        return dispatch(action);
    }
  };
};

const loginUserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        reqData: action.payload,
      };

    case "GET_USER":
      return {
        ...state,
        resData: action.payload,
      };

    case "SEND":
      return {
        ...state,
        status: "pending",
      };

    case "SUCCESS":
      return {
        ...state,
        status: "completed",
      };

    case "ERROR":
      return {
        ...state,
        data: action.payload,
        status: "error",
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [username, setUsername] = useState("");

  const initialState = {
    data: null,
    error: null,
    status: "",
  };

  const [loginUserState, dispatch] = useReducer(loginUserReducer, initialState);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password, username) => {
    setUsername(username);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log("Auth", currentUser);
      setAuthUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        username,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        dispatch: dispatchMiddleware(dispatch),
        ...loginUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

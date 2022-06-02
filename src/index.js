import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", "sans-serif"',
  },
  palette: {
    primary: {
      main: "#2a9d8f",
    },
    secondary: {
      main: "#264653",
    },
    neutral: {
      main: "#e9c46a",
    },
    accent: {
      main: "#f4a261",
    },
    danger: {
      main: "#e76f51",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

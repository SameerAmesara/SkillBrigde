import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "mobx-react";
import { router } from "./utils/routerConfig.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme.ts";
import { appStore } from "./mobx/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

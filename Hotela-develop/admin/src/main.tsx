import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);

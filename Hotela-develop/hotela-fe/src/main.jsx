import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { Notifications } from "@mantine/notifications";
import "./styles/App.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MantineProvider>
      <Notifications />
      <App />
    </MantineProvider>
  </Provider>
);

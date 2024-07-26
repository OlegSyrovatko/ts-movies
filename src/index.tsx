import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./redux/auth/interceptors";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter basename="/">
          {/* <BrowserRouter basename="/ts-movies"> */}
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

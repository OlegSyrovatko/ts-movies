import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./redux/auth/interceptors";
import "./index.css";

const basename = process.env.NODE_ENV === "production" ? "/ts-movies" : "/";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <HashRouter>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </HashRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

import React from "react";
// import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { store, persistor } from "./store";
// import { PersistGate } from "redux-persist/integration/react";
// import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  //   </PersistGate>
  // </Provider>
);

import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { checkRole } from "@/pages/middlewares/checkRole";

import user from "../reducers/user";
import hireRequest from "../reducers/hireRequest";
import { useEffect } from "react";

const reducers = combineReducers({ user, hireRequest });
const persistConfig = { key: "FlowHR", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps, router }) {
  useEffect(() => {
    checkRole(store, router);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>FlowHR</title>
        </Head>
        {/* {checkRole(store)} */}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;

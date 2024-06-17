"use client"

// index.js o App.js
import './globals.css';
import styles from "./page.module.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header className={styles.header} />
      </PersistGate>
    </Provider>
  );
}

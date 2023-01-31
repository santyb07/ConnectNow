import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from "./theme"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import {persistUserStore,store} from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistUserStore}>
        <App />
      </PersistGate>
    </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);
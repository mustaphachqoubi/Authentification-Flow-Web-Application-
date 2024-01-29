import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { Terms } from "./components/Terms.jsx";
import { Contacts } from "./components/Contacts.jsx";
import AuthProvider from "react-auth-kit";
import { authstore } from "./auth/store.js";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="321062429347-6d6gus6be9dneua974s8h4le4sle60cm.apps.googleusercontent.com">
      <AuthProvider store={authstore}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<App />} />
            <Route
              path="/home"
              element={
                <RequireAuth fallbackPath={"/"}>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
            </GoogleOAuthProvider>

    </Provider>
  </React.StrictMode>
);

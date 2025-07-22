import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Amplify init (for using Storage, API etc.)
Amplify.configure(awsExports);

const oidcConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_9Z3xxwODT",
  client_id: "564rv7b8u4onq7sbob4gn8jhum",
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "openid email",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

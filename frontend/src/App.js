import React from "react";
import logo from './logo.svg';
import './App.css';
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>Resume Parser App</h1>

        {auth.isAuthenticated ? (
          <>
            <p>Welcome, {auth.user?.profile?.email}</p>
            <button onClick={() => auth.signoutRedirect()} className="App-link">Logout</button>
          </>
        ) : (
          <>
            <p>Edit <code>src/App.js</code> and save to reload.</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <button onClick={() => auth.signinRedirect()} className="App-link">Login</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

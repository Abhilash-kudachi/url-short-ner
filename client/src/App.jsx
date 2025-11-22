import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header className="header">
        <Link to="/" className="logo">URL SHORTNER</Link>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

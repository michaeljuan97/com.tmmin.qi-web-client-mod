import React from "react";
import { Routes, Route } from "react-router-dom";

import { Nav } from "_components";
import Home from "home";

export { App };

function App() {
  return (
    <div className="app-container">
      <Nav />
      <div className="container-fluid pt-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

import "./App.css";
import { createContext, useContext, useState } from "react";

import { Nav } from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoordinatesManager } from "./components/CoordinatesManager";

/*
 - Make app to input coordinates in either decimal degrees, or degrees minutes second
 - Coordinates can be added to a list that can be deleted

*/
export const iconSize = "1.5em";

export default function App() {
  //todo
  const AppContext = createContext({});

  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="App">
          <h1>Coordinate Caddy</h1>
          <div className="container">
            <Routes>
              <Route path="/" element={<CoordinatesManager />} />
              <Route path="about" element={<h1>ABOUT</h1>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

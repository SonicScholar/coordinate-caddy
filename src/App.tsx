import "./App.css";
import { useState } from "react";
import { CoordinatePairInput } from "./components/CoordinatePairInput";
import { Coordinates } from "./Coordinates";
import { CompareCoordinates } from "./components/CompareCoordinates";

/*
 - Make app to input coordinates in either decimal degrees, or degrees minutes second
 - Coordinates can be added to a list that can be deleted

*/

export default function App() {
  const [coordinatesList, setCoordinatesList] = useState<Coordinates[]>([]);
  const handleCoordinatesAdded = (coordinates: Coordinates) => {
    setCoordinatesList([...coordinatesList, coordinates]);
  };

  return (
    <div className="App">
      <h1>Coordinate Caddy</h1>
      <h2>Edit coordinate information below!</h2>
      <div className="container">
        <CoordinatePairInput coordinatesAdded={handleCoordinatesAdded} />
        <CompareCoordinates coordinatesList={coordinatesList} />
      </div>
    </div>
  );
}

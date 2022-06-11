import "./css/CoordinatesManager.css";
import { useState } from "react";
import { Coordinates } from "../Coordinates";
import { CompareCoordinates } from "./CompareCoordinates";
import { CoordinatePairInput } from "./CoordinatePairInput";

export const CoordinatesManager = () => {
  const [coordinatesList, setCoordinatesList] = useState<Coordinates[]>([]);
  const handleCoordinatesAdded = (coordinates: Coordinates) => {
    setCoordinatesList([...coordinatesList, coordinates]);
  };
  return (
    <div className="coordinatesManager">
      <h2>Edit coordinate information below!</h2>
      <div>
        <CoordinatePairInput coordinatesAdded={handleCoordinatesAdded} />
        <CompareCoordinates coordinatesList={coordinatesList} />
      </div>
    </div>
  );
};

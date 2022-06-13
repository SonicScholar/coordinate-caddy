import "./css/CoordinatesManager.css";
import { useState } from "react";
import { Coordinates } from "../Coordinates";
import { CompareCoordinates } from "./CompareCoordinates";
import {
  CoordinatePairInput,
  CoordinatesEditMode,
} from "./CoordinatePairInput";
import { CCButton } from "./controls/CCButton";

const defaultCoordinates = (() => {
  const coords = new Coordinates(0, 0, 0, 0, "");
  coords.id = -1;
  return coords;
})();

export const CoordinatesManager = () => {
  const [addCoordinateButtonEnabled, setAddCoordinateButtonEnabled] =
    useState(true);
  const [coordinatesToEdit, setCoordinatesToEdit] =
    useState<Coordinates>(defaultCoordinates);
  const [coordinatesList, setCoordinatesList] = useState<Coordinates[]>([]);
  const [editMode, setEditMode] = useState<CoordinatesEditMode>("disabled");

  const handleCoordinatesSaved = (coordinates: Coordinates) => {
    console.log(`coordinates saved`, coordinates);
    //update existing coordinates
    const newCoordinatesList = coordinatesList.map((coords) => {
      return coordinates.id === coords.id ? coordinates : coords;
    });
    //add new one if needed
    if (editMode === "Add") {
      newCoordinatesList.push(coordinates);
      setEditMode("disabled");
      setCoordinatesToEdit(new Coordinates(0, 0, 0, 0, ""));
      setAddCoordinateButtonEnabled(true);
    }

    setCoordinatesList([...coordinatesList, coordinates]);
  };

  const handleAddNewCoordinate = () => {
    const newCoordinate = new Coordinates(0, 0, 0, 0, "");
    setCoordinatesToEdit(newCoordinate);
    setAddCoordinateButtonEnabled(false);
    setEditMode("Add");
  };

  return (
    <div className="coordinatesManager">
      <h2>Manage coordinates below!</h2>

      <div>
        <div className="item1">
          <div className="row">
            {addCoordinateButtonEnabled && (
              <CCButton
                buttonText="Add New Coordinate"
                buttonPressed={handleAddNewCoordinate}
              />
            )}
          </div>
          <CoordinatePairInput
            initial={coordinatesToEdit}
            editMode={editMode}
            coordinatesSaved={handleCoordinatesSaved}
          />
        </div>
        <CompareCoordinates coordinatesList={coordinatesList} />
      </div>
    </div>
  );
};

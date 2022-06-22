import "./css/CoordinatesManager.css";
import { useState } from "react";
import { Coordinates } from "../Coordinates";
import { CoordinatesList } from "./CoordinatesList";
import {
  CoordinatePairInput,
  CoordinatesEditMode,
} from "./CoordinatePairInput";
import { CCButton } from "./controls/CCButton";
import { useLocalStorage } from "../hooks/useLocalStorage";

const defaultCoordinates = (() => {
  const coords = new Coordinates(0, 0, 0, 0, "");
  coords.id = -1;
  return coords;
})();

const COORDINATES_LIST_LOCAL_STORAGE = "CoordinatesList";
export const CoordinatesManager = () => {
  //get coordinates from local storage
  const [coordinatesListStorage, setCoordinatesListStorage] = useLocalStorage<
    Coordinates[]
  >(COORDINATES_LIST_LOCAL_STORAGE, []);

  const [coordinatesToEdit, setCoordinatesToEdit] =
    useState<Coordinates | null>(defaultCoordinates);
  const [coordinatesList, setCoordinatesList] = useState<Coordinates[]>(
    coordinatesListStorage
  );
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
    }

    setCoordinatesList(newCoordinatesList);
  };

  const handleCoordinatesAdded = (coordinates: Coordinates) => {
    console.log("handle coordinates added", coordinates);
    setCoordinatesToEdit(coordinates);
    setCoordinatesList([...coordinatesList, coordinates]);
    setEditMode("Update");
  };

  const handleCoordinatesSelected = (coordinates: Coordinates | null) => {
    if (coordinates !== null) {
      setCoordinatesToEdit(coordinates);
      setEditMode("Update");
    } else {
      setCoordinatesToEdit(null);
      setEditMode("disabled");
    }
  };

  const handleCoordinatesDeleted = (coordinates: Coordinates) => {
    const newSelectedIndex = Math.max(
      coordinatesList.indexOf(coordinates) - 1,
      0
    );
    const newCoordinatesList = coordinatesList.filter(
      (coords) => coords.id !== coordinates.id
    );

    setCoordinatesToEdit(newCoordinatesList[newSelectedIndex]);
    setCoordinatesList(newCoordinatesList);
  };

  const handleSaveAllClicked = () => {
    setCoordinatesListStorage(coordinatesList);
  };

  const handleRevertCoordinatesClicked = () => {
    console.log(coordinatesListStorage);
    setCoordinatesList(coordinatesListStorage);
  };

  return (
    <div className="coordinatesManager">
      <h2>Manage coordinates below!</h2>

      <div>
        <CoordinatesList
          coordinatesList={coordinatesList}
          selectedItem={coordinatesToEdit}
          coordinatesSelected={handleCoordinatesSelected}
          coordinatesSaved={handleCoordinatesAdded}
          coordinatesCopied={handleCoordinatesAdded}
          coordinatesDeleted={handleCoordinatesDeleted}
          saveAllClicked={handleSaveAllClicked}
          revertAllClicked={handleRevertCoordinatesClicked}
        />
        <div className="item1">
          <div className="row">
            {/* {addCoordinateButtonEnabled && (
              <CCButton
                buttonContent="Add New Coordinate"
                buttonPressed={handleAddNewCoordinate}
              />
            )} */}
          </div>
          <CoordinatePairInput
            coordinates={coordinatesToEdit}
            editMode={editMode}
            coordinatesSaved={handleCoordinatesSaved}
          />
        </div>
      </div>
    </div>
  );
};

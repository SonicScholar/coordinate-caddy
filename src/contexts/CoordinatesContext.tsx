import React, { createContext } from "react";
import { CoordinatesHook, useCoordinates } from "../hooks/useCoordinates";

const defaultValue: CoordinatesHook = {
  coordinatesList: [],
  selectedCoordinates: null,
  editMode: "disabled",
  saveCoordinates: () => {},
  saveAllCoordinates: () => {},
  addCoordinates: () => {},
  selectCoordinates: () => {},
  deleteCoordinates: () => {},
  deleteAllCoordinates: () => {},
  revertToLastSavedCoordinates: () => {},
};
export const CoordinatesContext = createContext<CoordinatesHook>(defaultValue);

export const CoordinatesProvider: React.FC = ({ children }) => {
  const coordinatesHook = useCoordinates();
  return (
    <CoordinatesContext.Provider value={coordinatesHook}>
      {children}
    </CoordinatesContext.Provider>
  );
};

import "./css/CoordinatesManager.css";
import { CoordinatesList } from "./CoordinatesList";
import { CoordinatePairInput } from "./CoordinatePairInput";
import { useContext } from "react";
import {
  CoordinatesContext,
  CoordinatesProvider,
} from "../contexts/CoordinatesContext";

export const CoordinatesManager: React.FC = () => {
  return (
    <CoordinatesProvider>
      <CoordinatesManagerInternal />
    </CoordinatesProvider>
  );
};

const CoordinatesManagerInternal: React.FC = ({ children }) => {
  const { selectedCoordinates, editMode, saveCoordinates } =
    useContext(CoordinatesContext);

  return (
    <div className="coordinatesManager">
      <h2>Manage coordinates below!</h2>

      <div>
        <CoordinatesList />
        <div className="item1">
          <CoordinatePairInput
            coordinates={selectedCoordinates}
            editMode={editMode}
            coordinatesSaved={saveCoordinates}
          />
        </div>
      </div>
    </div>
  );
};

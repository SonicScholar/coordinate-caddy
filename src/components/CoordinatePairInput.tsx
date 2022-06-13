import "./css/CoordinatePairInput.css";
import { CoordinateInput } from "./CoordinateInput";
import { CoordinateInfo } from "./CoordinateInfo";
import { Coordinates } from "../Coordinates";
import { useEffect, useState } from "react";
import { CCButton } from "./controls/CCButton";

// const initialCoordinates = new Coordinates(
//   40.5852602,
//   -105.084423,
//   0,
//   0,
//   "Fort Collins"
// );
export type CoordinatesEditMode = "Add" | "Update" | "disabled";
type CoordinatePairInputProps = {
  initial: Coordinates;
  editMode: CoordinatesEditMode;
  coordinatesSaved: (coordinates: Coordinates) => void;
};
const CoordinatePairInput = ({
  initial,
  editMode,
  coordinatesSaved: coordinatesAdded,
}: CoordinatePairInputProps) => {
  const [coordinates, setCoordinates] = useState(initial);

  useEffect(() => {
    console.log("CoordinatePairInput props changed", initial);
    setCoordinates(initial);
  }, [initial]);

  const setLatitudeCallback = (value: number) => {
    const newValue = { ...coordinates, latitude: value };
    setCoordinates(newValue);
  };

  const setLongitudeCallback = (value: number) => {
    const newValue = { ...coordinates, longitude: value };
    setCoordinates(newValue);
  };

  const setNameCallback = (value: string) => {
    const newValue = { ...coordinates, name: value };
    setCoordinates(newValue);
  };

  console.log("CoordinatePairInput.tsx render", coordinates);
  return (
    <div className={`coordinatePairInput ${editMode}`}>
      <CoordinateInfo
        initialValue={coordinates.name}
        nameChanged={setNameCallback}
      />
      <div className="coordinatesInputContainer">
        <CoordinateInput
          label="Latitude:"
          decimalDegreesValue={coordinates.latitude}
          coordinateChanged={setLatitudeCallback}
        />
        <CoordinateInput
          label="Longitude:"
          decimalDegreesValue={coordinates.longitude}
          coordinateChanged={setLongitudeCallback}
        />
      </div>
      <div className="coordinatesInputButtons">
        {editMode !== "disabled" && (
          <CCButton
            buttonText={`${editMode} Coordinate`}
            buttonPressed={() => coordinatesAdded(coordinates)}
          />
        )}
      </div>
    </div>
  );
};

export { CoordinatePairInput };

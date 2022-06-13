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
  //Fort Collins, CO
  const [coordinates, setCoordinates] = useState(initial);

  useEffect(() => {
    console.log("coordinate props changed", initial);
    setCoordinates(initial);
  }, [initial]);

  const setLatitudeCallback = (value: number) => {
    const newValue = { ...coordinates, latitude: value };
    console.log("latitude changed", newValue);
    setCoordinates(newValue);
  };

  const setLongitudeCallback = (value: number) => {
    const newValue = { ...coordinates, longitude: value };
    console.log("longitude changed", newValue);
    setCoordinates(newValue);
  };

  const setNameCallback = (value: string) => {
    const newValue = { ...coordinates, name: value };
    console.log("name changed", value, newValue);
    setCoordinates(newValue);
  };

  return (
    <div className={`coordinatePairInput ${editMode}`}>
      <CoordinateInfo
        initialValue={coordinates.name}
        nameChanged={setNameCallback}
      />
      <div className="coordinatesInputContainer">
        <CoordinateInput
          label="Latitude:"
          initialValue={coordinates.latitude}
          coordinateChanged={setLatitudeCallback}
        />
        <CoordinateInput
          label="Longitude:"
          initialValue={coordinates.longitude}
          coordinateChanged={setLongitudeCallback}
        />
      </div>
      <div className="coordinatesInputButtons">
        {
          editMode !== "disabled" && (
            <CCButton
              buttonText={`${editMode} Coordinate`}
              buttonPressed={() => coordinatesAdded(coordinates)}
            />
          )
          //   <input
          //   type="button"
          //   value=
          //   onClick={() => coordinatesAdded(coordinates)}
          //   />
        }
      </div>
    </div>
  );
};

export { CoordinatePairInput };

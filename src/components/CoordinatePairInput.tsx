import "./css/CoordinatePairInput.css";
import { CoordinateInput } from "./CoordinateInput";
import { CoordinateInfo } from "./CoordinateInfo";
import { Coordinates } from "../Coordinates";
import { useEffect, useState } from "react";
import { CCButton } from "./controls/CCButton";
import * as Icon from "react-bootstrap-icons";
import { iconSize } from "../App";

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
  coordinatesSaved,
}: CoordinatePairInputProps) => {
  const [coordinates, setCoordinates] = useState(initial);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
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

  const handleCoordinatesUpdated = () => {
    //validation for the form
    const isValid = coordinates.name !== "" && coordinates.name.length > 0;
    setFormValid(isValid);
    if (!isValid) {
      return;
    }
    coordinatesSaved(coordinates);
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
          decimalDegreesValue={coordinates.latitude}
          coordinateChanged={setLatitudeCallback}
        />
        <CoordinateInput
          label="Longitude:"
          decimalDegreesValue={coordinates.longitude}
          coordinateChanged={setLongitudeCallback}
        />
      </div>
      {!formValid && (
        <div className="validationError">
          Please enter a name for these coordinates!
        </div>
      )}
      <div className="coordinatesInputButtons">
        {editMode !== "disabled" && (
          <>
            <CCButton
              buttonContent={<Icon.XLg size={iconSize} />}
              buttonPressed={handleCoordinatesUpdated}
            />
            <CCButton
              buttonContent={<Icon.CheckLg size={iconSize} />}
              buttonPressed={handleCoordinatesUpdated}
            />
          </>
        )}
      </div>
    </div>
  );
};

export { CoordinatePairInput };

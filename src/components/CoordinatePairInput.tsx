import "./css/CoordinatePairInput.css";
import { CoordinateInput } from "./CoordinateInput";
import { CoordinateInfo } from "./CoordinateInfo";
import { Coordinates } from "../Coordinates";
import { CoordinatesEditMode } from "../CustomTypes";
import { useEffect, useState } from "react";
import { CCButton } from "./controls/CCButton";
import * as Icon from "react-bootstrap-icons";
import { iconSize } from "../App";

type CoordinatePairInputProps = {
  coordinates: Coordinates | null;
  editMode: CoordinatesEditMode;
  coordinatesSaved: (coordinates: Coordinates) => void;
};
const CoordinatePairInput: React.FC<CoordinatePairInputProps> = ({
  coordinates,
  editMode,
  coordinatesSaved,
}: CoordinatePairInputProps) => {
  const [internalCoordinates, setInternalCoordinates] = useState(coordinates);
  useEffect(() => {
    setInternalCoordinates(coordinates);
  }, [coordinates]);

  const [formValid, setFormValid] = useState(true);

  const setLatitudeCallback = (value: number) => {
    if (!internalCoordinates) return;
    const newValue = { ...internalCoordinates, latitude: value };
    setInternalCoordinates(newValue);
  };

  const setLongitudeCallback = (value: number) => {
    if (!internalCoordinates) return;
    const newValue = { ...internalCoordinates, longitude: value };
    setInternalCoordinates(newValue);
  };

  const setNameCallback = (value: string) => {
    if (!internalCoordinates) return;
    const newValue = { ...internalCoordinates, name: value };
    setInternalCoordinates(newValue);
  };

  const handleCoordinatesUpdated = () => {
    //validation for the form
    const isValid =
      coordinates !== null &&
      coordinates.name !== "" &&
      coordinates?.name.length > 0;
    setFormValid(isValid);
    if (!isValid) {
      return;
    }
    if (internalCoordinates) coordinatesSaved(internalCoordinates);
  };

  return (
    <div className={`coordinatePairInput ${editMode}`}>
      <CoordinateInfo
        initialValue={internalCoordinates?.name}
        nameChanged={setNameCallback}
      />
      <div className="coordinatesInputContainer">
        <CoordinateInput
          label="Latitude:"
          decimalDegreesValue={
            internalCoordinates ? internalCoordinates.latitude : 0
          }
          coordinateChanged={setLatitudeCallback}
        />
        <CoordinateInput
          label="Longitude:"
          decimalDegreesValue={
            internalCoordinates ? internalCoordinates.longitude : 0
          }
          coordinateChanged={setLongitudeCallback}
        />
      </div>
      {!formValid && (
        <div className="validationError">
          Please enter a name for these coordinates!
        </div>
      )}
      <div className="coordinatesInputButtons">
        <CCButton buttonPressed={handleCoordinatesUpdated}>
          <Icon.XLg size={iconSize} />
        </CCButton>
        <CCButton buttonPressed={handleCoordinatesUpdated}>
          <Icon.CheckLg size={iconSize} />
        </CCButton>
      </div>
    </div>
  );
};

export { CoordinatePairInput };

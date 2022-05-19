import "./css/CoordinatePairInput.css";
import { CoordinateInput } from "./CoordinateInput";
import { CoordinateInfo } from "./CoordinateInfo";
import { Coordinates } from "../Coordinates";
import { useCallback, useState } from "react";

const initialCoordinates = new Coordinates(
  40.5852602,
  -105.084423,
  0,
  0,
  "Fort Collins"
);
type CoordinatePairInputProps = {
  coordinatesAdded: (coordinates: Coordinates) => void;
};
const CoordinatePairInput = ({
  coordinatesAdded,
}: CoordinatePairInputProps) => {
  //Fort Collins, CO
  const [coordinates, setCoordinates] = useState(initialCoordinates);

  const setLatitudeCallback = useCallback(
    (value: number) => {
      setCoordinates({ ...coordinates, latitude: value });
    },
    [coordinates]
  );
  const setLongitudeCallback = useCallback(
    (value: number) => {
      setCoordinates({ ...coordinates, longitude: value });
    },
    [coordinates]
  );

  console.log("coordinate pair input rendered", coordinates);
  return (
    <div className="coordinatePairInput">
      <CoordinateInfo
        initialValue={coordinates.name}
        nameChanged={(text) => setCoordinates({ ...coordinates, name: text })}
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
        <input
          type="button"
          value="Add Coordinate"
          onClick={() => coordinatesAdded(coordinates)}
        />
      </div>
    </div>
  );
};

export { CoordinatePairInput };

import "./CoordinatesInput.css";
import { CoordinateInput } from "./CoordinateInput";
import { CoordinateInfo } from "./CoordinateInfo";

function CoordinatesInput() {
  return (
    <div className="coordinatesInput">
      <CoordinateInfo />
      <div className="coordinatesInputContainer">
        <CoordinateInput name="Latitude" />
        <CoordinateInput name="Longitude" />
      </div>
      <div className="coordinatesInputButtons">
        <input type="button" value="Add" />
        <input type="button" value="Clear" />
      </div>
    </div>
  );
}

export { CoordinatesInput };

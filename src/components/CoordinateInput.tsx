import { useEffect, useState } from "react";
import "./css/CoordinateInput.css";
import { RadialCoordinate } from "../RadialCoordinate";
import { DDCoordinateInput } from "./DDCoordinateInput";
import { DMSCoordinateInput } from "./DMSCoordinateInput";

export type CoordinateInputProps = {
  label: string;
  decimalDegreesValue: number;
  coordinateChanged?: (value: number) => void;
};

//COMPONENT
function CoordinateInput({
  label: name,
  decimalDegreesValue,
  coordinateChanged,
}: CoordinateInputProps) {
  const [decimalDegrees, setDecimalDegrees] = useState(decimalDegreesValue);
  const currentCoordinate = new RadialCoordinate(decimalDegrees);

  //allow updates to the props from the outside to
  //change the state inside
  useEffect(() => {
    console.log(
      "CoordinateInput.tsx decimalDegrees props changed",
      decimalDegreesValue
    );
    setDecimalDegrees(decimalDegrees);
  }, [decimalDegreesValue]);

  const handleDMSChange = (
    degrees: number,
    minutes: number,
    seconds: number
  ) => {
    //quickly convert to decimal degrees, then call that handler
    const newCoordinate = RadialCoordinate.fromDegreesMinutesSeconds(
      degrees,
      minutes,
      seconds
    ).getDecimalDegrees();
    handleDDChange(newCoordinate);
  };

  const handleDDChange = (dd: number) => {
    setDecimalDegrees(dd);
    notifyCoordinateChanged(dd);
  };

  const notifyCoordinateChanged = (dd: number) => {
    if (coordinateChanged) coordinateChanged(dd);
  };

  //render component
  return (
    <div className="coordinateInput">
      <strong>{name}</strong>
      <DDCoordinateInput
        decimalDegrees={decimalDegrees}
        onUpdate={handleDDChange}
      />
      <p>or...</p>
      <DMSCoordinateInput
        degrees={currentCoordinate.degrees}
        minutes={currentCoordinate.minutes}
        seconds={currentCoordinate.seconds}
        onUpdate={handleDMSChange}
      />
    </div>
  );
}

export { CoordinateInput };

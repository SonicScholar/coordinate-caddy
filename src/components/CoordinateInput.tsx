import { useEffect, useState, useCallback } from "react";
import "./css/CoordinateInput.css";
import { RadialCoordinate } from "../RadialCoordinate";
import { DDCoordinateInput } from "./DDCoordinateInput";
import { DMSCoordinateInput } from "./DMSCoordinateInput";

export type CoordinateInputProps = {
  label: string;
  initialValue: number;
  coordinateChanged?: (value: number) => void;
};

//COMPONENT
function CoordinateInput({
  label: name,
  initialValue,
  coordinateChanged,
}: CoordinateInputProps) {
  //state hook
  const [decimalDegrees, setDecimalDegrees] = useState(initialValue);

  //hack: even though useCallback is used, the child components
  //re-render like mad when coordinateChanged is added to the
  //dep list. The parent components also wrap in useCallback
  //and still the problem persists...
  const coordinateChangedCallback = useCallback((value: number) => {
    if (coordinateChanged) coordinateChanged(value);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //for ease of converting in/out of Deg,Min,Sec.
  const currentCoordinate = new RadialCoordinate(decimalDegrees);

  //input control update handler
  const handleDMSChange = ({
    degrees,
    minutes,
    seconds,
  }: {
    degrees: number;
    minutes: number;
    seconds: number;
  }) => {
    const newCoordinate = RadialCoordinate.fromDegreesMinutesSeconds(
      degrees,
      minutes,
      seconds
    ).getDecimalDegrees();
    setDecimalDegrees(newCoordinate);
  };

  useEffect(() => {
    coordinateChangedCallback(decimalDegrees);
  }, [decimalDegrees, coordinateChangedCallback]);

  //render component
  return (
    <div className="coordinateInput">
      <strong>{name}</strong>
      <DDCoordinateInput
        decimalDegrees={decimalDegrees}
        onUpdate={(dd) => setDecimalDegrees(dd)}
      />
      <p>or...</p>
      <DMSCoordinateInput
        degrees={currentCoordinate.degrees}
        minutes={currentCoordinate.minutes}
        seconds={currentCoordinate.seconds}
        onUpdate={(d, m, s) =>
          handleDMSChange({ degrees: d, minutes: m, seconds: s })
        }
      />
    </div>
  );
}

export { CoordinateInput };

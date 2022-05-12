import { useState } from "react";
import "./CoordinateInput.css";
import {RadialCoordinate} from "../RadialCoordinate";
import {DDCoordinateInput} from "./DDCoordinateInput";
import {DMSCoordinateInput} from "./DMSCoordinateInput";


interface CoordinateInputProps {
  name: string;
}

//COMPONENT
const defaultState = RadialCoordinate.fromDegreesMinutesSeconds(42, 30, 15);
function CoordinateInput({ name }: CoordinateInputProps) {
  //state hook
  const [decimalDegrees, setCoordinate] = useState<number>(
    defaultState.getDecimalDegrees()
  );
  //for ease of converting in/out of Deg,Min,Sec.
  const currentCoordinate = new RadialCoordinate(decimalDegrees);

  //input control update handler
  const handleDMSChange = ({
    degrees,
    minutes,
    seconds
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
    setCoordinate(newCoordinate);
  };

  //render component
  return (
    <div className="coordinateInput">
      <strong>{name}</strong>
      <DDCoordinateInput
        decimalDegrees={decimalDegrees}
        onUpdate={(dd) => setCoordinate(dd)}
      />
      {/* <StyledInput type='number' /> */}
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

import "./DMSCoordinateInput.css";
import { VerticalInputLabelPair } from "./controls/VerticalInputLabelPair";

export type DMSCoordinateInputProps = {
  degrees: number;
  minutes: number;
  seconds: number;
  onUpdate?: (degrees: number, minutes: number, seconds: number) => void;
};

export const DMSCoordinateInput = ({
  degrees,
  minutes,
  seconds,
  onUpdate,
}: DMSCoordinateInputProps) => {
  const dms = { degrees, minutes, seconds };
  const handleUpdate = (coord: DMSCoordinateInputProps) => {
    if (onUpdate) onUpdate(coord.degrees, coord.minutes, coord.seconds);
  };

  return (
    <div className="dmsInput">
      <VerticalInputLabelPair
        label="Degrees"
        value={`${degrees}`}
        inputChanged={(text) => {
          handleUpdate({ ...dms, degrees: Number(text) });
        }}
        inputType="integer"
      />

      <VerticalInputLabelPair
        label="Minutes"
        value={`${minutes}`}
        inputChanged={(text) => {
          handleUpdate({ ...dms, minutes: Number(text) });
        }}
        inputType="integer"
      />

      <VerticalInputLabelPair
        label="Seconds"
        value={`${Number(seconds.toFixed(5))}`}
        inputChanged={(text) => {
          handleUpdate({ ...dms, seconds: Number(text) });
        }}
        inputType="number"
      />
    </div>
  );
};

export default DMSCoordinateInput;

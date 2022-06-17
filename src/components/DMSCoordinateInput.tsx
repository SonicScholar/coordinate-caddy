import "./css/DMSCoordinateInput.css";
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
        label="Deg."
        value={`${degrees}`}
        inputChanged={(text) => {
          handleUpdate({ ...dms, degrees: Number(text) });
        }}
        inputType="integer"
      />

      <VerticalInputLabelPair
        label="Min."
        value={`${minutes}`}
        inputChanged={(text) => {
          handleUpdate({ ...dms, minutes: Number(text) });
        }}
        inputType="integer"
      />

      <VerticalInputLabelPair
        label="Sec."
        value={`${Number(seconds.toFixed(5)) % 60}`}
        inputChanged={(text) => {
          handleUpdate({ ...dms, seconds: Number(text) });
        }}
        inputType="number"
      />
    </div>
  );
};

export default DMSCoordinateInput;

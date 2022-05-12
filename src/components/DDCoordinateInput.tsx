import "./DDCoordinateInput.css";
import { VerticalInputLabelPair } from "./controls/VerticalInputLabelPair";

type DDCoordinateInputProps = {
  decimalDegrees: number;
  onUpdate: (dd: number) => void;
};

export const DDCoordinateInput = ({
  decimalDegrees,
  onUpdate,
}: DDCoordinateInputProps) => {
  const inputChanged = (text: string) => {
    const numValue = Number(text);
    if (!isNaN(numValue)) {
      onUpdate(numValue);
    }
  };

  console.log(`DD input render`);
  return (
    <div className="ddInput">
      <VerticalInputLabelPair
        label="Decimal Degrees"
        value={`${Number(decimalDegrees.toFixed(11))}`}
        inputChanged={inputChanged}
        inputType="text"
      />
    </div>
  );
};

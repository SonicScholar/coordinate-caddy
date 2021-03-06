// import "./VerticalInputLabelPair.css";
import { Input } from "./Input";

export type VerticalInputLabelPairProps = {
  label: string;
  value: string;
  inputType: string;
  inputChanged: (value: string) => void;
};

export const VerticalInputLabelPair: React.FC<VerticalInputLabelPairProps> = ({
  label = "label",
  value = "value",
  inputType = "text",
  inputChanged,
}: VerticalInputLabelPairProps) => {
  //

  return (
    <div className="verticalInputLabelPair">
      <label>{label}</label>
      <Input type={inputType} value={value} valueChanged={inputChanged} />
    </div>
  );
};

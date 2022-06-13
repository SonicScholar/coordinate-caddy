import { Input } from "./controls/Input";
import "./css/CoordinateInfo.css";

export type CoordinateInfoProps = {
  initialValue?: string;
  nameChanged: (text: string) => void;
};
export const CoordinateInfo = ({
  initialValue = "",
  nameChanged,
}: CoordinateInfoProps) => {
  return (
    <div className="coordinateInfo">
      <strong>Name:</strong>
      <Input value={initialValue} type="text" valueChanged={nameChanged} placeholder="My coordinate..." />
    </div>
  );
};

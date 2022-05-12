import { Input } from "./controls/Input";
import "./CoordinateInfo.css"

export const CoordinateInfo = () => {
  return (
    <div className="coordinateInfo">
      <strong>Name:</strong>
      <Input value="" type="text" valueChanged={(v) => {}} />
    </div>
  );
}
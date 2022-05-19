import "./css/CompareCoordinatesListItem.css";
import { Coordinates } from "../Coordinates";

export type CompareCoordinatesListItemProps = {
  coordinates: Coordinates;
  isSelected: boolean;
  compareAgainstCoordinates: number;
};
export const CompareCoordinatesListItem = ({
  coordinates,
  isSelected,
  compareAgainstCoordinates,
}: CompareCoordinatesListItemProps) => {
  let className = "compareCoordinatesListItem";
  if (isSelected) className += " itemSelected";

  const { name, latitude, longitude } = coordinates;

  console.log("compare item rendered");
  return (
    <div className={className}>
      <div className="name">{name}</div>
      <div className="latlon">
        <div className="lat">{latitude}</div>
        <div className="lon">{longitude}</div>
      </div>
      <div className="compareAgainst">test</div>
    </div>
  );
};

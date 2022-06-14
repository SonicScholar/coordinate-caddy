import "./css/CompareCoordinatesListItem.css";
import { Coordinates } from "../Coordinates";

export type CompareCoordinatesListItemProps = {
  coordinates: Coordinates;
  isSelected: boolean;
  compareAgainstCoordinates: number;
  itemClicked?: (coords: Coordinates) => void;
};
export const CompareCoordinatesListItem = ({
  coordinates,
  isSelected,
  compareAgainstCoordinates,
  itemClicked,
}: CompareCoordinatesListItemProps) => {
  let className = "compareCoordinatesListItem";
  if (isSelected) className += " itemSelected";

  const { name, latitude, longitude } = coordinates;

  const handleClick = () => {
    if (itemClicked) itemClicked(coordinates);
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className="name">{name}</div>
      <div className="latlon">
        <div className="lat">{latitude}</div>
        <div className="lon">{longitude}</div>
      </div>
      <div className="compareAgainst">test</div>
    </div>
  );
};

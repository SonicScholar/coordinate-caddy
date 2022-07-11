import "./css/CoordinatesListItem.css";
import * as Icon from "react-bootstrap-icons";
import { iconSize } from "../App";
import { Coordinates } from "../Coordinates";
import React, { useContext, useState } from "react";
import { CCButton } from "./controls/CCButton";
import { CoordinatesContext } from "../contexts/CoordinatesContext";
import { friendlyDistance, vincentyInverse } from "../vincenty";

export type CoordinatesListItemProps = {
  coordinates: Coordinates;
};
export const CoordinatesListItem: React.FC<CoordinatesListItemProps> = ({
  coordinates,
}: CoordinatesListItemProps) => {
  const {
    selectedCoordinates,
    selectCoordinates,
    deleteCoordinates,
    addCoordinates,
  } = useContext(CoordinatesContext);
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = coordinates.id === selectedCoordinates?.id;

  let className = "coordinatesListItem coordinatesListGrid";
  if (isSelected) className += " itemSelected";

  const { name, latitude, longitude } = coordinates;

  let distanceToSelected: number | string | null = "";

  if (isSelected) distanceToSelected = "0.00 cm";
  else if (selectedCoordinates === null) distanceToSelected = "N/A";
  else {
    const rawDistance = vincentyInverse(coordinates, selectedCoordinates);
    distanceToSelected = friendlyDistance(rawDistance);
  }

  // Note on MouseEvent handlers:
  // just in case the parent component is listening for
  // a click. Avoid notifying the parent so we avoid
  // ambiguity on who was clicked on. This could always
  // be configurable via a prop or something...
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { id } = coordinates;
    //deselect if on the currently selected
    if (selectedCoordinates?.id === id) {
      selectCoordinates(null);
      return;
    }
    selectCoordinates(coordinates);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCoordinates(coordinates);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    //make a copy of the coordinates with new Id, but same other values
    const { latitude, longitude, M, Z, name } = coordinates;
    const newCoordinates = new Coordinates(latitude, longitude, Z, M, name);
    addCoordinates(newCoordinates);
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="name col1">{name}</div>
      <div className="latlon col2">
        <div className="lat">{Number(latitude.toFixed(8))}</div>
        <div className="lon">{Number(longitude.toFixed(8))}</div>
      </div>
      <div className="distance col3">{distanceToSelected}</div>
      <div className="coordinatesItemAction col4">
        {isHovered && (
          <>
            <CCButton enabled={true} buttonPressed={handleCopy}>
              <Icon.Clipboard2Plus size={iconSize} />
            </CCButton>
            <CCButton enabled={true} buttonPressed={handleDelete}>
              <Icon.XLg size={iconSize} />
            </CCButton>
          </>
        )}
      </div>
    </div>
  );
};

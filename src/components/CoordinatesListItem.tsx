import "./css/CoordinatesListItem.css";
import { Coordinates } from "../Coordinates";
import React, { useState } from "react";
import { CCButton } from "./controls/CCButton";

export type CoordinatesListItemProps = {
  coordinates: Coordinates;
  isSelected: boolean;
  compareAgainstCoordinates: number;
  itemClicked?: (coords: Coordinates) => void;
  itemDeleted?: (coords: Coordinates) => void;
};
export const CoordinatesListItem = ({
  coordinates,
  isSelected,
  compareAgainstCoordinates,
  itemClicked,
  itemDeleted,
}: CoordinatesListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  let className = "coordinatesListItem";
  if (isSelected) className += " itemSelected";

  const { name, latitude, longitude } = coordinates;

  const handleClick = (e: React.MouseEvent) => {
    // just in case the parent component is listening for
    // a click. Avoid notifying the parent so we avoid
    // ambiguity on who was clicked on. This could always
    // be configurable via a prop or something...
    e.stopPropagation();
    if (itemClicked) itemClicked(coordinates);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemDeleted) itemDeleted(coordinates);
  };

  const selectedOrHovered = isSelected || isHovered;
  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="name">{name}</div>
      <div className="latlon">
        <div className="lat">{latitude}</div>
        <div className="lon">{longitude}</div>
      </div>
      <div className="coordinatesItemAction">
        {isHovered && (
          <CCButton
            buttonContent="X"
            enabled={true}
            buttonPressed={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

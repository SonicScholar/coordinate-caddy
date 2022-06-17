import "./css/CoordinatesListItem.css";
import * as Icon from "react-bootstrap-icons";
import { iconSize } from "../App";
import { Coordinates } from "../Coordinates";
import React, { useState } from "react";
import { CCButton } from "./controls/CCButton";

export type CoordinatesListItemProps = {
  coordinates: Coordinates;
  isSelected: boolean;
  compareAgainstCoordinates: number;
  itemClicked?: (coords: Coordinates) => void;
  itemDeleted?: (coords: Coordinates) => void;
  itemCopied?: (coords: Coordinates) => void;
};
export const CoordinatesListItem = ({
  coordinates,
  isSelected,
  compareAgainstCoordinates,
  itemClicked,
  itemDeleted,
  itemCopied,
}: CoordinatesListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  let className = "coordinatesListItem";
  if (isSelected) className += " itemSelected";

  const { name, latitude, longitude } = coordinates;

  // Note on MouseEvent handlers:
  // just in case the parent component is listening for
  // a click. Avoid notifying the parent so we avoid
  // ambiguity on who was clicked on. This could always
  // be configurable via a prop or something...
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemClicked) itemClicked(coordinates);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemDeleted) itemDeleted(coordinates);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemCopied) {
      //make a copy of the coordinates with new Id, but same other values
      const { latitude, longitude, M, Z, name } = coordinates;
      const newCoordinates = new Coordinates(latitude, longitude, Z, M, name);
      itemCopied(newCoordinates);
    }
  };
  let deleteIcon = String.fromCharCode(0x00d7);
  deleteIcon = String.fromCharCode(0x1f5ce);

  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="name">{name}</div>
      <div className="latlon">
        <div className="lat">{Number(latitude.toFixed(8))}</div>
        <div className="lon">{Number(longitude.toFixed(8))}</div>
      </div>
      <div className="coordinatesItemAction">
        {isHovered && (
          <>
            <CCButton
              buttonContent={<Icon.Clipboard2Plus size={iconSize} />}
              enabled={true}
              buttonPressed={handleCopy}
            />
            <CCButton
              buttonContent={<Icon.XLg size={iconSize} />}
              enabled={true}
              buttonPressed={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

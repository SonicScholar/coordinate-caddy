import "./css/CoordinatesList.css";
import * as Icon from "react-bootstrap-icons";
import { iconSize } from "../App";
import { Coordinates } from "../Coordinates";
import { CoordinatesListItem } from "./CoordinatesListItem";
import { useEffect, useState } from "react";
import { CCButton } from "./controls/CCButton";

export type CoordinatesListProps = {
  coordinatesList: Coordinates[];
  selectedItem: Coordinates | null;
  coordinatesAdded?: (coordinates: Coordinates) => void;
  coordinatesSelected?: (coordinates: Coordinates | null) => void;
  coordinatesDeleted?: (coordinates: Coordinates) => void;
};
export const CoordinatesList = ({
  coordinatesList,
  selectedItem,
  coordinatesAdded,
  coordinatesSelected,
  coordinatesDeleted,
}: CoordinatesListProps) => {
  // all calls to change selectedItemId state should be in here
  const changeCoordinatesSelection = (coordinates: Coordinates | null) => {
    if (coordinatesSelected) coordinatesSelected(coordinates);
  };

  //
  // ITEM ADDED
  //
  const handleItemAdded = () => {
    if (coordinatesAdded) {
      const newCoordinates = new Coordinates(0, 0, 0, 0, "New Coordinates");
      coordinatesAdded(newCoordinates);
    }
  };

  //
  // ITEM SELECTED
  //
  const handleItemSelected = (coordinates: Coordinates) => {
    const { id } = coordinates;
    //deselect if on the currently selected
    if (selectedItem?.id === id) {
      changeCoordinatesSelection(null);
      return;
    }
    changeCoordinatesSelection(coordinates);
  };

  //
  // ITEM DELETED
  //
  const handleItemDeleted = (coordinates: Coordinates) => {
    if (coordinatesDeleted) coordinatesDeleted(coordinates);
  };

  const hasItems = coordinatesList.length > 0;

  return (
    <div className="coordinatesList">
      <div className="coordinatesListHeader">
        <div className="helpText">
          {hasItems
            ? "Click on an item to select or deselect it."
            : "Add some coordinates"}
        </div>
        <div className="actionButtons">
          <CCButton
            buttonContent={<Icon.PlusLg size={iconSize} />}
            buttonPressed={handleItemAdded}
          />
          <CCButton
            buttonContent={<Icon.Save2 size={iconSize} />}
            buttonPressed={() => {}}
          />
          <CCButton
            buttonContent={<Icon.Trash size={iconSize} />}
            buttonPressed={() => {}}
          />
        </div>
      </div>

      {hasItems &&
        coordinatesList.map((coordinates) => (
          <CoordinatesListItem
            key={coordinates.id}
            coordinates={coordinates}
            isSelected={coordinates.id === selectedItem?.id}
            compareAgainstCoordinates={0}
            itemClicked={handleItemSelected}
            itemDeleted={handleItemDeleted}
          />
        ))}
    </div>
  );
};

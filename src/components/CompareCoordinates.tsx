import "./css/CompareCoordinates.css";
import { Coordinates } from "../Coordinates";
import { CompareCoordinatesListItem } from "./CompareCoordinatesListItem";
import { useState } from "react";

export type CompareCoordinatesProps = {
  coordinatesList: Coordinates[];
};
export const CompareCoordinates = ({
  coordinatesList,
}: CompareCoordinatesProps) => {
  const [selectedItemId, setSelectedItemId] = useState(-1);

  const handleItemClick = ({ id }: Coordinates) => {
    setSelectedItemId(id);
  };

  return (
    <div className="compareCoordinates">
      {coordinatesList.length > 0
        ? coordinatesList.map((coordinates) => (
            <CompareCoordinatesListItem
              key={coordinates.id}
              coordinates={coordinates}
              isSelected={coordinates.id == selectedItemId}
              compareAgainstCoordinates={0}
              itemClicked={handleItemClick}
            />
          ))
        : "Add coordinates to compare"}
    </div>
  );
};

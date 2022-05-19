import "./css/CompareCoordinates.css";
import { Coordinates } from "../Coordinates";
import { CompareCoordinatesListItem } from "./CompareCoordinatesListItem";

export type CompareCoordinatesProps = {
  coordinatesList: Coordinates[];
};
export const CompareCoordinates = ({
  coordinatesList,
}: CompareCoordinatesProps) => {
  console.log("compare coordinates", coordinatesList);
  return (
    <div className="compareCoordinates">
      {coordinatesList.length > 0
        ? coordinatesList.map((coordinates) => (
            <CompareCoordinatesListItem
              key={Math.random()}
              coordinates={coordinates}
              isSelected={false}
              compareAgainstCoordinates={0}
            />
          ))
        : "Add coordinates to compare"}
    </div>
  );
};

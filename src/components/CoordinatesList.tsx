import "./css/CoordinatesList.css";
import * as Icon from "react-bootstrap-icons";
import { iconSize } from "../App";
import { Coordinates } from "../Coordinates";
import { CoordinatesListItem } from "./CoordinatesListItem";
import { CCButton } from "./controls/CCButton";
import { useContext } from "react";
import { CoordinatesContext } from "../contexts/CoordinatesContext";

export const CoordinatesList: React.FC = () => {
  //
  const {
    addCoordinates,
    coordinatesList,
    saveAllCoordinates,
    deleteAllCoordinates,
    revertToLastSavedCoordinates,
  } = useContext(CoordinatesContext);

  //
  // ITEM ADDED
  //
  const addNewCoordinates = () => {
    const newCoordinates = new Coordinates(0, 0, 0, 0, "New Coordinates");
    addCoordinates(newCoordinates);
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
          <CCButton buttonPressed={addNewCoordinates}>
            <Icon.PlusLg size={iconSize} />
          </CCButton>
          <CCButton buttonPressed={saveAllCoordinates}>
            <Icon.Save2 size={iconSize} />
          </CCButton>
          <CCButton buttonPressed={revertToLastSavedCoordinates}>
            <Icon.ArrowCounterclockwise size={iconSize} />
          </CCButton>
          <CCButton buttonPressed={deleteAllCoordinates}>
            <Icon.Trash size={iconSize} />
          </CCButton>
        </div>
      </div>
      <div className="listItemsContainer">
        <div className="coordinatesListGrid">
          <div className="col1">Name:</div>
          <div className="col2">Coordinates:</div>
          <div className="col3">Distance to selected</div>
          <div className="col4"></div>
        </div>
        {hasItems &&
          coordinatesList.map((coordinates) => (
            <CoordinatesListItem
              key={coordinates.id}
              coordinates={coordinates}
            />
          ))}
      </div>
    </div>
  );
};

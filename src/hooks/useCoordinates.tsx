import { useState } from "react";
import { CoordinatesEditMode } from "../CustomTypes";
import { Coordinates } from "../Coordinates";
import { useLocalStorage } from "./useLocalStorage";

const COORDINATES_LIST_LOCAL_STORAGE = "CoordinatesList";

const defaultCoordinates: Coordinates | null = null;

export type CoordinatesHook = {
  coordinatesList: Coordinates[];
  selectedCoordinates: Coordinates | null;
  editMode: CoordinatesEditMode;
  saveCoordinates: (coordinates: Coordinates) => void;
  saveAllCoordinates: () => void;
  addCoordinates: (coordinates: Coordinates) => void;
  selectCoordinates: (coordinates: Coordinates | null) => void;
  deleteCoordinates: (coordinates: Coordinates) => void;
  deleteAllCoordinates: () => void;
  revertToLastSavedCoordinates: () => void;
};

/* */
export const useCoordinates = (): CoordinatesHook => {
  //
  //coordinates in local storage for browser persistence
  //
  const [coordinatesListStorage, setCoordinatesListStorage] = useLocalStorage<
    Coordinates[]
  >(COORDINATES_LIST_LOCAL_STORAGE, []);

  //
  // local copy of list of coordinates before being saved in local storage
  //
  const [coordinatesList, setCoordinatesList] = useState<Coordinates[]>(
    coordinatesListStorage
  );

  //
  // currently selected coordinates
  //
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Coordinates | null>(defaultCoordinates);

  //
  // manage edit mode
  //
  const [editMode, setEditMode] = useState<CoordinatesEditMode>("disabled");

  //
  // HANDLERS
  //
  const saveCoordinates = (coordinates: Coordinates) => {
    //update existing coordinates
    const newCoordinatesList = coordinatesList.map((coords) => {
      return coordinates.id === coords.id ? coordinates : coords;
    });
    //add new one if needed
    if (editMode === "Add") {
      newCoordinatesList.push(coordinates);
      setEditMode("disabled");
      setSelectedCoordinates(new Coordinates(0, 0, 0, 0, ""));
    }

    setCoordinatesList(newCoordinatesList);
  };

  //
  // add coordinates
  //
  const addCoordinates = (coordinates: Coordinates) => {
    setSelectedCoordinates(coordinates);
    setCoordinatesList([...coordinatesList, coordinates]);
    setEditMode("Update");
  };

  //
  // select coordinates
  //
  const selectCoordinates = (coordinates: Coordinates | null) => {
    if (coordinates !== null) {
      setSelectedCoordinates(coordinates);
      setEditMode("Update");
    } else {
      setSelectedCoordinates(null);
      setEditMode("disabled");
    }
  };

  //
  // delete coordinates
  //
  const deleteCoordinates = (coordinates: Coordinates) => {
    const newSelectedIndex = Math.max(
      coordinatesList.indexOf(coordinates) - 1,
      0
    );
    const newCoordinatesList = coordinatesList.filter(
      (coords) => coords.id !== coordinates.id
    );

    if (newCoordinatesList.length === 0) {
      setEditMode("disabled");
      setSelectedCoordinates(null);
    } else {
      //if nothing was selected before, don't select anything
      //else select the previous adjacent item
      const newSelectedCoordinates =
        selectedCoordinates === null
          ? null
          : newCoordinatesList[newSelectedIndex];

      setSelectedCoordinates(newSelectedCoordinates);
    }
    setCoordinatesList(newCoordinatesList);
  };

  const deleteAllCoordinates = () => {
    setCoordinatesList([]);
    setSelectedCoordinates(null);
    setEditMode("disabled");
  };
  //
  // save all coordinates to local storage
  //
  const saveAllCoordinates = () => {
    setCoordinatesListStorage(coordinatesList);
  };

  //
  // revert back to local storage save
  //
  const revertToLastSavedCoordinates = () => {
    setCoordinatesList(coordinatesListStorage);
    setSelectedCoordinates(null);
    setEditMode("disabled");
  };

  const hook: CoordinatesHook = {
    coordinatesList,
    selectedCoordinates,
    editMode,
    saveCoordinates,
    saveAllCoordinates,
    addCoordinates,
    selectCoordinates,
    deleteCoordinates,
    deleteAllCoordinates,
    revertToLastSavedCoordinates,
  };

  return hook;
};

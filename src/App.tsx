import "./App.css";
import { CoordinatesInput } from "./components/CoordinatesInput";

/*
 - Make app to input coordinates in either decimal degrees, or degrees minutes second
 - Coordinates can be added to a list that can be deleted

*/

export default function App() {
  return (
    <div className="App">
      <h1>Coordinate Caddy</h1>
      <h2>Edit coordinate information below!</h2>
      <CoordinatesInput />
    </div>
  );
}
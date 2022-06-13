import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/">Coordinates</Link>
        <Link to="/about">About</Link>
      </ul>
    </nav>
  );
};

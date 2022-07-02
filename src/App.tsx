import "./App.css";
import { useContext, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import { getAboutUrl, Nav } from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoordinatesManager } from "./components/CoordinatesManager";
import { globalConfigUrl } from "./Config";
import { ConfigContext } from "./contexts/ConfigContext";

/*
 - Make app to input coordinates in either decimal degrees, or degrees minutes second
 - Coordinates can be added to a list that can be deleted

*/
export const iconSize = "1.5em";

type ConfigReadyState = boolean | "error";
export default function App() {
  //load configuration and display the application
  const [configReadyState, setConfigReadyState] =
    useState<ConfigReadyState>(false);
  const { config, setConfig } = useContext(ConfigContext);

  useEffect(() => {
    fetch(globalConfigUrl)
      .then(async (response) => {
        const configData = await response.json();
        setConfig(configData);
        setConfigReadyState(true);
      })
      .catch((reason) => {
        console.log("failed to load config.json", reason);
        setConfigReadyState("error");
      });
  }, [setConfig]);

  if (configReadyState === false) {
    return <div id="appLoading">Loading application...</div>;
  } else if (configReadyState === "error") {
    return <div id="appLoadError">Uh oh! App failed to load!</div>;
  }

  const aboutUrl = getAboutUrl(config.siteUrl);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="App">
          <h1>
            <Icon.GeoAltFill />
            &nbsp;Coordinate Caddy&nbsp;
            <Icon.Globe2 />
          </h1>
          <div className="container">
            <Routes>
              <Route
                path={`${config.siteUrl}`}
                element={<CoordinatesManager />}
              />
              <Route path={aboutUrl} element={<h1>ABOUT</h1>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

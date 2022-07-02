import { createContext } from "react";
import { Config, defaultConfig } from "../Config";
import { useConfig } from "../hooks/useConfig";

//interface
type ConfigContextInterface = {
  config: Config;
  setConfig: (config: Config) => void;
};

//sample value
const defaultConfigContext: ConfigContextInterface = {
  config: defaultConfig,
  setConfig: () => {},
};

//React Context
export const ConfigContext =
  createContext<ConfigContextInterface>(defaultConfigContext);

//Context Provider Component
export const ConfigProvider: React.FC = ({ children }) => {
  //provider component encapsulates and manages state
  const configContext = useConfig();
  return (
    <ConfigContext.Provider value={configContext}>
      {children}
    </ConfigContext.Provider>
  );
};

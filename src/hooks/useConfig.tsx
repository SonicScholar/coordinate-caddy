import { useState } from "react";
import { defaultConfig } from "../Config";

export const useConfig = () => {
  const [config, setConfig] = useState(defaultConfig);

  return { config, setConfig };
};

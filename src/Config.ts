// config.ts
export type Config = {
    siteUrl: string;
    geometryServerUrl: string;
  }
  
  export const defaultConfig: Config = {
    siteUrl: "/",
    geometryServerUrl: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer"
  };
  
  //todo: does this need to work in relative
  //directory to the root of the domain?
  export const globalConfigUrl = "config.json";
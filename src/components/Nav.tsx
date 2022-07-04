import { useContext } from "react";
import { Link } from "react-router-dom";
import { ConfigContext } from "../contexts/ConfigContext";

const getSiteUrlWithTrailingSlash = (siteUrl: string) =>
  siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;

export const getAboutUrl = (siteUrl: string) =>
  getSiteUrlWithTrailingSlash(siteUrl) + "about";

export const Nav: React.FC = () => {
  const { config } = useContext(ConfigContext);

  const aboutUrl = getAboutUrl(config.siteUrl);
  return (
    <nav>
      <ul>
        <Link to={config.siteUrl}>Home</Link>
        <Link to={config.siteUrl}>Coordinates</Link>
        <Link to={aboutUrl}>About</Link>
      </ul>
    </nav>
  );
};

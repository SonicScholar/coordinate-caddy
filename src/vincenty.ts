import { Coordinates } from "./Coordinates";

// T. Vincenty's inverse solution to calculate distances between
// two coordinates located on an ellipsoid. WGS84 ellipsoid is used
// in this implementation. (Virtually identical to GRS80). Future
// implementation could allow custom ellipsoid to be passed in.
export const vincentyInverse = (p1: Coordinates, p2: Coordinates) => {
  //
  //wgs84 ellipsoid info
  //
  const wgs84Ellipsoid = {
    equatorialRadius: 6378137,
    flattening: 1 / 298.257223563,
    eccentricitySquared: 0.00669438,
  };

  const a = wgs84Ellipsoid.equatorialRadius; // Major semi-axis of ellipsoid
  const f = wgs84Ellipsoid.flattening; // Flattening
  const b = a - a * f; // Minor semi-axis of ellipsoid
  const bSquared = b * b;

  const toRadians = (angle: number) => (Math.PI / 180) * angle;
  const { atan, tan, sin, cos, sqrt, atan2, abs, floor, pow } = Math;

  const round = (x: number, p: number) =>
    (x > 0 ? 1 : -1) * floor(abs(x) / pow(10.0, p) + 0.5) * pow(10.0, p);

  const L = toRadians(p2.longitude - p1.longitude);
  const U1 = atan((1 - f) * tan(toRadians(p1.latitude)));
  const U2 = atan((1 - f) * tan(toRadians(p2.latitude)));
  const sinU1 = sin(U1);
  const sinU2 = sin(U2);
  const cosU1 = cos(U1);
  const cosU2 = cos(U2);

  let lambda = L;
  let limit = 20;
  let prev: number;
  let cosLambda: number;
  let cosSquaredAlpha: number;
  let sinSigma: number;
  let cosSigma: number;
  let sigma: number;
  let cosTwoSigmaM: number;
  let sinAlpha: number;

  do {
    const sinLambda = sin(lambda);
    cosLambda = cos(lambda);

    const tmp = cosU1 * sinU2 - sinU1 * cosU2 * cosLambda;
    sinSigma = sqrt(cosU2 * cosU2 * sinLambda * sinLambda + tmp * tmp); // (14)

    if (sinSigma === 0.0) return 0.0; // coincident points

    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda; // (15)

    sigma = atan2(sinSigma, cosSigma); // (16)

    sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma; // (17)

    cosSquaredAlpha = 1 - sinAlpha * sinAlpha;

    cosTwoSigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSquaredAlpha; // (18)

    if (isNaN(cosTwoSigmaM)) cosTwoSigmaM = 0; // Crossed the equator?

    const C = (f / 16) * cosSquaredAlpha * (4 + f * (4 - 3 * cosSquaredAlpha)); // (10)

    prev = lambda;
    lambda =
      L +
      (1 - C) *
        f *
        sinAlpha *
        (sigma +
          C *
            sinSigma *
            (cosTwoSigmaM +
              C * cosSigma * (-1 + 2 * cosTwoSigmaM * cosTwoSigmaM))); // (11)
  } while (abs(lambda - prev) > 1e-10 && --limit > 0); // Iterate until change is negligible.  ???

  if (limit === 0) return NaN; // no convergence, fmod(n.n, 0.0) returns NaN.

  const uSquared = (cosSquaredAlpha * (a * a - bSquared)) / bSquared;
  const A =
    1 +
    (uSquared / 16384) *
      (4096 + uSquared * (-768 + uSquared * (320 - 175 * uSquared))); // (3)

  const B =
    (uSquared / 1024) *
    (256 + uSquared * (-128 + uSquared * (74 - 47 * uSquared))); // (4)

  const deltaSigma =
    B *
    sin(sigma) *
    (cosTwoSigmaM +
      (B / 4) *
        (cos(sigma) * (-1 + 2 * cosTwoSigmaM * cosTwoSigmaM) -
          (B / 6) *
            cosTwoSigmaM *
            (-3 + 4 * sinSigma * sinSigma) *
            (-3 + 4 * cosTwoSigmaM * cosTwoSigmaM))); // (6)

  const distance = round(b * A * (sigma - deltaSigma), -3); // s, in meters, rounded

  return distance;
};

export function friendlyDistance(distanceInMeters: number): string {
  let units = "m";
  let numeric = distanceInMeters;
  if (distanceInMeters >= 1000) {
    numeric = distanceInMeters / 1000;
    units = "km";
  } else if (distanceInMeters < 1) {
    numeric *= 100;
    units = "cm";
  }
  return `${numeric.toFixed(1)} ${units}`;
}

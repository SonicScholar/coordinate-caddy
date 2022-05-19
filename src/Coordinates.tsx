export class Coordinates {
  name: string = "";
  latitude: number = 0;
  longitude: number = 0;
  Z: number = 0;
  M: number = 0;

  constructor(
    latitude: number,
    longitude: number,
    Z: number = 0,
    M: number = 0,
    name: string = ""
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.Z = Z;
    this.M = M;
    this.name = name;
  }
}

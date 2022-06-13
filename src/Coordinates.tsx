export class Coordinates {
  id: number;
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
    //random id from 1 to 1 million... could use uuid
    this.id = Number((Math.random() * Math.pow(10, 9)).toFixed(0));
    this.latitude = latitude;
    this.longitude = longitude;
    this.Z = Z;
    this.M = M;
    this.name = name;
  }
}

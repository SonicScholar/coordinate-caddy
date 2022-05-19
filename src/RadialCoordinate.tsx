export class RadialCoordinate {
  degrees: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(decimalDegrees: number = 0) {
    this.setDecimalDegrees(decimalDegrees);
  }

  public static fromDegreesMinutesSeconds(
    degrees: number,
    minutes: number,
    seconds: number
  ): RadialCoordinate {
    let result = new RadialCoordinate();
    result.degrees = degrees;
    result.minutes = minutes;
    result.seconds = seconds;
    return result;
  }

  public getDecimalDegrees(): number {
    return this.degrees + this.minutes / 60 + this.seconds / 60 / 60;
  }

  public setDecimalDegrees(dd: number) {
    //if negative, make it positive, but remember to switch
    //the DMS signs later on.
    const negative = dd < 0;
    dd = negative ? dd * -1 : dd;

    this.degrees = Math.floor(dd);

    let rawMinutes = (dd - this.degrees) * 60;
    this.minutes = Math.floor(rawMinutes);

    //seconds can
    let rawSeconds = (rawMinutes - this.minutes) * 60;
    this.seconds = rawSeconds;

    if (negative) {
      //switch the signs on all the degrees, minutes, & seconds
      this.degrees *= -1;
      this.minutes *= -1;
      this.seconds *= -1;
    }
  }
}

export default RadialCoordinate;

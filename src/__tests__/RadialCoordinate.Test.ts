import React from "react";
import { render, screen } from "@testing-library/react";
import { RadialCoordinate } from "../RadialCoordinate";

test("negative coordinate has negative degrees minutes seconds", () => {
  const coordinate = new RadialCoordinate(-105.5);
  expect(coordinate.degrees).toBeLessThan(0);
  expect(coordinate.degrees).toBe(-105);
  expect(coordinate.minutes).toBe(-30);
  expect(coordinate.seconds).toBeCloseTo(0, 10);
});

test("create from degrees minutes seconds", () => {
  const coordinate = RadialCoordinate.fromDegreesMinutesSeconds(-105, -30, 0);
  expect(coordinate.getDecimalDegrees()).toBe(-105.5);
});

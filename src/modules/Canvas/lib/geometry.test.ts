import { isPointOnRectEdge, isAnglePerpendicularOutward } from "./geometry";
import type { Point, Rect } from "../model/types";

const rect: Rect = {
  position: { x: 100, y: 100 },
  size: { width: 100, height: 60 },
};

test("isPointOnRectEdge returns true for edge point", () => {
  const point: Point = { x: 150, y: 100 }; // right edge
  expect(isPointOnRectEdge(point, rect)).toBe(true);
});

test("isPointOnRectEdge returns false for inside point", () => {
  const point: Point = { x: 100, y: 100 };
  expect(isPointOnRectEdge(point, rect)).toBe(false);
});

test("isAnglePerpendicularOutward returns true for outward angle", () => {
  const point: Point = { x: 150, y: 100 };
  expect(isAnglePerpendicularOutward(0, point, rect)).toBe(true);
});

test("isAnglePerpendicularOutward returns false for inward angle", () => {
  const point: Point = { x: 150, y: 100 };
  expect(isAnglePerpendicularOutward(180, point, rect)).toBe(false);
});

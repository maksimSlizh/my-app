import { isPointOnRectEdge } from "./geometry";
import type { Rect } from "../model/types";

describe("isPointOnRectEdge", () => {
  const rect: Rect = {
    position: { x: 100, y: 100 },
    size: { width: 50, height: 50 },
  };

  it("returns true for point on left edge", () => {
    expect(isPointOnRectEdge({ x: 75, y: 100 }, rect)).toBe(true);
  });

  it("returns false for point inside", () => {
    expect(isPointOnRectEdge({ x: 100, y: 100 }, rect)).toBe(false);
  });
});

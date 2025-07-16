import {
  normalize, normalizePoint,
  pointKey, getNeighbors, getDirection, offsetPoint
} from "./points";

test("normalize rounds to nearest grid", () => {
  expect(normalize(23)).toBe(20);
  expect(normalize(27)).toBe(30);
});

test("normalizePoint works", () => {
  expect(normalizePoint({ x: 23, y: 27 })).toEqual({ x: 20, y: 30 });
});

test("pointKey generates string", () => {
  expect(pointKey({ x: 10, y: 20 })).toBe("10,20");
});

test("getNeighbors returns 4 neighbors", () => {
  const neighbors = getNeighbors({ x: 100, y: 100 });
  expect(neighbors).toContainEqual({ x: 110, y: 100 });
  expect(neighbors).toHaveLength(4);
});

test("getDirection works correctly", () => {
  expect(getDirection({ x: 0, y: 0 }, { x: 0, y: 10 })).toBe("down");
  expect(getDirection({ x: 0, y: 10 }, { x: 0, y: 0 })).toBe("up");
  expect(getDirection({ x: 10, y: 0 }, { x: 0, y: 0 })).toBe("left");
  expect(getDirection({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe("right");
});

test("offsetPoint returns correct offset", () => {
  expect(offsetPoint({ x: 0, y: 0 }, 0, 10)).toEqual({ x: 10, y: 0 });
  expect(offsetPoint({ x: 0, y: 0 }, 90, 10)).toEqual({ x: 0, y: 10 });
});

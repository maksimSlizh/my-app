import { findPath, simplifyPath } from "./pathfinding";
import type { Point, Rect } from "../model/types";

const rects: Rect[] = [
  { position: { x: 200, y: 200 }, size: { width: 100, height: 100 } },
];

test("findPath finds a valid path", () => {
  const start: Point = { x: 0, y: 0 };
  const end: Point = { x: 300, y: 300 };
  const path = findPath(start, end, rects);
  expect(path[0]).toEqual(start);
  expect(path[path.length - 1]).toEqual(end);
});

test("simplifyPath reduces unnecessary points", () => {
  const path: Point[] = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 20, y: 20 },
  ];
  const simplified = simplifyPath(path);
  expect(simplified).toEqual([
    { x: 0, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 20 },
  ]);
});

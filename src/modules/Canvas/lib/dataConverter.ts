import type { Point, Rect, ConnectionPoint } from "../model/types";
import { OFFSET } from "../model/constants";
import { normalizePoint, offsetPoint } from "./points";
import { findPath, simplifyPath } from "./pathfinding";

export const dataConverter = (
  rect1: Rect,
  rect2: Rect,
  c1: ConnectionPoint,
  c2: ConnectionPoint
): Point[] => {
  const exit1 = offsetPoint(c1.point, c1.angle, OFFSET);
  const exit2 = offsetPoint(c2.point, c2.angle, OFFSET);

  const start = normalizePoint(exit1);
  const end = normalizePoint(exit2);

  const path = findPath(start, end, [rect1, rect2]);
  const simplified = simplifyPath(path);

  return [c1.point, exit1, ...simplified.slice(1, -1), exit2, c2.point];
};

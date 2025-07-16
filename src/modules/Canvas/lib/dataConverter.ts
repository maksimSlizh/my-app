import type { Point, Rect, ConnectionPoint } from "../model/types";
import { isPointOnRectEdge, isAnglePerpendicularOutward, toRadians } from "./geometry";

export const dataConverter = (
  rect1: Rect,
  rect2: Rect,
  cPoint1: ConnectionPoint,
  cPoint2: ConnectionPoint
): Point[] => {
  if (!isPointOnRectEdge(cPoint1.point, rect1)) throw new Error("Invalid cPoint1");
  if (!isPointOnRectEdge(cPoint2.point, rect2)) throw new Error("Invalid cPoint2");
  if (!isAnglePerpendicularOutward(cPoint1.angle, cPoint1.point, rect1)) throw new Error("Angle 1 not outward");
  if (!isAnglePerpendicularOutward(cPoint2.angle, cPoint2.point, rect2)) throw new Error("Angle 2 not outward");

  const OFFSET = 10;
  const dir1 = { x: Math.cos(toRadians(cPoint1.angle)), y: Math.sin(toRadians(cPoint1.angle)) };
  const dir2 = { x: Math.cos(toRadians(cPoint2.angle)), y: Math.sin(toRadians(cPoint2.angle)) };

  const p1 = {
    x: cPoint1.point.x + dir1.x * OFFSET,
    y: cPoint1.point.y + dir1.y * OFFSET,
  };
  const p2 = {
    x: cPoint2.point.x + dir2.x * OFFSET,
    y: cPoint2.point.y + dir2.y * OFFSET,
  };

  const points: Point[] = [cPoint1.point, p1];

  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2.y - p1.y);

  if (dx < 1 || dy < 1) {
    points.push(p2);
  } else {
    const mid1: Point = { x: p1.x, y: (p1.y + p2.y) / 2 };
    const mid2: Point = { x: p2.x, y: (p1.y + p2.y) / 2 };
    points.push(mid1, mid2, p2);
  }

  points.push(cPoint2.point);
  return points;
};

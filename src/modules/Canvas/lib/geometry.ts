import type { Point, Rect, Size } from "../model/types";
import { EPSILON } from "../model/constants";

export const toRadians = (deg: number) => (deg * Math.PI) / 180;

export const getEdgeOffsets = (size: Size) => ({
  left: -size.width / 2,
  right: size.width / 2,
  top: -size.height / 2,
  bottom: size.height / 2,
});

export const isPointOnRectEdge = (point: Point, rect: Rect): boolean => {
  const { left, right, top, bottom } = getEdgeOffsets(rect.size);
  const px = point.x - rect.position.x;
  const py = point.y - rect.position.y;

  return (
    (Math.abs(px - left) < EPSILON || Math.abs(px - right) < EPSILON) && py >= top && py <= bottom ||
    (Math.abs(py - top) < EPSILON || Math.abs(py - bottom) < EPSILON) && px >= left && px <= right
  );
};

export const isAnglePerpendicularOutward = (angle: number, point: Point, rect: Rect): boolean => {
  const dir = {
    x: Math.cos(toRadians(angle)),
    y: Math.sin(toRadians(angle)),
  };
  const fromCenter = {
    x: point.x - rect.position.x,
    y: point.y - rect.position.y,
  };
  return dir.x * fromCenter.x + dir.y * fromCenter.y > 0;
};

import type { Point, Rect, Size } from "../model/types";

export const toRadians = (deg: number): number => (deg * Math.PI) / 180;

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
    (Math.abs(px - left) < 1e-2 || Math.abs(px - right) < 1e-2) &&
      py >= top &&
      py <= bottom ||
    (Math.abs(py - top) < 1e-2 || Math.abs(py - bottom) < 1e-2) &&
      px >= left &&
      px <= right
  );
};

export const isAnglePerpendicularOutward = (angle: number, point: Point, rect: Rect): boolean => {
  const dir = { x: Math.cos(toRadians(angle)), y: Math.sin(toRadians(angle)) };
  const centerToPoint = { x: point.x - rect.position.x, y: point.y - rect.position.y };
  const dot = dir.x * centerToPoint.x + dir.y * centerToPoint.y;
  return dot > 0;
};

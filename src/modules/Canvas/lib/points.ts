import type { Point } from "../model/types";
import { GRID } from "../model/constants";

export const normalize = (n: number): number => Math.round(n / GRID) * GRID;

export const normalizePoint = (p: Point): Point => ({
  x: normalize(p.x),
  y: normalize(p.y),
});

export const pointKey = (p: Point): string => `${p.x},${p.y}`;

export const getNeighbors = (p: Point): Point[] => [
  { x: p.x + GRID, y: p.y },
  { x: p.x - GRID, y: p.y },
  { x: p.x, y: p.y + GRID },
  { x: p.x, y: p.y - GRID },
];

export const getDirection = (from: Point, to: Point): string => {
  if (from.x === to.x) return from.y > to.y ? "up" : "down";
  if (from.y === to.y) return from.x > to.x ? "left" : "right";
  return "";
};

export const offsetPoint = (p: Point, angle: number, offset: number): Point => {
  const mod = angle % 360;
  const offsets: Record<number, Point> = {
    0: { x: p.x + offset, y: p.y },
    90: { x: p.x, y: p.y + offset },
    180: { x: p.x - offset, y: p.y },
    270: { x: p.x, y: p.y - offset },
  };
  const result = offsets[mod];
  if (!result) throw new Error("Invalid angle");
  return result;
};

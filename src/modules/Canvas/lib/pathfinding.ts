import type { Point, Rect } from "../model/types";
import { getNeighbors, pointKey, getDirection } from "./points";
import { GRID, CANVAS_WIDTH, CANVAS_HEIGHT } from "../model/constants";

const rectContainsWithPadding = (r: Rect, p: Point): boolean => {
  const { x, y } = r.position;
  const { width, height } = r.size;
  return (
    p.x > x - width / 2 - GRID &&
    p.x < x + width / 2 + GRID &&
    p.y > y - height / 2 - GRID &&
    p.y < y + height / 2 + GRID
  );
};

const reconstructPath = (cameFrom: Map<string, Point>, current: Point): Point[] => {
  const path = [current];
  while (cameFrom.has(pointKey(current))) {
    current = cameFrom.get(pointKey(current))!;
    path.push(current);
  }
  return path.reverse();
};

export const findPath = (
  start: Point,
  goal: Point,
  rects: Rect[]
): Point[] => {
  const open: { point: Point; turns: number; dir: string | null }[] = [
    { point: start, turns: 0, dir: null },
  ];
  const cameFrom = new Map<string, Point>();
  const costMap = new Map<string, { dist: number; turns: number }>();
  const visited = new Set<string>();
  costMap.set(pointKey(start), { dist: 0, turns: 0 });

  let steps = 0;
  const MAX_STEPS = 50000;

  while (open.length > 0 && steps++ < MAX_STEPS) {
    open.sort((a, b) => {
      const ac = costMap.get(pointKey(a.point))!;
      const bc = costMap.get(pointKey(b.point))!;
      return ac.dist - bc.dist || ac.turns - bc.turns;
    });

    const current = open.shift()!;
    const key = pointKey(current.point);
    if (visited.has(key)) continue;
    visited.add(key);

    if (key === pointKey(goal)) return reconstructPath(cameFrom, current.point);

    for (const neighbor of getNeighbors(current.point)) {
      if (
        neighbor.x < 0 || neighbor.x > CANVAS_WIDTH ||
        neighbor.y < 0 || neighbor.y > CANVAS_HEIGHT ||
        rects.some(r =>
          pointKey(neighbor) !== pointKey(start) &&
          pointKey(neighbor) !== pointKey(goal) &&
          rectContainsWithPadding(r, neighbor))
      ) continue;

      const neighborKey = pointKey(neighbor);
      const dir = getDirection(current.point, neighbor);
      const isTurn = current.dir && current.dir !== dir;
      const turns = current.turns + (isTurn ? 1 : 0);
      const dist = costMap.get(key)!.dist + 1;

      const prev = costMap.get(neighborKey);
      const better = !prev || dist < prev.dist || (dist === prev.dist && turns < prev.turns);
      if (better) {
        costMap.set(neighborKey, { dist, turns });
        cameFrom.set(neighborKey, current.point);
        open.push({ point: neighbor, turns, dir });
      }
    }
  }

  throw new Error("Pathfinding failed");
};

export const simplifyPath = (path: Point[]): Point[] => {
  if (path.length < 2) return path;

  const result: Point[] = [path[0]];
  let lastDir = getDirection(path[0], path[1]);

  for (let i = 1; i < path.length - 1; i++) {
    const dir = getDirection(path[i], path[i + 1]);
    if (dir !== lastDir) {
      result.push(path[i]);
      lastDir = dir;
    }
  }

  result.push(path[path.length - 1]);
  return result;
};

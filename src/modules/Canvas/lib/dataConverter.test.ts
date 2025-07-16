import { dataConverter } from "./dataConverter";
import type { Rect, ConnectionPoint } from "../model/types";

test("valid path is created", () => {
  const r1: Rect = { position: { x: 0, y: 0 }, size: { width: 100, height: 100 } };
  const r2: Rect = { position: { x: 200, y: 0 }, size: { width: 100, height: 100 } };
  const c1: ConnectionPoint = { point: { x: 50, y: 0 }, angle: 0 };
  const c2: ConnectionPoint = { point: { x: 150, y: 0 }, angle: 180 };

  const path = dataConverter(r1, r2, c1, c2);
  expect(path[0]).toEqual(c1.point);
  expect(path[path.length - 1]).toEqual(c2.point);
});

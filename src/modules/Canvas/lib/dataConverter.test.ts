import { dataConverter } from "./dataConverter";
import type { Rect, ConnectionPoint} from "../model/types";

const rect1: Rect = {
  position: { x: 100, y: 100 },
  size: { width: 80, height: 60 },
};

const rect2: Rect = {
  position: { x: 300, y: 100 },
  size: { width: 80, height: 60 },
};

const c1: ConnectionPoint = { point: { x: 140, y: 100 }, angle: 0 };
const c2: ConnectionPoint = { point: { x: 260, y: 100 }, angle: 180 };

test("dataConverter returns full path including connection points", () => {
  const path = dataConverter(rect1, rect2, c1, c2);
  expect(path[0]).toEqual(c1.point);
  expect(path[path.length - 1]).toEqual(c2.point);
});

import { useState } from "react";
import type { Rect, ConnectionPoint } from "./types";

export const useCanvasState = () => {
  const [rects, setRects] = useState<Rect[]>([
    { position: { x: 150, y: 150 }, size: { width: 100, height: 60 } },
    { position: { x: 400, y: 250 }, size: { width: 100, height: 60 } },
  ]);

  const [connections, setConnections] = useState<ConnectionPoint[]>([
    { point: { x: 200, y: 150 }, angle: 0 },
    { point: { x: 350, y: 250 }, angle: 180 },
  ]);

  return { rects, setRects, connections, setConnections };
};

import { useState } from "react";
import type { Rect, ConnectionPoint } from "./types";

export const useCanvasState = () => {
  const [rects, setRects] = useState<Rect[]>([
    { position: { x: 150, y: 150 }, size: { width: 100, height: 60 } },
    { position: { x: 400, y: 250 }, size: { width: 100, height: 60 } },
  ]);

  const [connections, setConnections] = useState<ConnectionPoint[]>([
    { point: { x: 100, y: 130 }, angle: 180 },
    { point: { x: 450, y: 240 }, angle: 0 },
  ]);

  return { rects, setRects, connections, setConnections };
};

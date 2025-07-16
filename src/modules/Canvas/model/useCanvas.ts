import { useRef } from "react";
import { useCanvasDrawing } from "./useCanvasDrawing";
import { useCanvasState } from "./useCanvasState";
import { useCanvasEvents } from "./useCanvasEvents";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { rects, setRects, connections, setConnections } = useCanvasState();

  useCanvasDrawing(canvasRef, rects, connections);
  const { onMouseDown } = useCanvasEvents(canvasRef, rects, setRects, connections, setConnections);

  return { canvasRef, onMouseDown };
};

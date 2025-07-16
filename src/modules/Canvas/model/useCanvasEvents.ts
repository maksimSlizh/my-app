import type { Point } from "./types";
import type { Rect, ConnectionPoint } from "./types";

export const useCanvasEvents = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  rects: Rect[],
  setRects: React.Dispatch<React.SetStateAction<Rect[]>>,
  connections: ConnectionPoint[],
  setConnections: React.Dispatch<React.SetStateAction<ConnectionPoint[]>>
) => {
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const start: Point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const clicked = rects.findIndex((r) => {
      const dx = Math.abs(start.x - r.position.x);
      const dy = Math.abs(start.y - r.position.y);
      return dx < r.size.width / 2 && dy < r.size.height / 2;
    });

    if (clicked !== -1) {
      const initPos = rects[clicked].position;
      const initConn = connections[clicked].point;

      const move = (e: MouseEvent) => {
        const current: Point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const delta = {
          x: current.x - start.x,
          y: current.y - start.y,
        };

        setRects((prev) => {
          const next = [...prev];
          next[clicked] = {
            ...next[clicked],
            position: {
              x: initPos.x + delta.x,
              y: initPos.y + delta.y,
            },
          };
          return next;
        });

        setConnections((prev) => {
          const next = [...prev];
          next[clicked] = {
            ...next[clicked],
            point: {
              x: initConn.x + delta.x,
              y: initConn.y + delta.y,
            },
          };
          return next;
        });
      };

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }
  };

  return { onMouseDown };
};

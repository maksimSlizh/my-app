import { useEffect } from "react";
import { dataConverter } from "../lib/dataConverter";
import type { ConnectionPoint, Rect } from "./types";

export const useCanvasDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  rects: Rect[],
  connections: ConnectionPoint[]
) => {
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 800, 600);

    rects.forEach((rect, idx) => {
      const { x, y } = rect.position;
      const { width, height } = rect.size;
      ctx.strokeStyle = "black";
      ctx.strokeRect(x - width / 2, y - height / 2, width, height);

      const c = connections[idx];
      ctx.beginPath();
      ctx.arc(c.point.x, c.point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
    });

    try {
      const line = dataConverter(rects[0], rects[1], connections[0], connections[1]);
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      for (let i = 1; i < line.length; i++) {
        ctx.lineTo(line[i].x, line[i].y);
      }
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke();
    } catch (e) {
      console.error(e);
    }
  }, [canvasRef, rects, connections])
};

import type { Point, Rect, ConnectionPoint } from "./types";
import { useRef } from "react";

export const useCanvasEvents = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  rects: Rect[],
  setRects: React.Dispatch<React.SetStateAction<Rect[]>>,
  connections: ConnectionPoint[],
  setConnections: React.Dispatch<React.SetStateAction<ConnectionPoint[]>>
) => {
  const draggingIndex = useRef<number | null>(null);
  const startPos = useRef<Point | null>(null);
  const initRect = useRef<Point | null>(null);
  const initConn = useRef<Point | null>(null);
  const draggingConnection = useRef<boolean>(false);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const start: Point = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    // Проверка: клик по соединению (точка)
    const connIndex = connections.findIndex((conn) => {
      const dx = Math.abs(start.x - conn.point.x);
      const dy = Math.abs(start.y - conn.point.y);
      return dx <= 6 && dy <= 6;
    });

    if (connIndex !== -1) {
      draggingIndex.current = connIndex;
      startPos.current = start;
      initConn.current = { ...connections[connIndex].point };
      draggingConnection.current = true;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return;
    }

    // Проверка: клик по прямоугольнику
    const rectIndex = rects.findIndex((r) => {
      const dx = Math.abs(start.x - r.position.x);
      const dy = Math.abs(start.y - r.position.y);
      return dx < r.size.width / 2 && dy < r.size.height / 2;
    });

    if (rectIndex === -1) return;

    draggingIndex.current = rectIndex;
    startPos.current = start;
    initRect.current = { ...rects[rectIndex].position };
    initConn.current = { ...connections[rectIndex].point };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds || draggingIndex.current === null || !startPos.current) return;

    const now: Point = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    const delta = {
      x: now.x - startPos.current.x,
      y: now.y - startPos.current.y,
    };

    const idx = draggingIndex.current;

    // Перемещение соединения вдоль грани
    if (draggingConnection.current && initConn.current) {
      const rect = rects[idx];
      const { x, y } = rect.position;
      const { width, height } = rect.size;

      const left = x - width / 2;
      const right = x + width / 2;
      const top = y - height / 2;
      const bottom = y + height / 2;

      const dxL = Math.abs(now.x - left);
      const dxR = Math.abs(now.x - right);
      const dyT = Math.abs(now.y - top);
      const dyB = Math.abs(now.y - bottom);

      let newPoint: Point;
      let angle: number;

      if (Math.min(dxL, dxR, dyT, dyB) === dxL) {
        newPoint = { x: left, y: Math.max(top, Math.min(bottom, now.y)) };
        angle = 180;
      } else if (Math.min(dxL, dxR, dyT, dyB) === dxR) {
        newPoint = { x: right, y: Math.max(top, Math.min(bottom, now.y)) };
        angle = 0;
      } else if (Math.min(dxL, dxR, dyT, dyB) === dyT) {
        newPoint = { x: Math.max(left, Math.min(right, now.x)), y: top };
        angle = 270;
      } else {
        newPoint = { x: Math.max(left, Math.min(right, now.x)), y: bottom };
        angle = 90;
      }

      setConnections((prev) => {
        const updated = [...prev];
        updated[idx] = { point: newPoint, angle };
        return updated;
      });

      return;
    }

    // Перемещение прямоугольника (и точки подключения)
    if (initRect.current && initConn.current) {
      const newRectPos = {
        x: initRect.current.x + delta.x,
        y: initRect.current.y + delta.y,
      };

      const newConnPos = {
        x: initConn.current.x + delta.x,
        y: initConn.current.y + delta.y,
      };

      setRects((prev) => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], position: newRectPos };
        return updated;
      });

      setConnections((prev) => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], point: newConnPos };
        return updated;
      });
    }
  };

  const onMouseUp = () => {
    draggingIndex.current = null;
    startPos.current = null;
    initRect.current = null;
    initConn.current = null;
    draggingConnection.current = false;

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return { onMouseDown };
};

import { useCanvas } from "../../model";

export const CanvasDashboard = () => {
  const { canvasRef, onMouseDown } = useCanvas();

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid gray" }}
      onMouseDown={onMouseDown}
    />
  );
};

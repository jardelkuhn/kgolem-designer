import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <svg width="200" height="200">
        <defs>
          <linearGradient id="normalId" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "#C0C0C0", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="selectionId" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "orange", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "yellow", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: `url(#${selected ? "selectionId" : "normalId"})`,
        }}
      />
    </>
  );
}

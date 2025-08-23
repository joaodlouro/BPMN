"use client";
import React, { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface NodeData {
  label: string;
  color?: string;
}
const handleStyle = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "#fff",
  border: "2px solid #555",
  zIndex: 10,
};


export function RectangleNode({ data }: NodeProps<NodeData>) {
  const [text, setText] = useState(data.label);

  return (
    <div
      style={{
        minWidth: 120,
        padding: "50px 20px",
        borderRadius: 8,
        backgroundColor: data.color || "#3490dc",
        textAlign: "center",
        fontWeight: 500,
        position: "relative",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
     
      <Handle type="target" position={Position.Left} id="left" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="right" style={handleStyle} />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="absolute text-center w-full outline-none bg-transparent"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#000", 
          borderRadius: 4,
          padding: 4,
        }}
      />
    </div>
  );
}

export function CircleNode({ data }: NodeProps<NodeData>) {
  const [text, setText] = useState(data.label);

  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        backgroundColor: data.color || "#3490dc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
      >
      <Handle type="source" position={Position.Right} id="right" style={handleStyle} />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="absolute text-center w-full outline-none bg-transparent"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#000", 
          borderRadius: 4,
          padding: 4,
        }}
      />
    </div>
  );
}

export function Triangle2Node({ data }: NodeProps<NodeData>) {
  const [text, setText] = useState(data.label);

  return (
    <div
      className="relative w-36 h-36 flex items-center justify-center"
      style={{
        backgroundColor: data.color || "#3490dc",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <Handle type="target" position={Position.Left} id="left" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="right" style={handleStyle} />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="absolute text-center w-full outline-none bg-transparent"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#000", 
          borderRadius: 4,
          padding: 4,
        }}
      />
    </div>
  );
}

export function DiamondNode({ data }: NodeProps<NodeData>) {
  const [text, setText] = useState(data.label);

  return (
    <div
      className="relative w-36 h-36 flex items-center justify-center"
      style={{
        backgroundColor: data.color || "#3490dc",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <Handle type="target" position={Position.Top} id="top" style={{ ...handleStyle, top: 3, left: "50%", transform: "translateX(-50%)" }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ ...handleStyle, bottom: 3, left: "50%", transform: "translateX(-50%)" }} />
      <Handle type="target" position={Position.Left} id="left" style={{ ...handleStyle, left: 3, top: "50%", transform: "translateY(-50%)" }} />
      <Handle type="source" position={Position.Right} id="right" style={{ ...handleStyle, right: 3, top: "50%", transform: "translateY(-50%)" }} />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="absolute text-center w-full outline-none bg-transparent"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#000",
          borderRadius: 4,
          padding: 4,
        }}
      />
    </div>
  );
}

export const nodeTypes = {
  rectangle: RectangleNode,
  circle: CircleNode,
  triangle2: Triangle2Node,
  diamond: DiamondNode,
};


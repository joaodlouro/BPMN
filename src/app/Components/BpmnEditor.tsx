"use client";

import { nodeTypes } from "@/app/Types/NodeTypes";
import "reactflow/dist/style.css";
import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  ConnectionLineType,
} from "reactflow";

export default function BpmnEditor() {
  type CustomNodeData = { label: string; color: string };

  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("#3490dc");
  const [showShapeMenu, setShowShapeMenu] = useState(false);

  const [shapeCounts, setShapeCounts] = useState({
    rectangle: 0,
    circle: 0,
    diamond: 0,
  });

  const onConnect = (connection: Connection) => {
    setEdges((eds) =>
      addEdge({ ...connection, style: { stroke: "black", strokeWidth: 2 } }, eds)
    );
  };

  const addNode = (type: "rectangle" | "circle" | "diamond") => {
    const centerX = 300;
    const centerY = 200;

    const newIdNumber = shapeCounts[type] + 1;

    const newNode: Node<CustomNodeData> = {
      id: crypto.randomUUID(), 
      type,
      position: {
        x: centerX + Math.random() * 50 - 25,
        y: centerY + Math.random() * 50 - 25,
      },
      data: {
        label:
          type === "rectangle"
            ? `Retângulo ${newIdNumber}`
            : type === "circle"
            ? `Círculo ${newIdNumber}`
            : `Losango ${newIdNumber}`,
        color: selectedColor,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setShowShapeMenu(false);

    // Atualiza contagem para label
    setShapeCounts((prev) => ({ ...prev, [type]: newIdNumber }));
  };

  const removeSelectedNode = () => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
    setSelectedNodeId("");
  };

  const updateSelectedNodeColor = (color: string) => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId ? { ...n, data: { ...n.data, color } } : n
      )
    );
  };

  const buttonClass = "px-4 py-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition";



  

  return (
    <div className="w-full h-[850px] flex flex-col items-center justify-start gap-6 p-10">
      <div className="flex flex-wrap gap-6 items-center justify-center w-full">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-10 h-10 p-0 border-0 cursor-pointer rounded-full"
        />

        <div className="relative">
          <button onClick={() => setShowShapeMenu((prev) => !prev)} className={buttonClass}>
            Adicionar Nó
          </button>
          {showShapeMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 rounded shadow-lg flex flex-col z-50 min-w-[140px]">
              <button onClick={() => addNode("rectangle")} className="px-4 py-2 hover:bg-blue-100 text-left transition text-black">Retângulo</button>
              <button onClick={() => addNode("circle")} className="px-4 py-2 hover:bg-green-100 text-left transition text-black">Círculo</button>
              <button onClick={() => addNode("diamond")} className="px-4 py-2 hover:bg-purple-100 text-left transition text-black">Losango</button>
            </div>
          )}
        </div>

        <select
          value={selectedNodeId}
          onChange={(e) => setSelectedNodeId(e.target.value)}
          className="px-4 py-2 border-2 border-gray-300 rounded-full bg-white text-black shadow focus:outline-none"
        >
          <option value="">Selecione um nó</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.data.label} 
            </option>
          ))}
        </select>

        <button onClick={removeSelectedNode} className={buttonClass}>Remover Nó Selecionado</button>

        {selectedNodeId && (
          <input
            type="color"
            value={nodes.find((n) => n.id === selectedNodeId)?.data.color || "#000000"}
            onChange={(e) => updateSelectedNodeColor(e.target.value)}
            className="w-10 h-10 p-0 border-0 cursor-pointer rounded-full"
          />
        )}
      </div>

      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-full h-full max-w-[1000px] max-h-[600px] bg-white border rounded-xl shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            connectionLineType={ConnectionLineType.SmoothStep}
            snapToGrid
            snapGrid={[2, 2]}
            defaultEdgeOptions={{ animated: true, style: { strokeWidth: 2 } }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

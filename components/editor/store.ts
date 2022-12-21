import type { Tool } from 'types';
import create from 'zustand';
import type { fabric } from 'fabric';

type Store = {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas) => void;
  color: string;
  setColor: (color: string) => void;
  tool: Tool;
  setTool: (tool: Tool) => void;
};
export const useWhiteboardStore = create<Store>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  color: 'cyan',
  setColor: (color) => set({ color }),
  tool: 'Brush',
  setTool: (tool) => set({ tool }),
}));

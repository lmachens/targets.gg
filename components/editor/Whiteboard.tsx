"use client";

import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

import { useWhiteboardStore } from "./store";

export default function Whiteboard() {
  const { canvas, setCanvas, tool, color } = useWhiteboardStore();

  const containerRef = useCallback((container: HTMLDivElement) => {
    if (!container) {
      return;
    }
    const element = document.createElement("canvas");
    element.width = container.clientWidth;
    element.height = container.clientHeight;

    const canvas = new fabric.Canvas(element);
    const x = canvas.width! / 2;
    const y = canvas.height! / 2;
    const vpt = canvas.viewportTransform!;
    vpt[4] += x;
    vpt[5] += y;
    canvas.setViewportTransform(vpt);

    container.append(element.parentElement!);
    setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    const handleKeDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        const activeObjects = canvas.getActiveObjects();
        const activeObject = activeObjects[0];
        if (
          activeObject &&
          activeObject instanceof fabric.IText &&
          activeObject.isEditing
        ) {
          return;
        }
        canvas.remove(...activeObjects);
      }
    };

    const handleResize = () => {
      const container = canvas.getElement().parentElement!.parentElement!;
      canvas.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeDown);
    };
  }, [canvas]);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    canvas.defaultCursor = "pointer";
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.skipTargetFind = true;
    canvas.off("mouse:down");
    canvas.off("mouse:move");
    canvas.off("mouse:up");
    canvas.off("mouse:wheel");

    canvas.on("mouse:wheel", (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    const colorShade = color;
    switch (tool) {
      case "Brush":
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = 6;
        canvas.freeDrawingBrush.decimate = 6;
        break;

      case "Move":
        {
          canvas.defaultCursor = "move";
          let isDragging = false;
          let lastPosX = 0;
          let lastPosY = 0;

          canvas.on("mouse:down", (opt) => {
            const evt = opt.e;
            isDragging = true;
            canvas.selection = false;
            lastPosX = evt.clientX;
            lastPosY = evt.clientY;
          });
          canvas.on("mouse:move", (opt: fabric.IEvent<MouseEvent>) => {
            if (isDragging) {
              const e = opt.e;
              const vpt = canvas.viewportTransform!;
              vpt[4] += e.clientX - lastPosX;
              vpt[5] += e.clientY - lastPosY;
              canvas.requestRenderAll();
              lastPosX = e.clientX;
              lastPosY = e.clientY;
            }
          });
          canvas.on("mouse:up", () => {
            // on mouse up we want to recalculate new interaction
            // for all objects, so we call setViewportTransform
            canvas.setViewportTransform(canvas.viewportTransform!);
            isDragging = false;
            canvas.selection = true;
          });
        }
        break;

      case "Select":
        canvas.defaultCursor = "default";
        canvas.selection = true;
        canvas.skipTargetFind = false;
        break;

      case "Rectangle":
        {
          canvas.defaultCursor = "crosshair";
          let rect: fabric.Rect | null = null;
          let isDragging = false;
          let lastPosX = 0;
          let lastPosY = 0;

          canvas.on("mouse:down", (opt) => {
            const evt = opt.e;
            isDragging = true;
            const pointer = canvas.getPointer(evt);
            lastPosX = pointer.x;
            lastPosY = pointer.y;
            rect = new fabric.Rect({
              left: lastPosX,
              top: lastPosY,
              originX: "left",
              originY: "top",
              width: 0,
              height: 0,
              stroke: colorShade,
              fill: "transparent",
              strokeWidth: 6,
            });
            canvas.add(rect);
          });

          canvas.on("mouse:move", (opt) => {
            if (isDragging && rect) {
              const evt = opt.e;
              const pointer = canvas.getPointer(evt);

              if (lastPosX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
              }
              if (lastPosY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
              }

              rect.set({
                width: Math.abs(lastPosX - pointer.x),
                height: Math.abs(lastPosY - pointer.y),
              });

              canvas.renderAll();
            }
          });

          canvas.on("mouse:up", () => {
            isDragging = false;
          });
        }
        break;

      case "Circle":
        {
          canvas.defaultCursor = "crosshair";
          let circle: fabric.Circle | null = null;
          let isDragging = false;
          let lastPosX = 0;
          let lastPosY = 0;

          canvas.on("mouse:down", (opt) => {
            const evt = opt.e;
            isDragging = true;
            const pointer = canvas.getPointer(evt);
            lastPosX = pointer.x;
            lastPosY = pointer.y;
            circle = new fabric.Circle({
              left: lastPosX,
              top: lastPosY,
              originX: "center",
              originY: "center",
              radius: 0,
              stroke: colorShade,
              fill: "transparent",
              strokeWidth: 6,
            });
            canvas.add(circle);
          });

          canvas.on("mouse:move", (opt) => {
            if (isDragging && circle) {
              const evt = opt.e;
              const pointer = canvas.getPointer(evt);

              circle.set({
                radius:
                  Math.abs(lastPosX - pointer.x) >
                  Math.abs(lastPosY - pointer.y)
                    ? Math.abs(lastPosX - pointer.x)
                    : Math.abs(lastPosY - pointer.y),
              });

              canvas.renderAll();
            }
          });

          canvas.on("mouse:up", () => {
            isDragging = false;
          });
        }
        break;

      case "Text":
        {
          canvas.defaultCursor = "text";
          let text: fabric.IText | null = null;
          let isEditing = false;

          canvas.on("mouse:down", (opt) => {
            if (isEditing) {
              isEditing = false;
              if (text) {
                text.exitEditing();
              }
              return;
            }
            const evt = opt.e;
            const pointer = canvas.getPointer(evt);

            text = new fabric.IText("", {
              left: pointer.x,
              top: pointer.y,
              originX: "center",
              originY: "center",
              fill: colorShade,
              fontFamily: "Roboto",
            });
            canvas.add(text);
            text.enterEditing();
            isEditing = true;
          });
        }
        break;

      default:
        {
          canvas.defaultCursor = `url(${tool}), pointer`;
          canvas.on("mouse:down", (opt) => {
            const evt = opt.e;
            const pointer = canvas.getPointer(evt);

            fabric.Image.fromURL(
              tool,
              (oImg) => {
                canvas.add(oImg);
              },
              { left: pointer.x, top: pointer.y }
            );
          });
        }
        break;
    }
  }, [tool, color, canvas]);

  return <div ref={containerRef} className="w-full h-96" />;
}

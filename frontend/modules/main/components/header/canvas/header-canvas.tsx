"use client";
import { curves, curves2 } from "@main/constants/curves";
import { bezierSkin, cubicBezierInterpolation } from "@main/utils/bezier-utils";
import generatePerlinNoise from "@main/utils/noise";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function draw(
  curves: any,
  context: CanvasRenderingContext2D,
  time: number,
  randoms: number[],
  color: string,
  leftStartY: number,
  isDark = false
) {
  const canvas = context.canvas;

  // context.clearRect(0, 0, canvas.width, canvas.height);
  const anchors = [0, canvas.height * leftStartY];

  let j = 0;
  for (let i = 0; i < curves.length; i++) {
    const curve = curves[i];
    for (let t = 1 / 3; t <= 1; t += 1 / 3) {
      const x = cubicBezierInterpolation(
        canvas.width * curve.start.x,
        canvas.width * curve.cp1.x,
        canvas.width * curve.cp2.x,
        canvas.width * curve.end.x,
        t
      );
      const y = cubicBezierInterpolation(
        canvas.height * curve.start.y,
        canvas.height * curve.cp1.y,
        canvas.height * curve.cp2.y,
        canvas.height * curve.end.y,
        t
      );

      const offset = 20 * Math.sin(2 * Math.PI * (time + randoms[j++]));

      // context.beginPath();
      // context.arc(x + offset, y + offset, 3, 0, 2 * Math.PI);

      // context.fillStyle = "green";
      // context.fill();

      anchors.push(x + offset, y + offset);
    }
  }
  anchors.push(canvas.width + 20, 0);

  context.save();
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(0, 0);
  bezierSkin(context, anchors, false);
  context.lineTo(0, 0);

  if (isDark) context.fill();
  else {
    context.shadowColor = "rgba(0, 0, 0, 0.23)";
    context.shadowBlur = 10;
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;

    context.fill();

    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }
  context.restore();
}

const HeaderCanvas = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const wave1Color = isDark ? "#004074" : "#0AA6FD";
  const wave2Color = isDark ? "#113555" : "#0AC3FD";

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) setContext(ctx);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let time = 0;
    let time2 = 0;
    let animationFrameId: number;
    const randoms: number[] = generatePerlinNoise(curves2.length * 3, 0.7, 0.5);
    const randoms2: number[] = generatePerlinNoise(curves.length * 3, 0.7, 0.5);

    if (context) {
      const render = () => {
        time += 0.001;
        time2 += 0.0005;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        draw(curves2, context, time2, randoms2, wave2Color, 0.9, isDark);
        draw(curves, context, time, randoms, wave1Color, 0.85, isDark);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [context, isDark, wave1Color, wave2Color]);

  return (
    <canvas className="absolute left-0 top-0 z-0" ref={canvasRef}></canvas>
  );
};

export default HeaderCanvas;

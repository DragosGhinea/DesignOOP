"use client";
import {
  curvesMobile1,
  curvesMobile2,
  curvesMobile3,
  curvesMobile4,
} from "@main/constants/curves";
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
  isDark = false,
  inverted = false
) {
  const canvas = context.canvas;

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

      anchors.push(x + offset, y + offset);
    }
  }

  anchors.push(canvas.width + 300, inverted ? canvas.height : 0);

  if (inverted) {
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(0, canvas.height);
    bezierSkin(context, anchors, false);
    context.lineTo(0, canvas.height);
  } else {
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(0, 0);
    bezierSkin(context, anchors, false);
    context.lineTo(0, 0);
  }

  if (isDark) context.fill();
  else {
    context.shadowColor = "rgba(0, 0, 0, 0.23)";
    context.shadowBlur = 10;
    context.shadowOffsetX = 3;
    context.shadowOffsetY = inverted? -3 : 3;

    context.fill();

    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }
  context.restore();
}

const HeaderCanvasMobile = () => {
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
    const randoms: number[] = generatePerlinNoise(
      curvesMobile2.length * 3,
      0.7,
      0.5
    );
    const randoms2: number[] = generatePerlinNoise(
      curvesMobile1.length * 3,
      0.7,
      0.5
    );

    if (context) {
      const render = () => {
        time += 0.001;
        time2 += 0.0005;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        draw(curvesMobile2, context, time2, randoms2, wave2Color, 0.3, isDark);
        draw(curvesMobile1, context, time, randoms, wave1Color, 0.2, isDark);

        draw(
          curvesMobile3,
          context,
          time2,
          randoms2,
          wave2Color,
          0.75,
          isDark,
          true
        );
        draw(
          curvesMobile4,
          context,
          time,
          randoms,
          wave1Color,
          0.83,
          isDark,
          true
        );

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

export default HeaderCanvasMobile;

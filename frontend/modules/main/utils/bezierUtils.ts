export function cubicBezierInterpolation(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number {
  const u: number = 1 - t;
  const tt: number = t * t;
  const uu: number = u * u;
  const uuu: number = uu * u;
  const ttt: number = tt * t;

  const p: number = uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;

  return p;
}

export function bezierSkin(
  ctx: CanvasRenderingContext2D,
  bez: number[],
  closed: boolean = true
): void {
  const avg: number[] = calcAvgs(bez);
  const leng: number = bez.length;

  if (closed) {
    ctx.moveTo(avg[0], avg[1]);
    for (let i: number = 2; i < leng; i += 2) {
      let n: number = i + 1;
      ctx.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
    }
    ctx.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
  } else {
    ctx.moveTo(bez[0], bez[1]);
    ctx.lineTo(avg[0], avg[1]);
    for (let i: number = 2; i < leng - 2; i += 2) {
      let n: number = i + 1;
      ctx.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
    }
    ctx.lineTo(bez[leng - 2], bez[leng - 1]);
  }
}

// create anchor points by averaging the control points
function calcAvgs(p: number[]): number[] {
  const avg: number[] = [];
  const leng: number = p.length;
  let prev: number;

  for (let i: number = 2; i < leng; i++) {
    prev = i - 2;
    avg.push((p[prev] + p[i]) / 2);
  }
  
  // close
  avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
  return avg;
}

import React from 'react';
import { config } from '../config';

type Leaf = {
  x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; path: string;
};

function drawSvgPath(ctx: CanvasRenderingContext2D, path: string, color: string) {
  const p = new Path2D(path);
  ctx.fillStyle = color;
  ctx.fill(p);
}

export default function LeavesBackground() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const mouse = React.useRef({ x: 0, y: 0 });
  const leaves = React.useRef<Leaf[]>([]);
  const leafPaths = React.useMemo(() => {
    // Derive one or many paths from env. Accept full <svg> or path data.
    const toPath = (raw: string) => {
      const dMatch = raw.trim().match(/d=\"([^\"]+)\"/);
      return dMatch ? dMatch[1] : raw.trim();
    };
    if (config.leafSvgs && config.leafSvgs.length) return config.leafSvgs.map(toPath);
    return [toPath(config.leafSvg)];
  }, []);

  React.useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    let raf = 0;

    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // init leaves
    const count = Math.max(0, Math.min(500, config.leafCount));
    const L: Leaf[] = [];
    for (let i = 0; i < count; i++) {
      const path = leafPaths[Math.floor(Math.random() * leafPaths.length)];
      L.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.2 + Math.random() * 0.6,
        r: 0.4 + Math.random() * 1.4,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.01,
        path
      });
    }
    leaves.current = L;

    function step() {
      const { width, height } = c;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      for (const leaf of leaves.current) {
        // Mouse influence
        const dx = mouse.current.x - leaf.x;
        const dy = mouse.current.y - leaf.y;
        const dist = Math.hypot(dx, dy) + 1;
        const strength = config.leafFollowStrength / dist;
        leaf.vx += dx * strength * 0.02;
        leaf.vy += dy * strength * 0.02;

        // Integrate
        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.rot += leaf.vr;

        // Wrap
        if (leaf.x < -50) leaf.x = width + 50;
        if (leaf.x > width + 50) leaf.x = -50;
        if (leaf.y > height + 50) { leaf.y = -50; leaf.x = Math.random() * width; }

        // Draw
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rot);
        ctx.scale(leaf.r, leaf.r);
        drawSvgPath(ctx, leaf.path, config.leafColor);
        ctx.restore();
      }
      ctx.restore();
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [leafPaths]);

  return <canvas className="leaves-bg" ref={ref} aria-hidden="true" />;
}

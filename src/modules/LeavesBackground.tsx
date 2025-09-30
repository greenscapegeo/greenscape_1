import React from 'react';
import { config } from '../config';

type Leaf = {
  x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; imageIndex: number;
};

export default function LeavesBackground() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const mouse = React.useRef({ x: 0, y: 0 });
  const leaves = React.useRef<Leaf[]>([]);
  const leafImages = React.useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  // Load PNG leaf images
  const leafImagePaths = React.useMemo(() => [
    '/images/leafs/leaf_1.png',
    '/images/leafs/leaf_2.png',
    '/images/leafs/leaf_3.png',
    '/images/leafs/leaf_4.png',
    '/images/leafs/leaf_5.png',
    '/images/leafs/leaf_6.png'
  ], []);

  // Load all leaf images
  React.useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === leafImagePaths.length) {
        leafImages.current = images;
        setImagesLoaded(true);
      }
    };

    leafImagePaths.forEach((path, index) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Continue even if an image fails to load
      img.src = path;
      images[index] = img;
    });
  }, [leafImagePaths]);

  React.useEffect(() => {
    if (!imagesLoaded) return;

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
      const imageIndex = Math.floor(Math.random() * leafImagePaths.length);
      L.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.2 + Math.random() * 0.6,
        r: 0.3 + Math.random() * 0.8, // Slightly smaller scale for PNG images
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.01,
        imageIndex
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

        // Apply damping to prevent acceleration (keep speed constant)
        const damping = 0.95;
        leaf.vx *= damping;
        leaf.vy *= damping;

        // Clamp maximum speed
        const maxSpeed = 3;
        const speed = Math.hypot(leaf.vx, leaf.vy);
        if (speed > maxSpeed) {
          leaf.vx = (leaf.vx / speed) * maxSpeed;
          leaf.vy = (leaf.vy / speed) * maxSpeed;
        }

        // Integrate
        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.rot += leaf.vr;

        // Wrap
        if (leaf.x < -50) leaf.x = width + 50;
        if (leaf.x > width + 50) leaf.x = -50;
        if (leaf.y > height + 50) { leaf.y = -50; leaf.x = Math.random() * width; }

        // Draw PNG image
        const leafImage = leafImages.current[leaf.imageIndex];
        if (leafImage && leafImage.complete) {
          ctx.save();
          ctx.translate(leaf.x, leaf.y);
          ctx.rotate(leaf.rot);

          // Scale the image (PNG images are larger, so we scale them down)
          // Reduced by 20%: 0.15 * 0.8 = 0.12
          const scale = leaf.r * 0.12; // 20% smaller than before
          ctx.scale(scale, scale);

          // Draw image centered
          const imgWidth = leafImage.width;
          const imgHeight = leafImage.height;
          ctx.drawImage(leafImage, -imgWidth / 2, -imgHeight / 2);

          ctx.restore();
        }
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
  }, [imagesLoaded, leafImagePaths]);

  return <canvas className="leaves-bg" ref={ref} aria-hidden="true" />;
}

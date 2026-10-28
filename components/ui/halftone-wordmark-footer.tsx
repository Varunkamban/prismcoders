import { useEffect, useRef, type CSSProperties } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface HalftoneWordmarkFooterProps {
  wordmark: string;
  label: string;
  meta: string;
  columns: FooterColumn[];
  height?: string;
  dotGap?: number;
  radius?: number;
  grain?: number;
  className?: string;
}

const STYLES = `
.hwf-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: var(--hwf-bg);
  color: var(--hwf-ink);
  -webkit-font-smoothing: antialiased;
}
.hwf-root canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
}
.hwf-top {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) repeat(4, minmax(0, 1fr));
  gap: 24px;
  padding: clamp(22px, 3.4vw, 40px) clamp(20px, 3.4vw, 44px) 0;
  font: 10.5px/1.75 var(--hwf-mono);
  letter-spacing: .18em;
  text-transform: uppercase;
}
.hwf-brand strong { display: block; font-weight: 500; }
.hwf-brand span { opacity: .55; }
.hwf-col h3 { margin: 0; font: inherit; font-weight: 500; opacity: .5; }
.hwf-col ul { margin: 0; padding: 0; list-style: none; }
.hwf-col a, .hwf-up {
  padding: 0;
  border: 0;
  background: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-align: left;
  text-decoration: none;
  text-transform: inherit;
  opacity: .78;
  cursor: pointer;
  transition: opacity .25s ease, background-size .35s cubic-bezier(.2,.7,.1,1);
}
.hwf-col a:hover, .hwf-up:hover { background-size: 100% 1px; opacity: 1; }
.hwf-col a:focus-visible, .hwf-up:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; opacity: 1; }
.hwf-rule {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: clamp(18px, 2.6vw, 30px) clamp(20px, 3.4vw, 44px) 0;
  padding-top: 12px;
  border-top: 1px solid color-mix(in srgb, var(--hwf-ink) 16%, transparent);
  font: 10.5px/1.75 var(--hwf-mono);
  letter-spacing: .18em;
  text-transform: uppercase;
}
.hwf-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (max-width: 860px) {
  .hwf-top { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 18px; }
  .hwf-brand { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) {
  .hwf-col a, .hwf-up { transition: none; }
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? [...value].map((part) => part + part).join("") : value;
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function dotRadius(coverage: number, gap: number) {
  return Math.sqrt(Math.min(1, Math.max(0, coverage))) * gap * 0.56;
}

export default function HalftoneWordmarkFooter({
  wordmark,
  label,
  meta,
  columns,
  height = "560px",
  dotGap = 6,
  radius = 80,
  grain = 0.5,
  className = "",
}: HalftoneWordmarkFooterProps) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ink = "#e9e7dc";
  const warm = "#d7ff4f";
  const background = "#11120f";

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inkRgb = hexToRgb(ink);
    const warmRgb = hexToRgb(warm);
    let width = 0;
    let heightPx = 0;
    let pixelRatio = 1;
    let pointerX = -1e5;
    let pointerY = -1e5;
    let frame = 0;
    let visible = true;
    let ring = { x: 0, y: 0, time: -1 };
    let dots = new Float32Array(0);
    let dotCount = 0;
    let grainTile: HTMLCanvasElement | null = null;

    const layout = () => {
      const bounds = root.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      heightPx = Math.max(1, Math.round(bounds.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(heightPx * pixelRatio);

      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = heightPx;
      const maskContext = mask.getContext("2d", { willReadFrequently: true });
      if (!maskContext) return;

      maskContext.font = `800 100px "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif`;
      const measuredWidth = maskContext.measureText(wordmark).width;
      const fontSize = measuredWidth > 0 ? (width * 1.02 / measuredWidth) * 100 : 0;
      maskContext.font = `800 ${fontSize}px "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif`;
      const metrics = maskContext.measureText(wordmark);
      const capHeight = metrics.actualBoundingBoxAscent || fontSize * 0.72;
      maskContext.fillStyle = "#000";
      maskContext.textBaseline = "alphabetic";
      maskContext.fillText(wordmark, (width - metrics.width) / 2, heightPx + capHeight * 0.2);
      const alpha = maskContext.getImageData(0, 0, width, heightPx).data;

      const gap = Math.max(3, dotGap);
      const positions: number[] = [];
      for (let y = 0; y < heightPx; y += gap) {
        for (let x = 0; x < width; x += gap) {
          let coverage = 0;
          for (let sampleY = 0; sampleY < 3; sampleY += 1) {
            for (let sampleX = 0; sampleX < 3; sampleX += 1) {
              const samplePosX = Math.min(width - 1, Math.floor(x + ((sampleX + 0.5) * gap) / 3));
              const samplePosY = Math.min(heightPx - 1, Math.floor(y + ((sampleY + 0.5) * gap) / 3));
              coverage += alpha[(samplePosY * width + samplePosX) * 4 + 3];
            }
          }
          coverage /= 9 * 255;
          if (coverage < 0.06) continue;
          const homeX = x + gap / 2;
          const homeY = y + gap / 2;
          positions.push(homeX, homeY, 0, 0, homeX, homeY, dotRadius(coverage, gap));
        }
      }
      dots = new Float32Array(positions);
      dotCount = positions.length / 7;

      grainTile = document.createElement("canvas");
      grainTile.width = 256;
      grainTile.height = 256;
      const grainContext = grainTile.getContext("2d");
      if (grainContext) {
        const image = grainContext.createImageData(256, 256);
        for (let index = 0; index < image.data.length; index += 4) {
          const value = Math.random() * 255;
          image.data[index] = value;
          image.data[index + 1] = value;
          image.data[index + 2] = value;
          image.data[index + 3] = Math.random() < 0.5 ? 0 : 255;
        }
        grainContext.putImageData(image, 0, 0);
      }
    };

    const draw = (now: number) => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.fillStyle = background;
      context.fillRect(0, 0, width, heightPx);
      const ringAge = ring.time < 0 ? 1e9 : now - ring.time;
      const ringRadius = ringAge * 0.9;
      let moving = false;

      for (let index = 0; index < dotCount; index += 1) {
        const offset = index * 7;
        let x = dots[offset];
        let y = dots[offset + 1];
        let vx = dots[offset + 2];
        let vy = dots[offset + 3];
        const homeX = dots[offset + 4];
        const homeY = dots[offset + 5];

        if (!reduceMotion) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distanceSquared = dx * dx + dy * dy;
          if (radius > 0 && distanceSquared < radius * radius) {
            const distance = Math.sqrt(distanceSquared) + 0.001;
            const force = (1 - distance / radius) * 2.6;
            vx += (dx / distance) * force;
            vy += (dy / distance) * force;
          }

          if (ringAge < 900) {
            const dxFromRing = homeX - ring.x;
            const dyFromRing = homeY - ring.y;
            const distanceFromRing = Math.hypot(dxFromRing, dyFromRing) + 0.001;
            const band = 1 - Math.min(1, Math.abs(distanceFromRing - ringRadius) / 26);
            if (band > 0) {
              const force = band * 3.2 * (1 - ringAge / 900);
              vx += (dxFromRing / distanceFromRing) * force;
              vy += (dyFromRing / distanceFromRing) * force;
            }
          }

          vx = (vx + (homeX - x) * 0.05) * 0.84;
          vy = (vy + (homeY - y) * 0.05) * 0.84;
          x += vx;
          y += vy;
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - homeX) + Math.abs(y - homeY) > 0.05) {
            moving = true;
          } else {
            x = homeX;
            y = homeY;
            vx = 0;
            vy = 0;
          }
          dots[offset] = x;
          dots[offset + 1] = y;
          dots[offset + 2] = vx;
          dots[offset + 3] = vy;
        }

        const warmth = Math.min(1, Math.hypot(x - homeX, y - homeY) / 28);
        const color = warmth > 0.02
          ? `rgb(${inkRgb.map((value, channel) => Math.round(value + (warmRgb[channel] - value) * warmth)).join(",")})`
          : ink;
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, dots[offset + 6], 0, Math.PI * 2);
        context.fill();
      }

      if (grainTile && grain > 0) {
        context.globalAlpha = Math.min(1, grain) * 0.09;
        context.globalCompositeOperation = "overlay";
        const pattern = context.createPattern(grainTile, "repeat");
        if (pattern) {
          context.fillStyle = pattern;
          context.fillRect(0, 0, width, heightPx);
        }
        context.globalAlpha = 1;
        context.globalCompositeOperation = "source-over";
      }

      if (moving || ringAge < 900) frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!frame && visible) frame = requestAnimationFrame((time) => {
        frame = 0;
        draw(time);
      });
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX - canvas.getBoundingClientRect().left;
      pointerY = event.clientY - canvas.getBoundingClientRect().top;
      wake();
    };
    const onPointerLeave = () => {
      pointerX = -1e5;
      pointerY = -1e5;
      wake();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (reduceMotion || (event.target instanceof Element && event.target.closest("a, button"))) return;
      ring = {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top,
        time: performance.now(),
      };
      wake();
    };

    layout();
    draw(performance.now());
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("pointerdown", onPointerDown);

    const resizeObserver = new ResizeObserver(() => {
      layout();
      wake();
    });
    resizeObserver.observe(root);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersectionObserver.observe(root);

    let mounted = true;
    document.fonts.ready.then(() => {
      if (!mounted) return;
      layout();
      wake();
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("pointerdown", onPointerDown);
    };
  }, [background, dotGap, grain, ink, radius, warm, wordmark]);

  const footerStyle = {
    height,
    "--hwf-bg": background,
    "--hwf-ink": ink,
    "--hwf-mono": '"DM Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',
  } as CSSProperties;

  return (
    <footer ref={rootRef} className={`hwf-root ${className}`} style={footerStyle}>
      <style>{STYLES}</style>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="hwf-sr">{wordmark}</span>
      <div className="hwf-top">
        <div className="hwf-brand">
          <strong>{label}</strong>
          <span>{meta}</span>
        </div>
        {columns.map((column) => (
          <nav className="hwf-col" key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="hwf-rule">
        <button type="button" className="hwf-up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

/**
 * 마우스에 반응하는 액체 블롭
 * 마우스가 가까우면 흩어졌다가, 멀어지면 빠르게 다시 뭉침
 */

export interface BlobConfig {
  x: number;
  y: number;
  radius: number;
  points: number;
  mouseRadius: number;
  repulsion: number;
  spring: number;
  damping: number;
}

interface Point {
  baseAngle: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export class Blob {
  private config: BlobConfig;
  private points: Point[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId = 0;
  private logicalWidth = 0;
  private logicalHeight = 0;

  constructor(canvas: HTMLCanvasElement, config: Partial<BlobConfig> = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2d context not available');
    this.ctx = ctx;

    this.config = {
      x: config.x ?? 0.5,
      y: config.y ?? 0.5,
      radius: config.radius ?? 0.2,
      points: config.points ?? 64,
      mouseRadius: config.mouseRadius ?? 0.25,
      repulsion: config.repulsion ?? 0.00008,
      spring: config.spring ?? 0.04,
      damping: config.damping ?? 0.75,
    };

    this.initPoints();
    this.bindMouse();
  }

  private initPoints(): void {
    this.points = [];
    for (let i = 0; i < this.config.points; i++) {
      const angle = (i / this.config.points) * Math.PI * 2;
      this.points.push({
        baseAngle: angle,
        baseX: 0,
        baseY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      });
    }
  }

  private bindMouse(): void {
    const onMove = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) / rect.width;
      this.mouseY = (e.clientY - rect.top) / rect.height;
    };
    this.canvas.addEventListener('mousemove', onMove);
    this.canvas.addEventListener('mouseleave', () => {
      this.mouseX = -10;
      this.mouseY = -10;
    });
  }

  private updateBasePositions(): void {
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    const cx = this.config.x * w;
    const cy = this.config.y * h;
    const r = Math.min(w, h) * this.config.radius;

    this.points.forEach((p) => {
      p.baseX = cx + Math.cos(p.baseAngle) * r;
      p.baseY = cy + Math.sin(p.baseAngle) * r;
    });
  }

  private step(): void {
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    const mousePxX = this.mouseX * w;
    const mousePxY = this.mouseY * h;
    const mouseRadiusPx = Math.min(w, h) * this.config.mouseRadius;

    this.points.forEach((p) => {
      const dx = p.x - mousePxX;
      const dy = p.y - mousePxY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

      if (dist < mouseRadiusPx) {
        const f = this.config.repulsion * (1 / (dist * dist));
        p.vx += (dx / dist) * f * w;
        p.vy += (dy / dist) * f * h;
      }

      p.vx += (p.baseX - p.x) * this.config.spring;
      p.vy += (p.baseY - p.y) * this.config.spring;
      p.vx *= this.config.damping;
      p.vy *= this.config.damping;
      p.x += p.vx;
      p.y += p.vy;
    });
  }

  private draw(): void {
    const { points, ctx } = this;
    if (points.length < 2) return;

    ctx.beginPath();
    const first = points[0];
    ctx.moveTo(first.x, first.y);

    for (let i = 1; i < points.length; i++) {
      const p0 = points[(i - 1 + points.length) % points.length];
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      const p3 = points[(i + 2) % points.length];
      const cp1x = p1.x + (p2.x - p0.x) * 0.15;
      const cp1y = p1.y + (p2.y - p0.y) * 0.15;
      const cp2x = p2.x - (p3.x - p1.x) * 0.15;
      const cp2y = p2.y - (p3.y - p1.y) * 0.15;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
    ctx.closePath();

    const gradient = ctx.createRadialGradient(
      this.config.x * this.logicalWidth,
      this.config.y * this.logicalHeight,
      0,
      this.config.x * this.logicalWidth,
      this.config.y * this.logicalHeight,
      Math.min(this.logicalWidth, this.logicalHeight) * this.config.radius * 1.5
    );
    gradient.addColorStop(0, 'rgba(120, 180, 255, 0.45)');
    gradient.addColorStop(0.6, 'rgba(80, 140, 220, 0.35)');
    gradient.addColorStop(1, 'rgba(60, 100, 180, 0.2)');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(120, 180, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private tick = (): void => {
    this.updateBasePositions();
    this.step();
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
    this.draw();
    this.animationId = requestAnimationFrame(this.tick);
  };

  start(): void {
    if (this.animationId) return;
    this.updateBasePositions();
    this.points.forEach((p) => {
      p.x = p.baseX;
      p.y = p.baseY;
      p.vx = 0;
      p.vy = 0;
    });
    this.tick();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.logicalWidth = rect.width;
    this.logicalHeight = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }
}

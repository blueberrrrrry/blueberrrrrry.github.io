import './style.css';
import { Blob } from './blob';

const canvas = document.getElementById('blob-canvas') as HTMLCanvasElement;
if (!canvas) throw new Error('#blob-canvas not found');

const blob = new Blob(canvas, {
  x: 0.5,
  y: 0.5,
  radius: 0.22,
  points: 72,
  mouseRadius: 0.28,
  repulsion: 0.00012,
  spring: 0.052,
  damping: 0.78,
});

function resize(): void {
  blob.resize();
}
resize();
blob.start();

window.addEventListener('resize', resize);

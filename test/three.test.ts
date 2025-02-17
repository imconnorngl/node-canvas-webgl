
import { createCanvas } from "../lib";

import { test } from "vitest";
import * as THREE from "three";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import GIFEncoder from 'gifencoder';

const snapshotsPath = join(__dirname, 'snapshots');

test('create canvas', () => {
  const canvas = createCanvas(512, 512);

  const ctx = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;

  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 512, 512);

  canvas.createPNGStream().pipe(createWriteStream(join(snapshotsPath, 'create-canvas.png')));
});

test('create threejs scene', async () => {
  const width = 512;
  const height = 512;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  const canvas = createCanvas(width, height);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas as unknown as HTMLCanvasElement });

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  renderer.render(scene, camera);

  canvas.createPNGStream().pipe(createWriteStream(join(snapshotsPath, 'create-threejs-scene.png')));
});

test('create threejs animated scene', { timeout: 30000 }, async () => {
    const width = 512;
    const height = 512;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const canvas = createCanvas(width, height);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas as unknown as HTMLCanvasElement });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const encoder = new GIFEncoder(width, height);
    encoder.createReadStream().pipe(createWriteStream(join(snapshotsPath, 'create-threejs-scene.gif')));
    encoder.start();
    encoder.setRepeat(0); 
    encoder.setDelay(10); 
    encoder.setQuality(10);

    for (let i = 0; i <= 360; i++) {
      cube.rotation.x += THREE.MathUtils.degToRad(1);
      cube.rotation.y += THREE.MathUtils.degToRad(1);

      renderer.render(scene, camera);

      const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
      encoder.addFrame(context);
    }

    encoder.finish();
});
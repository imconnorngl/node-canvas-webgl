# node-canvas-webgl

Integration of [node-canvas](https://github.com/Automattic/node-canvas) and [headless-gl](https://github.com/stackgl/headless-gl).

## Demo:

```js
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
```
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/controls/OrbitControls.js'

const container = document.getElementById('model-container')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(container.clientWidth, container.clientHeight)
container.appendChild(renderer.domElement)

// свет
scene.add(new THREE.AmbientLight(0xffffff, 1.5))

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 5, 5)
scene.add(light)

// модель
const loader = new GLTFLoader()
loader.load('assets/Bed.glb', (gltf) => {
  scene.add(gltf.scene)
})

// управление
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()
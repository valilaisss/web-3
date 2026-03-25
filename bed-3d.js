import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/controls/OrbitControls.js'

const container = document.getElementById('model-container')

// сцена
const scene = new THREE.Scene()

// камера
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 5)

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(container.clientWidth, container.clientHeight)
container.appendChild(renderer.domElement)

// свет
const light = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(light)

const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(5, 5, 5)
scene.add(dirLight)

// загрузка модели
const loader = new GLTFLoader()
loader.load(
  'assets/Bed.glb', // ← ТВОЙ путь к модели
  (gltf) => {
    const model = gltf.scene
    model.scale.set(1, 1, 1)
    scene.add(model)
  },
  undefined,
  (error) => console.error(error)
)

// controls (вращение мышкой)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableZoom = false // если не нужен зум

// анимация
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

// resize
window.addEventListener('resize', () => {
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
})
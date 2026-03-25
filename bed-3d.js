console.log('=== bed-3d.js ЗАГРУЗИЛСЯ ===')

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js'

console.log('=== ИМПОРТЫ ВЫПОЛНЕНЫ ===')
// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('model-container')
  
  if (!container) {
    console.error('Контейнер model-container не найден!')
    return
  }

  // Проверяем размеры контейнера
  const width = container.clientWidth
  const height = container.clientHeight
  
  if (width === 0 || height === 0) {
    console.warn('Контейнер имеет нулевые размеры, устанавливаем стандартные')
    container.style.width = '100%'
    container.style.height = '100vh'
  }

  // Создаем сцену
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color(0x87CEEB) // Раскомментируйте для фонового цвета

  // Создаем камеру
  const camera = new THREE.PerspectiveCamera(
    45, // Угол обзора
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  )
  camera.position.set(3, 2, 5)
  camera.lookAt(0, 0, 0)

  // Создаем рендерер
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  // Добавляем освещение
  // Ambient light - равномерное освещение
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  // Directional light - направленный свет
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // Заполняющий свет сзади
  const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
  backLight.position.set(-2, 1, -3)
  scene.add(backLight)

  // Опционально: добавим вспомогательные элементы для отладки
  // Добавляем сетку, чтобы видеть, где находится модель
  const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444)
  scene.add(gridHelper)
  
  // Добавляем оси для ориентации (красный - X, зеленый - Y, синий - Z)
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)

  // Загружаем модель
  const loader = new GLTFLoader()
  
  // Показываем индикатор загрузки
  console.log('Загрузка модели...')
  
  loader.load('assets/Bed.glb',
    (gltf) => {
      console.log('Модель успешно загружена!', gltf)
      
      // Масштабируем модель при необходимости
      gltf.scene.scale.set(1, 1, 1)
      
      // Центрируем модель
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      gltf.scene.position.sub(center)
      
      scene.add(gltf.scene)
      
      // Настраиваем камеру, чтобы видеть модель
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const distance = maxDim * 1.5
      camera.position.set(distance, distance * 0.5, distance)
      camera.lookAt(0, 0, 0)
      controls.target.set(0, 0, 0)
    },
    (xhr) => {
      // Прогресс загрузки
      console.log((xhr.loaded / xhr.total * 100) + '% загружено')
    },
    (error) => {
      console.error('Ошибка загрузки модели:', error)
      console.log('Проверьте, существует ли файл assets/Bed.glb')
    }
  )

  // Добавляем управление
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // Плавность движения
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 1
  controls.zoomSpeed = 1.2
  controls.enableZoom = true
  controls.enablePan = true
  controls.target.set(0, 0, 0)

  // Анимация
  function animate() {
    requestAnimationFrame(animate)
    controls.update() // Обновляем управление
    renderer.render(scene, camera)
  }
  animate()

  // Обработка изменения размера окна
  window.addEventListener('resize', onWindowResize, false)
  
  function onWindowResize() {
    const newWidth = container.clientWidth
    const newHeight = container.clientHeight
    
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
  }
  
  console.log('3D сцена инициализирована')
})
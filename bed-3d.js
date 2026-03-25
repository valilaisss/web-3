console.log('=== bed-3d.js ЗАГРУЗИЛСЯ ===')

document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('model-container');
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(3, 2, 5);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Сетка
        const gridHelper = new THREE.GridHelper(10, 20);
        scene.add(gridHelper);
        
        // Тестовый куб
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0xff6600 })
        );
        scene.add(cube);
        
        // Управление
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        
        // Загрузка модели
        const loader = new THREE.GLTFLoader();
        loader.load('assets/Bed.glb',
            (gltf) => {
                scene.remove(cube);
                scene.add(gltf.scene);
            },
            undefined,
            (error) => console.error('Ошибка:', error)
        );
        
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    });
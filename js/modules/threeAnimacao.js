/**
 * MÓDULO DA ANIMAÇÃO 3D (THREE.JS)
 * Gerencia a criação e animação do elemento 3D abstrato
 */

let ThreeAnimacao = (() => {
    // Variáveis privadas
    let container = null;
    let scene, camera, renderer, group;
    let animationId = null;

    /**
     * Inicializa a animação 3D
     */
    const iniciar = () => {
        container = document.getElementById('three-canvas');
        if (!container) {
            console.error('Container three-canvas não encontrado');
            return;
        }

        // Verificar se THREE está carregado
        if (typeof THREE === 'undefined') {
            console.error('THREE não está carregado!');
            return;
        }

        inicializarCena();
        criarElemento3D();
        iniciarAnimacao();

        // Listener para redimensionamento
        window.addEventListener('resize', onWindowResize);
    };

    /**
     * Inicializa cena, câmara e renderizador
     */
    const inicializarCena = () => {
        try {
            // Cena
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x061D60);

            // Câmara
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 2, 8);
            camera.lookAt(0, 0, 0);

            // Renderizador
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Iluminação
            const ambientLight = new THREE.AmbientLight(0x404060);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.position.set(1, 2, 1);
            scene.add(dirLight);

            const pointLight = new THREE.PointLight(0x3964e7, 1, 10);
            pointLight.position.set(0, 2, 2);
            scene.add(pointLight);
        } catch (error) {
            console.error('Erro ao inicializar cena THREE:', error);
        }
    };

    /**
     * Cria o elemento 3D abstrato
     */
    const criarElemento3D = () => {
        try {
            group = new THREE.Group();

            // Esfera central (núcleo)
            const coreGeo = new THREE.SphereGeometry(0.8, 32, 32);
            const coreMat = new THREE.MeshStandardMaterial({
                color: 0x3964e7,
                emissive: 0x1a2f7a,
                transparent: true,
                opacity: 0.9
            });
            const core = new THREE.Mesh(coreGeo, coreMat);
            group.add(core);

            // Material dos anéis
            const ringMat = new THREE.MeshStandardMaterial({
                color: 0x7aa5ff,
                emissive: 0x2a4faa,
                transparent: true,
                opacity: 0.6
            });

            // Anel horizontal
            const ringHorizontalGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
            const ringHorizontal = new THREE.Mesh(ringHorizontalGeo, ringMat);
            ringHorizontal.rotation.x = Math.PI / 2;
            group.add(ringHorizontal);

            // Anel vertical
            const ringVerticalGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
            const ringVertical = new THREE.Mesh(ringVerticalGeo, ringMat);
            ringVertical.rotation.z = Math.PI / 2;
            group.add(ringVertical);

            // Anel diagonal
            const ringDiagonalGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
            const ringDiagonal = new THREE.Mesh(ringDiagonalGeo, ringMat);
            ringDiagonal.rotation.x = Math.PI / 4;
            ringDiagonal.rotation.z = Math.PI / 4;
            group.add(ringDiagonal);

            // Partículas ao redor
            const particlesGeo = new THREE.BufferGeometry();
            const particlesCount = 500;
            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i += 3) {
                const radius = 2.2 + Math.random() * 0.8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);

                posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
                posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
                posArray[i + 2] = radius * Math.cos(phi);
            }

            particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMat = new THREE.PointsMaterial({
                color: 0x88aaff,
                size: 0.05,
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            const particles = new THREE.Points(particlesGeo, particlesMat);
            group.add(particles);

            scene.add(group);
        } catch (error) {
            console.error('Erro ao criar elemento 3D:', error);
        }
    };

    /**
     * Inicia o loop de animação
     */
    const iniciarAnimacao = () => {
        if (!scene || !camera || !renderer || !group) return;

        const animar = () => {
            try {
                animationId = requestAnimationFrame(animar);

                // Rotação do grupo
                if (group) {
                    group.rotation.y += 0.002;
                    group.rotation.x += 0.0005;
                }

                renderer.render(scene, camera);
            } catch (error) {
                console.error('Erro na animação:', error);
            }
        };

        animar();
    };

    /**
     * Handle do redimensionamento da janela
     */
    const onWindowResize = () => {
        if (!container || !camera || !renderer) return;

        try {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        } catch (error) {
            console.error('Erro ao redimensionar:', error);
        }
    };

    /**
     * Para a animação (limpeza)
     */
    const parar = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };

    // API pública
    return {
        iniciar,
        parar
    };
})();

// Tornar disponível globalmente
window.ThreeAnimacao = ThreeAnimacao;
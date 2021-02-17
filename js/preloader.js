document.addEventListener('DOMContentLoaded', function () {

    var progressLine = document.getElementById('progress-line');
    var progress = 0;
    var burnnOutMode = false;
    var allowBurnout = false;
    var left = true;

    var interval = setInterval(() => {
        if (progress < 2.1)
            progress += 0.01;
        progressLine.style.transform = 'translateX(-50%) scaleX(' + progress + ')';
    }, 100);


    function hide() {
        clearInterval(interval);
        if (progress < 2.1) {
            progressLine.style.transform = 'translateX(-50%) scaleX(2.1)';

            setTimeout(() => {
                checkForHide();
            }, 1000);
        } else {
            setTimeout(() => {
                checkForHide();
            }, 800);
        }


        setTimeout(() => {
            // add shadow

            const scene = document.querySelector('a-scene').object3D;
            let geometry = new THREE.PlaneGeometry(20, 20, 32);
            let material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.9,
                map: new THREE.TextureLoader().load("./../assets/shadow.png"),
                side: THREE.DoubleSide
            });
            let plane = new THREE.Mesh(geometry, material);
            plane.rotation.x = -Math.PI / 2;
            plane.scale.set(0.77, 0.67, 0.8);
            scene.children[3].children[0].add(plane);

            // add EnvMap
            let r = "./../assets/envmap/";
            let extension = '.png';
            let urls = [r + "px" + extension, r + "nx" + extension,
                r + "py" + extension, r + "ny" + extension,
                r + "pz" + extension, r + "nz" + extension];
            let textureCube = new THREE.CubeTextureLoader().load(urls);
            textureCube.format = THREE.RGBFormat;
            textureCube.mapping = THREE.CubeReflectionMapping;
            textureCube.encoding = THREE.sRGBEncoding;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_glass_low').material.envMap = textureCube;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_glass_low').material.envMapIntensity = 4;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_glass_low').material.roughness = 0;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_glass_low').material.needsUpdate = true;


            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.envMap = textureCube;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.envMapIntensity = 1.3;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.roughness = 0.22;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.metalness = 0.21;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.color = new THREE.Color(0xa40000);
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.needsUpdate = true;


            // Plastic  and tires
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_rearBumper_low').material.envMap = textureCube;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_rearBumper_low').material.roughness = 0.2;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_rearBumper_low').material.envMapIntensity = 3.5;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_frontBumperBake_low').material.envMap = textureCube;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_frontBumperBake_low').material.roughness = 0.2;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_frontBumperBake_low').material.envMapIntensity = 3.5;
            // document.querySelector('a-scene').object3D.getObjectByName('tire_low').material.color = new THREE.Color(0x5c6063);

            let light = new THREE.HemisphereLight(0xffffff, 0x555555);
            light.intensity = 1.1;
            light.name = 'HemisphereLight';
            light.position.set(0, 300, 0);
            scene.children[3].children[0].add(light);

            let pointLight = new THREE.PointLight(0xffffff, 1, 350);
            pointLight.name = 'pointLight1';
            pointLight.position.set(100, 10, 0);
            scene.children[3].children[0].add(pointLight);

            let pointLight2 = new THREE.PointLight(0xffffff, 1, 350);
            pointLight2.name = 'pointLight2';
            pointLight2.position.set(-100, 10, 0);
            scene.children[3].children[0].add(pointLight2);

            document.getElementById('burnoutBtn').addEventListener('click', () => {

                if (!burnnOutMode) {
                    allowBurnout = true;
                    left = true;
                    move(0.7);
                    burnnOutMode = true;
                    document.getElementById('sound').play();

                    setTimeout(() => {
                        if (burnnOutMode) {
                            allowBurnout = false;
                        }
                    }, 7000);
                } else {
                    allowBurnout = false;
                }

            });

            go(document.querySelector('a-scene').object3D);

            const object = new THREE.Object3D();
            object.name = 'container';
            object.position.z = 2.1;
            window.object = object;

            scene.children[3].children[0].position.z = -2.1;

            object.add(scene.children[3].children[0]);
            scene.children[3].add(object);

            document.getElementById('sound').load();

        }, 900);

    }

    function go(scene) {
        const wheels = scene.getObjectByName('wheel_low3');
        setInterval(() => {
            if (burnnOutMode)
                wheels.rotation.x += 0.45;
        }, 12);
    }

    function move(degree, off) {
        const old_rotation = window.object.rotation.y;

        new TWEEN.Tween(0)
            .to(1, 2000)
            .onUpdate((aplha) => {
                if (left)
                    window.object.rotation.y = old_rotation + (-degree * aplha);
                else
                    window.object.rotation.y = old_rotation + (degree * aplha);
            })
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => {
                left = !left;

                if (allowBurnout)
                    move(1.4);
                else if (!allowBurnout && window.object.rotation.y !== 0)
                    move(0.7, true);

                if (off) {
                    burnnOutMode = false;
                    document.getElementById('sound').pause();
                    document.getElementById('sound').currentTime = 0;
                }
            })
            .start()
    }

    function checkForHide() {
        var checkAllow = setInterval(() => {
            if (document.getElementById('requestingCameraPermissions')) {
                if (document.getElementById('requestingCameraPermissions').classList.contains('fade-out')) {
                    document.getElementById('preloader-supra').style.display = 'none';
                    clearInterval(checkAllow);
                    setTimeout(() => {
                        document.getElementById('instructions').classList.add('instructionsShow');
                    }, 2000);
                }
            }else{
                document.getElementById('preloader-supra').style.display = 'none';
                clearInterval(checkAllow);
                setTimeout(() => {
                    document.getElementById('instructions').classList.add('instructionsShow');
                }, 2000);
            }
        }, 150);
    }

    window.hide = hide;
});


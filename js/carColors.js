document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('ok-btn').addEventListener('click', ()=>{
        document.getElementById('instructions').style.display = 'none';
    });

    const color_obj = {
        red: {
            color: new THREE.Color(0xa40000),
            envMapIntensity: 1.3,
            metalness: 0.21,
            roughness: 0.22
        },
        yellow: {
            color: new THREE.Color(0xc09300),
            envMapIntensity: 1.3,
            metalness: 0.15,
            roughness: 0.17
        },
        blue: {
            color: new THREE.Color(0x000ab6),
            envMapIntensity: 1.5,
            metalness: 0.26,
            roughness: 0.19
        },
        grey: {
            color: new THREE.Color(0x5c5a5a),
            envMapIntensity: 0.6,
            metalness: 0.5,
            roughness: 0.2
        },
        black: {
            color: new THREE.Color(0x000000),
            envMapIntensity: 3.8,
            metalness: 0.18,
            roughness: 0.25
        },
        white: {
            color: new THREE.Color(0xffffff),
            envMapIntensity: 0.5,
            metalness: 0.41,
            roughness: 0.26
        }
    };

    const colors = document.getElementsByClassName('round');

    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', () => {
            for (let y = 0; y < colors.length; y++) {
                colors[y].classList.remove('active');
            }

            colors[i].classList.add('active');

            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.envMapIntensity = color_obj[colors[i].id].envMapIntensity;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.metalness = color_obj[colors[i].id].metalness;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.roughness = color_obj[colors[i].id].roughness;
            document.querySelector('a-scene').object3D.getObjectByName('Body1_LowPoly_body_low').material.color = color_obj[colors[i].id].color;
        });
    }

    const switcher = document.getElementById('paintBtn');

    // const footerInfo = document.getElementById('footer-info');
    const swiperContainer = document.getElementById('swiper-container');

    var counter = 0;
    switcher.addEventListener('click', () => {

        // footerInfo.style.display = counter % 2 === 0 ? 'block' : 'none';
        swiperContainer.style.display = counter % 2 === 0 ? 'block' : 'none';

        counter++;
    });

});
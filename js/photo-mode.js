AFRAME.registerComponent('photo-mode', {
    init: function () {
        // const container = document.getElementById('photoModeContainer')
        const image = document.getElementById('screenshot-img');
        const image_container = document.getElementById('screenshot-container');
        const shutterButton = document.getElementById('shutterButton')
        const closeButton = document.getElementById('closeButton')

        closeButton.addEventListener('click', () => {
            closeButton.style.display = 'none';
            image_container.style.display = 'none';
        });

        shutterButton.addEventListener('click', () => {
            this.el.sceneEl.emit('screenshotrequest')
        });

        this.el.sceneEl.addEventListener('screenshotready', e => {

            if (!e.detail) {
                return
            }

            closeButton.style.display = 'block';
            image_container.style.display = 'block';
            image.src = 'data:image/jpeg;base64,' + e.detail;

            var canvas = document.createElement('canvas');
            setTimeout(() => {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                const logo = document.getElementById('logoPng');
                context.drawImage(logo, canvas.width / 2 - 200, canvas.height - 150, 400, 124);
                const merged_image_src = canvas.toDataURL("image/png");
                image.src = merged_image_src;
            }, 50);
        })
    }
})

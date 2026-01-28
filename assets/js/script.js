document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('leque-container');
    const totalPetalas = 19;
    let petalas = [];
    let currentIndex = 0;

    // --- Popup ---
    const popupOverlay = document.getElementById('popup-overlay');
    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-desc');
    const closeBtn = document.getElementById('popup-close');

    function openPopup(product) {
        popupTitle.textContent = product.name;
        popupDesc.textContent = product.description;
        popupOverlay.style.display = 'flex';
    }

    function closePopup() {
        popupOverlay.style.display = 'none';
    }

    closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closePopup();
    });

    // --- Geração das Pétalas e Hotspots ---
    for (let i = 1; i <= totalPetalas; i++) {
        const petala = document.createElement('div');
        petala.classList.add('petala');
        
        const img = document.createElement('img');
        img.src = `assets/imagens/${i}.png`;
        petala.appendChild(img);

        // Adicionar hotspots de exemplo (você precisa ajustar posições e dados)
        for (let j = 1; j <= 3; j++) {
            const hotspot = document.createElement('a');
            hotspot.className = 'hotspot';
            hotspot.style.top = `${20 + (j * 15)}%`;
            hotspot.style.left = `${40 + (j * 5)}%`;
            
            const productData = { name: `Produto ${j} da Lâmina ${i}`, description: `Descrição do produto.` };

            hotspot.addEventListener('click', (e) => {
                e.stopPropagation();
                openPopup(productData);
            });
            petala.appendChild(hotspot);
        }

        container.appendChild(petala);
        petalas.push(petala);
    }
    
    const indicator = document.getElementById('swipe-indicator');
    let interactionMade = false;
    
    const baseAngle = -15;
    const angleSpread = 8;

    function renderState() {
        petalas.forEach((petala, index) => {
            if (index < currentIndex) {
                const angle = baseAngle - (index * angleSpread);
                petala.style.transform = `rotate(${angle}deg)`;
                petala.style.zIndex = index;
            } else {
                const slightRotation = (index - currentIndex) * 0.5;
                petala.style.transform = `rotate(${slightRotation}deg)`;
                petala.style.zIndex = totalPetalas - (index - currentIndex);
            }
        });
    }

    function changePetala(direction) {
        if (!interactionMade) { indicator.style.display = 'none'; interactionMade = true; }
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < petalas.length) {
            currentIndex = newIndex;
            renderState();
        }
    }

    // --- Controles ---
    let startY = 0;
    const handleStart = e => startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    const handleEnd = e => {
        const diff = (e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY) - startY;
        if (diff < -50) changePetala('next');
        else if (diff > 50) changePetala('prev');
    };
    
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('touchstart', handleStart);
    container.addEventListener('touchend', handleEnd);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') changePetala('next');
        else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') changePetala('prev');
    });

    renderState();
});

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
            hotspot.style.top = `${20 + (j * 15)}%`; // Posições de exemplo
            hotspot.style.left = `${40 + (j*5)}%`;
            
            const productData = {
                name: `Produto ${j} da Lâmina ${i}`,
                description: `Aqui vai a descrição completa deste produto incrível.`
            };

            hotspot.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede o leque de girar ao clicar no hotspot
                openPopup(productData);
            });
            petala.appendChild(hotspot);
        }

        container.appendChild(petala);
        petalas.push(petala);
    }
    petalas.reverse();

    // Lógica do leque... (idêntica à anterior)
    const angleSpread = 8;
    function renderState() { /* ... */ }
    function changePetala(direction) { /* ... */ }
    
    // ... Todos os event listeners de swipe e teclado ...
    // (O código abaixo é o mesmo da versão anterior para controle do leque)

    let interactionMade = false;
    const indicator = document.getElementById('swipe-indicator');
    
    function renderState() {
        petalas.forEach((petala, index) => {
            const relativeIndex = index - currentIndex;
            const angle = (relativeIndex * angleSpread);
            
            if (index < currentIndex) {
                petala.style.transform = `rotate(${angleSpread * (index - currentIndex)}deg)`;
            } else {
                petala.style.transform = `rotate(0deg)`;
            }
            petala.style.zIndex = totalPetalas - index;
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

    let startX = 0;
    const handleStart = e => startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const handleEnd = e => {
        const diff = (e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX) - startX;
        if (diff < -50) changePetala('next');
        else if (diff > 50) changePetala('prev');
    };
    
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('touchstart', handleStart);
    container.addEventListener('touchend', handleEnd);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') changePetala('next');
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') changePetala('prev');
    });

    renderState();
});

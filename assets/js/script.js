document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('leque-container');
    const totalPetalas = 19;
    let petalas = [];
    let currentIndex = 0;

    // Criar pétalas na ordem correta (1.png, 2.png, ...)
    for (let i = 1; i <= totalPetalas; i++) {
        const petala = document.createElement('div');
        petala.classList.add('petala');
        petala.style.backgroundImage = `url('assets/imagens/${i}.png')`;
        container.appendChild(petala);
        petalas.push(petala);
    }

    const indicator = document.getElementById('swipe-indicator');
    let interactionMade = false;
    
    // Leque vai abrir para a esquerda
    const baseAngle = -15; // Ângulo da primeira pétala aberta
    const angleSpread = 8; // Espaço entre as pétalas

    function renderState() {
        petalas.forEach((petala, index) => {
            if (index < currentIndex) {
                // Pétalas que já passaram: abertas em leque
                const angle = baseAngle - (index * angleSpread);
                petala.style.transform = `rotate(${angle}deg)`;
                petala.style.zIndex = index; // A primeira a sair fica mais embaixo
            } else {
                // Pétalas no monte principal, ligeiramente rotacionadas para dar volume
                const slightRotation = (index - currentIndex) * 0.5;
                petala.style.transform = `rotate(${slightRotation}deg)`;
                // A pétala ativa (topo) tem o maior z-index
                petala.style.zIndex = totalPetalas - (index - currentIndex);
            }
        });
    }

    function changePetala(direction) {
        if (!interactionMade) {
            indicator.style.display = 'none';
            interactionMade = true;
        }

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

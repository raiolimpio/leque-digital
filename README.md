# Leque Digital Interativo

## 1. Visão Geral
Esta é uma Landing Page interativa que simula um leque de cartões (pétalas), construída com HTML, CSS e JavaScript puro, sem frameworks. O objetivo é criar uma experiência tátil e fluida para o usuário, principalmente em dispositivos móveis.

---

## 2. Estrutura de Arquivos
O projeto está organizado da seguinte forma:
```
/
├── assets/
│   ├── css/
│   │   └── style.css  (Estilos da animação e layout)
│   ├── js/
│   │   └── script.js  (Lógica da interatividade e animação)
│   └── imagens/
│       ├── 1.png
│       ├── 2.png
│       └── ... (Total de 19 imagens)
└── index.html         (Estrutura principal da página)
```

---

## 3. Lógica Técnica

### A. Renderização
*   O `script.js` cria dinamicamente 19 `<div>` com a classe `.petala`.
*   Cada `div` recebe como `background-image` uma das imagens da pasta `assets/imagens/`.
*   As pétalas são empilhadas usando `position: absolute` e `z-index`. A ordem do `z-index` é calculada para que a pétala ativa (`currentIndex`) esteja sempre no topo.

### B. Animação de Pivô
*   **CSS:** O ponto de rotação é definido no canto inferior esquerdo de cada pétala via `transform-origin: 10% 95%;`.
*   **JavaScript:** A função `renderState()` é o coração do sistema. Ela lê o `currentIndex` (a pétala que está no topo) e aplica transformações CSS:
    *   **Pétalas Passadas (`index < currentIndex`):** São rotacionadas para a esquerda em um arco. O ângulo de cada uma é calculado `baseAngle - (index * angleSpread)`, criando a distribuição de leque aberto.
    *   **Pétalas Futuras (`index > currentIndex`):** Permanecem empilhadas em `rotate(0deg)`, com uma leve rotação para dar "volume".

### C. Interatividade
*   O script captura eventos de `mousedown`/`touchstart` para registrar o ponto inicial do toque/clique.
*   Ao `mouseup`/`touchend`, ele calcula o deslocamento vertical (`diff`).
*   Se o swipe for maior que `50px` (para cima ou para baixo), a função `changePetala()` é chamada, que atualiza o `currentIndex` e chama `renderState()` para redesenhar o leque.
*   Suporte a teclado (`ArrowUp`, `ArrowDown`, etc.) também chama a função `changePetala()`.

---

## 4. Como Customizar a Animação
Toda a parametrização da animação está no topo do arquivo `assets/js/script.js`.

### A. Ângulo e Abertura do Leque
```javascript
// Ângulo da primeira pétala que foi aberta
const baseAngle = -15; 

// Espaçamento em graus entre cada pétala do leque
const angleSpread = 8; 
```
*   Altere `baseAngle` para mudar a posição inicial do leque aberto (ex: `-90` para começar totalmente à esquerda).
*   Altere `angleSpread` para aumentar ou diminuir o "espaçamento" entre as pétalas.

### B. Velocidade da Animação
A velocidade é controlada pelo `transition` no `assets/css/style.css`.

```css
.petala {
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```
*   Altere `0.6s` para deixar a animação mais rápida ou mais lenta.
*   O `cubic-bezier` dá o efeito de "elástico". Você pode usar `ease-in-out` para uma animação mais linear.

### C. Sensibilidade do Swipe
No `script.js`, a sensibilidade é controlada aqui:

```javascript
if (diff < -50) { /* Swipe para cima */ }
else if (diff > 50) { /* Swipe para baixo */ }
```
*   Altere `50` para um valor maior para exigir um swipe mais longo, ou menor para um mais curto.

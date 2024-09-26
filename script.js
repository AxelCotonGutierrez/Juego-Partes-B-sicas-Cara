// Axel Cotón Gutiérrez Copyright 2024
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-word');
    const slots = document.querySelectorAll('.word-slot');
    const resultDisplay = document.getElementById('result');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const wordsArea = document.getElementById('words-area');
    let selectedElement = null;


    function resetElementStyle(element) {
        element.style.position = '';
        element.style.left = '';
        element.style.top = '';
    }

    // Funciones para manejar eventos de arrastre con mouse
    function handleDragStart() {
        selectedElement = this;
        this.classList.add('dragging');
    }

    function handleDragEnd() {
        if (selectedElement) {
            let isElementInSlot = false;
            slots.forEach(slot => {
                if (isElementOverSlot(selectedElement, slot)) {
                    slot.appendChild(selectedElement);
                    resetElementStyle(selectedElement);
                    isElementInSlot = true;
                }
            });

            if (!isElementInSlot) {
                wordsArea.appendChild(selectedElement);
            }

            this.classList.remove('dragging');
            selectedElement = null;
        }
    }

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });

    // Funciones para manejar eventos táctiles
    function handleTouchStart(e) {
        selectedElement = this;
        this.classList.add('dragging');
        e.preventDefault(); // Evita el desplazamiento en dispositivos táctiles
    }

    function handleTouchMove(e) {
        if (selectedElement) {
            e.preventDefault(); // Solo previene el desplazamiento predeterminado cuando se arrastra un elemento
            const touch = e.targetTouches[0];
            selectedElement.style.position = 'absolute';
            selectedElement.style.left = `${touch.pageX - selectedElement.offsetWidth / 2}px`;
            selectedElement.style.top = `${touch.pageY - selectedElement.offsetHeight / 2}px`;
        }
    }
    

    function isElementOverSlot(element, slot) {
        const elementRect = element.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();

        return (
            elementRect.left < slotRect.right &&
            elementRect.right > slotRect.left &&
            elementRect.top < slotRect.bottom &&
            elementRect.bottom > slotRect.top
        );
    }


    function handleTouchEnd() {
        if (selectedElement) {
            let isElementInSlot = false;
            slots.forEach(slot => {
                if (isElementOverSlot(selectedElement, slot)) {
                    slot.appendChild(selectedElement);
                    resetElementStyle(selectedElement);
                    isElementInSlot = true;
                }
            });

            if (!isElementInSlot) {
                wordsArea.appendChild(selectedElement);
            }

            selectedElement.classList.remove('dragging');
            selectedElement = null;
        }
    }

    draggables.forEach(draggable => {
        draggable.addEventListener('touchstart', handleTouchStart);
        draggable.addEventListener('touchend', handleTouchEnd);
    });

    // Agregar eventos táctiles en el área del juego
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Permitir que los slots reciban elementos arrastrables
    slots.forEach(slot => {
        slot.addEventListener('dragover', e => {
            e.preventDefault();
        });

        slot.addEventListener('drop', e => {
            e.preventDefault();
            if (selectedElement) {
                slot.appendChild(selectedElement);
            }
        });
    });

    document.addEventListener('touchmove', handleTouchMove);

  // Comprobar respuestas
  checkButton.addEventListener('click', () => {
    let correctCount = 0;

    // Verificar cada slot
    if (document.getElementById('cabello-slot').querySelector('[alt="Cabello"]')) {
        correctCount++;
    }
    if (document.getElementById('ceja-slot').querySelector('[alt="Ceja"]')) {
        correctCount++;
    }
    if (document.getElementById('nariz-slot').querySelector('[alt="Nariz"]')) {
        correctCount++;
    }
    if (document.getElementById('ojo-slot').querySelector('[alt="Ojo"]')) {
        correctCount++;
    }
    if (document.getElementById('frente-slot').querySelector('[alt="Frente"]')) {
        correctCount++;
    }
    if (document.getElementById('dientes-slot').querySelector('[alt="Dientes"]')) {
        correctCount++;
    }
    if (document.getElementById('boca-slot').querySelector('[alt="Boca"]')) {
        correctCount++;
    }
    if (document.getElementById('oreja-slot').querySelector('[alt="Oreja"]')) {
        correctCount++;
    }
    if (document.getElementById('lengua-slot').querySelector('[alt="Lengua"]')) {
        correctCount++;
    }
    if (document.getElementById('labios-slot').querySelector('[alt="Labios"]')) {
        correctCount++;
    }

    // Actualizar el mensaje de resultado
    if (correctCount === draggables.length) {
        resultDisplay.textContent = '¡Correcto! Todas las palabras están en el lugar adecuado.';
        resultDisplay.style.color = 'green';
    } else {
        resultDisplay.textContent = 'Algunas palabras están en el lugar incorrecto. Intenta de nuevo.';
        resultDisplay.style.color = 'red';
    }
});


    // Reiniciar el juego
    resetButton.addEventListener('click', () => {
        // Mover las imágenes arrastrables de vuelta a su área original
        draggables.forEach(draggable => {
            wordsArea.appendChild(draggable);
        });

        // Limpiar el mensaje de resultado
        resultDisplay.textContent = '';

        // Reiniciar los slots
        slots.forEach(slot => {
            if (slot.firstChild) {
                wordsArea.appendChild(slot.firstChild);
            }
        });
    });
});


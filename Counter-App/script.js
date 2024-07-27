//

document.addEventListener('DOMContentLoaded', ()=>{

    const counterValue = document.getElementById('counter-value');
    const increaseBtn = document.getElementById('increase-btn');
    const decreaseBtn = document.getElementById('decrease-btn');
    const resetBtn = document.getElementById('reset-btn');

    let count = 0;

    increaseBtn.addEventListener('click', () => {
        count++;
        updateCounter();
    });

    decreaseBtn.addEventListener('click', () => {
        count--;
        updateCounter();
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        updateCounter();
    });

    function updateCounter() {
        counterValue.textContent = count;
    }
});


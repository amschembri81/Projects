// Wait until DOM content is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements by their IDs
    const counterValue = document.getElementById('counter-value'); // Element displaying the current counter value
    const increaseBtn = document.getElementById('increase-btn'); // Button to increase the counter
    const decreaseBtn = document.getElementById('decrease-btn'); // Button to decrease the counter
    const resetBtn = document.getElementById('reset-btn'); // Button to reset the counter to zero

    let count = 0; // Initialize the counter variable with an initial value of 0

    // Add an event listener to the increase button
    increaseBtn.addEventListener('click', () => {
        count++; // Increment the counter by 1
        updateCounter(); // Update the displayed counter value
    });

    // Add an event listener to the decrease button
    decreaseBtn.addEventListener('click', () => {
        count--; // Decrement the counter by 1
        updateCounter(); // Update the displayed counter value
    });

    // Add an event listener to the reset button
    resetBtn.addEventListener('click', () => {
        count = 0; // Reset the counter to 0
        updateCounter(); // Update the displayed counter value
    });

    // Function to update the displayed counter value in the DOM
    function updateCounter() {
        counterValue.textContent = count; // Set the text content of the counter element to the current count
    }
});
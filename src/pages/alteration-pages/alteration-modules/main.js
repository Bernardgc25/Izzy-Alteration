import { alterationMaps } from './data-maps.js';
import { initializeAlterationManager } from './alteration-manager.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const alterationManager = initializeAlterationManager(alterationMaps);
    
    // Set up global functions for buttons
    window.handleAdd = () => {
        const priceElement = document.getElementById('priceCalculation');
        const priceText = priceElement.textContent;
        const alterationType = document.getElementById('alteration-type').textContent;
        
        if (priceText && priceText !== 'n/a' && priceText.startsWith('$')) {
            const price = priceText.substring(1);
            alert(`Added to cart: ${alterationType} - $${price}`);
            // In future, this will add to shopping cart
        } else {
            alert('Please select a valid alteration and difficulty level first.');
        }
    };
    
    window.handleClear = () => {
        alterationManager.resetAll();
    };
});
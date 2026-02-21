/**
 * Main Entry Point - Initializes and coordinates all modules
 * Dependency injection and module composition
 */
import { alterationMaps } from './alteration-DataMaps.js';
import StateManager from './alteration-StateManager.js';
import PriceCalculator from './alteration-PriceCalculator.js';
import DOMRenderer from './alteration-DOMRenderer.js';
import EventManager from './alteration-EventManager.js';
import CartManager from './alteration-CartManager.js';

class AlterationApp {
    constructor() {
        // Initialize modules with dependency injection
        this.stateManager = new StateManager(alterationMaps);
        this.priceCalculator = new PriceCalculator(alterationMaps);
        this.domRenderer = new DOMRenderer();
        this.cartManager = new CartManager();
        
        // EventManager needs references to other modules
        this.eventManager = new EventManager(
            this.stateManager,
            this.priceCalculator,
            this.domRenderer
        );

        // Set up subscriptions
        this.setupSubscriptions();
    }

    // Set up subscriptions to state changes
    setupSubscriptions() {
        // When state changes, update the DOM
        this.stateManager.subscribe((state) => {
            this.domRenderer.render(state);
        });
    }

    // Initialize the application
    initialize() {
        this.eventManager.initialize();
        this.setupGlobalHandlers();
    }

    // Set up global button handlers
    setupGlobalHandlers() {
        window.handleAdd = () => {
            const state = this.stateManager.getState();
            
            if (state.currentPrice > 0 && state.selectedAlteration) {
                const description = `Alteration: ${state.selectedAlteration} (${state.selectedDifficulty})`;
                const item = this.cartManager.addItem(description, state.currentPrice);
                
                alert(`Added to cart: ${description} - $${state.currentPrice.toFixed(2)}`);
                
                // Optional: Reset after adding to cart
                this.reset();
            } else {
                alert('Please select a valid alteration and difficulty level first.');
            }
        };

        window.handleClear = () => {
            this.reset();
        };
    }

    // Reset the application
    reset() {
        this.stateManager.reset();
        this.domRenderer.resetSelects(
            this.eventManager.alterationSelects,
            this.eventManager.difficultySelect
        );
    }

    // Clean up resources
    destroy() {
        this.eventManager.cleanup();
        // Clear any other resources
    }
}

// Only run the auto‑initialization in a browser environment
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new AlterationApp();
        app.initialize();
        
        // Optional: Expose app for debugging or advanced usage
        window.alterationApp = app;
    });
}

export default AlterationApp;
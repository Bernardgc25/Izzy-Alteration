
**CODE 1 - File: alteration-CartManager.js**  
[
/**
 * Cart Manager - Handles shopping cart functionality
 * Separates cart logic from main calculator
 */
class CartManager {
    constructor() {
        this.cart = [];
        this.nextId = 1; // Add counter
    }

    // Add item to cart
    addItem(description, price) {
        const item = {
            id: this.nextId++, // Use and increment counter
            description,
            price,
            timestamp: new Date().toISOString()
        };
        
        this.cart.push(item);
        return item;
    }

    // Remove item from cart
    removeItem(itemId) {
        const index = this.cart.findIndex(item => item.id === itemId);
        if (index > -1) {
            return this.cart.splice(index, 1)[0];
        }
        return null;
    }

    // Clear cart
    clearCart() {
        this.cart = [];
    }

    // Get cart total
    getTotal() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    // Get cart items
    getItems() {
        return [...this.cart];
    }
}

export default CartManager;
]

**CODE 2 - File: alteration-DataMaps.js**  
[
export const alterationMaps = {
    // Female Bottom
    "female-bottom": {
        "female-bottom-hem-skirt-straight-slim": { simple: 33, intermediate: 44, difficult: 55, detail: "Shorten hem on straight or slim skirt, maintaining original line and finish" },
        "female-bottom-hem-full/circle-unlined-skirt": { simple: 44, intermediate: 66, difficult: 88, detail: "Shorten hem on unlined full or circle skirt, managing flare distribution" },
        "female-bottom-hem-full/circle-lined-skirt": { simple: 66, intermediate: 77, difficult: 93.5, detail: "Shorten hem on lined full/circle skirt, adjusting both outer fabric and lining layers evenly" },
        "female-bottom-hem-unlined-pants": { simple: 44, intermediate: 66, difficult: 88, detail: "Shorten pant legs on unlined trousers, preserving original break and taper" },
        "female-bottom-hem-lined-pants": { simple: 66, intermediate: 88, difficult: 110, detail: "Shorten pant legs on lined trousers, adjusting both outer fabric and lining layers" },
        "female-bottom-take-in-side-seams-unlined-pants": { simple: 44, intermediate: 66, difficult: 88, detail: "Take in side seams on unlined pants to reduce waist/hip circumference" },
        "female-bottom-take-in-side-seams-lined-pants": { simple: 66, intermediate: 88, difficult: 110, detail: "Take in side seams on lined pants, adjusting both outer fabric and lining layers" },
        "female-bottom-taper-legs-unlined-pants": { simple: 44, intermediate: 66, difficult: 88, detail: "Narrow pant legs from knee to hem on unlined trousers" },
        "female-bottom-taper-legs-lined-pants": { simple: 66, intermediate: 88, difficult: 110, detail: "Narrow pant legs from knee to hem on lined trousers, adjusting both outer fabric and lining layers" }
    },
    
    // Female Dress
    "female-dress": {
        //Bodice
        "female-dress-halter-neckline": { simple: 20, intermediate: 30, difficult: 40, detail: "Adjust halter neckline for proper fit and support" },
        "female-dress-take-in-neckline": { simple: 15, intermediate: 25, difficult: 35, detail: "Take in neckline to reduce gaping or improve fit" },
        "female-dress-line-bind-neckline": { simple: 15, intermediate: 20, difficult: 25, detail: "Line and bind neckline edges for finished look" },
        "female-dress-take-in-shoulders": { simple: 20, intermediate: 35, difficult: 50, detail: "Adjust shoulder seams to lift bodice" },
        "female-dress-shorten-straps": { simple: 10, intermediate: 0, difficult: 20, detail: "Shorten dress straps for proper length" },
        "female-dress-coordinating-straps": { simple: 20, intermediate: 0, difficult: 30, detail: "Coordinate multiple straps for even alignment" },
        "female-dress-adjust-slide-bust": { simple: 35, intermediate: 50, difficult: 65, detail: "Adjust bust area for proper fit and support" },
        "female-dress-take-in-zipper": { simple: 30, intermediate: 50, difficult: 65, detail: "Take in side seams including zipper adjustment" },
        "female-dress-reshape-armhole": { simple: 15, intermediate: 20, difficult: 25, detail: "Reshape armhole for comfort and appearance" },
        "female-dress-shorten-bodice": { simple: 40, intermediate: 50, difficult: 60, detail: "Shorten bodice length from shoulder or waist" },
        "female-dress-add-gusset": { simple: 40, intermediate: 50, difficult: 65, detail: "Add fabric gusset for additional room" },
        "female-dress-temple-fill-bodice": { simple: 30, intermediate: 40, difficult: 50, detail: "Add temple fill for bodice structure" },
        "female-dress-additional-coverage": { simple: 15, intermediate: 0, difficult: 0, detail: "Add fabric for additional coverage" },
        "female-dress-corset-back": { simple: 15, intermediate: 0, difficult: 115, detail: "Install corset back closure system" },
        "female-dress-corset-ties": { simple: 20, intermediate: 0, difficult: 0, detail: "Add or replace corset ties" },
        "female-dress-modesty-panel": { simple: 30, intermediate: 0, difficult: 0, detail: "Add modesty panel for back coverage" },
        //Sleeve
        "female-dress-shorten-sleeve": { simple: 35, intermediate: 45, difficult: 55, detail: "Shorten sleeve length" },
        "female-dress-take-in-let-out-sleeve": { simple: 15, intermediate: 25, difficult: 35, detail: "Adjust sleeve width through seams" },
        "female-dress-take-in-elastic": { simple: 10, intermediate: 20, difficult: 0, detail: "Take in sleeve using elastic" },
        "female-dress-add-lingerie": { simple: 10, intermediate: 0, difficult: 0, detail: "Add lingerie straps or supports" },
        "female-dress-reset-sleeve": { simple: 25, intermediate: 35, difficult: 45, detail: "Remove and reset sleeve for better fit" },
        "female-dress-reshape-armholes": { simple: 10, intermediate: 20, difficult: 30, detail: "Reshape armholes for sleeve attachment" },
        "female-dress-temple-fill-sleeves": { simple: 40, intermediate: 50, difficult: 60, detail: "Add temple fill to sleeves" },
        "female-dress-cap-sleeve-1": { simple: 40, intermediate: 0, difficult: 0, detail: "Add basic cap sleeves" },
        "female-dress-cap-sleeve-2": { simple: 40, intermediate: 0, difficult: 0, detail: "Add detailed cap sleeves" },
        "female-dress-flutter-sleeve": { simple: 40, intermediate: 0, difficult: 0, detail: "Add flutter sleeves" },
        "female-dress-short-sleeve-ss1": { simple: 50, intermediate: 0, difficult: 0, detail: "Add short sleeves style 1" },
        "female-dress-long-sleeve-ls1": { simple: 60, intermediate: 0, difficult: 0, detail: "Add long sleeves style 1" },
        //Skirt
        "female-dress-hem": { simple: 75, intermediate: 95, difficult: 120, detail: "Hem skirt to desired length" },
        "female-dress-waistband": { simple: 15, intermediate: 20, difficult: 25, detail: "Adjust or replace waistband" },
        "female-dress-side-seams": { simple: 30, intermediate: 40, difficult: 50, detail: "Take in or let out side seams" },
        "female-dress-slit": { simple: 10, intermediate: 15, difficult: 20, detail: "Add or adjust skirt slit" },
        //Bustle
        "female-dress-over-bustle": { simple: 35, intermediate: 0, difficult: 0, detail: "Create over bustle for train" },
        "female-dress-add-over-bustle": { simple: 5, intermediate: 0, difficult: 0, detail: "Add additional over bustle point" },
        "female-dress-under-bustle": { simple: 50, intermediate: 0, difficult: 0, detail: "Create under bustle for train" },
        "female-dress-add-under-bustle": { simple: 7, intermediate: 0, difficult: 0, detail: "Add additional under bustle point" },
        "female-dress-royal-bustle": { simple: 50, intermediate: 0, difficult: 0, detail: "Create royal bustle style" },
        "female-dress-each-additional-royal": { simple: 15, intermediate: 0, difficult: 0, detail: "Each additional royal bustle point" },
        "female-dress-ballroom-bustle": { simple: 35, intermediate: 0, difficult: 0, detail: "Create ballroom bustle style" },
        "female-dress-add-ballroom-bustle": { simple: 5, intermediate: 0, difficult: 0, detail: "Add additional ballroom bustle point" },
        "female-dress-bustle-point-each": { simple: 5, intermediate: 0, difficult: 0, detail: "Each standard bustle point" },
        "female-dress-ribbon-bustle-point": { simple: 3, intermediate: 0, difficult: 0, detail: "Ribbon bustle point attachment" },
        "female-dress-add-wristloop": { simple: 25, intermediate: 0, difficult: 0, detail: "Add wrist loop for train carrying" },
        //Veil
        "female-dress-loop_comb": { simple: 5, intermediate: 0, difficult: 0, detail: "Add loop to comb attachment" },
        "female-dress-velcro_veil": { simple: 10, intermediate: 0, difficult: 0, detail: "Add velcro veil attachment" },
        "female-dress-veil_bustle": { simple: 5, intermediate: 0, difficult: 0, detail: "Bustle veil for reception" },
        //Others    
        "female-dress-move-add-hooks-eyes": { simple: 5, intermediate: 0, difficult: 0, detail: "Move or add hooks and eyes" },
        "female-dress-add-bra-cups": { simple: 20, intermediate: 0, difficult: 0, detail: "Add bra cups for support" },
        "female-dress-hem-single-layer": { simple: 15, intermediate: 0, difficult: 0, detail: "Hem single layer garment" },
        "female-dress-hem-slip": { simple: 30, intermediate: 25, difficult: 35, detail: "Hem slip or undergarment" }
    },
    
    // Female Jacket
    "female-jacket": {
        "female-jacket-hem-sleeves-unlined": { simple: 35, intermediate: 46, difficult: 58, detail: "Shorten sleeves on unlined jacket, adjusting length as needed" },
        "female-jacket-hem-sleeves-lined": { simple: 46, intermediate: 69, difficult: 92, detail: "Shorten sleeves on lined jacket, adjusting both outer fabric and lining" },
        "female-jacket-take-in-waist": { simple: 69, intermediate: 81, difficult: 98, detail: "Take in waist area for better fit through midsection" },
        "female-jacket-taper-sides-unlined": { simple: 35, intermediate: 46, difficult: 58, detail: "Taper side seams on unlined jacket to reduce width" },
        "female-jacket-taper-sides-lined": { simple: 46, intermediate: 69, difficult: 92, detail: "Taper side seams on lined jacket, adjusting both outer fabric and lining" },
        "female-jacket-shorten-length": { simple: 69, intermediate: 81, difficult: 98, detail: "Shorten overall jacket length, adjusting hem and proportions" }
    },
    
    // Female Top
    "female-top": {
        "female-top-shorten-straps": { simple: 40, intermediate: 50, difficult: 65, detail: "Shorten shoulder straps for proper fit and support" },
        "female-top-take-in-unlined": { simple: 50, intermediate: 75, difficult: 95, detail: "Take in side seams to reduce width for better fit" },
        "female-top-take-in-lined": { simple: 75, intermediate: 85, difficult: 105, detail: "Take in side seams of lined top, adjusting both layers" },
        "female-top-hem-unlined": { simple: 50, intermediate: 75, difficult: 95, detail: "Shorten hem length of unlined top" },
        "female-top-hem-lined": { simple: 75, intermediate: 95, difficult: 120, detail: "Shorten hem length of lined top, adjusting both layers" },
        "female-top-hem-sleeves-unlined": { simple: 50, intermediate: 75, difficult: 95, detail: "Shorten sleeves on unlined top" },
        "female-top-hem-sleeves-lined": { simple: 60, intermediate: 95, difficult: 130, detail: "Shorten sleeves on lined top, adjusting both layers" }
    },
    
    // Male Bottom
    "male-bottom": {
        "male-bottom-hem-unlined-pants": { simple: 29, intermediate: 41, difficult: 52, detail: "Shorten or lengthen unlined pants by adjusting the hem" },
        "male-bottom-hem-lined-pants": { simple: 35, intermediate: 46, difficult: 58, detail: "Shorten or lengthen lined pants, requiring extra work to preserve lining" },
        "male-bottom-take-in-unlined-pants": { simple: 52, intermediate: 69, difficult: 87, detail: "Take in waist or seat of unlined pants for better fit" },
        "male-bottom-take-in-lined-pants": { simple: 58, intermediate: 75, difficult: 92, detail: "Take in waist or seat of lined pants, requiring lining adjustments" },
        "male-bottom-taper-unlined-pants": { simple: 41, intermediate: 52, difficult: 64, detail: "Narrow pants legs from thigh to ankle for slimmer fit on unlined pants" },
        "male-bottom-taper-lined-pants": { simple: 46, intermediate: 58, difficult: 75, detail: "Narrow pants legs from thigh to ankle on lined pants with lining adjustments" }
    },
    
    // Male Suits
    "male-suits": {
        "male-suits-vest-take-in-side-seam": { simple: 30, intermediate: 45, difficult: 60, detail: "Take in or let out vest side seams for proper torso fit" },
        "male-suits-vest-take-in-shoulder": { simple: 25, intermediate: 40, difficult: 55, detail: "Adjust vest shoulder width by taking in shoulder seams" },
        "male-suits-vest-reshape-armhole": { simple: 30, intermediate: 45, difficult: 65, detail: "Reshape vest armholes for better fit and movement" },
        "male-suits-jacket-hem-sleeves-unlined": { simple: 45, intermediate: 65, difficult: 85, detail: "Shorten unlined jacket sleeves from the shoulder seam" },
        "male-suits-jacket-hem-sleeves-lined": { simple: 45, intermediate: 65, difficult: 85, detail: "Shorten lined jacket sleeves from the shoulder seam" },
        "male-suits-jacket-take-in-waist": { simple: 50, intermediate: 70, difficult: 90, detail: "Take in jacket waist for a more fitted silhouette" },
        "male-suits-jacket-taper-sides": { simple: 50, intermediate: 70, difficult: 90, detail: "Taper jacket side seams from armpit to waist" },
        "male-suits-jacket-shoulder-take-in": { simple: 55, intermediate: 75, difficult: 95, detail: "Take in jacket shoulders for improved shoulder line and fit" },
        "male-suits-jacket-reshape-armhole": { simple: 45, intermediate: 65, difficult: 85, detail: "Reshape jacket armholes for better sleeve attachment and comfort" },
        "male-suits-jacket-back-seam": { simple: 40, intermediate: 60, difficult: 80, detail: "Take in jacket center back seam for improved back fit" },
        "male-suits-pants-take-in-waist": { simple: 30, intermediate: 45, difficult: 60, detail: "Take in pants waistband for proper waist fit" },
        "male-suits-pants-adjust-length": { simple: 25, intermediate: 35, difficult: 50, detail: "Adjust pants length by hemming or letting down" },
        "male-suits-pants-side-taper": { simple: 35, intermediate: 55, difficult: 75, detail: "Taper pants from thigh to ankle for slimmer fit" }
    },
    
    // Male Top
    "male-top": {
        "male-top-shorten-straps": { simple: 35, intermediate: 49, difficult: 63, detail: "Shorten or lengthen shoulder straps on tops, tank tops, or overalls" },
        "male-top-hem-sleeves": { simple: 42, intermediate: 56, difficult: 70, detail: "Shorten or lengthen sleeves on shirts, tops, or jackets" },
        "male-top-take-in-taper": { simple: 63, intermediate: 83, difficult: 105, detail: "Take in or taper the sides of shirts or tops for a better fit" }
    },
    
    // Repair
    "repair": {
        "repair-zippers-on-dress": { "simple": 30, "intermediate": 0, "difficult": 0, "detail": "Repair or replace zippers on dresses, jumpsuits, or one-piece garments" },
        "repair-zippers-on-pants": { "simple": 36, "intermediate": 0, "difficult": 0, "detail": "Repair or replace zippers on pants, trousers, or shorts" },
        "repair-zippers-on-coats-jackets": { "simple": 60, "intermediate": 0, "difficult": 0, "detail": "Repair or replace zippers on coats, jackets, or blazers" },
        "repair-apply-patches": { "simple": 45, "intermediate": 0, "difficult": 0, "detail": "Apply patches to cover holes, tears, or worn areas on garments" },
        "repair-sew-in-rips-tears": { "simple": 35, "intermediate": 0, "difficult": 0, "detail": "Repair rips, tears, or splits in fabric using stitching techniques" },
        "repair-button-replacement": { "simple": 10, "intermediate": 0, "difficult": 0, "detail": "Replace missing or damaged buttons on shirts, jackets, or coats" }
    }
};
]

**CODE 3 - File: alteration-DOMRenderer.js**  
[
/**
 * DOM Renderer - Handles all DOM manipulation and rendering
 * Centralizes DOM operations for easier maintenance
 */
class DOMRenderer {
    constructor() {
        // Cache DOM elements
        this.elements = {
            priceElement: document.getElementById('priceCalculation'),
            noteElement: document.getElementById('alteration-note'),
            descriptionElement: document.getElementById('alteration-description'),
            customerRequestElement: document.getElementById('alteration-customer-request'),
            typeElement: document.getElementById('alteration-type'),
            levelElement: document.getElementById('alteration-level')
        };
    }

    // Clear all display elements
    clearDisplay() {
        Object.values(this.elements).forEach(element => {
            if (element) element.textContent = '';
        });
    }

    // Update display based on state
    render(state) {
        this.clearDisplay();

        const { selectedAlteration, selectedDifficulty, currentPrice, alterationDetails } = state;

        // Validate and render price
        if (currentPrice > 0) {
            this.elements.priceElement.textContent = `$${currentPrice.toFixed(2)}`;
            this.elements.noteElement.textContent = '• Prices are determined by the complexity and the specific requirements of the customer request.';
            
            if (alterationDetails && alterationDetails.detail) {
                this.elements.descriptionElement.textContent = `• ${alterationDetails.detail}`;
            }

            // Update customer request
            const requestText = this.getCustomerRequestText(selectedDifficulty);
            if (requestText) {
                this.elements.customerRequestElement.textContent = requestText;
            }

            // Update order summary
            if (selectedAlteration) {
                this.elements.typeElement.textContent = `Alteration type: ${selectedAlteration}`;
            }
            if (selectedDifficulty) {
                this.elements.levelElement.textContent = `Alteration level: ${selectedDifficulty}`;
            }
        } else {
            this.elements.priceElement.textContent = 'n/a';
            this.elements.noteElement.textContent = ' ';
        }
    }

    // Get customer request text
    getCustomerRequestText(difficulty) {
        const requestMap = {
            intermediate: '• plus (1) customer-requested modification',
            difficult: '• plus (2) customer-requested modification'
        };
        return requestMap[difficulty] || '';
    }

    // Reset all select elements
    resetSelects(alterationSelects, difficultySelect) {
        alterationSelects.forEach(select => select.value = '');
        if (difficultySelect) difficultySelect.value = '';
    }
}

export default DOMRenderer;
]

**CODE 4 - File: alteration-EventManager.js**  
[
/**
 * Event Manager - Handles all event listeners and DOM interactions
 * Decouples event handling from business logic
 */
class EventManager {
    constructor(stateManager, priceCalculator, domRenderer) {
        this.stateManager = stateManager;
        this.priceCalculator = priceCalculator;
        this.domRenderer = domRenderer;
        
        // Get DOM elements
        this.alterationSelects = document.querySelectorAll('select[id$="Select"]');
        this.difficultySelect = document.getElementById('alterationLevel-diff');
        
        // Bind methods
        this.handleAlterationChange = this.handleAlterationChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.resetOtherSelects = this.resetOtherSelects.bind(this);
    }

    // Initialize all event listeners
    initialize() {
        this.alterationSelects.forEach(select => {
            if (select.id !== 'alterationLevel-diff') {
                select.addEventListener('change', this.handleAlterationChange);
            }
        });

        if (this.difficultySelect) {
            this.difficultySelect.addEventListener('change', this.handleDifficultyChange);
        }
    }

    // Handle alteration selection change
    handleAlterationChange(event) {
        const value = event.target.value;
        const currentState = this.stateManager.getState();

        if (value) {
            this.resetOtherSelects(event.target);
            
            // Calculate price and get details
            const difficulty = currentState.selectedDifficulty;
            const price = difficulty ? this.priceCalculator.calculatePrice(value, difficulty) : 0;
            const alterationDetails = this.priceCalculator.getAlterationDetails(value);

            this.stateManager.setState({
                selectedAlteration: value,
                currentPrice: price,
                alterationDetails,
                lastSelectedElement: event.target
            });
        } else {
            this.stateManager.setState({
                selectedAlteration: null,
                currentPrice: 0,
                alterationDetails: null
            });
        }
    }

    // Handle difficulty selection change
    handleDifficultyChange(event) {
        const difficulty = event.target.value;
        const currentState = this.stateManager.getState();
        const alteration = currentState.selectedAlteration;

        if (difficulty) {
            const price = alteration ? this.priceCalculator.calculatePrice(alteration, difficulty) : 0;
            const alterationDetails = alteration ? this.priceCalculator.getAlterationDetails(alteration) : null;

            this.stateManager.setState({
                selectedDifficulty: difficulty,
                currentPrice: price,
                alterationDetails
            });
        } else {
            this.stateManager.setState({
                selectedDifficulty: null,
                currentPrice: 0
            });
        }
    }

    // Reset other select elements when one is selected
    resetOtherSelects(currentSelect) {
        this.alterationSelects.forEach(select => {
            if (select !== currentSelect && select.id !== 'alterationLevel-diff') {
                select.value = '';
            }
        });
    }

    // Clean up event listeners
    cleanup() {
        this.alterationSelects.forEach(select => {
            select.removeEventListener('change', this.handleAlterationChange);
        });
        
        if (this.difficultySelect) {
            this.difficultySelect.removeEventListener('change', this.handleDifficultyChange);
        }
    }
}

export default EventManager;
]

**CODE 5 - File: alteration-Main.js**  
[
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
]

**CODE 6 - File: alteration-PriceCalculator.js**  
[
    /**
 * Price Calculator - Pure function module for price calculations
 * Contains no side effects, easily testable
 */
class PriceCalculator {
    constructor(alterationMaps) {
        this.alterationMaps = alterationMaps;
    }

    // Find category for a given alteration value
    findCategory(alterationValue) {
        if (!alterationValue) return null;

        // Linear search through all categories
        for (const category in this.alterationMaps) {
            if (this.alterationMaps[category][alterationValue]) {
                return category;
            }
        }

        // Try partial match for nested structures
        const parts = alterationValue.split('-');
        for (let i = parts.length - 1; i >= 1; i--) {
            const potentialCategory = parts.slice(0, i).join('-');
            if (this.alterationMaps[potentialCategory] && 
                this.alterationMaps[potentialCategory][alterationValue]) {
                return potentialCategory;
            }
        }

        return null;
    }

    // Calculate price based on alteration and difficulty
    calculatePrice(alterationValue, difficulty) {
        if (!alterationValue || !difficulty) return 0;

        const category = this.findCategory(alterationValue);
        
        if (!category || 
            !this.alterationMaps[category] || 
            !this.alterationMaps[category][alterationValue]) {
            console.warn(`Alteration not found: ${alterationValue}`);
            return 0;
        }

        const alterationData = this.alterationMaps[category][alterationValue];
        
        if (typeof alterationData[difficulty] !== 'number' || 
            alterationData[difficulty] <= 0) {
            return 0;
        }

        return alterationData[difficulty];
    }

    // Get alteration details
    getAlterationDetails(alterationValue) {
        const category = this.findCategory(alterationValue);
        
        if (!category || 
            !this.alterationMaps[category] || 
            !this.alterationMaps[category][alterationValue]) {
            return { detail: '', price: 0 };
        }

        return this.alterationMaps[category][alterationValue];
    }

    // Get customer request text based on difficulty
    getCustomerRequestText(difficulty) {
        const requestMap = {
            intermediate: '• plus (1) customer-requested modification',
            difficult: '• plus (2) customer-requested modification'
        };
        return requestMap[difficulty] || '';
    }
}

export default PriceCalculator;
]

**CODE 7 - File: alteration-StateManager.js**  
[
/**
 * State Manager - Centralized state management for the alteration calculator
 * Single source of truth for application state
 */
class StateManager {
    constructor(alterationMaps) {
        this.state = {
            selectedAlteration: null,
            selectedDifficulty: null,
            currentPrice: 0,
            alterationDetails: null,
            lastSelectedElement: null
        };
        this.alterationMaps = alterationMaps;
        this.listeners = [];
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) this.listeners.splice(index, 1);
        };
    }

    // Update state and notify listeners
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.notifyListeners();
    }

    // Notify all subscribed listeners
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Reset all state
    reset() {
        this.setState({
            selectedAlteration: null,
            selectedDifficulty: null,
            currentPrice: 0,
            alterationDetails: null,
            lastSelectedElement: null
        });
    }
}

export default StateManager;
]
**CODE 8 - File: alteration-CartManager.test.js**
[
import { expect } from 'chai';
import CartManager from '../../../pages/alteration-pages/alteration-modules/alteration-CartManager.js';

describe('CartManager', () => {
  let cartManager;

  beforeEach(() => {
    cartManager = new CartManager();
  });

  it('should initialize with empty cart and nextId = 1', () => {
    expect(cartManager.cart).to.be.an('array').that.is.empty;
    expect(cartManager.nextId).to.equal(1);
  });

  it('should add an item and return it with id and timestamp', () => {
    const item = cartManager.addItem('Test item', 25.99);
    expect(item).to.have.property('id', 1);
    expect(item).to.have.property('description', 'Test item');
    expect(item).to.have.property('price', 25.99);
    expect(item).to.have.property('timestamp').that.is.a('string');
    expect(cartManager.cart).to.have.lengthOf(1);
    expect(cartManager.nextId).to.equal(2);
  });

  it('should remove an existing item by id', () => {
    cartManager.addItem('Item 1', 10);
    cartManager.addItem('Item 2', 20);
    const removed = cartManager.removeItem(1);
    expect(removed).to.have.property('id', 1);
    expect(removed).to.have.property('description', 'Item 1');
    expect(cartManager.cart).to.have.lengthOf(1);
    expect(cartManager.cart[0].id).to.equal(2);
  });

  it('should return null when removing non-existent item', () => {
    cartManager.addItem('Item', 10);
    const removed = cartManager.removeItem(999);
    expect(removed).to.be.null;
    expect(cartManager.cart).to.have.lengthOf(1);
  });

  it('should clear all items', () => {
    cartManager.addItem('Item 1', 10);
    cartManager.addItem('Item 2', 20);
    cartManager.clearCart();
    expect(cartManager.cart).to.be.empty;
    expect(cartManager.nextId).to.equal(3); // nextId is not reset
  });

  it('should calculate total correctly', () => {
    cartManager.addItem('A', 15.5);
    cartManager.addItem('B', 7.25);
    expect(cartManager.getTotal()).to.equal(22.75);
  });

  it('should return a copy of items', () => {
    const item = cartManager.addItem('Test', 5);
    const items = cartManager.getItems();
    expect(items).to.deep.equal([item]);
    expect(items).not.to.equal(cartManager.cart); // different array reference
  });
});
]  

**CODE 9 - File: alteration-DataMaps.test.js**
[
import { expect } from 'chai';
import { alterationMaps } from '../../../pages/alteration-pages/alteration-modules/alteration-DataMaps.js';

describe('alterationMaps', () => {
  it('should be an object with expected top-level categories', () => {
    expect(alterationMaps).to.be.an('object');
    const expectedCategories = [
      'female-bottom',
      'female-dress',
      'female-jacket',
      'female-top',
      'male-bottom',
      'male-suits',
      'male-top',
      'repair'
    ];
    expect(Object.keys(alterationMaps)).to.have.members(expectedCategories);
  });

  it('should have female-dress with many alteration keys', () => {
    const femaleDress = alterationMaps['female-dress'];
    expect(femaleDress).to.be.an('object');
    // Spot check a few entries
    expect(femaleDress['female-dress-hem']).to.exist;
    expect(femaleDress['female-dress-hem']).to.have.property('simple', 75);
    expect(femaleDress['female-dress-hem']).to.have.property('detail').that.is.a('string');
  });

  it('should have repair category with correct structure', () => {
    const repair = alterationMaps['repair'];
    expect(repair['repair-zippers-on-dress']).to.deep.include({
      simple: 30,
      intermediate: 0,
      difficult: 0
    });
  });

  it('should have all price entries as numbers (or zero)', () => {
    const checkPrices = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if ('simple' in obj[key]) {
            expect(obj[key].simple).to.be.a('number');
            expect(obj[key].intermediate).to.be.a('number');
            expect(obj[key].difficult).to.be.a('number');
            expect(obj[key].detail).to.be.a('string');
          } else {
            checkPrices(obj[key]);
          }
        }
      }
    };
    checkPrices(alterationMaps);
  });
});
]  

**CODE 10 - File: alteration-DOMRenderer.test.js**
[
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import DOMRenderer from '../../../pages/alteration-pages/alteration-modules/alteration-DOMRenderer.js';

describe('DOMRenderer', () => {
  let dom;
  let document;
  let renderer;

  beforeEach(() => {
    // Set up a fake DOM with required elements
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <span id="priceCalculation"></span>
        <p id="alteration-note"></p>
        <p id="alteration-description"></p>
        <p id="alteration-customer-request"></p>
        <p id="alteration-type"></p>
        <p id="alteration-level"></p>
      </body>
    `);
    document = dom.window.document;
    global.document = document; // needed for DOMRenderer's constructor
    renderer = new DOMRenderer();
  });

  afterEach(() => {
    delete global.document;
  });

  it('should clear all display elements', () => {
    document.getElementById('priceCalculation').textContent = 'old';
    document.getElementById('alteration-note').textContent = 'old';
    renderer.clearDisplay();
    expect(document.getElementById('priceCalculation').textContent).to.equal('');
    expect(document.getElementById('alteration-note').textContent).to.equal('');
  });

  it('should render state with price and details', () => {
    const state = {
      selectedAlteration: 'test-alteration',
      selectedDifficulty: 'simple',
      currentPrice: 42.5,
      alterationDetails: { detail: 'Test detail' }
    };
    renderer.render(state);

    expect(document.getElementById('priceCalculation').textContent).to.equal('$42.50');
    expect(document.getElementById('alteration-note').textContent).to.contain('Prices are determined');
    expect(document.getElementById('alteration-description').textContent).to.equal('• Test detail');
    expect(document.getElementById('alteration-type').textContent).to.equal('Alteration type: test-alteration');
    expect(document.getElementById('alteration-level').textContent).to.equal('Alteration level: simple');
  });

  it('should render customer request text for intermediate difficulty', () => {
    const state = {
      selectedAlteration: 'a',
      selectedDifficulty: 'intermediate',
      currentPrice: 10,
      alterationDetails: { detail: 'x' }
    };
    renderer.render(state);
    expect(document.getElementById('alteration-customer-request').textContent).to.equal('• plus (1) customer-requested modification');
  });

  it('should render customer request text for difficult difficulty', () => {
    const state = {
      selectedAlteration: 'a',
      selectedDifficulty: 'difficult',
      currentPrice: 10,
      alterationDetails: { detail: 'x' }
    };
    renderer.render(state);
    expect(document.getElementById('alteration-customer-request').textContent).to.equal('• plus (2) customer-requested modification');
  });

  it('should show n/a when price is zero', () => {
    const state = {
      selectedAlteration: null,
      selectedDifficulty: null,
      currentPrice: 0,
      alterationDetails: null
    };
    renderer.render(state);
    expect(document.getElementById('priceCalculation').textContent).to.equal('n/a');
    expect(document.getElementById('alteration-note').textContent).to.equal(' ');
  });

  it('should reset select elements', () => {
    const select1 = document.createElement('select');
    select1.id = 'select1';
    const select2 = document.createElement('select');
    select2.id = 'select2';
    const difficultySelect = document.createElement('select');
    difficultySelect.id = 'alterationLevel-diff';

    select1.value = 'something';
    select2.value = 'else';
    difficultySelect.value = 'simple';

    renderer.resetSelects([select1, select2], difficultySelect);
    expect(select1.value).to.equal('');
    expect(select2.value).to.equal('');
    expect(difficultySelect.value).to.equal('');
  });
});
]  

**CODE 11 - File: alteration-EventManager.test.js**
[
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import EventManager from '../../../pages/alteration-pages/alteration-modules/alteration-EventManager.js';

describe('EventManager', () => {
  let dom;
  let document;
  let stateManagerMock;
  let priceCalculatorMock;
  let domRendererMock;
  let eventManager;
  let alterationSelects;
  let difficultySelect;

  beforeEach(() => {
    // Create DOM with two alteration selects (to test resetting multiple) and a difficulty select
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <select id="alteration-top-Select"></select>
        <select id="alteration-bottom-Select"></select>
        <select id="alterationLevel-diff"></select>
      </body>
    `);
    document = dom.window.document;
    global.document = document;

    stateManagerMock = {
      getState: sinon.stub().returns({ selectedDifficulty: null }),
      setState: sinon.spy()
    };
    priceCalculatorMock = {
      calculatePrice: sinon.stub().returns(99),
      getAlterationDetails: sinon.stub().returns({ detail: 'mock detail' })
    };
    domRendererMock = {};

    eventManager = new EventManager(stateManagerMock, priceCalculatorMock, domRendererMock);
    alterationSelects = eventManager.alterationSelects;
    difficultySelect = eventManager.difficultySelect;
  });

  afterEach(() => {
    delete global.document;
    sinon.restore();
  });

  // ... other tests remain unchanged ...

  it('should reset other selects except current and difficulty', () => {
    // Get the actual DOM elements
    const topSelect = document.getElementById('alteration-top-Select');
    const bottomSelect = document.getElementById('alteration-bottom-Select');
    const diffSelect = document.getElementById('alterationLevel-diff');

    // Set initial values
    topSelect.value = 'top-value';
    bottomSelect.value = 'bottom-value';
    diffSelect.value = 'simple';

    // The eventManager.alterationSelects already contains both alteration selects
    // (because they match the selector 'select[id$="Select"]'). We can rely on that.

    // Call resetOtherSelects with the top select as the current one
    eventManager.resetOtherSelects(topSelect);

    // Top select should keep its value
    expect(topSelect.value).to.equal('top-value');
    // Bottom select should be reset
    expect(bottomSelect.value).to.equal('');
    // Difficulty select should not be touched (it's not in alterationSelects anyway)
    expect(diffSelect.value).to.equal('simple');
  });
});
]  

**CODE 12 - File: alteration-Main.test.js**
[
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import AlterationApp from '../../../pages/alteration-pages/alteration-modules/alteration-Main.js';

describe('AlterationApp', () => {
  let dom;
  let document;
  let app;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <span id="priceCalculation"></span>
        <p id="alteration-note"></p>
        <p id="alteration-description"></p>
        <p id="alteration-customer-request"></p>
        <p id="alteration-type"></p>
        <p id="alteration-level"></p>
        <select id="alteration-top-Select"></select>
        <select id="alterationLevel-diff"></select>
      </body>
    `);
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;               // make window available globally
    global.alert = sinon.stub();               // stub alert on the global object

    app = new AlterationApp();
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.alert;
    sinon.restore();
  });

  // ... other tests remain unchanged ...

  describe('global handlers', () => {
    beforeEach(() => {
      app.setupGlobalHandlers();
    });

    it('handleAdd should add item to cart when valid state', () => {
      app.stateManager.setState({
        currentPrice: 45,
        selectedAlteration: 'test',
        selectedDifficulty: 'simple'
      });
      const addItemSpy = sinon.spy(app.cartManager, 'addItem');

      // Call the handler attached to window
      window.handleAdd();

      expect(addItemSpy.calledOnceWith('Alteration: test (simple)', 45)).to.be.true;
      expect(global.alert.calledOnce).to.be.true;
    });

    it('handleAdd should alert if no valid alteration', () => {
      app.stateManager.setState({ currentPrice: 0 });
      const addItemSpy = sinon.spy(app.cartManager, 'addItem');

      window.handleAdd();

      expect(addItemSpy.notCalled).to.be.true;
      expect(global.alert.calledWith('Please select a valid alteration and difficulty level first.')).to.be.true;
    });

    it('handleClear should call reset', () => {
      const resetSpy = sinon.spy(app, 'reset');
      window.handleClear();
      expect(resetSpy.calledOnce).to.be.true;
    });
  });
});
]  

**CODE 13 - File: alteration-PriceCalculator.test.js**
[
import { expect } from 'chai';
import PriceCalculator from '../../../pages/alteration-pages/alteration-modules/alteration-PriceCalculator.js';
import { alterationMaps } from '../../../pages/alteration-pages/alteration-modules/alteration-DataMaps.js';

describe('PriceCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new PriceCalculator(alterationMaps);
  });

  describe('findCategory', () => {
    it('should return correct category for known alteration', () => {
      const category = calculator.findCategory('female-bottom-hem-skirt-straight-slim');
      expect(category).to.equal('female-bottom');
    });

    it('should return null for unknown alteration', () => {
      const category = calculator.findCategory('non-existent');
      expect(category).to.be.null;
    });
  });

  describe('calculatePrice', () => {
    it('should return correct price for known alteration and difficulty', () => {
      const price = calculator.calculatePrice('female-bottom-hem-skirt-straight-slim', 'simple');
      expect(price).to.equal(33);
    });

    it('should return 0 if alteration not found', () => {
      const price = calculator.calculatePrice('unknown', 'simple');
      expect(price).to.equal(0);
    });

    it('should return 0 if difficulty not found or zero', () => {
      const price = calculator.calculatePrice('repair-zippers-on-dress', 'intermediate');
      expect(price).to.equal(0); // intermediate is 0 in map
    });

    it('should return 0 if difficulty missing', () => {
      const price = calculator.calculatePrice('female-bottom-hem-skirt-straight-slim', null);
      expect(price).to.equal(0);
    });
  });

  describe('getAlterationDetails', () => {
    it('should return the full alteration object', () => {
      const details = calculator.getAlterationDetails('female-bottom-hem-skirt-straight-slim');
      expect(details).to.deep.equal(alterationMaps['female-bottom']['female-bottom-hem-skirt-straight-slim']);
    });

    it('should return empty detail object if not found', () => {
      const details = calculator.getAlterationDetails('nonexistent');
      expect(details).to.deep.equal({ detail: '', price: 0 });
    });
  });

  describe('getCustomerRequestText', () => {
    it('should return correct text for intermediate', () => {
      expect(calculator.getCustomerRequestText('intermediate')).to.equal('• plus (1) customer-requested modification');
    });

    it('should return correct text for difficult', () => {
      expect(calculator.getCustomerRequestText('difficult')).to.equal('• plus (2) customer-requested modification');
    });

    it('should return empty string for unknown', () => {
      expect(calculator.getCustomerRequestText('simple')).to.equal('');
    });
  });
});
]  

**CODE 14 - File: alteration-StateManager.test.js**
[
    import { expect } from 'chai';
import sinon from 'sinon';
import StateManager from '../../../pages/alteration-pages/alteration-modules/alteration-StateManager.js';

describe('StateManager', () => {
  let stateManager;

  beforeEach(() => {
    stateManager = new StateManager({}); // alterationMaps not used in state
  });

  it('should initialize with default state', () => {
    const state = stateManager.getState();
    expect(state).to.deep.equal({
      selectedAlteration: null,
      selectedDifficulty: null,
      currentPrice: 0,
      alterationDetails: null,
      lastSelectedElement: null
    });
  });

  it('should update state with setState', () => {
    stateManager.setState({ currentPrice: 99, selectedAlteration: 'test' });
    const state = stateManager.getState();
    expect(state.currentPrice).to.equal(99);
    expect(state.selectedAlteration).to.equal('test');
  });

  it('should notify listeners on setState', () => {
    const listener = sinon.spy();
    stateManager.subscribe(listener);

    stateManager.setState({ currentPrice: 50 });

    expect(listener.calledOnce).to.be.true;
    expect(listener.calledWith(stateManager.getState())).to.be.true;
  });

  it('should allow unsubscribing', () => {
    const listener = sinon.spy();
    const unsubscribe = stateManager.subscribe(listener);

    unsubscribe();
    stateManager.setState({ currentPrice: 50 });

    expect(listener.notCalled).to.be.true;
  });

  it('should reset state to initial values', () => {
    stateManager.setState({ currentPrice: 123, selectedAlteration: 'x', selectedDifficulty: 'simple', alterationDetails: { a: 1 }, lastSelectedElement: {} });
    stateManager.reset();

    const state = stateManager.getState();
    expect(state).to.deep.equal({
      selectedAlteration: null,
      selectedDifficulty: null,
      currentPrice: 0,
      alterationDetails: null,
      lastSelectedElement: null
    });
  });

  it('getState returns a copy, not a reference', () => {
    const state1 = stateManager.getState();
    state1.currentPrice = 999;
    const state2 = stateManager.getState();
    expect(state2.currentPrice).to.equal(0);
  });
});
]

**CODE 15 - File: package.json**  
[
{
  "scripts": {
    "test": "mocha",
    "test:alteration": "mocha test/alteration-module-tests/unit/**/*.test.js",
    "test:alteration:watch": "mocha --watch test/alteration-module-tests/unit/**/*.test.js",
    "test:measurement": "mocha test/measurement-module-tests/unit/**/*.test.js",
    "test:measurement:watch": "mocha --watch test/measurement-module-tests/unit/**/*.test.js",
    "test:all": "npm run test:alteration && npm run test:measurement"
  },
  "type": "module",
  "devDependencies": {
    "chai": "^4.5.0",
    "jsdom": "^22.1.0",
    "jsdom-global": "^3.0.2",
    "mocha": "^10.8.2",
    "sinon": "^15.2.0",
    "testdouble": "^3.20.2"
  }
}
]

**CODE 16 - File: readme.md(file structure)**
[
Izzy-Alteration
├─ about
│  ├─ deepseek
│  │  └─ alteration-female.txt
│  └─ measurements-about.txt
└─ frontend
   ├─ package-lock.json
   ├─ package.json
   ├─ pages
   │  ├─ account-menu.html
   │  ├─ add-service.html
   │  ├─ alteration-pages
   │  │  ├─ alteration-about
   │  │  │  ├─ (debug)alteration-modules.md
   │  │  │  ├─ alteration(how-the-program-works).md
   │  │  │  ├─ alteration-functionality-prompt.md
   │  │  │  ├─ alteration-modules.md
   │  │  │  └─ alteration-responsive-page.md
   │  │  ├─ alteration-female-bottom.html
   │  │  ├─ alteration-female-dress.html
   │  │  ├─ alteration-female-jacket.html
   │  │  ├─ alteration-female-top.html
   │  │  ├─ alteration-male-bottom.html
   │  │  ├─ alteration-male-suits.html
   │  │  ├─ alteration-male-top.html
   │  │  ├─ alteration-modules
   │  │  │  ├─ alteration-CartManager.js
   │  │  │  ├─ alteration-DOMRenderer.js
   │  │  │  ├─ alteration-DataMaps.js
   │  │  │  ├─ alteration-EventManager.js
   │  │  │  ├─ alteration-Main.js
   │  │  │  ├─ alteration-PriceCalculator.js
   │  │  │  └─ alteration-StateManager.js
   │  │  └─ alteration-repair.html
   │  ├─ index.html
   │  ├─ login.html
   │  ├─ measurement-pages
   │  │  ├─ measurement-about
   │  │  │  ├─ (debug)floating-window-measurement.md
   │  │  │  ├─ (debug)measurement-split-modules.md
   │  │  │  ├─ (refactor)measurement-modules.md
   │  │  │  ├─ measurement(how-the-program-works).md
   │  │  │  ├─ measurement-functionality-prompt.md
   │  │  │  └─ measurement-modules.md
   │  │  ├─ measurement-modules
   │  │  │  ├─ measurement-DataMaps.js
   │  │  │  ├─ measurement-Main.js
   │  │  │  ├─ measurement-Manager.js
   │  │  │  ├─ measurement-Validator.js
   │  │  │  └─ measurement-ViewHandler.js
   │  │  ├─ measurements-female.html
   │  │  ├─ measurements-male.html
   │  │  └─ sample.html
   │  ├─ order-history.html
   │  ├─ services.html
   │  └─ signup.html
   ├─ public
   │  ├─ css
   │  │  ├─ account-menu.css
   │  │  ├─ add-service.css
   │  │  ├─ alteration-female.css
   │  │  ├─ alteration.css
   │  │  ├─ index.css
   │  │  ├─ login.css
   │  │  ├─ measurements.css
   │  │  ├─ order-history.css
   │  │  ├─ services.css
   │  │  └─ signup.css
   │  ├─ images
   │  │  ├─ female-(chart)-tablet-mobile.png
   │  │  ├─ female-back-tablet-mobile.png
   │  │  ├─ female-desktop.png
   │  │  ├─ female-front-tablet-mobile.png
   │  │  ├─ male-(chart)-tablet-mobile.png
   │  │  ├─ male-back-tablet-mobile.png
   │  │  ├─ male-desktop.png
   │  │  └─ male-front-tablet-mobile.png
   │  └─ js
   │     ├─ account.js
   │     ├─ add-service.js
   │     ├─ alteration-female.js
   │     ├─ alteration-price-calculator.js
   │     ├─ index.js
   │     ├─ login.js
   │     ├─ order-history.js
   │     ├─ services.js
   │     └─ signup.js
   └─ test
      ├─ TEST(how to run).md
      ├─ alteration-module-tests
      │  ├─ alteration-TEST(about)
      │  │  ├─ (debug)alteration-test-unit.md
      │  │  ├─ (refactor)alteration-test-unit.md
      │  │  └─ alteration-unit-tests-prompt.md
      │  └─ unit
      │     ├─ alteration-CartManager.test.js
      │     ├─ alteration-DOMRenderer.test.js
      │     ├─ alteration-DataMaps.test.js
      │     ├─ alteration-EventManager.test.js
      │     ├─ alteration-Main.test.js
      │     ├─ alteration-PriceCalculator.test.js
      │     └─ alteration-StateManager.test.js
      └─ measurement-module-tests
         ├─ measurement-TEST(about)
         │  ├─ (debug)measurement-test-unit.md
         │  ├─ (refactor)measurement-test-unit.md
         │  └─ measurement-unit-tests-prompt.md
         └─ unit
            ├─ measurement-DataMaps.test.js
            ├─ measurement-Main.test.js
            ├─ measurement-Manager.test.js
            ├─ measurement-Validator.test.js
            └─ measurement-ViewHandler.test.js
]  


**ERROR/ISSUE:**
[

  1) EventManager
       should reset other selects except current and difficulty:

      AssertionError: expected '' to equal 'top-value'
      + expected - actual

      +top-value
      
      at Context.<anonymous> (file:///home/bernard/Documents/Izzy-Alteration/frontend/test/alteration-module-tests/unit/alteration-EventManager.test.js:69:32)
      at processImmediate (node:internal/timers:466:21)
]

**REQUEST:**
[
    1. fix the cause of failed tests
    2. rewrite an updated version but preserve the behavior and functionality of the module
    3. rename the first describe of each test based on the name of the file its testing, [example: describe('AlterationApp', () => rename it to alteration-Main.js]


]
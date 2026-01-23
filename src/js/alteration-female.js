// no longer used --- IGNORE --- 
// a breakdown version is now in js/modules
// ==============================================
// DATA LAYER - Pure data and configuration
// ==============================================

// features implemented in this file: 
// calculate price based on alteration type and difficulty level
// update description, type order, level order, and price display
// reset form and clear display elements
// female only alterations data map

const alterationMap = {
    // Bodice 
    "halter-neckline": { simple: 20, intermediate: 30, difficult: 40, couture: 50, detail: "Adjust halter neckline for proper fit and support" },
    "take-in-neckline": { simple: 15, intermediate: 25, difficult: 35, couture: 45, detail: "Take in neckline to reduce gaping or improve fit" },
    "line-bind-neckline": { simple: 15, intermediate: 20, difficult: 25, couture: 30, detail: "Line and bind neckline edges for finished look" },
    "take-up-shoulders": { simple: 20, intermediate: 35, difficult: 50, couture: 65, detail: "Adjust shoulder seams to lift bodice" },
    "shorten-straps": { simple: 10, intermediate: 0, difficult: 20, couture: 25, detail: "Shorten dress straps for proper length" },
    "coordinating-straps": { simple: 20, intermediate: 0, difficult: 30, couture: 0, detail: "Coordinate multiple straps for even alignment" },
    "adjust-slide-bust": { simple: 35, intermediate: 50, difficult: 65, couture: 80, detail: "Adjust bust area for proper fit and support" },
    "take-in-zipper": { simple: 30, intermediate: 50, difficult: 65, couture: 80, detail: "Take in side seams including zipper adjustment" },
    "reshape-armhole": { simple: 15, intermediate: 20, difficult: 25, couture: 30, detail: "Reshape armhole for comfort and appearance" },
    "shorten-bodice": { simple: 40, intermediate: 50, difficult: 60, couture: 75, detail: "Shorten bodice length from shoulder or waist" },
    "add-gusset": { simple: 40, intermediate: 50, difficult: 65, couture: 80, detail: "Add fabric gusset for additional room" },
    "temple-fill-bodice": { simple: 30, intermediate: 40, difficult: 50, couture: 60, detail: "Add temple fill for bodice structure" },
    "additional-coverage": { simple: 15, intermediate: 0, difficult: 0, couture: 0, detail: "Add fabric for additional coverage" },
    "corset-back": { simple: 15, intermediate: 0, difficult: 115, couture: 0, detail: "Install corset back closure system" },
    "corset-ties": { simple: 20, intermediate: 0, difficult: 0, couture: 0, detail: "Add or replace corset ties" },
    "modesty-panel": { simple: 30, intermediate: 0, difficult: 0, couture: 0, detail: "Add modesty panel for back coverage" },

    // Sleeve 
    "shorten-sleeve": { simple: 35, intermediate: 45, difficult: 55, couture: 70, detail: "Shorten sleeve length" },
    "take-in-let-out-sleeve": { simple: 15, intermediate: 25, difficult: 35, couture: 40, detail: "Adjust sleeve width through seams" },
    "take-in-elastic": { simple: 10, intermediate: 20, difficult: 0, couture: 0, detail: "Take in sleeve using elastic" },
    "add-lingerie": { simple: 10, intermediate: 0, difficult: 0, couture: 0, detail: "Add lingerie straps or supports" },
    "reset-sleeve": { simple: 25, intermediate: 35, difficult: 45, couture: 60, detail: "Remove and reset sleeve for better fit" },
    "reshape-armholes": { simple: 10, intermediate: 20, difficult: 30, couture: 40, detail: "Reshape armholes for sleeve attachment" },
    "temple-fill-sleeves": { simple: 40, intermediate: 50, difficult: 60, couture: 75, detail: "Add temple fill to sleeves" },
    "cap-sleeve-1": { simple: 40, intermediate: 0, difficult: 0, couture: 0, detail: "Add basic cap sleeves" },
    "cap-sleeve-2": { simple: 40, intermediate: 0, difficult: 0, couture: 0, detail: "Add detailed cap sleeves" },
    "flutter-sleeve": { simple: 40, intermediate: 0, difficult: 0, couture: 0, detail: "Add flutter sleeves" },
    "short-sleeve-ss1": { simple: 50, intermediate: 0, difficult: 0, couture: 0, detail: "Add short sleeves style 1" },
    "long-sleeve-ls1": { simple: 60, intermediate: 0, difficult: 0, couture: 0, detail: "Add long sleeves style 1" },

    // Skirt 
    "hem": { simple: 75, intermediate: 95, difficult: 120, couture: 150, detail: "Hem skirt to desired length" },
    "waistband": { simple: 15, intermediate: 20, difficult: 25, couture: 30, detail: "Adjust or replace waistband" },
    "side-seams": { simple: 30, intermediate: 40, difficult: 50, couture: 60, detail: "Take in or let out side seams" },
    "slit": { simple: 10, intermediate: 15, difficult: 20, couture: 25, detail: "Add or adjust skirt slit" },

    // Bustle 
    "over-bustle": { simple: 35, intermediate: 0, difficult: 0, couture: 0, detail: "Create over bustle for train" },
    "add-over-bustle": { simple: 5, intermediate: 0, difficult: 0, couture: 0, detail: "Add additional over bustle point" },
    "under-bustle": { simple: 50, intermediate: 0, difficult: 0, couture: 0, detail: "Create under bustle for train" },
    "add-under-bustle": { simple: 7, intermediate: 0, difficult: 0, couture: 0, detail: "Add additional under bustle point" },
    "royal-bustle": { simple: 50, intermediate: 0, difficult: 0, couture: 0, detail: "Create royal bustle style" },
    "each-additional-royal": { simple: 15, intermediate: 0, difficult: 0, couture: 0, detail: "Each additional royal bustle point" },
    "ballroom-bustle": { simple: 35, intermediate: 0, difficult: 0, couture: 0, detail: "Create ballroom bustle style" },
    "add-ballroom-bustle": { simple: 5, intermediate: 0, difficult: 0, couture: 0, detail: "Add additional ballroom bustle point" },
    "bustle-point-each": { simple: 5, intermediate: 0, difficult: 0, couture: 0, detail: "Each standard bustle point" },
    "ribbon-bustle-point": { simple: 3, intermediate: 0, difficult: 0, couture: 0, detail: "Ribbon bustle point attachment" },
    "add-wristloop": { simple: 25, intermediate: 0, difficult: 0, couture: 0, detail: "Add wrist loop for train carrying" },

    // Veil 
    "loop_comb": { simple: 5, intermediate: 0, difficult: 0, couture: 0, detail: "Add loop to comb attachment" },
    "velcro_veil": { simple: 10, intermediate: 0, difficult: 0, couture: 0, detail: "Add velcro veil attachment" },
    "veil_bustle": { simple: 5, intermediate: 0, difficult: 0, couture: 0, detail: "Bustle veil for reception" },

    // Others 
    "move-add-hooks-eyes": { simple: 5, intermediate: 0, difficult: 0, couture: 0, detail: "Move or add hooks and eyes" },
    "add-bra-cups": { simple: 20, intermediate: 0, difficult: 0, couture: 0, detail: "Add bra cups for support" },
    "rush-fee": { simple: 25, intermediate: 0, difficult: 0, couture: 0, detail: "Rush service fee" },
    "additional-press-bridal": { simple: 40, intermediate: 0, difficult: 0, couture: 0, detail: "Additional pressing for bridal gown" },
    "additional-press-veil": { simple: 10, intermediate: 0, difficult: 0, couture: 0, detail: "Additional pressing for veil" },
    "hem-single-layer-": { simple: 15, intermediate: 0, difficult: 0, couture: 0, detail: "Hem single layer garment" },
    "hem-slip": { simple: 30, intermediate: 25, difficult: 35, couture: 50, detail: "Hem slip or undergarment" }
};




// ==============================================
// STATE MANAGEMENT LAYER - Application state
// ==============================================

// Global variables to track current selection
let currentAlteration = null;
let currentLevel = null;

// ==============================================
// DOM SELECTORS LAYER - Element references
// ==============================================

const DOM_ELEMENTS = {
    // All select elements organized by category
    selects: {
        bodice: 'alteration-bodice-Select',
        sleeve: 'alteration-sleeve-Select', 
        skirt: 'alteration-skirt-Select',
        bustle: 'alteration-bustle-Select',
        veil: 'alteration-veil-Select',
        others: 'alteration-others-Select',
        level: 'alterationLevel-diff'
    },
    
    // Display elements
    display: {
        description: 'alteration-description',
        typeOrder: 'alteration-type-order',
        levelOrder: 'alteration-level-order',
        price: 'priceCalculation'
    }
};

// Helper function to get all select elements as array
function getAllSelectElements() {
    return Object.values(DOM_ELEMENTS.selects);
}

// Helper function to get only alteration select elements (exclude level)
function getAlterationSelectElements() {
    const { level, ...alterationSelects } = DOM_ELEMENTS.selects;
    return Object.values(alterationSelects);
}

// ==============================================
// CORE BUSINESS LOGIC LAYER - Pure functions
// ==============================================

function getAlterationData(alterationKey) {
    return alterationMap[alterationKey];
}

function getPriceForAlteration(alterationKey, level) {
    const alteration = getAlterationData(alterationKey);
    return alteration ? alteration[level] : null;
}

function isValidSelection(alterationKey, level) {
    if (!alterationKey || !level) return false;
    
    const alteration = getAlterationData(alterationKey);
    if (!alteration) return false;
    
    const price = alteration[level];
    return price !== undefined && price !== null;
}

function canAddToCart(alterationKey, level) {
    if (!isValidSelection(alterationKey, level)) return false;
    
    const price = getPriceForAlteration(alterationKey, level);
    return price !== 0;
}

// ==============================================
// DOM MANIPULATION LAYER - UI updates
// ==============================================

function updateDescription(description) {
    const descriptionElement = document.getElementById(DOM_ELEMENTS.display.description);
    if (descriptionElement) {
        descriptionElement.textContent = description;
    }
}

function updateTypeOrder(alterationKey) {
    const typeOrderElement = document.getElementById(DOM_ELEMENTS.display.typeOrder);
    if (typeOrderElement) {
        typeOrderElement.textContent = `Alteration: ${alterationKey}`;
    }
}

function updateLevelOrder(level, price) {
    const levelOrderElement = document.getElementById(DOM_ELEMENTS.display.levelOrder);
    if (levelOrderElement) {
        if (price === 0) {
            levelOrderElement.textContent = '';
        } else {
            levelOrderElement.textContent = `Level: ${level}`;
        }
    }
}

function updatePrice(price) {
    const priceElement = document.getElementById(DOM_ELEMENTS.display.price);
    if (priceElement) {
        if (price === null || price === undefined) {
            priceElement.textContent = '';
        } else {
            priceElement.textContent = price === 0 ? 'n.a' : `$${price}`;
        }
    }
}


function clearDisplayElements() {
    // Clear description
    const descriptionElement = document.getElementById(DOM_ELEMENTS.display.description);
    if (descriptionElement) {
        descriptionElement.textContent = 'description about alteration on this portion';
    }
    
    // Clear type order
    const typeOrderElement = document.getElementById(DOM_ELEMENTS.display.typeOrder);
    if (typeOrderElement) {
        typeOrderElement.textContent = 'alteration type on this portion';
    }
    
    // Clear level order
    const levelOrderElement = document.getElementById(DOM_ELEMENTS.display.levelOrder);
    if (levelOrderElement) {
        levelOrderElement.textContent = 'alteration level on this portion';
    }
    
    // Clear price (this is the key fix - set to empty string)
    const priceElement = document.getElementById(DOM_ELEMENTS.display.price);
    if (priceElement) {
        priceElement.textContent = '';
    }
}

function resetSelectElements(excludeSelectId = null) {
    const selectIds = getAlterationSelectElements();
    
    selectIds.forEach(selectId => {
        if (selectId !== excludeSelectId) {
            const select = document.getElementById(selectId);
            if (select) {
                select.value = '';
            }
        }
    });
}

// ==============================================
// EVENT HANDLING LAYER - User interactions
// ==============================================

function handleAlterationChange(event) {
    const selectedValue = event.target.value;
    
    if (selectedValue) {
        resetSelectElements(event.target.id);
        currentAlteration = selectedValue;
        updateDisplay();
    } else {
        currentAlteration = null;
        clearDisplay();
    }
}

function handleLevelChange(event) {
    currentLevel = event.target.value;
    updateDisplay();
}

function updateDisplay() {
    if (!currentAlteration || !currentLevel) return;

    const alteration = getAlterationData(currentAlteration);
    if (!alteration) return;

    const price = getPriceForAlteration(currentAlteration, currentLevel);
    
    updateDescription(alteration.detail);
    updateTypeOrder(currentAlteration);
    updateLevelOrder(currentLevel, price);
    updatePrice(price);
}

function clearDisplay() {
    clearDisplayElements();
}

// ==============================================
// FORM ACTIONS LAYER - Button handlers
// ==============================================

function handleAdd() {
    if (!currentAlteration || !currentLevel) {
        alert('Please select both an alteration type and difficulty level');
        return;
    }
    
    const price = getPriceForAlteration(currentAlteration, currentLevel);
    
    if (price === 0) {
        alert('This service is not available at the selected difficulty level');
        return;
    }
    
    // Here you would typically add to cart or process the order
    alert(`Added: ${currentAlteration} (${currentLevel}) - $${price}`);
}

function handleClear(event) {
    // Prevent default form reset if you want full control
    // event.preventDefault(); // Uncomment if needed
    
    // Reset all selects
    getAllSelectElements().forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.value = '';
        }
    });

    // Reset global variables
    currentAlteration = null;
    currentLevel = null;
    
    // Clear display - this now properly clears the price
    clearDisplay();
    
    console.log('Form cleared - price should be empty now');
}

function cancelForm() {
    // Simple back functionality
    window.history.back();
}

// ==============================================
// INITIALIZATION LAYER - Setup and startup
// ==============================================

function initializeEventListeners() {
    // Add event listeners to all alteration selects
    getAlterationSelectElements().forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', handleAlterationChange);
        }
    });

    // Add event listener to level select
    const levelSelect = document.getElementById(DOM_ELEMENTS.selects.level);
    if (levelSelect) {
        levelSelect.addEventListener('change', handleLevelChange);
    }
    
    // Add click event listener to clear button for debugging
    const clearButton = document.querySelector('button[type="reset"]');
    if (clearButton) {
        clearButton.addEventListener('click', function(e) {
            console.log('Clear button clicked');
            // Let handleClear() handle everything
        });
    }
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    
    // Optional: Set initial state
    clearDisplayElements();
});
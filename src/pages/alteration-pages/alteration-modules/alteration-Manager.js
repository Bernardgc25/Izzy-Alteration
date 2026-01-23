/**
 * Main alteration manager module that handles the price calculation and display logic
 * This module is shared across all HTML files
 */

export function initializeAlterationManager(alterationMaps) {
    // Get all alteration select elements (they have ids ending with 'Select')
    const alterationSelects = document.querySelectorAll('select[id$="Select"]');
    const difficultySelect = document.getElementById('alterationLevel-diff');
    
    // Get display elements
    const priceElement = document.getElementById('priceCalculation');
    const noteElement = document.getElementById('alteration-note');
    const descriptionElement = document.getElementById('alteration-description');
    const customerRequestElement = document.getElementById('alteration-customer-request');
    const typeElement = document.getElementById('alteration-type');
    const levelElement = document.getElementById('alteration-level');
    
    // Current selected values
    let selectedAlteration = null;
    let selectedDifficulty = null;
    
    /**
     * Reset other alteration selects when one is selected
     * This ensures only one alteration can be selected at a time
     */
    function resetOtherSelects(currentSelect) {
        alterationSelects.forEach(select => {
            if (select !== currentSelect && select.id !== 'alterationLevel-diff') {
                select.value = '';
            }
        });
    }
    
    /**
     * Find the category for a given alteration value
     * More robust implementation that searches through all categories
     */
    function findCategory(alterationValue) {
        if (!alterationValue) return null;
        
        // Search through all categories
        for (const category in alterationMaps) {
            if (alterationMaps[category][alterationValue]) {
                return category;
            }
        }
        
        // If not found directly, try to find by partial match
        // This handles cases where the alteration might be nested differently
        const parts = alterationValue.split('-');
        
        // Try to find category by building up from parts
        for (let i = parts.length - 1; i >= 1; i--) {
            const potentialCategory = parts.slice(0, i).join('-');
            if (alterationMaps[potentialCategory] && 
                alterationMaps[potentialCategory][alterationValue]) {
                return potentialCategory;
            }
        }
        
        return null;
    }
    
    /**
     * Calculate price based on alteration and difficulty
     */
    function calculatePrice(alterationValue, difficulty) {
        if (!alterationValue || !difficulty) return 0;
        
        const category = findCategory(alterationValue);
        
        if (!category || 
            !alterationMaps[category] || 
            !alterationMaps[category][alterationValue]) {
            console.warn(`Alteration not found: ${alterationValue}`);
            return 0;
        }
        
        const alterationData = alterationMaps[category][alterationValue];
        
        // Check if the difficulty exists and is a valid number
        if (typeof alterationData[difficulty] !== 'number' || 
            alterationData[difficulty] <= 0) {
            return 0;
        }
        
        return alterationData[difficulty];
    }
    
    /**
     * Get alteration details for display
     */
    function getAlterationDetails(alterationValue) {
        const category = findCategory(alterationValue);
        
        if (!category || 
            !alterationMaps[category] || 
            !alterationMaps[category][alterationValue]) {
            return { detail: '', price: 0 };
        }
        
        return alterationMaps[category][alterationValue];
    }
    
    /**
     * Update the display based on current selections
     */
    function updateDisplay() {
        // Clear all displays initially
        priceElement.textContent = '';
        noteElement.textContent = '';
        descriptionElement.textContent = '';
        customerRequestElement.textContent = '';
        typeElement.textContent = '';
        levelElement.textContent = '';
        
        // Validate selections
        if (!selectedAlteration || !selectedDifficulty) {
            return;
        }
        
        const price = calculatePrice(selectedAlteration, selectedDifficulty);
        const alterationData = getAlterationDetails(selectedAlteration);
        
        if (price > 0) {
            // Update price display
            priceElement.textContent = `$${price.toFixed(2)}`;
            
            // Always display note when price > 0
            noteElement.textContent = '• Prices are determined by the complexity and the specific requirements of the customer request.';
            
            // Update description
            descriptionElement.textContent = `• ${alterationData.detail || ''}`;
            
            // Update customer request based on difficulty level
            if (selectedDifficulty === 'intermediate') {
                customerRequestElement.textContent = '• plus (1) customer-requested modification';
            } else if (selectedDifficulty === 'difficult') {
                customerRequestElement.textContent = '• plus (2) customer-requested modification';
            }
            
            // Update order summary
            typeElement.textContent = `Alteration type: ${selectedAlteration}`;
            levelElement.textContent = `Alteration level: ${selectedDifficulty}`;
        } else {
            // Price is 0 or not found
            priceElement.textContent = 'n/a';
            noteElement.textContent = ' '; //empty note when price is n/a
        }
    }
    
    /**
     * Event handler for alteration selection
     */
    function handleAlterationChange(event) {
        const value = event.target.value;
        
        if (value) {
            // Only one alteration can be selected at a time
            resetOtherSelects(event.target);
            selectedAlteration = value;
        } else {
            selectedAlteration = null;
        }
        
        updateDisplay();
    }
    
    /**
     * Event handler for difficulty selection
     */
    function handleDifficultyChange(event) {
        selectedDifficulty = event.target.value;
        updateDisplay();
    }
    
    /**
     * Initialize all event listeners
     */
    function initializeEventListeners() {
        // Set up event listeners for all alteration selects
        alterationSelects.forEach(select => {
            if (select.id !== 'alterationLevel-diff') {
                select.addEventListener('change', handleAlterationChange);
            }
        });
        
        // Set up event listener for difficulty select
        if (difficultySelect) {
            difficultySelect.addEventListener('change', handleDifficultyChange);
        }
    }
    
    /**
     * Reset all selections and display
     */
    function resetAll() {
        selectedAlteration = null;
        selectedDifficulty = null;
        
        alterationSelects.forEach(select => {
            select.value = '';
        });
        
        if (difficultySelect) {
            difficultySelect.value = '';
        }
        
        updateDisplay();
    }
    
    // Initialize the manager
    initializeEventListeners();
    
    // Expose reset function for external use
    return {
        resetAll
    };
}
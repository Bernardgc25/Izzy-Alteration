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
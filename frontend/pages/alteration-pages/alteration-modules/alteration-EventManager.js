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
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
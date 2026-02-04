/**
 * measurement-state-manager.js
 * Handles application state management and persistence
 */

import { MEASUREMENT_CONFIG } from './measurement-Constants.js';

export class StateManager {
    constructor() {
        this.state = {
            measurements: new Map(),
            formValues: {},
            lastSaved: null,
            viewMode: 'desktop'
        };
    }

    /**
     * Save measurement to state
     * @param {string} id - Measurement ID
     * @param {string} value - Measurement value
     * @param {string} label - Measurement label
     */
    saveMeasurement(id, value, label) {
        this.state.measurements.set(id, {
            value,
            label: label.replace(':', '').trim(),
            timestamp: new Date().toISOString()
        });
        
        this.state.lastSaved = new Date().toISOString();
    }

    /**
     * Get all measurements
     * @returns {Map} Measurements map
     */
    getMeasurements() {
        return this.state.measurements;
    }

    /**
     * Clear all measurements
     */
    clearMeasurements() {
        this.state.measurements.clear();
        this.state.formValues = {};
        this.state.lastSaved = null;
    }

    /**
     * Save form state
     * @param {Object} formData - Form data to save
     */
    saveFormState(formData) {
        this.state.formValues = formData;
        this.state.lastSaved = new Date().toISOString();
        this.saveToStorage();
    }

    /**
     * Load form state
     * @returns {Object} Saved form state
     */
    loadFormState() {
        return this.loadFromStorage();
    }

    /**
     * Save state to localStorage
     */
    saveToStorage() {
        try {
            const serializedState = {
                measurements: Array.from(this.state.measurements.entries()),
                formValues: this.state.formValues,
                lastSaved: this.state.lastSaved
            };
            
            localStorage.setItem(
                MEASUREMENT_CONFIG.storageKeys.measurements,
                JSON.stringify(serializedState)
            );
        } catch (error) {
            console.error('Failed to save state to storage:', error);
        }
    }

    /**
     * Load state from localStorage
     * @returns {Object} Loaded state
     */
    loadFromStorage() {
        try {
            const savedState = localStorage.getItem(
                MEASUREMENT_CONFIG.storageKeys.measurements
            );
            
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                this.state.measurements = new Map(parsedState.measurements);
                this.state.formValues = parsedState.formValues;
                this.state.lastSaved = parsedState.lastSaved;
                return parsedState;
            }
        } catch (error) {
            console.error('Failed to load state from storage:', error);
        }
        
        return null;
    }

    /**
     * Clear stored state
     */
    clearStorage() {
        try {
            localStorage.removeItem(MEASUREMENT_CONFIG.storageKeys.measurements);
            localStorage.removeItem(MEASUREMENT_CONFIG.storageKeys.formState);
            this.clearMeasurements();
        } catch (error) {
            console.error('Failed to clear storage:', error);
        }
    }

    /**
     * Export state as JSON
     * @returns {string} JSON string
     */
    exportState() {
        return JSON.stringify({
            measurements: Array.from(this.state.measurements.entries()),
            formValues: this.state.formValues,
            lastSaved: this.state.lastSaved,
            exportDate: new Date().toISOString()
        }, null, 2);
    }

    /**
     * Import state from JSON
     * @param {string} jsonString - JSON state string
     */
    importState(jsonString) {
        try {
            const importedState = JSON.parse(jsonString);
            
            if (importedState.measurements) {
                this.state.measurements = new Map(importedState.measurements);
            }
            
            if (importedState.formValues) {
                this.state.formValues = importedState.formValues;
            }
            
            this.state.lastSaved = importedState.lastSaved;
            this.saveToStorage();
            
            return true;
        } catch (error) {
            console.error('Failed to import state:', error);
            return false;
        }
    }

    /**
     * Get state statistics
     * @returns {Object} State statistics
     */
    getStats() {
        return {
            totalMeasurements: this.state.measurements.size,
            lastSaved: this.state.lastSaved,
            hasUnsavedChanges: this.hasUnsavedChanges()
        };
    }

    /**
     * Check if there are unsaved changes
     * @returns {boolean} True if unsaved changes exist
     */
    hasUnsavedChanges() {
        // Implementation depends on your change tracking logic
        return false;
    }
}
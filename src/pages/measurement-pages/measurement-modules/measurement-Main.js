/**
 * measurement-main.js
 * Main entry point - coordinates all modules and handles initialization
 */

// Import modules
import { measurementDataMap } from './measurement-DataMaps.js';
import { MEASUREMENT_CONFIG } from './measurement-Constants.js';
import { MeasurementValidator } from './measurement-Validation.js';
import { GuideManager } from './measurement-Guide-Manager.js';
import { SummaryManager } from './measurement-Summary-Manager.js';
import { FormManager } from './measurement-Form-Manager.js';
import { StateManager } from './measurement-State-Manager.js';

// Global app instance
let measurementApp = null;

class MeasurementApp {
    constructor() {
        this.managers = {
            guide: null,
            summary: null,
            form: null,
            validator: null,
            state: null
        };
        
        this.isMobileView = this.checkMobileView();
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        const form = document.getElementById('measurement-form');
        if (!form) {
            console.error('Measurement form not found');
            return;
        }

        const gender = form.dataset.gender;
        
        // Initialize managers in dependency order
        this.initializeManagers(gender, form);
        
        // Setup window resize listener
        this.setupWindowResizeListener();
        
        // Log initialization
        this.logInitialization(gender);
    }

    /**
     * Initialize all managers
     */
    initializeManagers(gender, form) {
        // State Manager
        this.managers.state = new StateManager();
        
        // Summary Manager
        this.managers.summary = new SummaryManager();
        
        // Guide Manager
        this.managers.guide = new GuideManager(measurementDataMap);
        this.managers.guide.initialize(gender, this.isMobileView);
        
        // Validator
        this.managers.validator = new MeasurementValidator(form);
        
        // Form Manager
        this.managers.form = new FormManager(
            this.managers.validator,
            this.managers.summary,
            this.managers.guide
        );
        this.managers.form.initialize(this.isMobileView);
        
        // Load saved state
        this.loadSavedState();
    }

    /**
     * Check if current view is mobile
     */
    checkMobileView() {
        return window.innerWidth <= MEASUREMENT_CONFIG.breakpoints.tablet;
    }

    /**
     * Setup window resize listener
     */
    setupWindowResizeListener() {
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobileView;
            this.isMobileView = this.checkMobileView();
            
            // Reinitialize guide manager if view mode changed
            if (wasMobile !== this.isMobileView) {
                const gender = document.getElementById('measurement-form')?.dataset.gender;
                if (gender) {
                    this.managers.guide.initialize(gender, this.isMobileView);
                }
            }
        });
    }

    /**
     * Load saved state from storage
     */
    loadSavedState() {
        const savedState = this.managers.state.loadFormState();
        if (savedState) {
            console.log('Loaded saved state:', savedState);
            // Apply saved state to form
            this.applySavedState(savedState);
        }
    }

    /**
     * Apply saved state to form
     */
    applySavedState(savedState) {
        if (savedState.formValues) {
            Object.entries(savedState.formValues).forEach(([field, value]) => {
                const element = document.getElementById(field);
                if (element) {
                    element.value = value;
                }
            });
        }
        
        if (savedState.measurements) {
            savedState.measurements.forEach(([id, data]) => {
                this.managers.summary.addMeasurement(id, data.value, data.label);
            });
        }
    }

    /**
     * Log initialization message
     */
    logInitialization(gender) {
        console.log(`Measurement App initialized for ${gender} (${this.isMobileView ? 'Mobile/Tablet' : 'Desktop'} view)`);
        console.log('Managers initialized:', Object.keys(this.managers));
    }

    /**
     * Get application instance
     */
    static getInstance() {
        if (!measurementApp) {
            measurementApp = new MeasurementApp();
        }
        return measurementApp;
    }

    /**
     * Handle save measurements (public API)
     */
    handleSaveMeasurements() {
        this.managers.form.handleSaveMeasurements();
    }

    /**
     * Handle reset form (public API)
     */
    handleResetForm() {
        this.managers.form.handleResetForm();
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    measurementApp = MeasurementApp.getInstance();
    
    // Expose public methods to global scope
    window.handleSaveMeasurements = () => measurementApp.handleSaveMeasurements();
    window.handleResetForm = () => measurementApp.handleResetForm();
});

// Export for testing
export { MeasurementApp };
/**
 * Main Application Coordinator
 * Orchestrates interactions between modules
 */
import { MeasurementValidator } from './measurement-Validator.js';
import { MeasurementManager } from './measurement-Manager.js';
import { ViewHandler } from './measurement-ViewHandler.js';

class MeasurementApp {
    constructor() {
        this.manager = null;
        this.validator = null;
        this.viewHandler = null;
        this.debounceTimers = new Map();
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
        const isMobileView = this.checkMobileView();
        
        // Initialize modules
        this.manager = new MeasurementManager().initialize(gender);
        this.validator = new MeasurementValidator(form);
        this.viewHandler = new ViewHandler(gender, isMobileView);
        
        // Setup initial state
        this.setupInitialState();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Bind global functions
        this.bindGlobalFunctions();
        
        this.logInitialization();
    }

    /**
     * Check if current view is mobile
     */
    checkMobileView() {
        return window.innerWidth <= 992;
    }

    /**
     * Setup initial application state
     */
    setupInitialState() {
        this.manager.setupDateField();
        
        // Force initial image load for desktop view
        if (!this.viewHandler.isMobileView) {
            setTimeout(() => {
                this.viewHandler.setupDesktopGuideImage();
            }, 100);
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        this.setupFormInputListeners();
        this.setupButtonListeners();
        this.setupGuideListeners();
    }

    /**
     * Setup form input listeners
     */
    setupFormInputListeners() {
        // Client name validation
        const nameField = document.getElementById('client-name');
        if (nameField) {
            nameField.addEventListener('input', () => {
                this.debounceValidation('client-name');
            });
            nameField.addEventListener('blur', () => {
                this.validator.validateField('client-name');
            });
        }

        // Date field validation
        const dateField = document.getElementById('save-date');
        if (dateField) {
            dateField.addEventListener('change', () => {
                this.validator.validateField('save-date');
            });
        }

        // Gender-specific fields
        if (this.manager.gender === 'male') {
            this.setupFieldListener('size-number');
        } else {
            this.setupFieldListener('cupSize');
        }

        // Measurement inputs
        this.setupMeasurementInputListeners();
    }

    /**
     * Setup field change listener
     */
    setupFieldListener(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', () => {
                this.validator.validateField(fieldId);
            });
        }
    }

    /**
     * Setup measurement input listeners
     */
    setupMeasurementInputListeners() {
        const inputs = document.querySelectorAll('.measurement-input');
        
        inputs.forEach(input => {
            // Debounced input event
            input.addEventListener('input', (e) => {
                this.debouncedInputHandler(e);
            });
            
            // Focus event for showing guide
            input.addEventListener('focus', (e) => {
                this.handleInputFocus(e);
            });
            
            // Blur event for validation
            input.addEventListener('blur', (e) => {
                this.validator.validateField(e.target.id);
            });
        });
    }

    /**
     * Setup button listeners
     */
    setupButtonListeners() {
        // Save button
        const saveBtn = document.getElementById('save-measurements');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.handleSaveMeasurements();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('reset-form');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.handleResetForm();
            });
        }

        // Print button (handled by viewHandler)
        this.viewHandler.setupPrintButtonListener(() => {
            this.manager.printSummary();
        });
    }

    /**
     * Setup guide-related listeners
     */
    setupGuideListeners() {
        // Eye icon listeners
        this.viewHandler.setupEyeIconListeners((measurementKey) => {
            this.viewHandler.showFloatingGuide(measurementKey);
        });

        // Guide close listeners
        const closeBtn = document.getElementById('close-floating-guide');
        const overlay = document.getElementById('floating-guide-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.viewHandler.hideFloatingGuide();
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.viewHandler.hideFloatingGuide();
            });
        }

        // Escape key listener
        this.viewHandler.setupEscapeKeyListener(() => {
            this.viewHandler.hideFloatingGuide();
        });

        // Window resize listener
        this.viewHandler.setupWindowResizeListener((isMobileView) => {
            // Handle view change if needed
            console.log(`View changed to: ${isMobileView ? 'Mobile' : 'Desktop'}`);
        });
    }

    /**
     * Debounced input handler
     */
    debouncedInputHandler(event) {
        const input = event.target;
        const timerId = input.id;
        
        clearTimeout(this.debounceTimers.get(timerId));
        
        const timer = setTimeout(() => {
            const label = input.parentElement.querySelector('.label-text')?.textContent || '';
            this.manager.saveMeasurement(input.id, input.value, label);
            this.validator.validateField(input.id);
        }, 150);
        
        this.debounceTimers.set(timerId, timer);
    }

    /**
     * Handle input focus
     */
    handleInputFocus(event) {
        const input = event.target;
        const measurementKey = input.dataset.measurement;
        
        if (measurementKey) {
            this.viewHandler.showMeasurementGuide(measurementKey);
        }
        
        this.validator.clearSingleError(input.id);
    }

    /**
     * Debounced field validation
     */
    debounceValidation(fieldId) {
        clearTimeout(this.debounceTimers.get(fieldId));
        
        const timer = setTimeout(() => {
            this.validator.validateField(fieldId);
        }, 150);
        
        this.debounceTimers.set(fieldId, timer);
    }

    /**
     * Handle save measurements
     */
    handleSaveMeasurements() {
        if (!this.validator.validateAll()) {
            this.viewHandler.focusFirstErrorField();
            this.viewHandler.showValidationErrorAlert();
            return;
        }

        const formData = this.manager.getFormData();
        this.viewHandler.showSuccessMessage(formData);
        
        // Log data (in production, send to server)
        console.log('Measurement data:', JSON.stringify(formData, null, 2));
    }

    /**
     * Handle reset form
     */
    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            // Clear form
            const form = document.getElementById('measurement-form');
            if (form) form.reset();
            
            // Reset manager data
            this.manager.resetFormData();
            
            // Reset date field
            this.manager.setupDateField();
            
            // Clear validation errors
            this.validator.clearErrors();
            
            // Hide floating guide
            this.viewHandler.hideFloatingGuide();
        }
    }

    /**
     * Bind global functions for HTML onclick handlers
     */
    bindGlobalFunctions() {
        window.handleSaveMeasurements = () => this.handleSaveMeasurements();
        window.handleResetForm = () => this.handleResetForm();
    }

    /**
     * Log initialization message
     */
    logInitialization() {
        console.log(`Measurement App initialized for ${this.manager.gender}`);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MeasurementApp();
});
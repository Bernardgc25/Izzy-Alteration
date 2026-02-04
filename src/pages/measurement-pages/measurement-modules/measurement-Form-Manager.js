/**
 * measurement-form-manager.js
 * Handles form interactions, input events, and data collection
 */

import { MEASUREMENT_CONFIG, CSS_CLASSES, ELEMENT_IDS } from './measurement-Constants.js';

export class FormManager {
    constructor(validator, summaryManager, guideManager) {
        this.validator = validator;
        this.summaryManager = summaryManager;
        this.guideManager = guideManager;
        this.debounceTimers = new Map();
        this.isMobileView = false;
        this.form = null;
    }

    /**
     * Initialize form manager
     * @param {boolean} isMobileView - Whether in mobile view
     */
    initialize(isMobileView) {
        this.isMobileView = isMobileView;
        this.form = document.getElementById(ELEMENT_IDS.form);
        
        this.setupFormFields();
        this.setupDateField();
        this.setupEventListeners();
    }

    /**
     * Setup form fields with initial values
     */
    setupFormFields() {
        this.setupMeasurementInputs();
        this.setupGenderSpecificFields();
        this.setupDateField();
    }

    /**
     * Setup measurement input fields
     */
    setupMeasurementInputs() {
        const inputs = document.querySelectorAll(`.${CSS_CLASSES.measurementInput}`);
        
        inputs.forEach(input => {
            this.setupInputEvents(input);
        });
    }

    /**
     * Setup gender-specific fields
     */
    setupGenderSpecificFields() {
        const gender = this.form?.dataset.gender;
        const fieldId = gender === 'male' ? 'size-number' : 'cupSize';
        const field = document.getElementById(fieldId);
        
        if (field) {
            field.addEventListener('change', () => {
                this.validator.validateField(fieldId);
            });
        }
    }

    /**
     * Setup date field with current date
     */
    setupDateField() {
        const dateField = document.getElementById(ELEMENT_IDS.saveDate);
        if (!dateField) return;
        
        const today = new Date().toISOString().split('T')[0];
        dateField.value = today;
        dateField.max = today;
        
        dateField.addEventListener('change', () => {
            this.validator.validateField('save-date');
        });
    }

    /**
     * Setup event listeners for form interactions
     */
    setupEventListeners() {
        this.setupClientNameValidation();
        this.setupEyeIconListeners();
        this.setupButtonListeners();
        this.setupEscapeKeyListener();
    }

    /**
     * Setup client name validation
     */
    setupClientNameValidation() {
        const nameField = document.getElementById(ELEMENT_IDS.clientName);
        if (!nameField) return;

        nameField.addEventListener('input', () => {
            this.debouncedValidation('client-name');
        });
        
        nameField.addEventListener('blur', () => {
            this.validator.validateField('client-name');
        });
    }

    /**
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners() {
        const eyeIcons = document.querySelectorAll(`.${CSS_CLASSES.eyeIcon}`);
        
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleEyeIconClick(e);
            });
        });
    }

    /**
     * Setup button event listeners
     */
    setupButtonListeners() {
        const printBtn = document.getElementById(ELEMENT_IDS.printButton);
        const submitBtn = document.getElementById(ELEMENT_IDS.submitButton);
        const resetBtn = document.getElementById(ELEMENT_IDS.resetButton);
        
        if (printBtn) {
            printBtn.addEventListener('click', () => this.summaryManager.printSummary());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.handleSaveMeasurements());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.handleResetForm());
        }
    }

    /**
     * Setup escape key listener for closing guides
     */
    setupEscapeKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.guideManager.hideFloatingGuide();
            }
        });
    }

    /**
     * Setup input event handlers
     */
    setupInputEvents(input) {
        input.addEventListener('input', (e) => {
            this.debouncedInputHandler(e);
        });
        
        input.addEventListener('focus', (e) => {
            this.handleInputFocus(e);
        });
        
        input.addEventListener('blur', (e) => {
            this.handleInputBlur(e);
        });
    }

    /**
     * Handle debounced input
     */
    debouncedInputHandler(event) {
        const input = event.target;
        const timerId = input.id;
        
        clearTimeout(this.debounceTimers.get(timerId));
        
        const timer = setTimeout(() => {
            const label = input.parentElement.querySelector('.label-text')?.textContent || '';
            this.summaryManager.addMeasurement(input.id, input.value, label);
            this.validator.validateField(input.id);
        }, MEASUREMENT_CONFIG.ui.debounceDelay);
        
        this.debounceTimers.set(timerId, timer);
    }

    /**
     * Handle input focus
     */
    handleInputFocus(event) {
        const input = event.target;
        const measurementKey = input.dataset.measurement;
        
        if (measurementKey) {
            this.guideManager.updateGuideText(measurementKey);
        }
        
        this.validator.clearSingleError(input.id);
    }

    /**
     * Handle input blur
     */
    handleInputBlur(event) {
        this.validator.validateField(event.target.id);
    }

    /**
     * Handle eye icon click
     */
    handleEyeIconClick(event) {
        event.stopPropagation();
        
        const labelElement = event.target.closest('.measurement-label');
        if (!labelElement) return;
        
        const formGroup = labelElement.closest('.form-group');
        if (!formGroup) return;
        
        const inputElement = formGroup.querySelector('.measurement-input');
        if (!inputElement) return;
        
        const measurementKey = inputElement.dataset.measurement;
        if (measurementKey && this.isMobileView) {
            this.guideManager.showFloatingGuide(measurementKey);
        }
    }

    /**
     * Handle save measurements
     */
    handleSaveMeasurements() {
        if (!this.validator.validateAll()) {
            this.showValidationError();
            return;
        }

        const formData = this.collectFormData();
        this.showSuccessMessage(formData);
        
        // In production: Send data to server
        console.log('Measurement data:', JSON.stringify(formData, null, 2));
    }

    /**
     * Handle form reset
     */
    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            this.form.reset();
            this.summaryManager.clear();
            this.validator.clearErrors();
            this.setupDateField();
            this.guideManager.hideFloatingGuide();
        }
    }

    /**
     * Show validation error
     */
    showValidationError() {
        const firstError = document.querySelector(`.${CSS_CLASSES.error}`);
        if (firstError) {
            firstError.focus();
        }
        alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
    }

    /**
     * Show success message
     */
    showSuccessMessage(formData) {
        const message = `
            Measurements saved successfully!
            
            Client: ${formData.name}
            Date: ${formData.date}
            Total Measurements: ${Object.keys(formData.measurements).length}
        `;
        
        alert(message);
    }

    /**
     * Debounced field validation
     */
    debouncedValidation(fieldId) {
        clearTimeout(this.debounceTimers.get(fieldId));
        
        const timer = setTimeout(() => {
            this.validator.validateField(fieldId);
        }, MEASUREMENT_CONFIG.ui.debounceDelay);
        
        this.debounceTimers.set(fieldId, timer);
    }

    /**
     * Collect form data
     */
    collectFormData() {
        if (!this.form) return {};
        
        const formData = new FormData(this.form);
        return {
            name: formData.get('client-name') || '',
            date: formData.get('save-date') || '',
            gender: this.form.dataset.gender,
            sizeNumber: formData.get('size-number') || '',
            cupSize: formData.get('cupSize') || '',
            measurements: Object.fromEntries(this.summaryManager.measurements)
        };
    }
}
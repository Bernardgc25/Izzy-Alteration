/**
 * measurement-Main.js
 * Entry point - coordinates all modules and handles user interactions
 * Only this file should be linked in HTML files
 * REFACTORED: Better separation of concerns and event handling
 */

import { measurementDataMap, getMeasurement } from './measurement-DataMaps.js';
import { MeasurementValidator } from './measurement-Validation.js';
import { MeasurementManager } from './measurement-Manager.js';

// Global app instance
let measurementApp = null;

class MeasurementApp {
    constructor() {
        this.manager = null;
        this.validator = null;
        this.isMobileView = this.checkMobileView();
        this.debounceTimers = new Map();
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        this.setupApp();
        this.bindEventListeners();
        this.logInitialization();
    }

    /**
     * Setup application components
     */
    setupApp() {
        const form = document.getElementById('measurement-form');
        if (!form) {
            console.error('Measurement form not found');
            return;
        }

        const gender = form.dataset.gender;
        
        // Initialize manager and validator
        this.manager = new MeasurementManager().initialize(gender, this.isMobileView);
        this.validator = new MeasurementValidator(form);
        
        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Check if current view is mobile
     */
    checkMobileView() {
        return window.innerWidth <= 992; // Tablet breakpoint
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        this.setupGenderFieldListeners();
        this.setupMeasurementInputListeners();
        this.setupClientNameValidation();
        this.setupFloatingGuideListeners();
        this.setupWindowResizeListener();
    }

    /**
     * Setup gender-specific field listeners
     */
    setupGenderFieldListeners() {
        if (this.manager.gender === 'male') {
            this.setupFieldListener('size-number');
        } else {
            this.setupFieldListener('cupSize');
        }
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
            this.setupInputEvents(input);
        });
        
        this.setupEyeIconListeners();
    }

    /**
     * Setup input event listeners
     */
    setupInputEvents(input) {
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
            this.handleInputBlur(e);
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
        this.showMeasurementGuide(input.dataset.measurement);
        this.validator.clearSingleError(input.id);
    }

    /**
     * Handle input blur
     */
    handleInputBlur(event) {
        this.validator.validateField(event.target.id);
    }

    /**
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners() {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleEyeIconClick(e);
            });
        });
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
            this.showFloatingGuide(measurementKey);
        }
    }

    /**
     * Setup client name validation
     */
    setupClientNameValidation() {
        const nameField = document.getElementById('client-name');
        if (!nameField) return;

        // Debounced input validation
        nameField.addEventListener('input', (e) => {
            this.debouncedValidation('client-name');
        });
        
        // Validate on blur
        nameField.addEventListener('blur', () => {
            this.validator.validateField('client-name');
        });
    }

    /**
     * Debounced field validation
     */
    debouncedValidation(fieldId) {
        clearTimeout(this.debounceTimers.get(fieldId));
        
        const timer = setTimeout(() => {
            this.validator.validateField(fieldId);
        }, 150);
        
        this.debounceTimers.set(fieldId, timer);
    }

    /**
     * Setup floating guide listeners
     */
    setupFloatingGuideListeners() {
        this.setupGuideCloseListeners();
        this.setupEscapeKeyListener();
    }

    /**
     * Setup guide close listeners
     */
    setupGuideCloseListeners() {
        const closeBtn = document.getElementById('close-floating-guide');
        const overlay = document.getElementById('floating-guide-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideFloatingGuide());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.hideFloatingGuide());
        }
    }

    /**
     * Setup escape key listener
     */
    setupEscapeKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideFloatingGuide();
            }
        });
    }

    /**
     * Setup window resize listener
     */
    setupWindowResizeListener() {
        window.addEventListener('resize', () => {
            this.isMobileView = this.checkMobileView();
        });
    }

    /**
     * Bind event listeners for window functions
     */
    bindEventListeners() {
        window.handleSaveMeasurements = () => this.handleSaveMeasurements();
        window.handleResetForm = () => this.handleResetForm();
    }

    /**
     * Display measurement guide
     */
    showMeasurementGuide(measurementKey) {
        const measurement = getMeasurement(this.manager.gender, measurementKey);
        if (!measurement) return;

        // Update guide text
        this.updateGuideText(measurement);
        
        // Update desktop guide image if needed
        if (!this.isMobileView && this.manager) {
            this.manager.updateDesktopGuideImage?.(measurementKey);
        }
    }

    /**
     * Update guide text elements
     */
    updateGuideText(measurement) {
        const elements = {
            'measure-object': measurement.object,
            'measure-definition': measurement.definition,
            'measure-description': measurement.description
        };

        Object.entries(elements).forEach(([id, content]) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = `<strong>${id.split('-')[0].charAt(0).toUpperCase() + id.split('-')[0].slice(1)}:</strong> ${content}`;
            }
        });
    }

    /**
     * Show floating guide for mobile
     */
    showFloatingGuide(measurementKey) {
        const measurement = getMeasurement(this.manager.gender, measurementKey);
        if (!measurement) return;
        
        // Update guide text
        this.showMeasurementGuide(measurementKey);
        
        // Show overlay and guide
        this.showFloatingGuideElements();
        
        // Update mobile guide image
        this.updateMobileGuideImage(measurementKey);
    }

    /**
     * Show floating guide elements
     */
    showFloatingGuideElements() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'block';
        if (floatingGuide) floatingGuide.style.display = 'flex';
    }

    /**
     * Hide floating guide
     */
    hideFloatingGuide() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }

    /**
     * Update mobile guide image
     */
    updateMobileGuideImage(measurementKey) {
        const mobileImages = measurementDataMap.measurements[this.manager.gender];
        if (!mobileImages || !mobileImages[measurementKey]) return;
        
        // Hide all images first
        document.querySelectorAll('.measurement-guide-floating .floating-guide-images img').forEach(img => {
            img.style.display = 'none';
            img.classList.remove('active');
        });
        
        // Show target image
        const imageId = `floating-guide-${measurementKey}`;
        const targetImage = document.getElementById(imageId);
        
        if (targetImage && mobileImages[measurementKey].imageMobile) {
            targetImage.src = mobileImages[measurementKey].imageMobile;
            targetImage.style.display = 'block';
            targetImage.classList.add('active');
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

        const formData = this.manager.getFormData();
        this.showSuccessMessage(formData);
        
        // Log data (in production, send to server)
        console.log('Measurement data:', JSON.stringify(formData, null, 2));
    }

    /**
     * Show validation error
     */
    showValidationError() {
        const firstError = document.querySelector('.error');
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
     * Handle reset form
     */
    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            this.manager.resetAll();
            this.validator.clearErrors();
            this.hideFloatingGuide();
        }
    }

    /**
     * Log initialization message
     */
    logInitialization() {
        console.log(`Measurement App initialized for ${this.manager.gender} (${this.isMobileView ? 'Mobile/Tablet' : 'Desktop'} view)`);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    measurementApp = new MeasurementApp();
});
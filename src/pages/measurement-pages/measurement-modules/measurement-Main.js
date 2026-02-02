/**
* measurement-Main.js
* Entry point - coordinates all modules and handles user interactions
* Only this file should be linked in HTML files
*/

import { MeasurementData } from './measurement-DataMaps.js';
import { MeasurementValidator } from './measurement-Validation.js';
import { MeasurementManager } from './measurement-Manager.js';

// Global app instance (accessible for inline event handlers)
let measurementApp = null;

class MeasurementApp {
    constructor() {
        this.manager = null;
        this.validator = null;
        this.isMobileView = MeasurementData.isMobileView();
        this.initializeApp();
    }

    /**
    * Initializes the application when DOM is loaded
    */
    initializeApp() {
        // Get gender from form data attribute
        const form = document.getElementById('measurement-form');
        if (!form) {
            console.error('Measurement form not found');
            return;
        }

        const gender = form.dataset.gender;
        
        // Initialize modules
        this.manager = new MeasurementManager().initialize(gender, this.isMobileView);
        this.validator = new MeasurementValidator(form);
        
        // Setup all event listeners
        this.setupGlobalEventListeners();
        this.setupMeasurementInputListeners();
        this.setupClientNameValidation();
        this.setupFloatingGuideClose();
        
        // Setup window resize listener to update mobile view state
        window.addEventListener('resize', () => {
            this.isMobileView = MeasurementData.isMobileView();
        });
        
        console.log(`Measurement App initialized for ${gender} (${this.isMobileView ? 'Mobile/Tablet' : 'Desktop'} view)`);
    }

    /**
    * Sets up global event listeners for form interactions
    */
    setupGlobalEventListeners() {
        // Gender-specific field validation on change
        if (this.manager.gender === 'male') {
            const sizeField = document.getElementById('size-number');
            if (sizeField) {
                sizeField.addEventListener('change', () => {
                    this.validator.validateField('size-number');
                });
            }
        } else {
            const cupSizeField = document.getElementById('cupSize');
            if (cupSizeField) {
                cupSizeField.addEventListener('change', () => {
                    this.validator.validateField('cupSize');
                });
            }
        }
    }

    /**
    * Sets up listeners for measurement input fields
    */
    setupMeasurementInputListeners() {
        const inputs = document.querySelectorAll('.measurement-input');
        
        inputs.forEach(input => {
            // Real-time validation on input with debouncing for better performance
            let debounceTimer;
            input.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const label = e.target.parentElement.querySelector('.label-text').textContent;
                    this.manager.saveMeasurement(e.target.id, e.target.value, label);
                    
                    // Validate immediately when user types
                    this.validator.validateField(e.target.id);
                }, 150); // 150ms debounce delay
            });
            
            // Show measurement guide on focus
            input.addEventListener('focus', (e) => {
                this.showMeasurementGuide(e.target.dataset.measurement);
                // Clear any existing error immediately when field is focused
                this.validator.clearSingleError(e.target.id);
            });
            
            // Validate on blur for final check
            input.addEventListener('blur', (e) => {
                // Validate immediately without delay
                this.validator.validateField(e.target.id);
            });
            
            // REMOVED: The event listener that was showing floating guide on click
            // This was causing the floating window to appear unintentionally
            // input.addEventListener('click', (e) => {
            //     if (this.isMobileView) {
            //         this.showFloatingGuide(e.target.dataset.measurement);
            //     }
            // });
        });
        
        // Setup eye icon click listeners for mobile/tablet to show floating guide
        this.setupEyeIconListeners();
    }

    /**
    * Sets up listeners for eye icons to show floating guide on mobile/tablet
    */
    setupEyeIconListeners() {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                
                // Find the associated measurement input
                const labelElement = e.target.closest('.measurement-label');
                if (!labelElement) return;
                
                // Find the measurement input associated with this label
                const formGroup = labelElement.closest('.form-group');
                if (!formGroup) return;
                
                const inputElement = formGroup.querySelector('.measurement-input');
                if (!inputElement) return;
                
                // Show floating guide for this measurement
                const measurementKey = inputElement.dataset.measurement;
                if (measurementKey && this.isMobileView) {
                    this.showFloatingGuide(measurementKey);
                }
            });
        });
    }

    /**
    * Sets up close functionality for floating guide
    */
    setupFloatingGuideClose() {
        const closeBtn = document.getElementById('close-floating-guide');
        const overlay = document.getElementById('floating-guide-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideFloatingGuide();
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.hideFloatingGuide();
            });
        }
        
        // Also close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideFloatingGuide();
            }
        });
    }

    /**
    * Sets up real-time validation for client name field
    */
    setupClientNameValidation() {
        const nameField = document.getElementById('client-name');
        if (nameField) {
            // Validate on every keystroke with debouncing
            let debounceTimer;
            nameField.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.validator.validateField('client-name');
                }, 150);
            });
            
            // Validate on blur for final check
            nameField.addEventListener('blur', (e) => {
                this.validator.validateField('client-name');
            });
        }
    }

    /**
    * Displays measurement guide for selected measurement
    * @param {string} measurementKey - Key of the measurement to show guide for
    */
    showMeasurementGuide(measurementKey) {
        const definition = MeasurementData.measurementDefinitions[measurementKey];
        if (!definition) return;

        // Update guide text elements
        document.getElementById('measure-object').innerHTML = 
            `<strong>Object:</strong> ${definition.object}`;
        document.getElementById('measure-definition').innerHTML = 
            `<strong>Definition:</strong> ${definition.definition}`;
        document.getElementById('measure-description').innerHTML = 
            `<strong>How to measure:</strong> ${definition.description}`;
            
        // If in desktop view, also update the desktop guide image
        if (!this.isMobileView && this.manager) {
            this.manager.updateDesktopGuideImage(measurementKey);
        }
    }
    
    /**
    * Shows floating guide for mobile/tablet
    * @param {string} measurementKey - Key of the measurement to show guide for
    */
    showFloatingGuide(measurementKey) {
        const definition = MeasurementData.measurementDefinitions[measurementKey];
        if (!definition) return;
        
        // Update guide text
        this.showMeasurementGuide(measurementKey);
        
        // Show overlay and floating guide
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'block';
        if (floatingGuide) floatingGuide.style.display = 'flex';
        
        // Update mobile guide image
        this.updateMobileGuideImage(measurementKey);
    }
    
    /**
    * Hides floating guide
    */
    hideFloatingGuide() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }
    
    /**
     * Updates mobile guide image based on measurement
     * @param {string} measurementKey - Measurement key
     */
    updateMobileGuideImage(measurementKey) {
        const mobileImages = MeasurementData.guideImagesMobile[this.manager.gender];
        if (!mobileImages || !mobileImages[measurementKey]) return;
        
        // Hide all images first
        const guideImages = document.querySelectorAll('.measurement-guide-floating .guide-images img');
        guideImages.forEach(img => {
            img.style.display = 'none';
            img.classList.remove('active');
        });
        
        // Show the relevant image
        const imageId = `floating-guide-${measurementKey}`;
        const targetImage = document.getElementById(imageId);
        
        if (targetImage) {
            targetImage.src = mobileImages[measurementKey];
            targetImage.style.display = 'block';
            targetImage.classList.add('active');
        }
        
        // Update floating guide text elements
        const definition = MeasurementData.measurementDefinitions[measurementKey];
        if (!definition) return;
        
        // Update floating guide text elements
        document.getElementById('floating-measure-object').innerHTML = 
            `<strong>Object:</strong> ${definition.object}`;
        document.getElementById('floating-measure-definition').innerHTML = 
            `<strong>Definition:</strong> ${definition.definition}`;
        document.getElementById('floating-measure-description').innerHTML = 
            `<strong>How to measure:</strong> ${definition.description}`;
    }

    /**
    * Handles save measurements button click
    * Validates form and shows success message
    */
    handleSaveMeasurements() {
        if (!this.validator.validateAll()) {
            // Highlight first error field
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
            return;
        }

        // Get form data
        const formData = this.manager.getFormData();
        
        // In production, this would send to a server
        console.log('Measurement data ready for database:', JSON.stringify(formData, null, 2));
        
        // Show success message
        alert('Measurements saved successfully!\n\nClient: ' + formData.name + 
            '\nDate: ' + formData.date + 
            '\nTotal Measurements: ' + Object.keys(formData.measurements).length);
    }

    /**
    * Handles reset form button click
    * Confirms with user before resetting
    */
    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            this.manager.resetAll();
            this.validator.clearErrors();
            this.hideFloatingGuide();
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    measurementApp = new MeasurementApp();
});

// Global functions for inline event handlers (required by HTML)
window.handleSaveMeasurements = function() {
    if (measurementApp) measurementApp.handleSaveMeasurements();
};

window.handleResetForm = function() {
    if (measurementApp) measurementApp.handleResetForm();
};
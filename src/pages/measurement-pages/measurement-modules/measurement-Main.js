/**
 * measurement-Main.js
 * Entry point for the measurement functionality
 * Initializes and coordinates other modules with responsive behavior
 */

import { MeasurementData } from './measurement-DataMaps.js';
import { MeasurementValidator } from './measurement-Validation.js';
import { MeasurementManager } from './measurement-Manager.js';

// Global variables accessible to onclick handlers
window.measurementManager = null;
window.measurementValidator = null;

/**
 * Main initialization function
 */
function initializeMeasurementSystem() {
    // Get form element and gender
    const form = document.getElementById('measurement-form');
    if (!form) {
        console.error('Measurement form not found');
        return;
    }
    
    const gender = form.dataset.gender || 'male';
    const isMobileView = MeasurementData.isMobileView();
    
    // Initialize validator
    window.measurementValidator = new MeasurementValidator(form);
    
    // Initialize manager
    window.measurementManager = new MeasurementManager(MeasurementData);
    window.measurementManager.initialize(gender, isMobileView);
    
    // Set up event listeners
    setupEventListeners();
    
    // Set current date
    setCurrentDate();
    
    console.log(`Measurement System initialized for ${gender} (${isMobileView ? 'Mobile' : 'Desktop'} view)`);
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.measurementManager) {
                window.measurementManager.handleResize();
            }
        }, 250);
    });
    
    // Measurement input fields
    const measurementInputs = document.querySelectorAll('.measurement-input');
    measurementInputs.forEach(input => {
        // Input event for real-time validation and summary update
        input.addEventListener('input', (e) => {
            if (window.measurementValidator) {
                window.measurementValidator.validateField(e.target.id);
            }
            if (window.measurementManager) {
                window.measurementManager.updateSummary();
            }
        });
        
        // Click event for desktop zoom reset
        input.addEventListener('click', (e) => {
            if (window.measurementManager && !MeasurementData.isMobileView()) {
                window.measurementManager.resetZoom();
            }
        });
        
        // Focus event for additional validation
        input.addEventListener('focus', (e) => {
            if (window.measurementManager) {
                window.measurementManager.handleInputFocus(e.target);
            }
        });
        
        // Blur event for final validation
        input.addEventListener('blur', (e) => {
            if (window.measurementValidator) {
                window.measurementValidator.validateField(e.target.id);
            }
        });
    });
    
    // Name field validation
    const nameField = document.getElementById('client-name');
    if (nameField) {
        nameField.addEventListener('input', (e) => {
            if (window.measurementValidator) {
                window.measurementValidator.validateField('client-name');
            }
            if (window.measurementManager) {
                window.measurementManager.updateSummary();
            }
        });
        
        nameField.addEventListener('blur', (e) => {
            if (window.measurementValidator) {
                window.measurementValidator.validateField('client-name');
            }
        });
    }
    
    // Date field
    const dateField = document.getElementById('save-date');
    if (dateField) {
        dateField.addEventListener('change', (e) => {
            if (window.measurementValidator) {
                window.measurementValidator.validateField('save-date');
            }
        });
    }
    
    // Size/cup size fields
    const sizeField = document.getElementById('size-number');
    const cupSizeField = document.getElementById('cupSize');
    
    if (sizeField) {
        sizeField.addEventListener('change', () => {
            if (window.measurementManager) {
                window.measurementManager.updateSummary();
            }
        });
    }
    
    if (cupSizeField) {
        cupSizeField.addEventListener('change', () => {
            if (window.measurementManager) {
                window.measurementManager.updateSummary();
            }
        });
    }
    
    // Eye icons for mobile/tablet
    const eyeIcons = document.querySelectorAll('.fa-regular.fa-eye');
    eyeIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.measurementManager && MeasurementData.isMobileView()) {
                window.measurementManager.showMobileGuide(e.target);
            }
        });
    });
    
    // Close button for floating guide
    const closeGuideBtn = document.getElementById('close-floating-guide');
    if (closeGuideBtn) {
        closeGuideBtn.addEventListener('click', () => {
            if (window.measurementManager) {
                window.measurementManager.hideMobileGuide();
            }
        });
    }
    
    // Overlay click to close guide
    const overlay = document.getElementById('floating-guide-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (window.measurementManager) {
                window.measurementManager.hideMobileGuide();
            }
        });
    }
}

/**
 * Set current date in date field
 */
function setCurrentDate() {
    const dateField = document.getElementById('save-date');
    if (dateField) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateField.value = formattedDate;
        dateField.min = '1900-01-01';
        dateField.max = formattedDate;
    }
}

/**
 * Handle save measurements button click
 * This function is called from onclick attribute in HTML
 */
function handleSaveMeasurements() {
    if (!window.measurementValidator || !window.measurementManager) {
        alert('Measurement system not initialized');
        return;
    }
    
    // Validate all fields
    const isValid = window.measurementValidator.validateAll();
    
    if (isValid) {
        // Get all form data
        const formData = window.measurementManager.getFormData();
        
        // In a real implementation, this would send data to an API
        // For now, show success message
        alert('Measurements saved successfully!\n\n' +
              `Name: ${formData.name}\n` +
              `Date: ${formData.date}\n` +
              `Total Measurements: ${Object.keys(formData.measurements).length}`);
        
        // You would typically send to an API like:
        // fetch('/api/measurements', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:', data))
        // .catch(error => console.error('Error:', error));
    } else {
        alert('Please fix validation errors before saving.');
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/**
 * Handle reset form button click
 * This function is called from onclick attribute in HTML
 */
function handleResetForm() {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
        if (window.measurementManager) {
            window.measurementManager.resetForm();
        }
        if (window.measurementValidator) {
            window.measurementValidator.clearErrors();
        }
    }
}

/**
 * Handle print summary button click
 * This function is called from event listener
 */
function handlePrintSummary() {
    if (window.measurementManager) {
        window.measurementManager.printSummary();
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMeasurementSystem);
} else {
    initializeMeasurementSystem();
}

// Export functions for global access
window.handleSaveMeasurements = handleSaveMeasurements;
window.handleResetForm = handleResetForm;
window.handlePrintSummary = handlePrintSummary;
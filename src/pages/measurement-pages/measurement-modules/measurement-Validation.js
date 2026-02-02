/**
 * measurement-Validation.js
 * Handles all form validation logic with comprehensive error checking
 * Uses data attributes from HTML for dynamic validation rules
 * REFACTORED: Improved code structure and readability
 */

export class MeasurementValidator {
    constructor(formElement) {
        this.form = formElement;
        this.gender = formElement.dataset.gender;
        this.errors = new Set();
        this.init();
    }

    /**
     * Initialize validator
     */
    init() {
        this.setupValidationRules();
    }

    /**
     * Setup gender-specific validation rules
     */
    setupValidationRules() {
        this.rules = {
            'client-name': {
                required: true,
                // message: 'Name is required'
                message: ' '

            },
            'save-date': {
                required: true,
                //message: 'Date is required'
                message: ' '
            }
        };

        // Add gender-specific required fields
        if (this.gender === 'male') {
            this.rules['size-number'] = {
                required: true,
                //message: 'Size number is required'
                message: ' '
            };
        } else {
            this.rules['cupSize'] = {
                required: true,
                //message: 'Cup size is required'
                message: ' '
            };
        }
    }

    /**
     * Validates all form fields
     * @returns {boolean} True if all validations pass
     */
    validateAll() {
        this.errors.clear();
        let allValid = true;

        // Validate required fields
        Object.keys(this.rules).forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                allValid = false;
            }
        });

        // Validate all measurement inputs
        const measurementInputs = this.form.querySelectorAll('.measurement-input');
        measurementInputs.forEach(input => {
            if (!this.validateMeasurementInput(input)) {
                allValid = false;
            }
        });

        return allValid;
    }

    /**
     * Validates a single measurement input field
     * @param {HTMLInputElement} input - The input element to validate
     * @returns {boolean} True if valid
     */
    validateMeasurementInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.dataset.min);
        const max = parseFloat(input.dataset.max);
        const measurementId = input.id;
        const errorElement = document.getElementById(`${measurementId}-error`);

        // Clear previous error state
        this.clearInputErrorState(input, errorElement);

        // Check if empty
        if (input.value === '' || isNaN(value)) {
            this.addFieldError(measurementId, ' ');
            return false;
        }

        // Check range
        if (value < min || value > max) {
            this.addFieldError(measurementId, `${min}-${max}`);
            return false;
        }

        // Check decimal places
        const decimalCount = (input.value.split('.')[1] || '').length;
        if (decimalCount > 1) {
            this.addFieldError(measurementId, 'Only one decimal place allowed');
            return false;
        }

        // Mark as valid
        this.markInputAsValid(input);
        return true;
    }

    /**
     * Validates a single field on the fly
     * @param {string} fieldId - Field ID to validate
     * @returns {boolean} True if valid
     */
    validateField(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return true;

        // Clear previous error
        this.clearSingleError(fieldId);

        // Check if field is required
        if (this.rules[fieldId] && this.rules[fieldId].required) {
            if (!input.value || input.value.trim() === '') {
                this.addFieldError(fieldId, this.rules[fieldId].message);
                return false;
            }
        }

        // Handle different input types
        if (input.classList.contains('measurement-input')) {
            return this.validateMeasurementInput(input);
        }

        // Mark valid fields
        input.classList.add('valid');
        return true;
    }

    /**
     * Adds error to field
     * @param {string} fieldId - The ID of the field with error
     * @param {string} message - Error message to display
     */
    addFieldError(fieldId, message) {
        this.errors.add(fieldId);
        
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
            inputElement.classList.remove('valid');
            
            // Handle select wrapper styling
            if (inputElement.tagName === 'SELECT' && inputElement.parentElement) {
                inputElement.parentElement.classList.add('error');
            }
        }
    }

    /**
     * Clears error for a single field
     * @param {string} fieldId - Field ID to clear error for
     */
    clearSingleError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (inputElement) {
            inputElement.classList.remove('error');
        }
        
        this.errors.delete(fieldId);
    }

    /**
     * Clears all error states and messages
     */
    clearErrors() {
        this.errors.clear();
        
        // Clear error messages
        this.form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Clear error classes
        this.form.querySelectorAll('input, select').forEach(input => {
            input.classList.remove('error', 'valid');
            if (input.parentElement) {
                input.parentElement.classList.remove('error');
            }
        });
    }

    /**
     * Clear input error state
     * @param {HTMLInputElement} input - Input element
     * @param {HTMLElement} errorElement - Error message element
     */
    clearInputErrorState(input, errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.classList.remove('error', 'valid');
    }

    /**
     * Mark input as valid
     * @param {HTMLInputElement} input - Input element
     */
    markInputAsValid(input) {
        input.classList.add('valid');
        input.classList.remove('error');
        
        // Ensure error message is cleared
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Remove from errors set
        this.errors.delete(input.id);
    }
}
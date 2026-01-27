/**
 * measurement-Validation.js
 * Handles all form validation logic with comprehensive error checking
 * Uses data attributes from HTML for dynamic validation rules
 */

export class MeasurementValidator {
    constructor(formElement) {
        this.form = formElement;
        this.gender = formElement.dataset.gender;
        this.errors = new Set();
    }

    /**
     * Validates all form fields
     * @returns {boolean} True if all validations pass
     */
    validateAll() {
        this.errors.clear();
        let isValid = true;
        
        // Validate name field (required)
        const nameField = document.getElementById('client-name');
        if (!nameField.value.trim()) {
            this.addError('client-name', ' ');
            isValid = false;
        }

        // Validate gender-specific required field
        if (this.gender === 'male') {
            const sizeField = document.getElementById('size-number');
            if (!sizeField.value) {
                this.addError('size-number', ' ');
                isValid = false;
            }
        } else {
            const cupSizeField = document.getElementById('cupSize');
            if (!cupSizeField.value) {
                this.addError('cupSize', 'Cup size is required');
                isValid = false;
            }
        }

        // Validate all measurement inputs
        const measurementInputs = this.form.querySelectorAll('.measurement-input');
        measurementInputs.forEach(input => {
            if (!this.validateMeasurementInput(input)) {
                isValid = false;
            }
        });

        return isValid;
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
        const measurement = input.dataset.measurement;
        const errorElement = document.getElementById(`${measurement}-error`);

        // Clear previous error
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.classList.remove('error', 'valid');

        // Check if empty
        if (input.value === '' || isNaN(value)) {
            this.addError(measurement, ' ');
            return false;
        }

        // Check range
        if (value < min || value > max) {
            this.addError(measurement, `${min}-${max}`);
            return false;
        }

        // Check decimal places
        const decimalCount = (input.value.split('.')[1] || '').length;
        if (decimalCount > 1) {
            this.addError(measurement, 'Only one decimal place allowed');
            return false;
        }

        // Valid - clear any error immediately
        input.classList.add('valid');
        input.classList.remove('error');
        
        // Ensure error message is cleared
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Remove from errors set
        this.errors.delete(measurement);
        
        return true;
    }

    /**
     * Clears error for a single field
     * @param {string} fieldId - Field ID to clear error for
     */
    clearSingleError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        const inputElement = document.getElementById(fieldId);
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
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
        
        // Clear error classes from inputs and select wrappers
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('error', 'valid');
            if (input.parentElement) {
                input.parentElement.classList.remove('error');
            }
        });
    }
    
    /**
     * Validates a single field on the fly (for real-time validation)
     * @param {string} fieldId - Field ID to validate
     * @returns {boolean} True if valid
     */
    validateField(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return true;
        
        // Handle measurement inputs
        if (input.classList.contains('measurement-input')) {
            return this.validateMeasurementInput(input);
        } 
        
        // Handle client name field
        else if (fieldId === 'client-name') {
            const errorElement = document.getElementById(`${fieldId}-error`);
            errorElement.textContent = '';
            input.classList.remove('error', 'valid');
            
            if (!input.value.trim()) {
                this.addError(fieldId, ' ');
                return false;
            } else {
                input.classList.add('valid');
                return true;
            }
        }
        
        // Handle male size number field
        else if (fieldId === 'size-number' && this.gender === 'male') {
            const errorElement = document.getElementById(`${fieldId}-error`);
            errorElement.textContent = '';
            input.classList.remove('error', 'valid');
            
            if (!input.value) {
                this.addError(fieldId, 'Size number is required');
                return false;
            } else {
                input.classList.add('valid');
                return true;
            }
        }
        
        // Handle female cup size field
        else if (fieldId === 'cupSize' && this.gender === 'female') {
            const errorElement = document.getElementById(`${fieldId}-error`);
            errorElement.textContent = '';
            input.classList.remove('error', 'valid');
            
            if (!input.value) {
                this.addError(fieldId, 'Cup size is required');
                return false;
            } else {
                input.classList.add('valid');
                return true;
            }
        }
        
        // Handle date field
        else if (fieldId === 'save-date') {
            const errorElement = document.getElementById(`${fieldId}-error`);
            errorElement.textContent = '';
            input.classList.remove('error', 'valid');
            
            if (!input.value) {
                this.addError(fieldId, 'Date is required');
                return false;
            } else {
                input.classList.add('valid');
                return true;
            }
        }
        
        return true;
    }

    /**
     * Adds error to field and displays error message
     * @param {string} fieldId - The ID of the field with error
     * @param {string} message - Error message to display
     */
    addError(fieldId, message) {
        this.errors.add(fieldId);
        
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.classList.add('error');
            inputElement.classList.remove('valid');
            
            // Also handle select elements if they have a wrapper or need special styling
            if (inputElement.tagName === 'SELECT') {
                inputElement.parentElement.classList.add('error');
            }
        }
    }
}
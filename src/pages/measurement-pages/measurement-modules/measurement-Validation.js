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
     * Validate all form fields
     * @returns {boolean} True if all validations pass
     */
    validateAll() {
        this.clearErrors();
        let isValid = true;
        
        // Validate name field
        if (!this.validateNameField()) {
            isValid = false;
        }
        
        // Validate date field
        if (!this.validateDateField()) {
            isValid = false;
        }
        
        // Validate gender-specific field
        if (this.gender === 'male') {
            if (!this.validateSizeNumber()) {
                isValid = false;
            }
        } else {
            if (!this.validateCupSize()) {
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
     * Validate name field
     * @returns {boolean} True if valid
     */
    validateNameField() {
        const nameField = document.getElementById('client-name');
        const errorElement = document.getElementById('client-name-error');
        
        if (!nameField || !errorElement) return true;
        
        const value = nameField.value.trim();
        errorElement.textContent = '';
        nameField.classList.remove('error', 'valid');
        
        // Check if empty
        if (!value) {
            this.addError('client-name', 'Name is required');
            return false;
        }
        
        // Check minimum length
        if (value.length < 2) {
            this.addError('client-name', 'Name must be at least 2 characters');
            return false;
        }
        
        // Check maximum length
        if (value.length > 50) {
            this.addError('client-name', 'Name cannot exceed 50 characters');
            return false;
        }
        
        // Check for only alphabetic characters and spaces
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(value)) {
            this.addError('client-name', 'Name can only contain letters and spaces');
            return false;
        }
        
        // Valid
        nameField.classList.add('valid');
        return true;
    }

    /**
     * Validate date field
     * @returns {boolean} True if valid
     */
    validateDateField() {
        const dateField = document.getElementById('save-date');
        const errorElement = document.getElementById('date-error');
        
        if (!dateField || !errorElement) return true;
        
        const value = dateField.value;
        errorElement.textContent = '';
        dateField.classList.remove('error', 'valid');
        
        // Check if empty
        if (!value) {
            this.addError('save-date', 'Date is required');
            return false;
        }
        
        // Check if date is valid
        const selectedDate = new Date(value);
        const today = new Date();
        
        if (isNaN(selectedDate.getTime())) {
            this.addError('save-date', 'Invalid date format');
            return false;
        }
        
        // Check if date is in the future
        if (selectedDate > today) {
            this.addError('save-date', 'Date cannot be in the future');
            return false;
        }
        
        // Valid
        dateField.classList.add('valid');
        return true;
    }

    /**
     * Validate size number field (male)
     * @returns {boolean} True if valid
     */
    validateSizeNumber() {
        const sizeField = document.getElementById('size-number');
        const errorElement = document.getElementById('size-number-error');
        
        if (!sizeField || !errorElement) return true;
        
        const value = sizeField.value;
        errorElement.textContent = '';
        sizeField.classList.remove('error', 'valid');
        
        // Check if empty
        if (!value) {
            this.addError('size-number', 'Size number is required');
            return false;
        }
        
        // Valid
        sizeField.classList.add('valid');
        return true;
    }

    /**
     * Validate cup size field (female)
     * @returns {boolean} True if valid
     */
    validateCupSize() {
        const cupSizeField = document.getElementById('cupSize');
        const errorElement = document.getElementById('cupSize-error');
        
        if (!cupSizeField || !errorElement) return true;
        
        const value = cupSizeField.value;
        errorElement.textContent = '';
        cupSizeField.classList.remove('error', 'valid');
        
        // Check if empty
        if (!value) {
            this.addError('cupSize', 'Cup size is required');
            return false;
        }
        
        // Valid
        cupSizeField.classList.add('valid');
        return true;
    }

    /**
     * Validate a single measurement input field
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
            this.addError(measurement, 'Measurement is required');
            return false;
        }
        
        // Check if negative
        if (value < 0) {
            this.addError(measurement, 'Measurement cannot be negative');
            return false;
        }
        
        // Check if zero
        if (value === 0) {
            this.addError(measurement, 'Measurement cannot be zero');
            return false;
        }
        
        // Check range
        if (value < min || value > max) {
            this.addError(measurement, `Must be between ${min} and ${max}`);
            return false;
        }
        
        // Check decimal places
        const decimalCount = (input.value.split('.')[1] || '').length;
        if (decimalCount > 1) {
            this.addError(measurement, 'Only one decimal place allowed');
            return false;
        }
        
        // Valid
        input.classList.add('valid');
        return true;
    }

    /**
     * Validate a single field by ID
     * @param {string} fieldId - Field ID to validate
     * @returns {boolean} True if valid
     */
    validateField(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return true;
        
        if (input.classList.contains('measurement-input')) {
            return this.validateMeasurementInput(input);
        } else if (fieldId === 'client-name') {
            return this.validateNameField();
        } else if (fieldId === 'save-date') {
            return this.validateDateField();
        } else if (fieldId === 'size-number' && this.gender === 'male') {
            return this.validateSizeNumber();
        } else if (fieldId === 'cupSize' && this.gender === 'female') {
            return this.validateCupSize();
        }
        
        return true;
    }

    /**
     * Add error to field and display error message
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
            
            // Add error class to parent for select elements
            if (inputElement.tagName === 'SELECT') {
                inputElement.parentElement.classList.add('error');
            }
        }
    }

    /**
     * Clear error for a specific field
     * @param {string} fieldId - Field ID to clear error for
     */
    clearSingleError(fieldId) {
        this.errors.delete(fieldId);
        
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.classList.remove('error');
            
            if (inputElement.tagName === 'SELECT') {
                inputElement.parentElement.classList.remove('error');
            }
        }
    }

    /**
     * Clear all error states and messages
     */
    clearErrors() {
        this.errors.clear();
        
        // Clear all error messages
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
        
        // Clear error classes from all inputs
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('error', 'valid');
            if (input.parentElement) {
                input.parentElement.classList.remove('error');
            }
        });
    }

    /**
     * Check if a specific field has error
     * @param {string} fieldId - Field ID to check
     * @returns {boolean} True if field has error
     */
    hasError(fieldId) {
        return this.errors.has(fieldId);
    }

    /**
     * Get all error field IDs
     * @returns {Array} Array of field IDs with errors
     */
    getErrorFields() {
        return Array.from(this.errors);
    }
}
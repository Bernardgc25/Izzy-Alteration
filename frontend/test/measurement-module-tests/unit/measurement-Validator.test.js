import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Create a fresh JSDOM instance for each test suite
function createTestDOM() {
    return new JSDOM(`<!DOCTYPE html>
    <html>
        <body>
            <form id="measurement-form" data-gender="male">
                <input type="text" id="client-name" />
                <span id="client-name-error" class="error-message"></span>
                
                <input type="date" id="save-date" />
                <span id="save-date-error" class="error-message"></span>
                
                <select id="size-number">
                    <option value="">Select</option>
                    <option value="S">Small</option>
                </select>
                <span id="size-number-error" class="error-message"></span>
                
                <div class="form-group">
                    <input type="number" id="neck" class="measurement-input" data-min="10" data-max="25" step="0.1" />
                    <div id="neck-error" class="error-message"></div>
                </div>
                <div class="form-group">
                    <input type="number" id="waist" class="measurement-input" data-min="20" data-max="60" step="0.1" />
                    <div id="waist-error" class="error-message"></div>
                </div>
            </form>
        </body>
    </html>`, {
        url: 'http://localhost', // Added to fix localStorage SecurityError
        resources: 'usable'
    });
}

describe('measurement-Validator.js', () => {
    let validator;
    let form;
    let dom;

    // Load the module - must be done after JSDOM setup
    let MeasurementValidator;

    before(async () => {
        // Set up JSDOM globally first
        dom = createTestDOM();
        global.window = dom.window;
        global.document = dom.window.document;
        global.localStorage = dom.window.localStorage; // Mock localStorage
        
        // Now import the module after setting up the global environment
        const module = await import('../../../pages/measurement-pages/measurement-modules/measurement-Validator.js');
        MeasurementValidator = module.MeasurementValidator;
    });

    beforeEach(() => {
        // Make sure we get the form element correctly
        form = document.getElementById('measurement-form');
        
        // Ensure form exists before creating validator
        if (!form) {
            throw new Error('Form element not found in test setup');
        }
        
        validator = new MeasurementValidator(form);
    });

    describe('constructor and initialization', () => {
        it('should set form property', () => {
            expect(validator.form).to.equal(form);
        });

        it('should set gender from form dataset', () => {
            expect(validator.gender).to.equal('male');
        });

        it('should initialize errors Set', () => {
            expect(validator.errors).to.be.instanceOf(Set);
            expect(validator.errors.size).to.equal(0);
        });

        it('should setup validation rules', () => {
            expect(validator.rules).to.have.property('client-name');
            expect(validator.rules).to.have.property('save-date');
            expect(validator.rules).to.have.property('size-number');
        });

        it('should throw error when form is null', () => {
            expect(() => new MeasurementValidator(null)).to.throw('Form element is required');
        });

        it('should default gender to male when not specified', () => {
            // Create a form without data-gender attribute
            const formWithoutGender = document.createElement('form');
            formWithoutGender.id = 'test-form-no-gender';
            document.body.appendChild(formWithoutGender);
            
            const validatorWithoutGender = new MeasurementValidator(formWithoutGender);
            expect(validatorWithoutGender.gender).to.equal('male');
            
            // Clean up
            document.body.removeChild(formWithoutGender);
        });
    });

    describe('setupValidationRules', () => {
        it('should set different rules for male gender', () => {
            form.dataset.gender = 'male';
            validator = new MeasurementValidator(form);
            
            expect(validator.rules).to.have.property('size-number');
            expect(validator.rules).to.not.have.property('cupSize');
        });

        it('should set different rules for female gender', () => {
            // Create a new form for female gender test
            const femaleForm = document.createElement('form');
            femaleForm.id = 'female-form';
            femaleForm.dataset.gender = 'female';
            
            // Add required elements
            const clientNameInput = document.createElement('input');
            clientNameInput.id = 'client-name';
            femaleForm.appendChild(clientNameInput);
            
            const saveDateInput = document.createElement('input');
            saveDateInput.id = 'save-date';
            femaleForm.appendChild(saveDateInput);
            
            // Add cupSize select element
            const cupSizeSelect = document.createElement('select');
            cupSizeSelect.id = 'cupSize';
            femaleForm.appendChild(cupSizeSelect);
            
            document.body.appendChild(femaleForm);
            
            validator = new MeasurementValidator(femaleForm);
            
            expect(validator.rules).to.have.property('cupSize');
            expect(validator.rules).to.not.have.property('size-number');
            
            // Clean up
            document.body.removeChild(femaleForm);
        });
    });

    describe('validateAll', () => {
        beforeEach(() => {
            // Reset form values
            document.getElementById('client-name').value = 'John Doe';
            document.getElementById('save-date').value = '2024-01-01';
            document.getElementById('size-number').value = 'S';
            document.getElementById('neck').value = '15.5';
            document.getElementById('waist').value = '34';
        });

        it('should return true when all fields are valid', () => {
            const result = validator.validateAll();
            expect(result).to.be.true;
            expect(validator.errors.size).to.equal(0);
        });

        it('should return false when required fields are empty', () => {
            document.getElementById('client-name').value = '';
            document.getElementById('save-date').value = '';
            document.getElementById('size-number').value = '';
            
            const result = validator.validateAll();
            expect(result).to.be.false;
            expect(validator.errors.size).to.be.greaterThan(0);
        });

        it('should return false when measurement inputs are invalid', () => {
            document.getElementById('neck').value = '5'; // Below min
            document.getElementById('waist').value = '70'; // Above max
            
            const result = validator.validateAll();
            expect(result).to.be.false;
            expect(validator.errors.size).to.be.greaterThan(0);
        });
    });

    describe('validateField', () => {
        it('should return true for valid field', () => {
            document.getElementById('client-name').value = 'John Doe';
            const result = validator.validateField('client-name');
            expect(result).to.be.true;
            expect(validator.errors.has('client-name')).to.be.false;
        });

        it('should return false and add error for empty required field', () => {
            document.getElementById('client-name').value = '';
            const result = validator.validateField('client-name');
            
            expect(result).to.be.false;
            expect(validator.errors.has('client-name')).to.be.true;
            
            const errorElement = document.getElementById('client-name-error');
            expect(errorElement?.textContent).to.equal(' ');
        });

        it('should validate measurement input correctly', () => {
            const neckInput = document.getElementById('neck');
            
            // Test valid value
            neckInput.value = '15.5';
            let result = validator.validateField('neck');
            expect(result).to.be.true;
            expect(neckInput.classList.contains('error')).to.be.false;
            
            // Test value below min
            neckInput.value = '5';
            result = validator.validateField('neck');
            expect(result).to.be.false;
            expect(neckInput.classList.contains('error')).to.be.true;
            
            // Test value above max
            neckInput.value = '30';
            result = validator.validateField('neck');
            expect(result).to.be.false;
            expect(neckInput.classList.contains('error')).to.be.true;
            
            // Test too many decimal places
            neckInput.value = '15.55';
            result = validator.validateField('neck');
            expect(result).to.be.false;
            expect(neckInput.classList.contains('error')).to.be.true;
            
            // Test empty value
            neckInput.value = '';
            result = validator.validateField('neck');
            expect(result).to.be.false;
            expect(neckInput.classList.contains('error')).to.be.true;
        });

        it('should return true for non-existent field', () => {
            const result = validator.validateField('non-existent-field');
            expect(result).to.be.true;
        });
    });

    describe('addFieldError', () => {
        afterEach(() => {
            // Clean up any test elements
            const testError = document.getElementById('test-field-error');
            const testInput = document.getElementById('test-field');
            
            if (testError && testError.parentNode) {
                testError.parentNode.removeChild(testError);
            }
            if (testInput && testInput.parentNode) {
                testInput.parentNode.removeChild(testInput);
            }
        });

        it('should add error to errors set', () => {
            validator.addFieldError('test-field', 'Error message');
            expect(validator.errors.has('test-field')).to.be.true;
        });

        it('should update error element text', () => {
            // Create a test error element
            const errorElement = document.createElement('div');
            errorElement.id = 'test-field-error';
            document.body.appendChild(errorElement);
            
            validator.addFieldError('test-field', 'Custom error message');
            
            expect(errorElement.textContent).to.equal('Custom error message');
        });

        it('should add error class to input element', () => {
            const inputElement = document.createElement('input');
            inputElement.id = 'test-field';
            document.body.appendChild(inputElement);
            
            validator.addFieldError('test-field', 'Error message');
            
            expect(inputElement.classList.contains('error')).to.be.true;
            expect(inputElement.classList.contains('valid')).to.be.false;
        });

        it('should handle null fieldId gracefully', () => {
            expect(() => validator.addFieldError(null, 'Error message')).not.to.throw();
        });
    });

    describe('clearSingleError', () => {
        beforeEach(() => {
            // Create test elements
            const inputElement = document.createElement('input');
            inputElement.id = 'test-field';
            inputElement.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.id = 'test-field-error';
            errorElement.textContent = 'Error message';
            
            document.body.appendChild(inputElement);
            document.body.appendChild(errorElement);
            
            validator.errors.add('test-field');
        });

        afterEach(() => {
            // Clean up test elements
            const inputElement = document.getElementById('test-field');
            const errorElement = document.getElementById('test-field-error');
            
            if (inputElement && inputElement.parentNode) {
                inputElement.parentNode.removeChild(inputElement);
            }
            if (errorElement && errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        });

        it('should remove error from errors set', () => {
            validator.clearSingleError('test-field');
            expect(validator.errors.has('test-field')).to.be.false;
        });

        it('should clear error element text', () => {
            const errorElement = document.getElementById('test-field-error');
            validator.clearSingleError('test-field');
            expect(errorElement.textContent).to.equal('');
        });

        it('should remove error class from input', () => {
            const inputElement = document.getElementById('test-field');
            validator.clearSingleError('test-field');
            expect(inputElement.classList.contains('error')).to.be.false;
        });

        it('should handle null fieldId gracefully', () => {
            expect(() => validator.clearSingleError(null)).not.to.throw();
        });
    });

    describe('clearErrors', () => {
        beforeEach(() => {
            // Set up multiple errors within the form
            const error1 = document.createElement('span');
            error1.id = 'field1-error';
            error1.className = 'error-message';
            error1.textContent = 'Error 1';
            form.appendChild(error1);
            
            const error2 = document.createElement('span');
            error2.id = 'field2-error';
            error2.className = 'error-message';
            error2.textContent = 'Error 2';
            form.appendChild(error2);
            
            // Add errors to the set
            validator.errors.add('field1');
            validator.errors.add('field2');
        });

        afterEach(() => {
            // Clean up test elements
            const error1 = document.getElementById('field1-error');
            const error2 = document.getElementById('field2-error');
            
            if (error1 && error1.parentNode) {
                error1.parentNode.removeChild(error1);
            }
            if (error2 && error2.parentNode) {
                error2.parentNode.removeChild(error2);
            }
        });

        it('should clear all errors from set', () => {
            validator.clearErrors();
            expect(validator.errors.size).to.equal(0);
        });

        it('should clear all error message elements within the form', () => {
            validator.clearErrors();
            
            const error1 = document.getElementById('field1-error');
            const error2 = document.getElementById('field2-error');
            
            expect(error1.textContent).to.equal('');
            expect(error2.textContent).to.equal('');
        });
    });

    describe('getFirstErrorField', () => {
        afterEach(() => {
            // Clean up test elements
            const testElements = document.querySelectorAll('#field1, #field2');
            testElements.forEach(el => {
                if (el.parentNode === form || el.parentNode === document.body) {
                    el.parentNode.removeChild(el);
                }
            });
        });

        it('should return first element with error class within the form', () => {
            const input1 = document.createElement('input');
            input1.id = 'field1';
            input1.className = 'error';
            
            const input2 = document.createElement('input');
            input2.id = 'field2';
            input2.className = 'error';
            
            // Append to the form, not the body
            form.appendChild(input1);
            form.appendChild(input2);
            
            const result = validator.getFirstErrorField();
            expect(result).to.equal(input1);
        });

        it('should return null if no errors found', () => {
            const result = validator.getFirstErrorField();
            expect(result).to.be.null;
        });
    });
});
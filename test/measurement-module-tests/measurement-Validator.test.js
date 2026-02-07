// IZZY-ALTERATION/test/measurement-module-tests/measurement-Validator.test.js

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { MeasurementValidator } from '../../src/pages/measurement-pages/measurement-modules/measurement-Validator.js';

describe('MeasurementValidator', () => {
    let validator;
    let mockDOM;
    let form;

    beforeEach(() => {
        // Create a mock DOM with form elements
        mockDOM = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <form id="measurement-form" data-gender="male">
                        <input type="text" id="client-name">
                        <span id="client-name-error" class="error-message"></span>
                        
                        <input type="date" id="save-date">
                        <span id="save-date-error" class="error-message"></span>
                        
                        <select id="size-number">
                            <option value=""></option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                        </select>
                        <span id="size-number-error" class="error-message"></span>
                        
                        <select id="cupSize">
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                        <span id="cupSize-error" class="error-message"></span>
                        
                        <input type="text" 
                               id="neck" 
                               class="measurement-input" 
                               data-min="10" 
                               data-max="25"
                               value="">
                        <span id="neck-error" class="error-message"></span>
                        
                        <input type="text" 
                               id="chest" 
                               class="measurement-input" 
                               data-min="20" 
                               data-max="60"
                               value="">
                        <span id="chest-error" class="error-message"></span>
                    </form>
                </body>
            </html>
        `);

        global.document = mockDOM.window.document;
        form = document.getElementById('measurement-form');
    });

    afterEach(() => {
        delete global.document;
    });

    describe('constructor and initialization', () => {
        it('should initialize with form element', () => {
            validator = new MeasurementValidator(form);
            expect(validator.form).to.equal(form);
            expect(validator.gender).to.equal('male');
            expect(validator.errors).to.be.instanceOf(Set);
        });

        it('should setup validation rules for male', () => {
            form.dataset.gender = 'male';
            validator = new MeasurementValidator(form);
            
            expect(validator.rules).to.have.property('client-name');
            expect(validator.rules).to.have.property('save-date');
            expect(validator.rules).to.have.property('size-number');
            expect(validator.rules).to.not.have.property('cupSize');
        });

        it('should setup validation rules for female', () => {
            form.dataset.gender = 'female';
            validator = new MeasurementValidator(form);
            
            expect(validator.rules).to.have.property('cupSize');
            expect(validator.rules).to.not.have.property('size-number');
        });
    });

    describe('validateField', () => {
        beforeEach(() => {
            form.dataset.gender = 'male';
            validator = new MeasurementValidator(form);
        });

        it('should validate required field - valid', () => {
            document.getElementById('client-name').value = 'John Doe';
            const result = validator.validateField('client-name');
            
            expect(result).to.be.true;
            expect(validator.errors.size).to.equal(0);
            expect(document.getElementById('client-name').classList.contains('error')).to.be.false;
        });

        it('should validate required field - invalid (empty)', () => {
            document.getElementById('client-name').value = '';
            const result = validator.validateField('client-name');
            
            expect(result).to.be.false;
            expect(validator.errors.has('client-name')).to.be.true;
            expect(document.getElementById('client-name').classList.contains('error')).to.be.true;
        });

        it('should validate required field - invalid (whitespace)', () => {
            document.getElementById('client-name').value = '   ';
            const result = validator.validateField('client-name');
            
            expect(result).to.be.false;
            expect(validator.errors.has('client-name')).to.be.true;
        });
    });

    describe('validateMeasurementInput', () => {
        beforeEach(() => {
            validator = new MeasurementValidator(form);
        });

        it('should validate measurement input - valid', () => {
            const input = document.getElementById('neck');
            input.value = '15.5';
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.true;
            expect(validator.errors.has('neck')).to.be.false;
        });

        it('should reject empty measurement', () => {
            const input = document.getElementById('neck');
            input.value = '';
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.false;
            expect(validator.errors.has('neck')).to.be.true;
        });

        it('should reject non-numeric measurement', () => {
            const input = document.getElementById('neck');
            input.value = 'abc';
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.false;
            expect(validator.errors.has('neck')).to.be.true;
        });

        it('should reject measurement below minimum', () => {
            const input = document.getElementById('neck');
            input.value = '5'; // min is 10
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.false;
            expect(validator.errors.has('neck')).to.be.true;
            expect(document.getElementById('neck-error').textContent).to.include('10-25');
        });

        it('should reject measurement above maximum', () => {
            const input = document.getElementById('neck');
            input.value = '30'; // max is 25
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.false;
            expect(validator.errors.has('neck')).to.be.true;
            expect(document.getElementById('neck-error').textContent).to.include('10-25');
        });

        it('should reject measurement with more than one decimal place', () => {
            const input = document.getElementById('neck');
            input.value = '15.55';
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.false;
            expect(validator.errors.has('neck')).to.be.true;
            expect(document.getElementById('neck-error').textContent).to.include('Only one decimal place allowed');
        });

        it('should accept measurement with one decimal place', () => {
            const input = document.getElementById('neck');
            input.value = '15.5';
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.true;
            expect(validator.errors.has('neck')).to.be.false;
        });

        it('should accept measurement without decimal places', () => {
            const input = document.getElementById('neck');
            input.value = '15';
            
            const result = validator.validateMeasurementInput(input);
            
            expect(result).to.be.true;
            expect(validator.errors.has('neck')).to.be.false;
        });
    });

    describe('validateAll', () => {
        beforeEach(() => {
            form.dataset.gender = 'male';
            validator = new MeasurementValidator(form);
        });

        it('should return true when all fields are valid', () => {
            document.getElementById('client-name').value = 'John Doe';
            document.getElementById('save-date').value = '2024-01-15';
            document.getElementById('size-number').value = 'M';
            document.getElementById('neck').value = '15.5';
            document.getElementById('chest').value = '42';
            
            const result = validator.validateAll();
            
            expect(result).to.be.true;
            expect(validator.errors.size).to.equal(0);
        });

        it('should return false when any field is invalid', () => {
            document.getElementById('client-name').value = 'John Doe';
            document.getElementById('save-date').value = ''; // Invalid - empty
            document.getElementById('size-number').value = 'M';
            document.getElementById('neck').value = '5'; // Invalid - below min
            document.getElementById('chest').value = '42';
            
            const result = validator.validateAll();
            
            expect(result).to.be.false;
            expect(validator.errors.size).to.be.greaterThan(0);
        });

        it('should validate gender-specific required fields', () => {
            // Test male
            document.getElementById('client-name').value = 'John Doe';
            document.getElementById('save-date').value = '2024-01-15';
            document.getElementById('size-number').value = ''; // Required for male
            document.getElementById('neck').value = '15.5';
            
            const maleResult = validator.validateAll();
            expect(maleResult).to.be.false;
            
            // Test female
            form.dataset.gender = 'female';
            validator = new MeasurementValidator(form);
            
            document.getElementById('cupSize').value = 'A';
            document.getElementById('size-number').value = ''; // Not required for female
            
            const femaleResult = validator.validateAll();
            // Still false because cupSize is required for female
            expect(femaleResult).to.be.false;
        });
    });

    describe('addFieldError and clearSingleError', () => {
        beforeEach(() => {
            validator = new MeasurementValidator(form);
        });

        it('should add error to field', () => {
            validator.addFieldError('neck', 'Invalid measurement');
            
            expect(validator.errors.has('neck')).to.be.true;
            expect(document.getElementById('neck-error').textContent).to.equal('Invalid measurement');
            expect(document.getElementById('neck').classList.contains('error')).to.be.true;
            expect(document.getElementById('neck').classList.contains('valid')).to.be.false;
        });

        it('should clear error from field', () => {
            validator.addFieldError('neck', 'Invalid measurement');
            validator.clearSingleError('neck');
            
            expect(validator.errors.has('neck')).to.be.false;
            expect(document.getElementById('neck-error').textContent).to.equal('');
            expect(document.getElementById('neck').classList.contains('error')).to.be.false;
        });
    });

    describe('clearErrors', () => {
        it('should clear all errors', () => {
            validator = new MeasurementValidator(form);
            
            validator.addFieldError('client-name', 'Name required');
            validator.addFieldError('neck', 'Invalid measurement');
            
            validator.clearErrors();
            
            expect(validator.errors.size).to.equal(0);
            
            // Check all error messages are cleared
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => {
                expect(el.textContent).to.equal('');
            });
            
            // Check all error classes are removed
            const errorInputs = document.querySelectorAll('.error');
            expect(errorInputs.length).to.equal(0);
        });
    });

    describe('getFirstErrorField', () => {
        it('should return first error element', () => {
            validator = new MeasurementValidator(form);
            
            validator.addFieldError('save-date', 'Date required');
            validator.addFieldError('neck', 'Invalid measurement');
            
            const firstError = validator.getFirstErrorField();
            expect(firstError.id).to.equal('save-date');
        });

        it('should return null if no errors', () => {
            validator = new MeasurementValidator(form);
            const firstError = validator.getFirstErrorField();
            expect(firstError).to.be.null;
        });
    });
});
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Mock DOM for testing
const dom = new JSDOM(`<!DOCTYPE html>
  <html>
    <body>
      <form id="measurement-form" data-gender="male">
        <input type="text" id="client-name" />
        <input type="date" id="save-date" />
        <select id="size-number">
          <option value="">Select</option>
          <option value="S">Small</option>
        </select>
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
  </html>`);

global.window = dom.window;
global.document = dom.window.document;

// Load the module
import { MeasurementValidator } from '../../../src/pages/measurement-pages/measurement-modules/measurement-Validator.js';

describe('measurement-Validator.js', () => {
  let validator;
  let form;

  beforeEach(() => {
    form = document.getElementById('measurement-form');
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
  });

  describe('setupValidationRules', () => {
    it('should set different rules for male gender', () => {
      form.dataset.gender = 'male';
      validator = new MeasurementValidator(form);
      
      expect(validator.rules).to.have.property('size-number');
      expect(validator.rules).to.not.have.property('cupSize');
    });

    it('should set different rules for female gender', () => {
      form.dataset.gender = 'female';
      form.innerHTML += '<select id="cupSize"></select>';
      validator = new MeasurementValidator(form);
      
      expect(validator.rules).to.have.property('cupSize');
      expect(validator.rules).to.not.have.property('size-number');
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
      expect(errorElement.textContent).to.equal(' ');
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
  });

  describe('addFieldError', () => {
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
  });

  describe('clearErrors', () => {
    beforeEach(() => {
      // Set up multiple errors
      validator.addFieldError('field1', 'Error 1');
      validator.addFieldError('field2', 'Error 2');
      
      // Create error elements
      const error1 = document.createElement('div');
      error1.className = 'error-message';
      error1.textContent = 'Error 1';
      
      const error2 = document.createElement('div');
      error2.className = 'error-message';
      error2.textContent = 'Error 2';
      
      document.body.appendChild(error1);
      document.body.appendChild(error2);
      
      // Create input with error class
      const input = document.createElement('input');
      input.className = 'error';
      document.body.appendChild(input);
    });

    it('should clear all errors from set', () => {
      validator.clearErrors();
      expect(validator.errors.size).to.equal(0);
    });

    it('should clear all error message elements', () => {
      validator.clearErrors();
      
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(el => {
        expect(el.textContent).to.equal('');
      });
    });

    it('should remove error classes from all inputs', () => {
      validator.clearErrors();
      
      const errorInputs = document.querySelectorAll('.error');
      expect(errorInputs.length).to.equal(0);
    });
  });

  describe('getFirstErrorField', () => {
    it('should return first element with error class', () => {
      const input1 = document.createElement('input');
      input1.id = 'field1';
      input1.className = 'error';
      
      const input2 = document.createElement('input');
      input2.id = 'field2';
      input2.className = 'error';
      
      document.body.appendChild(input1);
      document.body.appendChild(input2);
      
      const result = validator.getFirstErrorField();
      expect(result).to.equal(input1);
    });

    it('should return null if no errors found', () => {
      const result = validator.getFirstErrorField();
      expect(result).to.be.null;
    });
  });
});
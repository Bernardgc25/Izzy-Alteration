/**
 * measurement-Validation.test.js
 * Unit tests for MeasurementValidator class
 */

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { MeasurementValidator } from '../../../src/pages/measurement-pages/measurement-modules/measurement-Validation.js';

// Setup DOM for testing
const createDOM = (gender = 'male') => {
  const html = `
<!DOCTYPE html>
<html>
  <body>
    <form id="measurement-form" data-gender="${gender}">
      <div class="form-group">
        <input type="text" id="client-name" value="">
        <div id="client-name-error" class="error-message"></div>
      </div>
      
      ${gender === 'male' ? `
      <div class="form-group">
        <select id="size-number">
          <option value="">Select Size</option>
          <option value="38M">38M</option>
          <option value="42L">42L</option>
        </select>
        <div id="size-number-error" class="error-message"></div>
      </div>
      ` : `
      <div class="form-group">
        <select id="cupSize">
          <option value="">Select Cup Size</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <div id="cupSize-error" class="error-message"></div>
      </div>
      `}
      
      <div class="form-group">
        <input type="date" id="save-date">
        <div id="save-date-error" class="error-message"></div>
      </div>
      
      <div class="measurement-input-container">
        <span class="label-text">Neck:</span>
        <input type="number" id="neck" class="measurement-input" 
               data-measurement="neck" data-min="12" data-max="22" step="0.5" value="">
        <div id="neck-error" class="error-message"></div>
      </div>
      
      <div class="measurement-input-container">
        <span class="label-text">Chest:</span>
        <input type="number" id="chest-circumference" class="measurement-input" 
               data-measurement="chest-circumference" data-min="30" data-max="60" step="0.5" value="">
        <div id="chest-circumference-error" class="error-message"></div>
      </div>
    </form>
  </body>
</html>
`;

  return new JSDOM(html);
};

describe('MeasurementValidator Class', () => {
  let validator;
  let dom;

  describe('Male Form Validation', () => {
    beforeEach(() => {
      dom = createDOM('male');
      global.window = dom.window;
      global.document = dom.window.document;
      
      const form = document.getElementById('measurement-form');
      validator = new MeasurementValidator(form);
    });

    it('should initialize with form and gender', () => {
      expect(validator.form).to.exist;
      expect(validator.gender).to.equal('male');
      expect(validator.errors).to.be.instanceOf(Set);
    });

    it('should validate all fields correctly', () => {
      // Set invalid values
      document.getElementById('client-name').value = '';
      document.getElementById('size-number').value = '';
      document.getElementById('neck').value = '5'; // Below min
      document.getElementById('chest-circumference').value = '70'; // Above max
      
      const isValid = validator.validateAll();
      expect(isValid).to.be.false;
      expect(validator.errors.size).to.be.greaterThan(0);
    });

    it('should validate single measurement input', () => {
      const neckInput = document.getElementById('neck');
      
      // Test empty value
      neckInput.value = '';
      expect(validator.validateMeasurementInput(neckInput)).to.be.false;
      expect(neckInput.classList.contains('error')).to.be.true;
      
      // Test value below min
      neckInput.value = '10';
      expect(validator.validateMeasurementInput(neckInput)).to.be.false;
      
      // Test value above max
      neckInput.value = '25';
      expect(validator.validateMeasurementInput(neckInput)).to.be.false;
      
      // Test valid value
      neckInput.value = '16.5';
      expect(validator.validateMeasurementInput(neckInput)).to.be.true;
      expect(neckInput.classList.contains('valid')).to.be.true;
      expect(neckInput.classList.contains('error')).to.be.false;
      
      // Test invalid decimal places
      neckInput.value = '16.55';
      expect(validator.validateMeasurementInput(neckInput)).to.be.false;
    });

    it('should validate client name field', () => {
      const nameField = document.getElementById('client-name');
      
      // Test empty name
      nameField.value = '';
      expect(validator.validateField('client-name')).to.be.false;
      expect(nameField.classList.contains('error')).to.be.true;
      
      // Test valid name
      nameField.value = 'John Doe';
      expect(validator.validateField('client-name')).to.be.true;
      expect(nameField.classList.contains('valid')).to.be.true;
    });

    it('should validate male size number field', () => {
      const sizeField = document.getElementById('size-number');
      
      // Test empty size
      sizeField.value = '';
      expect(validator.validateField('size-number')).to.be.false;
      
      // Test valid size
      sizeField.value = '38M';
      expect(validator.validateField('size-number')).to.be.true;
    });

    it('should clear single error', () => {
      const neckInput = document.getElementById('neck');
      neckInput.value = '5'; // Invalid
      validator.validateMeasurementInput(neckInput);
      
      expect(neckInput.classList.contains('error')).to.be.true;
      expect(validator.errors.has('neck')).to.be.true;
      
      validator.clearSingleError('neck');
      
      expect(neckInput.classList.contains('error')).to.be.false;
      expect(validator.errors.has('neck')).to.be.false;
    });

    it('should clear all errors', () => {
      // Create multiple errors
      document.getElementById('client-name').value = '';
      document.getElementById('size-number').value = '';
      document.getElementById('neck').value = '5';
      
      validator.validateAll();
      
      expect(validator.errors.size).to.be.greaterThan(0);
      
      validator.clearErrors();
      
      expect(validator.errors.size).to.equal(0);
      
      // Check that error classes are removed
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        expect(input.classList.contains('error')).to.be.false;
      });
    });
  });

  describe('Female Form Validation', () => {
    beforeEach(() => {
      dom = createDOM('female');
      global.window = dom.window;
      global.document = dom.window.document;
      
      const form = document.getElementById('measurement-form');
      validator = new MeasurementValidator(form);
    });

    it('should validate female cup size field', () => {
      const cupSizeField = document.getElementById('cupSize');
      
      // Test empty cup size
      cupSizeField.value = '';
      expect(validator.validateField('cupSize')).to.be.false;
      
      // Test valid cup size
      cupSizeField.value = 'B';
      expect(validator.validateField('cupSize')).to.be.true;
    });

    it('should not validate male size field for female form', () => {
      // Male size field should not exist in female form
      const sizeField = document.getElementById('size-number');
      expect(sizeField).to.be.null;
    });
  });

  describe('Error Message Display', () => {
    beforeEach(() => {
      dom = createDOM('male');
      global.window = dom.window;
      global.document = dom.window.document;
      
      const form = document.getElementById('measurement-form');
      validator = new MeasurementValidator(form);
    });

    it('should display error message for invalid field', () => {
      const neckInput = document.getElementById('neck');
      const errorElement = document.getElementById('neck-error');
      
      neckInput.value = '5'; // Below min
      validator.validateMeasurementInput(neckInput);
      
      expect(errorElement.textContent).to.not.be.empty;
      expect(errorElement.textContent).to.include('12-22');
    });

    it('should clear error message when field becomes valid', () => {
      const neckInput = document.getElementById('neck');
      const errorElement = document.getElementById('neck-error');
      
      // Set invalid then valid
      neckInput.value = '5';
      validator.validateMeasurementInput(neckInput);
      expect(errorElement.textContent).to.not.be.empty;
      
      neckInput.value = '16.5';
      validator.validateMeasurementInput(neckInput);
      expect(errorElement.textContent).to.be.empty;
    });
  });
});
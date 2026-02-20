// test/test-measurement-Validator.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { MeasurementValidator } from '../../../pages/measurement-pages/measurement-modules/measurement-Validator.js';

describe('measurement-Validator.js', () => {
  let dom;
  let form;
  let validator;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <form id="measurement-form" data-gender="male">
          <input id="client-name" value="John" />
          <input id="save-date" value="2025-01-01" />
          <input id="size-number" value="40" />
          <select id="cupSize"></select>

          <input id="neck" class="measurement-input" data-min="0" data-max="100" value="15.5" />
          <div id="neck-error" class="error-message"></div>

          <input id="waist" class="measurement-input" data-min="0" data-max="100" value="32" />
          <div id="waist-error" class="error-message"></div>
        </form>
      </body>
    `);
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.alert = dom.window.alert;
    form = document.getElementById('measurement-form');
    validator = new MeasurementValidator(form);
  });

  afterEach(() => {
    sinon.restore();
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.alert;
  });

  describe('constructor', () => {
    it('should throw if form element missing', () => {
      expect(() => new MeasurementValidator(null)).to.throw('Form element is required');
    });

    it('should set gender from dataset', () => {
      expect(validator.gender).to.equal('male');
    });
  });

  describe('validateAll', () => {
    it('should return true when all fields valid', () => {
      const result = validator.validateAll();
      expect(result).to.be.true;
    });

    it('should return false if required text field empty', () => {
      document.getElementById('client-name').value = '';
      const result = validator.validateAll();
      expect(result).to.be.false;
      expect(validator.errors.has('client-name')).to.be.true;
    });

    it('should return false if measurement input empty', () => {
      document.getElementById('neck').value = '';
      const result = validator.validateAll();
      expect(result).to.be.false;
      expect(validator.errors.has('neck')).to.be.true;
    });

    it('should return false if measurement out of range', () => {
      document.getElementById('neck').value = '150';
      const result = validator.validateAll();
      expect(result).to.be.false;
    });

    it('should return false if measurement has more than one decimal', () => {
      document.getElementById('neck').value = '15.55';
      const result = validator.validateAll();
      expect(result).to.be.false;
    });
  });

  describe('validateMeasurementInput', () => {
    it('should return true for valid input', () => {
      const input = document.getElementById('neck');
      expect(validator.validateMeasurementInput(input)).to.be.true;
    });

    it('should return false for empty input', () => {
      const input = document.getElementById('neck');
      input.value = '';
      expect(validator.validateMeasurementInput(input)).to.be.false;
      const errorEl = document.getElementById('neck-error');
      expect(errorEl.textContent).to.equal(' ');
    });

    it('should return false for non-numeric', () => {
      const input = document.getElementById('neck');
      input.value = 'abc';
      expect(validator.validateMeasurementInput(input)).to.be.false;
    });

    it('should return false for out-of-range', () => {
      const input = document.getElementById('neck');
      input.value = '-5';
      expect(validator.validateMeasurementInput(input)).to.be.false;
      const errorEl = document.getElementById('neck-error');
      expect(errorEl.textContent).to.equal('0-100');
    });

    it('should return false for too many decimals', () => {
      const input = document.getElementById('neck');
      input.value = '15.55';
      expect(validator.validateMeasurementInput(input)).to.be.false;
      const errorEl = document.getElementById('neck-error');
      expect(errorEl.textContent).to.equal('Only one decimal place allowed');
    });
  });

  describe('validateField', () => {
    it('should validate required fields', () => {
      const input = document.getElementById('client-name');
      input.value = '';
      const result = validator.validateField('client-name');
      expect(result).to.be.false;
      expect(validator.errors.has('client-name')).to.be.true;
    });

    it('should validate measurement input', () => {
      const input = document.getElementById('neck');
      input.value = '15.55';
      const result = validator.validateField('neck');
      expect(result).to.be.false;
      expect(validator.errors.has('neck')).to.be.true;
    });

    it('should return true for non-required, non-measurement field', () => {
      // create a dummy field not in rules
      const dummy = document.createElement('input');
      dummy.id = 'dummy';
      document.body.appendChild(dummy);
      const result = validator.validateField('dummy');
      expect(result).to.be.true;
    });
  });

  describe('addFieldError', () => {
    it('should add error class and set message', () => {
      validator.addFieldError('neck', 'Test error');
      const input = document.getElementById('neck');
      const errorEl = document.getElementById('neck-error');
      expect(input.classList.contains('error')).to.be.true;
      expect(errorEl.textContent).to.equal('Test error');
      expect(validator.errors.has('neck')).to.be.true;
    });
  });

  describe('clearSingleError', () => {
    it('should remove error class and clear message', () => {
      validator.addFieldError('neck', 'error');
      validator.clearSingleError('neck');
      const input = document.getElementById('neck');
      const errorEl = document.getElementById('neck-error');
      expect(input.classList.contains('error')).to.be.false;
      expect(errorEl.textContent).to.equal('');
      expect(validator.errors.has('neck')).to.be.false;
    });
  });

  describe('clearErrors', () => {
    it('should clear all errors in the form', () => {
      validator.addFieldError('neck', 'err1');
      validator.addFieldError('waist', 'err2');
      validator.clearErrors();
      expect(validator.errors.size).to.equal(0);
      expect(document.querySelectorAll('.error').length).to.equal(0);
      expect(document.getElementById('neck-error').textContent).to.equal('');
      expect(document.getElementById('waist-error').textContent).to.equal('');
    });
  });

  describe('getFirstErrorField', () => {
    it('should return first element with error class', () => {
      validator.addFieldError('neck', 'err');
      const first = validator.getFirstErrorField();
      expect(first.id).to.equal('neck');
    });

    it('should return null if no errors', () => {
      expect(validator.getFirstErrorField()).to.be.null;
    });
  });
});
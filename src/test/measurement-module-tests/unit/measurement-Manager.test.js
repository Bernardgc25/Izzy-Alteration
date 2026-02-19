import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Mock DOM for testing
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

// Load the module
import { MeasurementManager } from '../../../pages/measurement-pages/measurement-modules/measurement-Manager.js';

describe('measurement-Manager.js', () => {
  let manager;

  beforeEach(() => {
    manager = new MeasurementManager();
    
    // Create mock DOM elements
    const mockForm = document.createElement('div');
    mockForm.id = 'measurement-form';
    document.body.appendChild(mockForm);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('initialize', () => {
    it('should set gender property', () => {
      manager.initialize('male');
      expect(manager.gender).to.equal('male');
    });

    it('should return instance for chaining', () => {
      const result = manager.initialize('female');
      expect(result).to.equal(manager);
    });
  });

  describe('setupDateField', () => {
    it('should set date field with current date', () => {
      // Create date field
      const dateField = document.createElement('input');
      dateField.id = 'save-date';
      document.body.appendChild(dateField);

      manager.setupDateField();

      const today = new Date().toISOString().split('T')[0];
      expect(dateField.value).to.equal(today);
    });

    it('should set max attribute to today', () => {
      const dateField = document.createElement('input');
      dateField.id = 'save-date';
      document.body.appendChild(dateField);

      manager.setupDateField();

      const today = new Date().toISOString().split('T')[0];
      expect(dateField.max).to.equal(today);
    });

    it('should handle missing date field gracefully', () => {
      expect(() => manager.setupDateField()).not.to.throw();
    });
  });

  describe('saveMeasurement', () => {
    beforeEach(() => {
      manager.initialize('male');
    });

    it('should save measurement with value and label', () => {
      manager.saveMeasurement('neck', '15.5', 'Neck Circumference');
      
      const measurement = manager.measurements.get('neck');
      expect(measurement).to.exist;
      expect(measurement.value).to.equal('15.5');
      expect(measurement.label).to.equal('Neck Circumference');
      expect(measurement).to.have.property('timestamp');
    });

    it('should not save empty values', () => {
      manager.saveMeasurement('neck', '', 'Neck Circumference');
      expect(manager.measurements.has('neck')).to.be.false;
    });

    it('should not save whitespace-only values', () => {
      manager.saveMeasurement('neck', '   ', 'Neck Circumference');
      expect(manager.measurements.has('neck')).to.be.false;
    });

    it('should handle trim of label', () => {
      manager.saveMeasurement('neck', '15.5', 'Neck Circumference:');
      const measurement = manager.measurements.get('neck');
      expect(measurement.label).to.equal('Neck Circumference');
    });
  });

  describe('getFormData', () => {
    beforeEach(() => {
      manager.initialize('male');
      
      // Create mock form elements
      const nameField = document.createElement('input');
      nameField.id = 'client-name';
      nameField.value = 'John Doe';
      
      const dateField = document.createElement('input');
      dateField.id = 'save-date';
      dateField.value = '2024-01-01';
      
      const sizeField = document.createElement('select');
      sizeField.id = 'size-number';
      const option = document.createElement('option');
      option.value = 'M';
      option.text = 'Medium';
      sizeField.appendChild(option);
      sizeField.value = 'M';
      
      document.body.appendChild(nameField);
      document.body.appendChild(dateField);
      document.body.appendChild(sizeField);
    });

    it('should collect all form data for male', () => {
      manager.saveMeasurement('neck', '15.5', 'Neck Circumference');
      manager.saveMeasurement('waist', '34', 'Waist Circumference');
      
      const formData = manager.getFormData();
      
      expect(formData).to.have.property('name', 'John Doe');
      expect(formData).to.have.property('date', '2024-01-01');
      expect(formData).to.have.property('gender', 'male');
      expect(formData).to.have.property('sizeNumber', 'M');
      expect(formData.measurements).to.have.property('neck');
      expect(formData.measurements).to.have.property('waist');
    });

    it('should collect all form data for female', () => {
      manager.initialize('female');
      
      // Update DOM for female
      const sizeField = document.getElementById('size-number');
      if (sizeField) sizeField.remove();
      
      const cupField = document.createElement('select');
      cupField.id = 'cupSize';
      const option = document.createElement('option');
      option.value = 'C';
      option.text = 'C';
      cupField.appendChild(option);
      cupField.value = 'C';
      document.body.appendChild(cupField);
      
      manager.saveMeasurement('under-bust', '32', 'Under Bust');
      
      const formData = manager.getFormData();
      
      expect(formData).to.have.property('gender', 'female');
      expect(formData).to.have.property('cupSize', 'C');
      expect(formData.measurements).to.have.property('under-bust');
    });

    it('should handle missing form elements gracefully', () => {
      document.body.innerHTML = '';
      
      const formData = manager.getFormData();
      
      expect(formData.name).to.equal('');
      expect(formData.date).to.equal('');
      expect(formData.sizeNumber).to.equal('');
    });
  });

  describe('generatePrintContent', () => {
    beforeEach(() => {
      manager.initialize('male');
      manager.formData = {
        name: 'John Doe',
        date: '2024-01-01',
        gender: 'male'
      };
      
      manager.measurements.set('neck', { value: '15.5', label: 'Neck Circumference' });
      manager.measurements.set('waist', { value: '34', label: 'Waist Circumference' });
    });

    it('should generate HTML content', () => {
      const content = manager.generatePrintContent();
      
      expect(content).to.include('<!DOCTYPE html>');
      expect(content).to.include('<title>Measurement Summary');
      expect(content).to.include('John Doe');
      expect(content).to.include('15.5"');
      expect(content).to.include('34"');
    });

    it('should include gender-specific fields for male', () => {
      manager.formData.sizeNumber = 'M';
      const content = manager.generatePrintContent();
      
      expect(content).to.include('Size Number');
      expect(content).to.include('M');
    });

    it('should include gender-specific fields for female', () => {
      manager.initialize('female');
      manager.formData = {
        name: 'Jane Doe',
        date: '2024-01-01',
        gender: 'female',
        cupSize: 'C'
      };
      
      const content = manager.generatePrintContent();
      
      expect(content).to.include('Cup Size');
      expect(content).to.include('C');
    });
  });

  describe('resetFormData', () => {
    beforeEach(() => {
      manager.initialize('male');
      manager.saveMeasurement('neck', '15.5', 'Neck Circumference');
      manager.formData = { name: 'John Doe' };
    });

    it('should clear measurements map', () => {
      manager.resetFormData();
      expect(manager.measurements.size).to.equal(0);
    });

    it('should clear formData object', () => {
      manager.resetFormData();
      expect(manager.formData).to.deep.equal({});
    });
  });
});
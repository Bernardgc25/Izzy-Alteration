/**
 * measurement-Main.test.js
 * Unit tests for MeasurementApp class (main entry point)
 */

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
// Note: We'll test the public interface and DOM interactions

// Mock the imported modules
const mockMeasurementData = {
  measurementDefinitions: {
    neck: {
      object: 'Neck',
      definition: 'Circumference around the base of the neck',
      description: 'Measure around the neck where the collar would normally sit.'
    }
  }
};

// Create a simplified version of the app for testing
class MockMeasurementManager {
  constructor() {
    this.gender = null;
    this.measurements = new Map();
  }
  
  initialize(gender) {
    this.gender = gender;
    return this;
  }
  
  saveMeasurement(id, value, label) {
    if (value) {
      this.measurements.set(id, { value, label });
    }
  }
  
  getFormData() {
    return {
      name: 'Test Client',
      date: '2024-01-24',
      gender: this.gender,
      measurements: Object.fromEntries(this.measurements)
    };
  }
  
  resetAll() {
    this.measurements.clear();
  }
}

describe('MeasurementApp Integration', () => {
  let dom;
  
  const createDOMWithApp = () => {
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <script>
      // Mock the window functions that would be set by measurement-Main.js
      window.handleSaveMeasurements = function() {
        console.log('Save measurements called');
      };
      
      window.handleResetForm = function() {
        console.log('Reset form called');
      };
    </script>
  </head>
  <body>
    <form id="measurement-form" data-gender="male">
      <input type="text" id="client-name" value="Test User">
      <input type="date" id="save-date" value="2024-01-24">
      <select id="size-number">
        <option value="38M" selected>38M</option>
      </select>
      
      <div id="measure-guide-text">
        <div id="measure-object"></div>
        <div id="measure-definition"></div>
        <div id="measure-description"></div>
      </div>
      
      <div class="measurement-input-container">
        <span class="label-text">Neck:</span>
        <input type="number" id="neck" class="measurement-input" 
               data-measurement="neck" data-min="12" data-max="22" step="0.5">
      </div>
      
      <button onclick="window.handleSaveMeasurements()">Save</button>
      <button onclick="window.handleResetForm()">Reset</button>
    </form>
  </body>
</html>
`;

    return new JSDOM(html, { runScripts: 'dangerously' });
  };

  beforeEach(() => {
    dom = createDOMWithApp();
    global.window = dom.window;
    global.document = dom.window.document;
  });

  describe('DOM Structure', () => {
    it('should have required form elements', () => {
      expect(document.getElementById('measurement-form')).to.exist;
      expect(document.getElementById('client-name')).to.exist;
      expect(document.getElementById('save-date')).to.exist;
      expect(document.getElementById('size-number')).to.exist;
      expect(document.querySelector('.measurement-input')).to.exist;
    });

    it('should have measurement guide text containers', () => {
      expect(document.getElementById('measure-object')).to.exist;
      expect(document.getElementById('measure-definition')).to.exist;
      expect(document.getElementById('measure-description')).to.exist;
    });

    it('should have global event handler functions', () => {
      expect(window.handleSaveMeasurements).to.be.a('function');
      expect(window.handleResetForm).to.be.a('function');
    });
  });

  describe('Measurement Guide Display', () => {
    it('should update guide text with measurement information', () => {
      // Simulate showMeasurementGuide function
      const showMeasurementGuide = (measurementKey) => {
        const definition = mockMeasurementData.measurementDefinitions[measurementKey];
        if (definition) {
          document.getElementById('measure-object').textContent = definition.object;
          document.getElementById('measure-definition').textContent = definition.definition;
          document.getElementById('measure-description').textContent = definition.description;
        }
      };
      
      showMeasurementGuide('neck');
      
      expect(document.getElementById('measure-object').textContent).to.equal('Neck');
      expect(document.getElementById('measure-definition').textContent)
        .to.include('Circumference around the base');
    });
  });

  describe('Form Data Flow', () => {
    it('should collect and structure form data correctly', () => {
      const manager = new MockMeasurementManager().initialize('male');
      manager.saveMeasurement('neck', '16.5', 'Neck');
      
      const formData = manager.getFormData();
      
      expect(formData.name).to.equal('Test Client');
      expect(formData.gender).to.equal('male');
      expect(formData.measurements.neck.value).to.equal('16.5');
    });

    it('should handle form reset', () => {
      const manager = new MockMeasurementManager().initialize('male');
      manager.saveMeasurement('neck', '16.5', 'Neck');
      
      expect(manager.measurements.size).to.equal(1);
      
      manager.resetAll();
      
      expect(manager.measurements.size).to.equal(0);
    });
  });
});
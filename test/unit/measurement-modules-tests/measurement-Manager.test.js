/**
 * measurement-Manager.test.js
 * Unit tests for MeasurementManager class
 */

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { MeasurementManager } from '../../../src/pages/measurement-pages/measurement-modules/measurement-Manager.js';
import { MeasurementData } from '../../../src/pages/measurement-pages/measurement-modules/measurement-DataMaps.js';

// Setup DOM for testing
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
  <body>
    <form id="measurement-form" data-gender="male">
      <input type="text" id="client-name" value="John Doe">
      <input type="date" id="save-date">
      <select id="size-number">
        <option value="38M">38M</option>
      </select>
      
      <div id="measurement-guide">
        <img id="guide-image" style="display: none;">
        <div id="default-guide">Default Guide</div>
      </div>
      
      <div class="measurement-input-container">
        <span class="label-text">Neck:</span>
        <input type="number" id="neck" class="measurement-input" 
               data-measurement="neck" data-min="12" data-max="22" step="0.5">
        <div id="neck-error" class="error-message"></div>
      </div>
      
      <div class="measurement-input-container">
        <span class="label-text">Chest:</span>
        <input type="number" id="chest-circumference" class="measurement-input" 
               data-measurement="chest-circumference" data-min="30" data-max="60" step="0.5">
        <div id="chest-circumference-error" class="error-message"></div>
      </div>
      
      <div id="summary-content">
        <div class="empty-summary">
          <i class="fas fa-ruler"></i>
          <p>No measurements saved yet.</p>
        </div>
      </div>
      
      <button id="print-summary">Print</button>
    </form>
    
    <div id="measure-guide-text">
      <div id="measure-object"></div>
      <div id="measure-definition"></div>
      <div id="measure-description"></div>
    </div>
  </body>
</html>
`);

global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;

describe('MeasurementManager Class', () => {
  let manager;

  beforeEach(() => {
    // Reset DOM
    document.getElementById('save-date').value = '';
    document.getElementById('summary-content').innerHTML = `
      <div class="empty-summary">
        <i class="fas fa-ruler"></i>
        <p>No measurements saved yet.</p>
      </div>
    `;
    
    // Create new manager instance
    manager = new MeasurementManager().initialize('male');
  });

  describe('Initialization', () => {
    it('should initialize with gender', () => {
      expect(manager.gender).to.equal('male');
      expect(manager.measurements).to.be.instanceOf(Map);
    });

    it('should setup date field with current date', () => {
      const dateField = document.getElementById('save-date');
      const today = new Date().toISOString().split('T')[0];
      expect(dateField.value).to.equal(today);
      expect(dateField.max).to.equal(today);
    });
  });

  describe('Measurement Operations', () => {
    it('should save measurement to Map', () => {
      const labelElement = document.querySelector('.label-text');
      const label = labelElement.textContent.replace(':', '').trim();
      
      manager.saveMeasurement('neck', '16.5', label);
      
      expect(manager.measurements.size).to.equal(1);
      expect(manager.measurements.get('neck')).to.deep.include({
        value: '16.5',
        label: 'Neck'
      });
    });

    it('should not save empty measurement', () => {
      const labelElement = document.querySelector('.label-text');
      const label = labelElement.textContent.replace(':', '').trim();
      
      manager.saveMeasurement('neck', '', label);
      expect(manager.measurements.size).to.equal(0);
    });

    it('should update summary display when measurements are saved', () => {
      const labelElement = document.querySelector('.label-text');
      const label = labelElement.textContent.replace(':', '').trim();
      
      manager.saveMeasurement('neck', '16.5', label);
      
      const summaryContent = document.getElementById('summary-content');
      expect(summaryContent.querySelector('.empty-summary')).to.be.null;
      expect(summaryContent.querySelectorAll('.summary-item').length).to.equal(1);
    });

    it('should show empty state when no measurements', () => {
      manager.updateSummary();
      const summaryContent = document.getElementById('summary-content');
      expect(summaryContent.querySelector('.empty-summary')).to.not.be.null;
    });
  });

  describe('Form Data Collection', () => {
    beforeEach(() => {
      // Set up form data
      document.getElementById('client-name').value = 'John Doe';
      document.getElementById('size-number').value = '38M';
      
      const labelElement = document.querySelector('.label-text');
      const label = labelElement.textContent.replace(':', '').trim();
      manager.saveMeasurement('neck', '16.5', label);
    });

    it('should collect all form data', () => {
      const formData = manager.getFormData();
      
      expect(formData).to.have.property('name', 'John Doe');
      expect(formData).to.have.property('gender', 'male');
      expect(formData).to.have.property('sizeNumber', '38M');
      expect(formData.measurements).to.have.property('neck');
      expect(formData.measurements.neck.value).to.equal('16.5');
    });

    it('should handle female form data correctly', () => {
      // Reset with female gender
      document.getElementById('measurement-form').dataset.gender = 'female';
      document.getElementById('size-number').id = 'cupSize';
      document.getElementById('cupSize').value = 'B';
      
      const femaleManager = new MeasurementManager().initialize('female');
      const formData = femaleManager.getFormData();
      
      expect(formData).to.have.property('cupSize', 'B');
      expect(formData).to.not.have.property('sizeNumber');
    });
  });

  describe('Reset Functionality', () => {
    beforeEach(() => {
      // Add some measurements first
      const labelElement = document.querySelector('.label-text');
      const label = labelElement.textContent.replace(':', '').trim();
      manager.saveMeasurement('neck', '16.5', label);
      manager.saveMeasurement('chest-circumference', '42', 'Chest');
    });

    it('should reset all measurements', () => {
      expect(manager.measurements.size).to.equal(2);
      
      manager.resetAll();
      
      expect(manager.measurements.size).to.equal(0);
      
      const summaryContent = document.getElementById('summary-content');
      expect(summaryContent.querySelector('.empty-summary')).to.not.be.null;
    });

    it('should reset form fields', () => {
      document.getElementById('client-name').value = 'Test Name';
      manager.resetAll();
      
      expect(document.getElementById('client-name').value).to.equal('');
    });
  });

  describe('Zoom State Management', () => {
    it('should initialize with default zoom state', () => {
      expect(manager.zoomState.scale).to.equal(MeasurementData.config.defaultZoom);
      expect(manager.zoomState.x).to.equal(0);
      expect(manager.zoomState.y).to.equal(0);
      expect(manager.zoomState.isDragging).to.be.false;
    });

    it('should zoom image within bounds', () => {
      const image = document.getElementById('guide-image');
      
      // Test zoom in
      manager.zoomImage(image, 0.5, 100, 100);
      expect(manager.zoomState.scale).to.equal(1.5);
      
      // Test zoom out
      manager.zoomImage(image, -0.7, 100, 100);
      expect(manager.zoomState.scale).to.equal(0.8);
      
      // Test min zoom boundary
      manager.zoomImage(image, -1, 100, 100);
      expect(manager.zoomState.scale).to.equal(MeasurementData.config.minZoom);
      
      // Test max zoom boundary
      manager.zoomState.scale = 2.5;
      manager.zoomImage(image, 1, 100, 100);
      expect(manager.zoomState.scale).to.equal(MeasurementData.config.maxZoom);
    });

    it('should reset zoom to default', () => {
      const image = document.getElementById('guide-image');
      
      // Change zoom state
      manager.zoomState.scale = 2.5;
      manager.zoomState.x = 100;
      manager.zoomState.y = 50;
      
      manager.resetZoom(image);
      
      expect(manager.zoomState.scale).to.equal(MeasurementData.config.defaultZoom);
      expect(manager.zoomState.x).to.equal(0);
      expect(manager.zoomState.y).to.equal(0);
    });
  });
});
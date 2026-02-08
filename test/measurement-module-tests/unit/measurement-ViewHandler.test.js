const { expect } = require('chai');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');

// Mock DOM for testing
const html = `<!DOCTYPE html>
<html>
<body>
  <div id="guide-image"></div>
  <div id="default-guide"></div>
  <div id="floating-guide-overlay"></div>
  <div id="floating-measurement-guide"></div>
  <div class="measurement-label">
    <span class="fa-eye"></span>
    <div class="form-group">
      <input class="measurement-input" data-measurement="neck" />
    </div>
  </div>
  <div id="measure-object"></div>
  <div id="measure-definition"></div>
  <div id="measure-description"></div>
  <div id="floating-measure-object"></div>
  <div id="floating-measure-definition"></div>
  <div id="floating-measure-description"></div>
  <div class="measurement-guide-floating">
    <div class="floating-guide-images"></div>
  </div>
  <button id="print-summary">Print</button>
  <button id="close-floating-guide">Close</button>
</body>
</html>`;

const dom = new JSDOM(html, { runScripts: 'dangerously' });
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock getMeasurement function
const mockGetMeasurement = (gender, key) => {
  const measurements = {
    male: {
      neck: {
        object: 'Neck Circumference',
        definition: 'Measure around the base of the neck...',
        description: 'Place the tape measure around...',
        imageMobile: '/test/images/neck-mobile.png'
      }
    },
    female: {
      'under-bust': {
        object: 'Under Bust',
        definition: 'Measure around the torso directly under the bust...',
        description: 'Wrap tape measure around the ribcage...',
        imageMobile: '/test/images/under-bust-mobile.png'
      }
    }
  };
  return measurements[gender]?.[key] || null;
};

// Load the module with mock
require.cache[require.resolve('../../../src/pages/measurement-pages/measurement-modules/measurement-DataMaps.js')] = {
  exports: {
    getMeasurement: mockGetMeasurement
  }
};

const { ViewHandler } = require('../../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js');

describe('measurement-ViewHandler.js', () => {
  let viewHandler;
  let consoleWarnStub;
  let alertStub;

  beforeEach(() => {
    // Stub console.warn and alert
    consoleWarnStub = sinon.stub(console, 'warn');
    alertStub = sinon.stub(window, 'alert');
    
    // Reset DOM
    dom.window.location.reload();
  });

  afterEach(() => {
    consoleWarnStub.restore();
    alertStub.restore();
    sinon.restore();
  });

  describe('constructor and initialization', () => {
    it('should set gender and isMobileView properties', () => {
      viewHandler = new ViewHandler('male', true);
      expect(viewHandler.gender).to.equal('male');
      expect(viewHandler.isMobileView).to.be.true;
    });

    it('should initialize debounceTimers map', () => {
      viewHandler = new ViewHandler('male', false);
      expect(viewHandler.debounceTimers).to.be.instanceOf(Map);
    });

    it('should initialize zoomState object', () => {
      viewHandler = new ViewHandler('male', false);
      expect(viewHandler.zoomState).to.deep.equal({
        scale: 1.0,
        x: 0,
        y: 0,
        isDragging: false,
        startX: 0,
        startY: 0
      });
    });
  });

  describe('getGenderImage', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should return correct image for male', () => {
      const image = viewHandler.getGenderImage();
      expect(image).to.equal('/src/images/male-desktop.png');
    });

    it('should return correct image for female', () => {
      viewHandler.gender = 'female';
      const image = viewHandler.getGenderImage();
      expect(image).to.equal('/src/images/female-desktop.png');
    });

    it('should return null for invalid gender', () => {
      viewHandler.gender = 'invalid';
      const image = viewHandler.getGenderImage();
      expect(image).to.be.null;
    });
  });

  describe('showMeasurementGuide', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should update guide text for valid measurement', () => {
      viewHandler.showMeasurementGuide('neck');
      
      const objectElement = document.getElementById('measure-object');
      const definitionElement = document.getElementById('measure-definition');
      const descriptionElement = document.getElementById('measure-description');
      
      expect(objectElement.innerHTML).to.include('Neck Circumference');
      expect(definitionElement.innerHTML).to.include('Measure around the base of the neck...');
      expect(descriptionElement.innerHTML).to.include('Place the tape measure around...');
    });

    it('should handle invalid measurement gracefully', () => {
      viewHandler.showMeasurementGuide('invalid-measurement');
      // Should not throw error
    });
  });

  describe('showFloatingGuide', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', true); // Mobile view
    });

    it('should show floating guide for mobile view', () => {
      viewHandler.showFloatingGuide('neck');
      
      const overlay = document.getElementById('floating-guide-overlay');
      const floatingGuide = document.getElementById('floating-measurement-guide');
      
      expect(overlay.style.display).to.equal('block');
      expect(floatingGuide.style.display).to.equal('flex');
    });

    it('should update guide text for floating guide', () => {
      viewHandler.showFloatingGuide('neck');
      
      const objectElement = document.getElementById('floating-measure-object');
      const definitionElement = document.getElementById('floating-measure-definition');
      const descriptionElement = document.getElementById('floating-measure-description');
      
      expect(objectElement.innerHTML).to.include('Neck Circumference');
      expect(definitionElement.innerHTML).to.include('Measure around the base of the neck...');
      expect(descriptionElement.innerHTML).to.include('Place the tape measure around...');
    });

    it('should update mobile guide image', () => {
      viewHandler.showFloatingGuide('neck');
      
      const imagesContainer = document.querySelector('.floating-guide-images');
      const image = imagesContainer.querySelector('img');
      
      expect(image).to.exist;
      expect(image.src).to.include('/test/images/neck-mobile.png');
    });
  });

  describe('hideFloatingGuide', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', true);
    });

    it('should hide floating guide elements', () => {
      // First show the guide
      document.getElementById('floating-guide-overlay').style.display = 'block';
      document.getElementById('floating-measurement-guide').style.display = 'flex';
      
      // Then hide it
      viewHandler.hideFloatingGuide();
      
      const overlay = document.getElementById('floating-guide-overlay');
      const floatingGuide = document.getElementById('floating-measurement-guide');
      
      expect(overlay.style.display).to.equal('none');
      expect(floatingGuide.style.display).to.equal('none');
    });
  });

  describe('setupEyeIconListeners', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', true);
    });

    it('should setup click listeners on eye icons', () => {
      const callback = sinon.stub();
      viewHandler.setupEyeIconListeners(callback);
      
      const eyeIcon = document.querySelector('.fa-eye');
      eyeIcon.click();
      
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('neck')).to.be.true;
    });

    it('should stop event propagation', () => {
      const callback = sinon.stub();
      viewHandler.setupEyeIconListeners(callback);
      
      const eyeIcon = document.querySelector('.fa-eye');
      let parentClicked = false;
      
      eyeIcon.parentElement.addEventListener('click', () => {
        parentClicked = true;
      });
      
      eyeIcon.click();
      
      expect(parentClicked).to.be.false;
    });
  });

  describe('setupWindowResizeListener', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should trigger callback when view changes', (done) => {
      const callback = sinon.stub();
      viewHandler.setupWindowResizeListener(callback);
      
      // Simulate mobile view
      Object.defineProperty(window, 'innerWidth', { value: 800 });
      
      window.dispatchEvent(new Event('resize'));
      
      setTimeout(() => {
        expect(callback.calledOnce).to.be.true;
        expect(callback.calledWith(true)).to.be.true;
        expect(viewHandler.isMobileView).to.be.true;
        done();
      }, 100);
    });
  });

  describe('setupEscapeKeyListener', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should call callback on escape key press', () => {
      const callback = sinon.stub();
      viewHandler.setupEscapeKeyListener(callback);
      
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(callback.calledOnce).to.be.true;
    });

    it('should not call callback on other key press', () => {
      const callback = sinon.stub();
      viewHandler.setupEscapeKeyListener(callback);
      
      const otherEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(otherEvent);
      
      expect(callback.called).to.be.false;
    });
  });

  describe('setupPrintButtonListener', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should setup print button listener', () => {
      const callback = sinon.stub();
      viewHandler.setupPrintButtonListener(callback);
      
      const printButton = document.getElementById('print-summary');
      printButton.click();
      
      expect(callback.calledOnce).to.be.true;
    });

    it('should handle print errors with alert', () => {
      const error = new Error('Popup blocked');
      const callback = sinon.stub().throws(error);
      
      viewHandler.setupPrintButtonListener(callback);
      
      const printButton = document.getElementById('print-summary');
      printButton.click();
      
      expect(alertStub.calledOnce).to.be.true;
      expect(alertStub.calledWith('Popup blocked')).to.be.true;
    });
  });

  describe('alert and message methods', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should show alert message', () => {
      viewHandler.showAlert('Test message');
      expect(alertStub.calledOnce).to.be.true;
      expect(alertStub.calledWith('Test message')).to.be.true;
    });

    it('should show validation error alert', () => {
      viewHandler.showValidationErrorAlert();
      expect(alertStub.calledOnce).to.be.true;
      expect(alertStub.calledWith('Please fill in all required fields correctly. Invalid fields are highlighted in red.')).to.be.true;
    });

    it('should show success message', () => {
      const formData = {
        name: 'John Doe',
        date: '2024-01-01',
        measurements: { neck: {}, waist: {} }
      };
      
      viewHandler.showSuccessMessage(formData);
      
      expect(alertStub.calledOnce).to.be.true;
      const alertMessage = alertStub.firstCall.args[0];
      expect(alertMessage).to.include('Measurements saved successfully!');
      expect(alertMessage).to.include('John Doe');
      expect(alertMessage).to.include('2024-01-01');
      expect(alertMessage).to.include('Total Measurements: 2');
    });
  });

  describe('focusFirstErrorField', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', false);
    });

    it('should focus on first error field', () => {
      const input1 = document.createElement('input');
      input1.className = 'error';
      const input2 = document.createElement('input');
      input2.className = 'error';
      
      document.body.appendChild(input1);
      document.body.appendChild(input2);
      
      const focusSpy = sinon.spy(input1, 'focus');
      
      viewHandler.focusFirstErrorField();
      
      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should handle no error fields gracefully', () => {
      expect(() => viewHandler.focusFirstErrorField()).not.to.throw();
    });
  });
});
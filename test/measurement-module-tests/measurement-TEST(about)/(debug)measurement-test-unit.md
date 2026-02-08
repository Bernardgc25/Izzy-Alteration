1. fix this error:
[
	bernard@ubuntu:~/Documents/Izzy-Alteration$ npm run test:measurement

	> test:measurement
	> cd test && mocha measurement-module-tests/unit/**/*.test.js


	 Exception during run: TypeError: Cannot set property navigator of #<Object> which has only a getter
	    at file:///home/bernard/Documents/Izzy-Alteration/test/measurement-module-tests/unit/measurement-ViewHandler.test.js:51:18
	    at ModuleJob.run (node:internal/modules/esm/module_job:430:25)
	    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:655:26)
	    at async formattedImport (/home/bernard/Documents/Izzy-Alteration/node_modules/mocha/lib/nodejs/esm-utils.js:9:14)
	    at async exports.requireOrImport (/home/bernard/Documents/Izzy-Alteration/node_modules/mocha/lib/nodejs/esm-utils.js:42:28)
	    at async exports.loadFilesAsync (/home/bernard/Documents/Izzy-Alteration/node_modules/mocha/lib/nodejs/esm-utils.js:100:20)
	    at async singleRun (/home/bernard/Documents/Izzy-Alteration/node_modules/mocha/lib/cli/run-helpers.js:162:3)
	    at async exports.handler (/home/bernard/Documents/Izzy-Alteration/node_modules/mocha/lib/cli/run.js:375:5)
	bernard@ubuntu:~/Documents/Izzy-Alteration$ 
]

2. make these commands run the test in root without changing directories: 
[
	npm run test:measurement and npm run test:alteration
]

3. this is the measurement-ViewHandler.test.js. write and updated version: 
[
	import { expect } from 'chai';
import { stub, restore, spy } from 'sinon';
import { JSDOM } from 'jsdom';

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

// Create a single JSDOM instance
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost',
  resources: 'usable'
});

// Set global properties properly
global.window = dom.window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.HTMLInputElement = window.HTMLInputElement;
global.Element = window.Element;
global.Event = window.Event;
global.KeyboardEvent = window.KeyboardEvent;
global.MouseEvent = window.MouseEvent;

// Set navigator by merging with existing global.navigator properties
global.navigator = Object.create(window.navigator, {
  userAgent: {
    value: window.navigator.userAgent,
    writable: true
  }
});

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

// Mock the measurement-DataMaps module
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Create a proper mock for the ES module
const mockDataMaps = {
  getMeasurement: mockGetMeasurement
};

// Use import assertions or dynamic import to avoid caching issues
let ViewHandler;

// Load the module
import('../../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js')
  .then(module => {
    ViewHandler = module.ViewHandler;
  })
  .catch(err => {
    console.error('Failed to import ViewHandler:', err);
  });

describe('measurement-ViewHandler.js', () => {
  let viewHandler;
  let consoleWarnStub;
  let alertStub;

  beforeEach(async () => {
    // Ensure ViewHandler is loaded
    if (!ViewHandler) {
      const module = await import('../../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js');
      ViewHandler = module.ViewHandler;
    }
    
    // Stub console.warn and alert
    consoleWarnStub = stub(console, 'warn');
    alertStub = stub(window, 'alert');
    
    // Reset DOM by reassigning elements
    global.document = dom.window.document;
  });

  afterEach(() => {
    consoleWarnStub.restore();
    alertStub.restore();
    restore();
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
      // Mock the DataMaps module
      viewHandler.DataMaps = { getMeasurement: mockGetMeasurement };
      
      viewHandler.showMeasurementGuide('neck');
      
      const objectElement = document.getElementById('measure-object');
      const definitionElement = document.getElementById('measure-definition');
      const descriptionElement = document.getElementById('measure-description');
      
      expect(objectElement.innerHTML).to.include('Neck Circumference');
      expect(definitionElement.innerHTML).to.include('Measure around the base of the neck...');
      expect(descriptionElement.innerHTML).to.include('Place the tape measure around...');
    });

    it('should handle invalid measurement gracefully', () => {
      viewHandler.DataMaps = { getMeasurement: mockGetMeasurement };
      viewHandler.showMeasurementGuide('invalid-measurement');
      // Should not throw error
    });
  });

  describe('showFloatingGuide', () => {
    beforeEach(() => {
      viewHandler = new ViewHandler('male', true); // Mobile view
      viewHandler.DataMaps = { getMeasurement: mockGetMeasurement };
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
      const callback = stub();
      viewHandler.setupEyeIconListeners(callback);
      
      const eyeIcon = document.querySelector('.fa-eye');
      eyeIcon.click();
      
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('neck')).to.be.true;
    });

    it('should stop event propagation', () => {
      const callback = stub();
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
      const callback = stub();
      viewHandler.setupWindowResizeListener(callback);
      
      // Simulate mobile view
      Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
      
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
      const callback = stub();
      viewHandler.setupEscapeKeyListener(callback);
      
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(callback.calledOnce).to.be.true;
    });

    it('should not call callback on other key press', () => {
      const callback = stub();
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
      const callback = stub();
      viewHandler.setupPrintButtonListener(callback);
      
      const printButton = document.getElementById('print-summary');
      printButton.click();
      
      expect(callback.calledOnce).to.be.true;
    });

    it('should handle print errors with alert', () => {
      const error = new Error('Popup blocked');
      const callback = stub().throws(error);
      
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
      
      const focusSpy = spy(input1, 'focus');
      
      viewHandler.focusFirstErrorField();
      
      expect(focusSpy.calledOnce).to.be.true;
      
      // Cleanup
      document.body.removeChild(input1);
      document.body.removeChild(input2);
    });

    it('should handle no error fields gracefully', () => {
      expect(() => viewHandler.focusFirstErrorField()).not.to.throw();
    });
  });
});
]


4. here is the location of root package.json file: /Izzy-Alteration/package.json:
[
{
  "scripts": {
    "test": "mocha",
    "test:alteration": "cd test && mocha alteration-module-tests/unit/**/*.test.js",
    "test:alteration:watch": "cd test && mocha --watch alteration-module-tests/unit/**/*.test.js",
    "test:measurement": "cd test && mocha measurement-module-tests/unit/**/*.test.js",
    "test:measurement:watch": "cd test && mocha --watch measurement-module-tests/unit/**/*.test.js",
    "test:all": "npm run test:alteration && npm run test:measurement"
  },
  "type": "module",
  "devDependencies": {
    "chai": "^4.5.0",
    "jsdom": "^22.1.0",
    "jsdom-global": "^3.0.2",
    "mocha": "^10.8.2",
    "sinon": "^15.2.0",
    "testdouble": "^3.20.2"
  }
}
]


5. this is the folder structure of the project:
[
Izzy-Alteration
├─ Izzy-Alteration
│  └─ test
├─ about
│  ├─ deepseek
│  │  └─ alteration-female.txt
│  └─ measurements-about.txt
├─ package-lock.json
├─ package.json
├─ src
│  ├─ css
│  │  ├─ account-menu.css
│  │  ├─ add-service.css
│  │  ├─ alteration-female.css
│  │  ├─ alteration.css
│  │  ├─ index.css
│  │  ├─ login.css
│  │  ├─ measurements.css
│  │  ├─ order-history.css
│  │  ├─ services.css
│  │  └─ signup.css
│  ├─ images
│  │  ├─ female-(chart)-tablet-mobile.png
│  │  ├─ female-back-tablet-mobile.png
│  │  ├─ female-desktop.png
│  │  ├─ female-front-tablet-mobile.png
│  │  ├─ male-(chart)-tablet-mobile.png
│  │  ├─ male-back-tablet-mobile.png
│  │  ├─ male-desktop.png
│  │  └─ male-front-tablet-mobile.png
│  ├─ js
│  │  ├─ account.js
│  │  ├─ add-service.js
│  │  ├─ alteration-female.js
│  │  ├─ alteration-price-calculator.js
│  │  ├─ index.js
│  │  ├─ login.js
│  │  ├─ order-history.js
│  │  ├─ services.js
│  │  └─ signup.js
│  └─ pages
│     ├─ account-menu.html
│     ├─ add-service.html
│     ├─ alteration-pages
│     │  ├─ alteration-about
│     │  │  ├─ (debug)alteration-modules.txt
│     │  │  ├─ alteration(how-the-program-works).txt
│     │  │  ├─ alteration-functionality-prompt.txt
│     │  │  ├─ alteration-modules.txt
│     │  │  └─ alteration-responsive-page.txt
│     │  ├─ alteration-female-bottom.html
│     │  ├─ alteration-female-dress.html
│     │  ├─ alteration-female-jacket.html
│     │  ├─ alteration-female-top.html
│     │  ├─ alteration-male-bottom.html
│     │  ├─ alteration-male-suits.html
│     │  ├─ alteration-male-top.html
│     │  ├─ alteration-modules
│     │  │  ├─ alteration-CartManager.js
│     │  │  ├─ alteration-DOMRenderer.js
│     │  │  ├─ alteration-DataMaps.js
│     │  │  ├─ alteration-EventManager.js
│     │  │  ├─ alteration-Main.js
│     │  │  ├─ alteration-PriceCalculator.js
│     │  │  └─ alteration-StateManager.js
│     │  └─ alteration-repair.html
│     ├─ index.html
│     ├─ login.html
│     ├─ measurement-pages
│     │  ├─ measurement-about
│     │  │  ├─ (debug)floating-window-measurement.txt
│     │  │  ├─ (debug)measurement-split-modules.txt
│     │  │  ├─ measurement(how-the-program-works).txt
│     │  │  ├─ measurement-functionality-prompt.txt
│     │  │  └─ measurement-modules.txt
│     │  ├─ measurement-modules
│     │  │  ├─ measurement-DataMaps.js
│     │  │  ├─ measurement-Main.js
│     │  │  ├─ measurement-Manager.js
│     │  │  ├─ measurement-Validator.js
│     │  │  └─ measurement-ViewHandler.js
│     │  ├─ measurements-female.html
│     │  ├─ measurements-male.html
│     │  └─ sample.html
│     ├─ order-history.html
│     ├─ services.html
│     └─ signup.html
└─ test
   ├─ alteration-module-tests
   │  ├─ alteration-TEST(about)
   │  │  ├─ (debug)alteration-test-unit.txt
   │  │  ├─ (how to use)alteration-unit-test.txt
   │  │  └─ alteration-unit-tests-prompt.txt
   │  └─ unit
   │     ├─ AlterationApp.test.js
   │     ├─ CartManager.test.js
   │     ├─ DOMRenderer.test.js
   │     ├─ EventManager.test.js
   │     ├─ PriceCalculator.test.js
   │     └─ StateManager.test.js
   └─ measurement-module-tests
      ├─ measurement-TEST(about)
      │  ├─ (debug)measurement-test-unit.txt
      │  ├─ (how to use)measurement-unit-test.txt
      │  └─ measurement-unit-tests-prompt.txt
      └─ unit
         ├─ measurement-DataMaps.test.js
         ├─ measurement-Manager.test.js
         ├─ measurement-Validator.test.js
         └─ measurement-ViewHandler.test.js
]

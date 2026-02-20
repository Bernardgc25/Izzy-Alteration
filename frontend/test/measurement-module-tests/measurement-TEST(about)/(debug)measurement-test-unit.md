

**CODE 1 - File: measurement-DataMaps.test.js**
[

]

**CODE 2 - File: measurement-Main.test.js**  
[
// test/test-measurement-Main.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { MeasurementApp } from '../../../pages/measurement-pages/measurement-modules/measurement-Main.js';
import * as DataMaps from '../../../pages/measurement-pages/measurement-modules/measurement-DataMaps.js';

describe('MeasurementApp', () => {
  let dom;
  let document;
  let app;
  let form;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <form id="measurement-form" data-gender="male">
          <input id="client-name" />
          <input id="save-date" />
          <input id="size-number" />
          <select id="cupSize"></select>
          <button id="save-measurements"></button>
          <button id="reset-form"></button>
          <button id="print-summary"></button>
          <div class="measurement-input" data-measurement="neck"></div>
        </form>
        <div id="floating-guide-overlay"></div>
        <div id="floating-measurement-guide"></div>
        <button id="close-floating-guide"></button>
        <img id="guide-image" />
        <div id="default-guide"></div>
      </body>
    `);
    global.document = dom.window.document;
    global.window = dom.window;
    global.console = { log: sinon.spy(), warn: sinon.spy(), error: sinon.spy() };
    form = document.getElementById('measurement-form');

    // Stub DataMaps.getMeasurement to return dummy data
    sinon.stub(DataMaps, 'getMeasurement').returns({ object: 'test', definition: '', description: '' });
  });

  afterEach(() => {
    sinon.restore();
    delete global.document;
    delete global.window;
    if (app && app.viewHandler) app.viewHandler.cleanup();
  });

  describe('constructor and init', () => {
    it('should initialize modules and set up event listeners', () => {
      app = new MeasurementApp();
      expect(app.manager).to.exist;
      expect(app.validator).to.exist;
      expect(app.viewHandler).to.exist;
      expect(console.log.calledWith('Measurement App initialized for male')).to.be.true;
    });

    it('should log error if form missing', () => {
      document.getElementById('measurement-form').remove();
      app = new MeasurementApp();
      expect(console.error.calledWith('Measurement form not found')).to.be.true;
    });
  });

  describe('handleSaveMeasurements', () => {
    beforeEach(() => {
      app = new MeasurementApp();
      sinon.stub(app.validator, 'validateAll').returns(true);
      sinon.stub(app.manager, 'getFormData').returns({ name: 'Test' });
      sinon.stub(app.viewHandler, 'showSuccessMessage');
    });

    it('should save and show success when validation passes', () => {
      app.handleSaveMeasurements();
      expect(app.validator.validateAll.calledOnce).to.be.true;
      expect(app.manager.getFormData.calledOnce).to.be.true;
      expect(app.viewHandler.showSuccessMessage.calledWith({ name: 'Test' })).to.be.true;
    });

    it('should focus first error and show alert if validation fails', () => {
      app.validator.validateAll.returns(false);
      sinon.stub(app.viewHandler, 'focusFirstErrorField');
      sinon.stub(app.viewHandler, 'showValidationErrorAlert');

      app.handleSaveMeasurements();

      expect(app.viewHandler.focusFirstErrorField.calledOnce).to.be.true;
      expect(app.viewHandler.showValidationErrorAlert.calledOnce).to.be.true;
    });
  });

  describe('handleResetForm', () => {
    beforeEach(() => {
      app = new MeasurementApp();
      sinon.stub(window, 'confirm').returns(true);
      sinon.stub(app.manager, 'resetFormData');
      sinon.stub(app.validator, 'clearErrors');
      sinon.stub(app.viewHandler, 'hideFloatingGuide');
    });

    it('should reset form, manager, validator, and hide guide when confirmed', () => {
      app.handleResetForm();
      expect(window.confirm.calledOnce).to.be.true;
      expect(app.manager.resetFormData.calledOnce).to.be.true;
      expect(app.validator.clearErrors.calledOnce).to.be.true;
      expect(app.viewHandler.hideFloatingGuide.calledOnce).to.be.true;
    });

    it('should not reset if confirm false', () => {
      window.confirm.returns(false);
      app.handleResetForm();
      expect(app.manager.resetFormData.called).to.be.false;
    });
  });

  describe('bindGlobalFunctions', () => {
    it('should attach handlers to window', () => {
      app = new MeasurementApp();
      expect(window.handleSaveMeasurements).to.be.a('function');
      expect(window.handleResetForm).to.be.a('function');
    });
  });

  describe('setupFormInputListeners', () => {
    it('should add input/blur listeners to name field', () => {
      app = new MeasurementApp();
      const nameField = document.getElementById('client-name');
      const inputSpy = sinon.spy(app, 'debounceValidation');
      const blurSpy = sinon.spy(app.validator, 'validateField');

      nameField.dispatchEvent(new dom.window.Event('input'));
      nameField.dispatchEvent(new dom.window.Event('blur'));

      setTimeout(() => {
        expect(inputSpy.calledWith('client-name')).to.be.true;
        expect(blurSpy.calledWith('client-name')).to.be.true;
      }, 200);
    });
  });
});
]

**CODE 3 - File: measurement-Manager.test.js**
[
// test/test-measurement-Manager.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { MeasurementManager } from '../../../pages/measurement-pages/measurement-modules/measurement-Manager.js';

describe('MeasurementManager', () => {
  let manager;
  let dom;
  let document;

  beforeEach(() => {
    // Set up a basic DOM with elements the manager expects
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <input id="client-name" value="John Doe" />
        <input id="save-date" />
        <input id="size-number" value="40" />
        <input id="cupSize" value="C" />
        <div id="measurement-form"></div>
      </body>
    `);
    global.document = dom.window.document;
    global.window = dom.window;

    manager = new MeasurementManager();
  });

  afterEach(() => {
    sinon.restore();
    delete global.document;
    delete global.window;
  });

  describe('initialize', () => {
    it('should set gender and return this', () => {
      const result = manager.initialize('male');
      expect(manager.gender).to.equal('male');
      expect(result).to.equal(manager);
    });
  });

  describe('setupDateField', () => {
    it('should set today\'s date and max attribute on #save-date', () => {
      manager.initialize('male');
      const dateField = document.getElementById('save-date');
      const today = new Date().toISOString().split('T')[0];

      manager.setupDateField();

      expect(dateField.value).to.equal(today);
      expect(dateField.max).to.equal(today);
    });

    it('should do nothing if date field not present', () => {
      document.getElementById('save-date').remove();
      expect(() => manager.setupDateField()).not.to.throw();
    });
  });

  describe('saveMeasurement', () => {
    it('should store measurement in Map when value non-empty', () => {
      manager.saveMeasurement('neck', '15.5', 'Neck:');
      expect(manager.measurements.size).to.equal(1);
      const entry = manager.measurements.get('neck');
      expect(entry.value).to.equal('15.5');
      expect(entry.label).to.equal('Neck');
      expect(entry).to.have.property('timestamp');
    });

    it('should not store empty or whitespace value', () => {
      manager.saveMeasurement('neck', '', 'Neck:');
      expect(manager.measurements.size).to.equal(0);

      manager.saveMeasurement('neck', '   ', 'Neck:');
      expect(manager.measurements.size).to.equal(0);
    });
  });

  describe('getFormData', () => {
    it('should collect all form data for male', () => {
      manager.initialize('male');
      manager.saveMeasurement('neck', '15.5', 'Neck:');
      const data = manager.getFormData();

      expect(data.name).to.equal('John Doe');
      expect(data.date).to.equal('');
      expect(data.gender).to.equal('male');
      expect(data.sizeNumber).to.equal('40');
      expect(data.cupSize).to.be.undefined; // not present for male
      expect(data.measurements).to.have.property('neck');
    });

    it('should collect all form data for female', () => {
      manager.initialize('female');
      // replace size-number with cupSize in DOM
      const sizeNum = document.getElementById('size-number');
      if (sizeNum) sizeNum.remove();
      const cup = document.createElement('input');
      cup.id = 'cupSize';
      cup.value = 'C';
      document.body.appendChild(cup);

      manager.saveMeasurement('waist', '28', 'Waist:');
      const data = manager.getFormData();

      expect(data.name).to.equal('John Doe');
      expect(data.gender).to.equal('female');
      expect(data.cupSize).to.equal('C');
      expect(data.sizeNumber).to.be.undefined;
    });
  });

  describe('generatePrintContent', () => {
    it('should return HTML string containing measurement data', () => {
      manager.initialize('male');
      manager.formData = {
        name: 'John',
        date: '2025-01-01',
        gender: 'male',
        sizeNumber: '40',
        measurements: new Map([['neck', { label: 'Neck', value: '15.5' }]])
      };
      const html = manager.generatePrintContent();
      expect(html).to.include('John');
      expect(html).to.include('2025-01-01');
      expect(html).to.include('Neck:');
      expect(html).to.include('15.5"');
    });
  });

  describe('printSummary', () => {
    it('should open a window and write content', () => {
      const openStub = sinon.stub(window, 'open').returns({
        document: { write: sinon.spy(), close: sinon.spy() }
      });
      manager.initialize('male');
      manager.getFormData(); // populate formData

      manager.printSummary();

      expect(openStub.calledOnce).to.be.true;
      const mockWindow = openStub.returnValues[0];
      expect(mockWindow.document.write.calledOnce).to.be.true;
      expect(mockWindow.document.close.calledOnce).to.be.true;
    });

    it('should throw error if popup blocked', () => {
      sinon.stub(window, 'open').returns(null);
      manager.initialize('male');
      expect(() => manager.printSummary()).to.throw('Popup blocked');
    });
  });

  describe('resetFormData', () => {
    it('should clear measurements map and formData', () => {
      manager.saveMeasurement('neck', '15', 'Neck');
      manager.formData = { some: 'data' };
      manager.resetFormData();
      expect(manager.measurements.size).to.equal(0);
      expect(manager.formData).to.deep.equal({});
    });
  });
});
]  

**CODE 4 - File: measurement-Validator.test.js**
[
// test/test-measurement-Validator.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { MeasurementValidator } from '../../../pages/measurement-pages/measurement-modules/measurement-Validator.js';

describe('MeasurementValidator', () => {
  let dom;
  let document;
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
    global.document = dom.window.document;
    global.window = dom.window;
    form = document.getElementById('measurement-form');
    validator = new MeasurementValidator(form);
  });

  afterEach(() => {
    sinon.restore();
    delete global.document;
    delete global.window;
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
]  

**CODE 5 - File: measurement-ViewHandler.test.js**
[
// test/test-measurement-ViewHandler.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { ViewHandler } from '../../../pages/measurement-pages/measurement-modules/measurement-ViewHandler.js';

describe('ViewHandler', () => {
  let dom;
  let document;
  let viewHandler;
  let getMeasurementStub;
  const genderImageUrl = 'test.jpg';

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <img id="guide-image" />
        <div id="default-guide" style="display: flex;"></div>
        <div id="guide-text-container">
          <div id="measure-object"></div>
          <div id="measure-definition"></div>
          <div id="measure-description"></div>
        </div>
        <div id="floating-measurement-guide" style="display: none;">
          <div id="floating-measure-object"></div>
          <div id="floating-measure-definition"></div>
          <div id="floating-measure-description"></div>
          <div class="floating-guide-images"></div>
        </div>
        <div id="floating-guide-overlay" style="display: none;"></div>
        <button id="print-summary"></button>

        <div class="measurement-label">
          <i class="fa-eye"></i>
        </div>
        <div class="form-group">
          <input class="measurement-input" data-measurement="neck" />
        </div>
      </body>
    `);
    global.document = dom.window.document;
    global.window = dom.window;

    getMeasurementStub = sinon.stub();
    getMeasurementStub.withArgs('neck').returns({
      object: 'Neck',
      definition: 'def',
      description: 'desc',
      imageMobile: 'neck.jpg'
    });

    viewHandler = new ViewHandler({
      gender: 'male',
      isMobileView: false,
      getMeasurement: getMeasurementStub,
      genderImageUrl
    });
  });

  afterEach(() => {
    viewHandler.cleanup();
    sinon.restore();
    delete global.document;
    delete global.window;
  });

  describe('constructor', () => {
    it('should set properties and call init', () => {
      expect(viewHandler.gender).to.equal('male');
      expect(viewHandler.isMobileView).to.be.false;
      expect(viewHandler.genderImageUrl).to.equal(genderImageUrl);
    });
  });

  describe('setupDesktopGuideImage', () => {
    it('should set guide image src when genderImageUrl exists', () => {
      const guideImage = document.getElementById('guide-image');
      const defaultGuide = document.getElementById('default-guide');
      viewHandler.setupDesktopGuideImage();
      expect(guideImage.src).to.include(genderImageUrl);
      expect(guideImage.style.display).to.equal('block');
      expect(defaultGuide.style.display).to.equal('none');
    });

    it('should hide guide image and show default if no url', () => {
      viewHandler.genderImageUrl = null;
      viewHandler.setupDesktopGuideImage();
      const guideImage = document.getElementById('guide-image');
      const defaultGuide = document.getElementById('default-guide');
      expect(guideImage.style.display).to.equal('none');
      expect(defaultGuide.style.display).to.equal('flex');
    });
  });

  describe('showMeasurementGuide', () => {
    it('should update guide text with measurement data', () => {
      viewHandler.showMeasurementGuide('neck');
      const objEl = document.getElementById('measure-object');
      expect(objEl.innerHTML).to.include('Neck');
    });
  });

  describe('showFloatingGuide', () => {
    it('should update text, image, and show overlay/guide', async () => {
      await viewHandler.showFloatingGuide('neck');
      const objEl = document.getElementById('floating-measure-object');
      expect(objEl.innerHTML).to.include('Neck');
      const imgContainer = document.querySelector('.floating-guide-images');
      expect(imgContainer.children.length).to.equal(1);
      expect(imgContainer.children[0].src).to.include('neck.jpg');
      expect(document.getElementById('floating-guide-overlay').style.display).to.equal('block');
      expect(document.getElementById('floating-measurement-guide').style.display).to.equal('flex');
    });
  });

  describe('hideFloatingGuide', () => {
    it('should hide overlay and guide', () => {
      viewHandler.hideFloatingGuide();
      expect(document.getElementById('floating-guide-overlay').style.display).to.equal('none');
      expect(document.getElementById('floating-measurement-guide').style.display).to.equal('none');
    });
  });

  describe('setupEyeIconListeners', () => {
    it('should attach click handler to eye icons', () => {
      const callback = sinon.spy();
      viewHandler.setupEyeIconListeners(callback);
      const eyeIcon = document.querySelector('.fa-eye');
      eyeIcon.click();
      expect(callback.calledOnce).to.be.true;
      expect(callback.args[0][0]).to.equal('neck');
    });
  });

  describe('setupWindowResizeListener', () => {
    it('should debounce and call callback when crossing breakpoint', (done) => {
      const callback = sinon.spy();
      viewHandler.setupWindowResizeListener(callback);

      // Simulate resize to mobile width
      sinon.stub(viewHandler, 'isMobileView').value(true);
      window.innerWidth = 800; // less than 992
      window.dispatchEvent(new dom.window.Event('resize'));

      setTimeout(() => {
        expect(callback.calledOnce).to.be.true;
        expect(callback.args[0][0]).to.be.true; // newIsMobileView = true
        done();
      }, 250);
    });
  });

  describe('setupEscapeKeyListener', () => {
    it('should call callback on Escape key', () => {
      const callback = sinon.spy();
      viewHandler.setupEscapeKeyListener(callback);
      const event = new dom.window.KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      expect(callback.calledOnce).to.be.true;
    });
  });

  describe('setupPrintButtonListener', () => {
    it('should call callback when print button clicked', () => {
      const callback = sinon.spy();
      viewHandler.setupPrintButtonListener(callback);
      document.getElementById('print-summary').click();
      expect(callback.calledOnce).to.be.true;
    });

    it('should show alert if callback throws', () => {
      const alertStub = sinon.stub(viewHandler, 'showAlert');
      const callback = sinon.stub().throws(new Error('fail'));
      viewHandler.setupPrintButtonListener(callback);
      document.getElementById('print-summary').click();
      expect(alertStub.calledWith('fail')).to.be.true;
    });
  });

  describe('image zoom/pan', () => {
    it('should handle wheel zoom', () => {
      const image = document.getElementById('guide-image');
      const container = image.parentElement;
      const wheelEvent = new dom.window.WheelEvent('wheel', { deltaY: -100, clientX: 50, clientY: 50 });
      sinon.spy(viewHandler, 'handleZoom');
      container.dispatchEvent(wheelEvent);
      expect(viewHandler.handleZoom.calledOnce).to.be.true;
    });

    it('should update transform on pan', () => {
      const image = document.getElementById('guide-image');
      const container = image.parentElement;
      viewHandler.zoomState.isDragging = true;
      const mousemove = new dom.window.MouseEvent('mousemove', { clientX: 10, clientY: 10 });
      container.dispatchEvent(mousemove);
      // no assertion on transform because it depends on state, just ensure no error
    });
  });

  describe('cleanup', () => {
    it('should remove all event listeners and clear timers', () => {
      const removeSpy = sinon.spy(window, 'removeEventListener');
      viewHandler.setupWindowResizeListener(() => {});
      viewHandler.cleanup();
      expect(removeSpy.called).to.be.true;
    });
  });

  describe('showAlert, showValidationErrorAlert, showSuccessMessage', () => {
    it('showAlert should call window.alert', () => {
      const alertStub = sinon.stub(window, 'alert');
      viewHandler.showAlert('test');
      expect(alertStub.calledWith('test')).to.be.true;
    });

    it('showValidationErrorAlert should alert specific message', () => {
      const alertStub = sinon.stub(window, 'alert');
      viewHandler.showValidationErrorAlert();
      expect(alertStub.calledWith('Please fill in all required fields correctly. Invalid fields are highlighted in red.')).to.be.true;
    });

    it('showSuccessMessage should alert with form data', () => {
      const alertStub = sinon.stub(window, 'alert');
      viewHandler.showSuccessMessage({ name: 'John', date: '2025', measurements: { a: 1 } });
      expect(alertStub.calledOnce).to.be.true;
    });
  });

  describe('focusFirstErrorField', () => {
    it('should focus element with error class', () => {
      const input = document.getElementById('guide-image'); // any element
      input.classList.add('error');
      const focusSpy = sinon.spy(input, 'focus');
      viewHandler.focusFirstErrorField();
      expect(focusSpy.calledOnce).to.be.true;
    });
  });
});
]  

**CODE 6 - File: package.json**  
[ 
{
  "scripts": {
    "test": "mocha",
    "test:alteration": "mocha test/alteration-module-tests/unit/**/*.test.js",
    "test:alteration:watch": "mocha --watch test/alteration-module-tests/unit/**/*.test.js",
    "test:measurement": "mocha test/measurement-module-tests/unit/**/*.test.js",
    "test:measurement:watch": "mocha --watch test/measurement-module-tests/unit/**/*.test.js",
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

**CODE 7 - File: readme.md(file structure)**  
[
Izzy-Alteration
├─ about
│  ├─ deepseek
│  │  └─ alteration-female.txt
│  └─ measurements-about.txt
└─ frontend
   ├─ package-lock.json
   ├─ package.json
   ├─ pages
   │  ├─ account-menu.html
   │  ├─ add-service.html
   │  ├─ alteration-pages
   │  │  ├─ alteration-about
   │  │  │  ├─ (debug)alteration-modules.md
   │  │  │  ├─ alteration(how-the-program-works).md
   │  │  │  ├─ alteration-functionality-prompt.md
   │  │  │  ├─ alteration-modules.md
   │  │  │  └─ alteration-responsive-page.md
   │  │  ├─ alteration-female-bottom.html
   │  │  ├─ alteration-female-dress.html
   │  │  ├─ alteration-female-jacket.html
   │  │  ├─ alteration-female-top.html
   │  │  ├─ alteration-male-bottom.html
   │  │  ├─ alteration-male-suits.html
   │  │  ├─ alteration-male-top.html
   │  │  ├─ alteration-modules
   │  │  │  ├─ alteration-CartManager.js
   │  │  │  ├─ alteration-DOMRenderer.js
   │  │  │  ├─ alteration-DataMaps.js
   │  │  │  ├─ alteration-EventManager.js
   │  │  │  ├─ alteration-Main.js
   │  │  │  ├─ alteration-PriceCalculator.js
   │  │  │  └─ alteration-StateManager.js
   │  │  └─ alteration-repair.html
   │  ├─ index.html
   │  ├─ login.html
   │  ├─ measurement-pages
   │  │  ├─ measurement-about
   │  │  │  ├─ (debug)floating-window-measurement.md
   │  │  │  ├─ (debug)measurement-split-modules.md
   │  │  │  ├─ (refactor)measurement-modules.md
   │  │  │  ├─ measurement(how-the-program-works).md
   │  │  │  ├─ measurement-functionality-prompt.md
   │  │  │  └─ measurement-modules.md
   │  │  ├─ measurement-modules
   │  │  │  ├─ measurement-DataMaps.js
   │  │  │  ├─ measurement-Main.js
   │  │  │  ├─ measurement-Manager.js
   │  │  │  ├─ measurement-Validator.js
   │  │  │  └─ measurement-ViewHandler.js
   │  │  ├─ measurements-female.html
   │  │  ├─ measurements-male.html
   │  │  └─ sample.html
   │  ├─ order-history.html
   │  ├─ services.html
   │  └─ signup.html
   ├─ public
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
   │  └─ js
   │     ├─ account.js
   │     ├─ add-service.js
   │     ├─ alteration-female.js
   │     ├─ alteration-price-calculator.js
   │     ├─ index.js
   │     ├─ login.js
   │     ├─ order-history.js
   │     ├─ services.js
   │     └─ signup.js
   └─ test
      ├─ TEST(how to run).md
      ├─ alteration-module-tests
      │  ├─ alteration-TEST(about)
      │  │  ├─ (debug)alteration-test-unit.md
      │  │  └─ alteration-unit-tests-prompt.md
      │  └─ unit
      │     ├─ AlterationApp.test.js
      │     ├─ CartManager.test.js
      │     ├─ DOMRenderer.test.js
      │     ├─ EventManager.test.js
      │     ├─ PriceCalculator.test.js
      │     └─ StateManager.test.js
      └─ measurement-module-tests
         ├─ measurement-TEST(about)
         │  ├─ (debug)measurement-test-unit.md
         │  ├─ (refactor)measurement-test-unit.md
         │  └─ measurement-unit-tests-prompt.md
         └─ unit
            ├─ measurement-DataMaps.test.js
            ├─ measurement-Main.test.js
            ├─ measurement-Manager.test.js
            ├─ measurement-Validator.test.js
            └─ measurement-ViewHandler.test.js

]
  



**ERROR/ISSUE:**
[
bernard@ubuntu:~/Documents/Izzy-Alteration/frontend$ npm run test:measurement

> test:measurement
> mocha test/measurement-module-tests/unit/**/*.test.js


 Exception during run: ReferenceError: document is not defined
    at file:///home/bernard/Documents/Izzy-Alteration/frontend/pages/measurement-pages/measurement-modules/measurement-Main.js:217:1
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async importModuleDynamicallyWrapper (node:internal/vm/module:438:15)
    at async formattedImport (/home/bernard/Documents/Izzy-Alteration/frontend/node_modules/mocha/lib/nodejs/esm-utils.js:9:14)
    at async Object.exports.requireOrImport (/home/bernard/Documents/Izzy-Alteration/frontend/node_modules/mocha/lib/nodejs/esm-utils.js:42:28)
    at async Object.exports.loadFilesAsync (/home/bernard/Documents/Izzy-Alteration/frontend/node_modules/mocha/lib/nodejs/esm-utils.js:100:20)
    at async singleRun (/home/bernard/Documents/Izzy-Alteration/frontend/node_modules/mocha/lib/cli/run-helpers.js:162:3)
    at async Object.exports.handler (/home/bernard/Documents/Izzy-Alteration/frontend/node_modules/mocha/lib/cli/run.js:375:5)
]

**REQUEST:**
[
    1. fix what is causing the error

]
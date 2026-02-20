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
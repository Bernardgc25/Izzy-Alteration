// test/test-measurement-Manager.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { MeasurementManager } from '../../../pages/measurement-pages/measurement-modules/measurement-Manager.js';

describe('MeasurementManager', () => {
  let manager;
  let dom;

  beforeEach(() => {
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
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.alert = dom.window.alert;

    manager = new MeasurementManager();
  });

  afterEach(() => {
    sinon.restore();
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.alert;
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
      expect(data.cupSize).to.be.undefined;
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
      // Populate measurements map directly (not formData)
      manager.measurements.set('neck', { label: 'Neck', value: '15.5' });
      manager.formData = {
        name: 'John',
        date: '2025-01-01',
        gender: 'male',
        sizeNumber: '40',
        measurements: {} // not used
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
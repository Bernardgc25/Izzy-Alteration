import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import AlterationApp from '../../../pages/alteration-pages/alteration-modules/alteration-Main.js';

describe('AlterationApp', () => {
  let dom;
  let document;
  let app;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <span id="priceCalculation"></span>
        <p id="alteration-note"></p>
        <p id="alteration-description"></p>
        <p id="alteration-customer-request"></p>
        <p id="alteration-type"></p>
        <p id="alteration-level"></p>
        <select id="alteration-top-Select"></select>
        <select id="alterationLevel-diff"></select>
      </body>
    `);
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;               // make window available globally
    global.alert = sinon.stub();               // stub alert on the global object

    app = new AlterationApp();
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.alert;
    sinon.restore();
  });

  // ... other tests remain unchanged ...

  describe('global handlers', () => {
    beforeEach(() => {
      app.setupGlobalHandlers();
    });

    it('handleAdd should add item to cart when valid state', () => {
      app.stateManager.setState({
        currentPrice: 45,
        selectedAlteration: 'test',
        selectedDifficulty: 'simple'
      });
      const addItemSpy = sinon.spy(app.cartManager, 'addItem');

      // Call the handler attached to window
      window.handleAdd();

      expect(addItemSpy.calledOnceWith('Alteration: test (simple)', 45)).to.be.true;
      expect(global.alert.calledOnce).to.be.true;
    });

    it('handleAdd should alert if no valid alteration', () => {
      app.stateManager.setState({ currentPrice: 0 });
      const addItemSpy = sinon.spy(app.cartManager, 'addItem');

      window.handleAdd();

      expect(addItemSpy.notCalled).to.be.true;
      expect(global.alert.calledWith('Please select a valid alteration and difficulty level first.')).to.be.true;
    });

    it('handleClear should call reset', () => {
      const resetSpy = sinon.spy(app, 'reset');
      window.handleClear();
      expect(resetSpy.calledOnce).to.be.true;
    });
  });
});
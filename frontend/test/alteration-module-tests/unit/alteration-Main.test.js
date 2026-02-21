import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import AlterationApp from '../../../pages/alteration-pages/alteration-modules/alteration-Main.js';

// Mock dependent modules (we only need to check that they are instantiated and wired)
describe('AlterationApp', () => {
  let dom;
  let document;
  let app;

  beforeEach(() => {
    // Basic DOM for the app to attach to (though Main doesn't directly use DOM in constructor)
    dom = new JSDOM('<!DOCTYPE html><body></body>');
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;

    // Stub global alert
    global.alert = sinon.stub();

    app = new AlterationApp();
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.alert;
    sinon.restore();
  });

  it('should instantiate all sub-modules', () => {
    expect(app.stateManager).to.exist;
    expect(app.priceCalculator).to.exist;
    expect(app.domRenderer).to.exist;
    expect(app.cartManager).to.exist;
    expect(app.eventManager).to.exist;
  });

  it('should set up subscription from stateManager to domRenderer', () => {
    const renderSpy = sinon.spy(app.domRenderer, 'render');
    app.stateManager.setState({ currentPrice: 123 });
    expect(renderSpy.calledOnce).to.be.true;
  });

  it('initialize() should call eventManager.initialize', () => {
    const initSpy = sinon.spy(app.eventManager, 'initialize');
    app.initialize();
    expect(initSpy.calledOnce).to.be.true;
  });

  describe('global handlers', () => {
    beforeEach(() => {
      // Mock window functions are attached in setupGlobalHandlers
      app.setupGlobalHandlers();
    });

    it('handleAdd should add item to cart when valid state', () => {
      app.stateManager.setState({
        currentPrice: 45,
        selectedAlteration: 'test',
        selectedDifficulty: 'simple'
      });
      const addItemSpy = sinon.spy(app.cartManager, 'addItem');

      global.handleAdd();

      expect(addItemSpy.calledOnceWith('Alteration: test (simple)', 45)).to.be.true;
      expect(global.alert.calledOnce).to.be.true;
    });

    it('handleAdd should alert if no valid alteration', () => {
      app.stateManager.setState({ currentPrice: 0 });
      const addItemSpy = sinon.spy(app.cartManager, 'addItem');

      global.handleAdd();

      expect(addItemSpy.notCalled).to.be.true;
      expect(global.alert.calledWith('Please select a valid alteration and difficulty level first.')).to.be.true;
    });

    it('handleClear should call reset', () => {
      const resetSpy = sinon.spy(app, 'reset');
      global.handleClear();
      expect(resetSpy.calledOnce).to.be.true;
    });
  });

  it('reset should reset state and selects', () => {
    const stateResetSpy = sinon.spy(app.stateManager, 'reset');
    const rendererResetSpy = sinon.spy(app.domRenderer, 'resetSelects');
    app.eventManager.alterationSelects = [];
    app.eventManager.difficultySelect = null;

    app.reset();

    expect(stateResetSpy.calledOnce).to.be.true;
    expect(rendererResetSpy.calledOnce).to.be.true;
  });

  it('destroy should clean up eventManager', () => {
    const cleanupSpy = sinon.spy(app.eventManager, 'cleanup');
    app.destroy();
    expect(cleanupSpy.calledOnce).to.be.true;
  });
});
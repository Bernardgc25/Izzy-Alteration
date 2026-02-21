import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import EventManager from '../../../pages/alteration-pages/alteration-modules/alteration-EventManager.js';

describe('EventManager', () => {
  let dom;
  let document;
  let stateManagerMock;
  let priceCalculatorMock;
  let domRendererMock;
  let eventManager;
  let alterationSelects;
  let difficultySelect;

  beforeEach(() => {
    // Create DOM with necessary selects
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <select id="alteration-top-Select"></select>
        <select id="alterationLevel-diff"></select>
      </body>
    `);
    document = dom.window.document;
    global.document = document;

    // Mocks
    stateManagerMock = {
      getState: sinon.stub().returns({ selectedDifficulty: null }),
      setState: sinon.spy()
    };
    priceCalculatorMock = {
      calculatePrice: sinon.stub().returns(99),
      getAlterationDetails: sinon.stub().returns({ detail: 'mock detail' })
    };
    domRendererMock = {};

    // Create instance
    eventManager = new EventManager(stateManagerMock, priceCalculatorMock, domRendererMock);
    alterationSelects = eventManager.alterationSelects;
    difficultySelect = eventManager.difficultySelect;
  });

  afterEach(() => {
    delete global.document;
    sinon.restore();
  });

  it('should initialize event listeners', () => {
    const addEventListenerSpy = sinon.spy(document.querySelector('#alteration-top-Select'), 'addEventListener');
    const diffSpy = sinon.spy(document.querySelector('#alterationLevel-diff'), 'addEventListener');

    eventManager.initialize();

    expect(addEventListenerSpy.calledOnceWith('change', eventManager.handleAlterationChange)).to.be.true;
    expect(diffSpy.calledOnceWith('change', eventManager.handleDifficultyChange)).to.be.true;
  });

  it('should handle alteration change with value', () => {
    const fakeEvent = { target: { value: 'repair-zippers-on-dress' } };
    stateManagerMock.getState.returns({ selectedDifficulty: 'simple' });
    priceCalculatorMock.calculatePrice.withArgs('repair-zippers-on-dress', 'simple').returns(30);
    priceCalculatorMock.getAlterationDetails.withArgs('repair-zippers-on-dress').returns({ detail: 'test' });

    eventManager.handleAlterationChange(fakeEvent);

    expect(stateManagerMock.setState.calledWith({
      selectedAlteration: 'repair-zippers-on-dress',
      currentPrice: 30,
      alterationDetails: { detail: 'test' },
      lastSelectedElement: fakeEvent.target
    })).to.be.true;
  });

  it('should handle alteration change with empty value', () => {
    const fakeEvent = { target: { value: '' } };
    eventManager.handleAlterationChange(fakeEvent);

    expect(stateManagerMock.setState.calledWith({
      selectedAlteration: null,
      currentPrice: 0,
      alterationDetails: null
    })).to.be.true;
  });

  it('should handle difficulty change with value', () => {
    const fakeEvent = { target: { value: 'intermediate' } };
    stateManagerMock.getState.returns({ selectedAlteration: 'repair-zippers-on-dress' });
    priceCalculatorMock.calculatePrice.withArgs('repair-zippers-on-dress', 'intermediate').returns(0); // intermediate price may be zero
    priceCalculatorMock.getAlterationDetails.withArgs('repair-zippers-on-dress').returns({ detail: 'test' });

    eventManager.handleDifficultyChange(fakeEvent);

    expect(stateManagerMock.setState.calledWith({
      selectedDifficulty: 'intermediate',
      currentPrice: 0,
      alterationDetails: { detail: 'test' }
    })).to.be.true;
  });

  it('should handle difficulty change with empty value', () => {
    const fakeEvent = { target: { value: '' } };
    eventManager.handleDifficultyChange(fakeEvent);

    expect(stateManagerMock.setState.calledWith({
      selectedDifficulty: null,
      currentPrice: 0
    })).to.be.true;
  });

  it('should reset other selects except current and difficulty', () => {
    const select1 = document.createElement('select');
    select1.id = 'select1';
    select1.value = 'val1';
    const select2 = document.createElement('select');
    select2.id = 'select2';
    select2.value = 'val2';
    const diff = document.createElement('select');
    diff.id = 'alterationLevel-diff';
    diff.value = 'simple';

    // Manually assign to eventManager's alterationSelects for this test
    eventManager.alterationSelects = [select1, select2, diff];

    eventManager.resetOtherSelects(select1);

    expect(select1.value).to.equal('val1'); // unchanged
    expect(select2.value).to.equal(''); // reset
    expect(diff.value).to.equal('simple'); // not reset because id is 'alterationLevel-diff'
  });

  it('should clean up event listeners', () => {
    const removeEventListenerSpy = sinon.spy(document.querySelector('#alteration-top-Select'), 'removeEventListener');
    const diffSpy = sinon.spy(document.querySelector('#alterationLevel-diff'), 'removeEventListener');

    eventManager.cleanup();

    expect(removeEventListenerSpy.calledOnceWith('change', eventManager.handleAlterationChange)).to.be.true;
    expect(diffSpy.calledOnceWith('change', eventManager.handleDifficultyChange)).to.be.true;
  });
});
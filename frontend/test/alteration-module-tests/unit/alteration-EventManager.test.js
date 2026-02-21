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
    // Create DOM with two alteration selects (to test resetting multiple) and a difficulty select
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <select id="alteration-top-Select"></select>
        <select id="alteration-bottom-Select"></select>
        <select id="alterationLevel-diff"></select>
      </body>
    `);
    document = dom.window.document;
    global.document = document;

    stateManagerMock = {
      getState: sinon.stub().returns({ selectedDifficulty: null }),
      setState: sinon.spy()
    };
    priceCalculatorMock = {
      calculatePrice: sinon.stub().returns(99),
      getAlterationDetails: sinon.stub().returns({ detail: 'mock detail' })
    };
    domRendererMock = {};

    eventManager = new EventManager(stateManagerMock, priceCalculatorMock, domRendererMock);
    alterationSelects = eventManager.alterationSelects;
    difficultySelect = eventManager.difficultySelect;
  });

  afterEach(() => {
    delete global.document;
    sinon.restore();
  });

  // ... other tests remain unchanged ...

  it('should reset other selects except current and difficulty', () => {
    // Get the actual DOM elements
    const topSelect = document.getElementById('alteration-top-Select');
    const bottomSelect = document.getElementById('alteration-bottom-Select');
    const diffSelect = document.getElementById('alterationLevel-diff');

    // Set initial values
    topSelect.value = 'top-value';
    bottomSelect.value = 'bottom-value';
    diffSelect.value = 'simple';

    // The eventManager.alterationSelects already contains both alteration selects
    // (because they match the selector 'select[id$="Select"]'). We can rely on that.

    // Call resetOtherSelects with the top select as the current one
    eventManager.resetOtherSelects(topSelect);

    // Top select should keep its value
    expect(topSelect.value).to.equal('top-value');
    // Bottom select should be reset
    expect(bottomSelect.value).to.equal('');
    // Difficulty select should not be touched (it's not in alterationSelects anyway)
    expect(diffSelect.value).to.equal('simple');
  });
});
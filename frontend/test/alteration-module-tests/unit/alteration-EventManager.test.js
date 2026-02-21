import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import EventManager from '../../../pages/alteration-pages/alteration-modules/alteration-EventManager.js';

describe('alteration-EventManager.js', () => {
  let dom;
  let document;
  let stateManagerMock;
  let priceCalculatorMock;
  let domRendererMock;
  let eventManager;
  let alterationSelects;
  let difficultySelect;

  beforeEach(() => {
    // Create DOM with selects that include options so value assignments work
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <select id="alteration-top-Select">
          <option value="top-value">Top</option>
          <option value="other">Other</option>
        </select>
        <select id="alteration-bottom-Select">
          <option value="bottom-value">Bottom</option>
          <option value="other">Other</option>
        </select>
        <select id="alterationLevel-diff">
          <option value="simple">Simple</option>
          <option value="intermediate">Intermediate</option>
        </select>
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
    const topSelect = document.getElementById('alteration-top-Select');
    const bottomSelect = document.getElementById('alteration-bottom-Select');
    const diffSelect = document.getElementById('alterationLevel-diff');

    // Set initial values (now options exist, so values stick)
    topSelect.value = 'top-value';
    bottomSelect.value = 'bottom-value';
    diffSelect.value = 'simple';

    eventManager.resetOtherSelects(topSelect);

    // Top select should keep its value
    expect(topSelect.value).to.equal('top-value');
    // Bottom select should be reset
    expect(bottomSelect.value).to.equal('');
    // Difficulty select should not be touched
    expect(diffSelect.value).to.equal('simple');
  });
});
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import DOMRenderer from '../../../pages/alteration-pages/alteration-modules/alteration-DataMaps.js';

describe('DOMRenderer', () => {
  let dom;
  let document;
  let renderer;

  beforeEach(() => {
    // Set up a fake DOM with required elements
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <span id="priceCalculation"></span>
        <p id="alteration-note"></p>
        <p id="alteration-description"></p>
        <p id="alteration-customer-request"></p>
        <p id="alteration-type"></p>
        <p id="alteration-level"></p>
      </body>
    `);
    document = dom.window.document;
    global.document = document; // needed for DOMRenderer's constructor
    renderer = new DOMRenderer();
  });

  afterEach(() => {
    delete global.document;
  });

  it('should clear all display elements', () => {
    document.getElementById('priceCalculation').textContent = 'old';
    document.getElementById('alteration-note').textContent = 'old';
    renderer.clearDisplay();
    expect(document.getElementById('priceCalculation').textContent).to.equal('');
    expect(document.getElementById('alteration-note').textContent).to.equal('');
  });

  it('should render state with price and details', () => {
    const state = {
      selectedAlteration: 'test-alteration',
      selectedDifficulty: 'simple',
      currentPrice: 42.5,
      alterationDetails: { detail: 'Test detail' }
    };
    renderer.render(state);

    expect(document.getElementById('priceCalculation').textContent).to.equal('$42.50');
    expect(document.getElementById('alteration-note').textContent).to.contain('Prices are determined');
    expect(document.getElementById('alteration-description').textContent).to.equal('• Test detail');
    expect(document.getElementById('alteration-type').textContent).to.equal('Alteration type: test-alteration');
    expect(document.getElementById('alteration-level').textContent).to.equal('Alteration level: simple');
  });

  it('should render customer request text for intermediate difficulty', () => {
    const state = {
      selectedAlteration: 'a',
      selectedDifficulty: 'intermediate',
      currentPrice: 10,
      alterationDetails: { detail: 'x' }
    };
    renderer.render(state);
    expect(document.getElementById('alteration-customer-request').textContent).to.equal('• plus (1) customer-requested modification');
  });

  it('should render customer request text for difficult difficulty', () => {
    const state = {
      selectedAlteration: 'a',
      selectedDifficulty: 'difficult',
      currentPrice: 10,
      alterationDetails: { detail: 'x' }
    };
    renderer.render(state);
    expect(document.getElementById('alteration-customer-request').textContent).to.equal('• plus (2) customer-requested modification');
  });

  it('should show n/a when price is zero', () => {
    const state = {
      selectedAlteration: null,
      selectedDifficulty: null,
      currentPrice: 0,
      alterationDetails: null
    };
    renderer.render(state);
    expect(document.getElementById('priceCalculation').textContent).to.equal('n/a');
    expect(document.getElementById('alteration-note').textContent).to.equal(' ');
  });

  it('should reset select elements', () => {
    const select1 = document.createElement('select');
    select1.id = 'select1';
    const select2 = document.createElement('select');
    select2.id = 'select2';
    const difficultySelect = document.createElement('select');
    difficultySelect.id = 'alterationLevel-diff';

    select1.value = 'something';
    select2.value = 'else';
    difficultySelect.value = 'simple';

    renderer.resetSelects([select1, select2], difficultySelect);
    expect(select1.value).to.equal('');
    expect(select2.value).to.equal('');
    expect(difficultySelect.value).to.equal('');
  });
});
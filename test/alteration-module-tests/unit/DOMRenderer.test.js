// test/alteration-module-tests/DOMRenderer.test.js
import assert from 'assert';
import { JSDOM } from 'jsdom';
import DOMRenderer from '../../src/pages/alteration-pages/alteration-modules/alteration-DOMRenderer.js';

// Create a mock DOM environment
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="priceCalculation"></div>
      <div id="alteration-note"></div>
      <div id="alteration-description"></div>
      <div id="alteration-customer-request"></div>
      <div id="alteration-type"></div>
      <div id="alteration-level"></div>
    </body>
  </html>
`);

global.document = dom.window.document;

describe('DOMRenderer', () => {
  let domRenderer;

  beforeEach(() => {
    domRenderer = new DOMRenderer();
    
    // Reset DOM elements
    Object.values(domRenderer.elements).forEach(el => {
      if (el) el.textContent = 'initial';
    });
  });

  describe('Constructor', () => {
    it('should cache DOM elements', () => {
      assert.ok(domRenderer.elements.priceElement);
      assert.ok(domRenderer.elements.noteElement);
      assert.ok(domRenderer.elements.descriptionElement);
      assert.strictEqual(domRenderer.elements.priceElement.id, 'priceCalculation');
    });
  });

  describe('clearDisplay()', () => {
    it('should clear all display elements', () => {
      domRenderer.clearDisplay();
      
      Object.values(domRenderer.elements).forEach(element => {
        assert.strictEqual(element.textContent, '');
      });
    });
  });

  describe('render()', () => {
    const mockState = {
      selectedAlteration: 'female-bottom-hem-skirt-straight-slim',
      selectedDifficulty: 'simple',
      currentPrice: 33.00,
      alterationDetails: {
        detail: 'Shorten hem on straight or slim skirt',
        simple: 33,
        intermediate: 44,
        difficult: 55
      }
    };

    it('should render price and details when price > 0', () => {
      domRenderer.render(mockState);
      
      assert.strictEqual(domRenderer.elements.priceElement.textContent, '$33.00');
      assert.strictEqual(domRenderer.elements.noteElement.textContent.includes('Prices are determined'), true);
      assert.strictEqual(domRenderer.elements.descriptionElement.textContent.includes('Shorten hem'), true);
    });

    it('should show n/a when price is 0', () => {
      domRenderer.render({
        selectedAlteration: null,
        selectedDifficulty: null,
        currentPrice: 0,
        alterationDetails: null
      });
      
      assert.strictEqual(domRenderer.elements.priceElement.textContent, 'n/a');
      assert.strictEqual(domRenderer.elements.noteElement.textContent, ' ');
    });

    it('should update customer request for intermediate difficulty', () => {
      const stateWithIntermediate = {
        ...mockState,
        selectedDifficulty: 'intermediate',
        currentPrice: 44.00
      };
      
      domRenderer.render(stateWithIntermediate);
      
      assert.strictEqual(
        domRenderer.elements.customerRequestElement.textContent,
        '• plus (1) customer-requested modification'
      );
    });

    it('should update type and level elements', () => {
      domRenderer.render(mockState);
      
      assert.strictEqual(
        domRenderer.elements.typeElement.textContent,
        'Alteration type: female-bottom-hem-skirt-straight-slim'
      );
      assert.strictEqual(
        domRenderer.elements.levelElement.textContent,
        'Alteration level: simple'
      );
    });
  });

  describe('getCustomerRequestText()', () => {
    it('should return correct text for each difficulty', () => {
      assert.strictEqual(
        domRenderer.getCustomerRequestText('intermediate'),
        '• plus (1) customer-requested modification'
      );
      assert.strictEqual(
        domRenderer.getCustomerRequestText('difficult'),
        '• plus (2) customer-requested modification'
      );
      assert.strictEqual(domRenderer.getCustomerRequestText('simple'), '');
      assert.strictEqual(domRenderer.getCustomerRequestText('invalid'), '');
    });
  });
});
// test/alteration-module-tests/EventManager.test.js
import assert from 'assert';
import { JSDOM } from 'jsdom';
import { describe, it, beforeEach } from 'mocha';
import EventManager from '../../../src/pages/alteration-pages/alteration-modules/alteration-EventManager.js';

// Mock dependencies
class MockStateManager {
  constructor() {
    this.state = {};
    this.setState = (updates) => {
      this.state = { ...this.state, ...updates };
    };
    this.getState = () => ({ ...this.state });
  }
}

class MockPriceCalculator {
  calculatePrice(alteration, difficulty) {
    return alteration && difficulty ? 50 : 0;
  }
  
  getAlterationDetails() {
    return { detail: 'Test detail' };
  }
}

class MockDOMRenderer {
  clearDisplay() {}
  render() {}
  resetSelects() {}
}

describe('EventManager', () => {
  let eventManager;
  let mockStateManager;
  let mockPriceCalculator;
  let mockDOMRenderer;
  let dom;

  beforeEach(() => {
    // Create DOM with select elements
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <select id="alteration1Select">
            <option value=""></option>
            <option value="test1">Test 1</option>
          </select>
          <select id="alteration2Select">
            <option value=""></option>
            <option value="test2">Test 2</option>
          </select>
          <select id="alterationLevel-diff">
            <option value=""></option>
            <option value="simple">Simple</option>
          </select>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    mockStateManager = new MockStateManager();
    mockPriceCalculator = new MockPriceCalculator();
    mockDOMRenderer = new MockDOMRenderer();

    eventManager = new EventManager(
      mockStateManager,
      mockPriceCalculator,
      mockDOMRenderer
    );
  });

  describe('Constructor', () => {
    it('should initialize with references to dependencies', () => {
      assert.strictEqual(eventManager.stateManager, mockStateManager);
      assert.strictEqual(eventManager.priceCalculator, mockPriceCalculator);
      assert.strictEqual(eventManager.domRenderer, mockDOMRenderer);
    });

    it('should find DOM elements', () => {
      assert.strictEqual(eventManager.alterationSelects.length, 2);
      assert.strictEqual(eventManager.difficultySelect.id, 'alterationLevel-diff');
    });
  });

  describe('handleAlterationChange()', () => {
    it('should update state when valid alteration selected', () => {
      const mockEvent = {
        target: {
          value: 'test1',
          id: 'alteration1Select'
        }
      };

      eventManager.handleAlterationChange(mockEvent);
      
      assert.strictEqual(mockStateManager.state.selectedAlteration, 'test1');
      assert.strictEqual(mockStateManager.state.currentPrice, 0); // No difficulty selected yet
    });

    it('should reset other selects', () => {
      const select1 = document.getElementById('alteration1Select');
      const select2 = document.getElementById('alteration2Select');
      
      // Set initial values
      select1.value = 'test1';
      select2.value = 'test2';
      
      // Call resetOtherSelects with select1 as current
      eventManager.resetOtherSelects(select1);
      
      // select1 should keep its value (not reset)
      assert.strictEqual(select1.value, 'test1');
      // select2 should be reset to ''
      assert.strictEqual(select2.value, '');
    });
  });

  describe('handleDifficultyChange()', () => {
    it('should update state when difficulty selected', () => {
      mockStateManager.setState({ selectedAlteration: 'test1' });
      
      const mockEvent = {
        target: {
          value: 'simple'
        }
      };

      eventManager.handleDifficultyChange(mockEvent);
      
      assert.strictEqual(mockStateManager.state.selectedDifficulty, 'simple');
      assert.strictEqual(mockStateManager.state.currentPrice, 50);
    });

    it('should set price to 0 when no alteration selected', () => {
      const mockEvent = {
        target: {
          value: 'simple'
        }
      };

      eventManager.handleDifficultyChange(mockEvent);
      
      assert.strictEqual(mockStateManager.state.currentPrice, 0);
    });
  });
});
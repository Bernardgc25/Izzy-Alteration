// test/alteration-module-tests/StateManager.test.js
import assert from 'assert';
import { describe, it, beforeEach } from 'mocha';
import StateManager from '../../../src/pages/alteration-pages/alteration-modules/alteration-StateManager.js';

const mockAlterationMaps = {
  'test-category': {
    'test-alteration': {
      simple: 10,
      detail: 'Test detail'
    }
  }
};

describe('StateManager', () => {
  let stateManager;

  beforeEach(() => {
    stateManager = new StateManager(mockAlterationMaps);
  });

  describe('Initial State', () => {
    it('should initialize with default state', () => {
      const state = stateManager.getState();
      
      assert.strictEqual(state.selectedAlteration, null);
      assert.strictEqual(state.selectedDifficulty, null);
      assert.strictEqual(state.currentPrice, 0);
      assert.strictEqual(state.alterationDetails, null);
      assert.strictEqual(state.lastSelectedElement, null);
    });
  });

  describe('setState()', () => {
    it('should update state correctly', () => {
      const updates = {
        selectedAlteration: 'test-alteration',
        currentPrice: 29.99
      };
      
      stateManager.setState(updates);
      const state = stateManager.getState();
      
      assert.strictEqual(state.selectedAlteration, 'test-alteration');
      assert.strictEqual(state.currentPrice, 29.99);
    });

    it('should not mutate previous state', () => {
      const originalState = stateManager.getState();
      stateManager.setState({ selectedAlteration: 'new-value' });
      
      assert.notStrictEqual(originalState.selectedAlteration, 'new-value');
    });
  });

  describe('subscribe()', () => {
    it('should call listeners on state change', (done) => {
      let callCount = 0;
      
      stateManager.subscribe((state) => {
        callCount++;
        if (callCount === 1) {
          assert.strictEqual(state.selectedAlteration, 'test');
          done();
        }
      });
      
      stateManager.setState({ selectedAlteration: 'test' });
    });

    it('should allow unsubscribing', () => {
      let callCount = 0;
      
      const unsubscribe = stateManager.subscribe(() => {
        callCount++;
      });
      
      unsubscribe();
      stateManager.setState({ selectedAlteration: 'test' });
      
      assert.strictEqual(callCount, 0);
    });
  });

  describe('reset()', () => {
    it('should reset to initial state', () => {
      stateManager.setState({
        selectedAlteration: 'test',
        selectedDifficulty: 'simple',
        currentPrice: 50,
        alterationDetails: { detail: 'test' }
      });
      
      stateManager.reset();
      const state = stateManager.getState();
      
      assert.strictEqual(state.selectedAlteration, null);
      assert.strictEqual(state.selectedDifficulty, null);
      assert.strictEqual(state.currentPrice, 0);
      assert.strictEqual(state.alterationDetails, null);
    });
  });
});
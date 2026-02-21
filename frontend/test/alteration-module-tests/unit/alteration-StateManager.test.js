import { expect } from 'chai';
import sinon from 'sinon';
import StateManager from '../../../pages/alteration-pages/alteration-modules/alteration-StateManager.js';

describe('alteration-StateManager.js', () => {
  let stateManager;

  beforeEach(() => {
    stateManager = new StateManager({}); // alterationMaps not used in state
  });

  it('should initialize with default state', () => {
    const state = stateManager.getState();
    expect(state).to.deep.equal({
      selectedAlteration: null,
      selectedDifficulty: null,
      currentPrice: 0,
      alterationDetails: null,
      lastSelectedElement: null
    });
  });

  it('should update state with setState', () => {
    stateManager.setState({ currentPrice: 99, selectedAlteration: 'test' });
    const state = stateManager.getState();
    expect(state.currentPrice).to.equal(99);
    expect(state.selectedAlteration).to.equal('test');
  });

  it('should notify listeners on setState', () => {
    const listener = sinon.spy();
    stateManager.subscribe(listener);

    stateManager.setState({ currentPrice: 50 });

    expect(listener.calledOnce).to.be.true;
    expect(listener.calledWith(stateManager.getState())).to.be.true;
  });

  it('should allow unsubscribing', () => {
    const listener = sinon.spy();
    const unsubscribe = stateManager.subscribe(listener);

    unsubscribe();
    stateManager.setState({ currentPrice: 50 });

    expect(listener.notCalled).to.be.true;
  });

  it('should reset state to initial values', () => {
    stateManager.setState({ currentPrice: 123, selectedAlteration: 'x', selectedDifficulty: 'simple', alterationDetails: { a: 1 }, lastSelectedElement: {} });
    stateManager.reset();

    const state = stateManager.getState();
    expect(state).to.deep.equal({
      selectedAlteration: null,
      selectedDifficulty: null,
      currentPrice: 0,
      alterationDetails: null,
      lastSelectedElement: null
    });
  });

  it('getState returns a copy, not a reference', () => {
    const state1 = stateManager.getState();
    state1.currentPrice = 999;
    const state2 = stateManager.getState();
    expect(state2.currentPrice).to.equal(0);
  });
});
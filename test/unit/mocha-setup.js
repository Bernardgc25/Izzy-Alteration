/**
 * mocha-setup.js
 * Global test setup for Mocha
 */

import { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiDom from 'chai-dom';

// Setup JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

// Set global variables
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLInputElement = dom.window.HTMLInputElement;
global.HTMLSelectElement = dom.window.HTMLSelectElement;
global.HTMLFormElement = dom.window.HTMLFormElement;
global.Image = dom.window.Image;

// Mock requestAnimationFrame for zoom tests
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Setup Chai with DOM assertions
chai.use(chaiDom);
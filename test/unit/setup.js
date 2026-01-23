// Global test setup
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

Object.defineProperty(global, 'navigator', {
  value: {
    userAgent: 'test',
    // other properties you need
  },
  writable: true,  // Make it writable
  configurable: true  // Make it configurable
});
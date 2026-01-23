// Mocha configuration
import '@babel/register';

// Set up chai
import chai from 'chai';
import chaiDOM from 'chai-dom';

chai.use(chaiDOM);

// Set up jsdom globally
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock console methods
console.warn = () => {};
console.error = () => {};
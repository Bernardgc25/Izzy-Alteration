import { expect } from 'chai';
import CartManager from '../../../pages/alteration-pages/alteration-modules/alteration-CartManager.js';

describe('CartManager', () => {
  let cartManager;

  beforeEach(() => {
    cartManager = new CartManager();
  });

  it('should initialize with empty cart and nextId = 1', () => {
    expect(cartManager.cart).to.be.an('array').that.is.empty;
    expect(cartManager.nextId).to.equal(1);
  });

  it('should add an item and return it with id and timestamp', () => {
    const item = cartManager.addItem('Test item', 25.99);
    expect(item).to.have.property('id', 1);
    expect(item).to.have.property('description', 'Test item');
    expect(item).to.have.property('price', 25.99);
    expect(item).to.have.property('timestamp').that.is.a('string');
    expect(cartManager.cart).to.have.lengthOf(1);
    expect(cartManager.nextId).to.equal(2);
  });

  it('should remove an existing item by id', () => {
    cartManager.addItem('Item 1', 10);
    cartManager.addItem('Item 2', 20);
    const removed = cartManager.removeItem(1);
    expect(removed).to.have.property('id', 1);
    expect(removed).to.have.property('description', 'Item 1');
    expect(cartManager.cart).to.have.lengthOf(1);
    expect(cartManager.cart[0].id).to.equal(2);
  });

  it('should return null when removing non-existent item', () => {
    cartManager.addItem('Item', 10);
    const removed = cartManager.removeItem(999);
    expect(removed).to.be.null;
    expect(cartManager.cart).to.have.lengthOf(1);
  });

  it('should clear all items', () => {
    cartManager.addItem('Item 1', 10);
    cartManager.addItem('Item 2', 20);
    cartManager.clearCart();
    expect(cartManager.cart).to.be.empty;
    expect(cartManager.nextId).to.equal(3); // nextId is not reset
  });

  it('should calculate total correctly', () => {
    cartManager.addItem('A', 15.5);
    cartManager.addItem('B', 7.25);
    expect(cartManager.getTotal()).to.equal(22.75);
  });

  it('should return a copy of items', () => {
    const item = cartManager.addItem('Test', 5);
    const items = cartManager.getItems();
    expect(items).to.deep.equal([item]);
    expect(items).not.to.equal(cartManager.cart); // different array reference
  });
});
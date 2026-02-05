// test/alteration-module-tests/CartManager.test.js
import assert from 'assert';
import CartManager from '../../src/pages/alteration-pages/alteration-modules/alteration-CartManager.js';

describe('CartManager', () => {
  let cartManager;

  beforeEach(() => {
    cartManager = new CartManager();
  });

  describe('Constructor', () => {
    it('should initialize with empty cart', () => {
      assert.deepStrictEqual(cartManager.cart, []);
    });
  });

  describe('addItem()', () => {
    it('should add item to cart with correct properties', () => {
      const item = cartManager.addItem('Hem pants', 29.99);
      
      assert.strictEqual(cartManager.cart.length, 1);
      assert.strictEqual(typeof item.id, 'number');
      assert.strictEqual(item.description, 'Hem pants');
      assert.strictEqual(item.price, 29.99);
      assert.strictEqual(typeof item.timestamp, 'string');
    });

    it('should generate unique IDs for each item', () => {
      const item1 = cartManager.addItem('Item 1', 10);
      const item2 = cartManager.addItem('Item 2', 20);
      
      assert.notStrictEqual(item1.id, item2.id);
    });
  });

  describe('removeItem()', () => {
    beforeEach(() => {
      cartManager.addItem('Item 1', 10);
      cartManager.addItem('Item 2', 20);
    });

    it('should remove item by ID', () => {
      const itemId = cartManager.cart[0].id;
      const removed = cartManager.removeItem(itemId);
      
      assert.strictEqual(cartManager.cart.length, 1);
      assert.strictEqual(removed.description, 'Item 1');
    });

    it('should return null when item not found', () => {
      const result = cartManager.removeItem(999);
      assert.strictEqual(result, null);
    });
  });

  describe('clearCart()', () => {
    it('should empty the cart', () => {
      cartManager.addItem('Item 1', 10);
      cartManager.addItem('Item 2', 20);
      
      cartManager.clearCart();
      assert.strictEqual(cartManager.cart.length, 0);
    });
  });

  describe('getTotal()', () => {
    it('should calculate correct total', () => {
      cartManager.addItem('Item 1', 10.50);
      cartManager.addItem('Item 2', 20.75);
      
      assert.strictEqual(cartManager.getTotal(), 31.25);
    });

    it('should return 0 for empty cart', () => {
      assert.strictEqual(cartManager.getTotal(), 0);
    });
  });

  describe('getItems()', () => {
    it('should return copy of cart items', () => {
      cartManager.addItem('Test Item', 15);
      
      const items = cartManager.getItems();
      assert.strictEqual(items.length, 1);
      assert.notStrictEqual(items, cartManager.cart); // Should be a copy
    });
  });
});
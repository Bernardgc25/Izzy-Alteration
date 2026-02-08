// test/alteration-module-tests/PriceCalculator.test.js
import assert from 'assert';
import { describe, it, beforeEach } from 'mocha';
import PriceCalculator from '../../../src/pages/alteration-pages/alteration-modules/alteration-PriceCalculator.js';

const mockAlterationMaps = {
  'female-bottom': {
    'female-bottom-hem-skirt-straight-slim': { 
      simple: 33, 
      intermediate: 44, 
      difficult: 55, 
      detail: 'Test detail' 
    }
  },
  'female-dress': {
    'female-dress-hem': { 
      simple: 75, 
      intermediate: 95, 
      difficult: 120, 
      detail: 'Dress hem' 
    }
  },
  'repair': {
    'repair-zippers-on-dress': { 
      simple: 30, 
      intermediate: 0, 
      difficult: 0, 
      detail: 'Zipper repair' 
    }
  }
};

describe('PriceCalculator', () => {
  let priceCalculator;

  beforeEach(() => {
    priceCalculator = new PriceCalculator(mockAlterationMaps);
  });

  describe('findCategory()', () => {
    it('should find category for valid alteration', () => {
      const category = priceCalculator.findCategory('female-bottom-hem-skirt-straight-slim');
      assert.strictEqual(category, 'female-bottom');
    });

    it('should return null for invalid alteration', () => {
      const category = priceCalculator.findCategory('invalid-alteration');
      assert.strictEqual(category, null);
    });

    it('should handle empty input', () => {
      const category = priceCalculator.findCategory('');
      assert.strictEqual(category, null);
    });
  });

  describe('calculatePrice()', () => {
    it('should calculate correct price for simple difficulty', () => {
      const price = priceCalculator.calculatePrice(
        'female-bottom-hem-skirt-straight-slim',
        'simple'
      );
      assert.strictEqual(price, 33);
    });

    it('should calculate correct price for intermediate difficulty', () => {
      const price = priceCalculator.calculatePrice(
        'female-dress-hem',
        'intermediate'
      );
      assert.strictEqual(price, 95);
    });

    it('should return 0 for invalid difficulty', () => {
      const price = priceCalculator.calculatePrice(
        'female-bottom-hem-skirt-straight-slim',
        'invalid'
      );
      assert.strictEqual(price, 0);
    });

    it('should return 0 when alteration not found', () => {
      const price = priceCalculator.calculatePrice('invalid', 'simple');
      assert.strictEqual(price, 0);
    });

    it('should return 0 for zero price alterations', () => {
      const price = priceCalculator.calculatePrice(
        'repair-zippers-on-dress',
        'intermediate'
      );
      assert.strictEqual(price, 0);
    });

    it('should return 0 when missing required parameters', () => {
      assert.strictEqual(priceCalculator.calculatePrice('', 'simple'), 0);
      assert.strictEqual(priceCalculator.calculatePrice('test', ''), 0);
      assert.strictEqual(priceCalculator.calculatePrice('', ''), 0);
    });
  });

  describe('getAlterationDetails()', () => {
    it('should return details for valid alteration', () => {
      const details = priceCalculator.getAlterationDetails('female-dress-hem');
      assert.strictEqual(details.detail, 'Dress hem');
      assert.strictEqual(details.simple, 75);
    });

    it('should return empty object for invalid alteration', () => {
      const details = priceCalculator.getAlterationDetails('invalid');
      assert.deepStrictEqual(details, { detail: '', price: 0 });
    });
  });

  describe('getCustomerRequestText()', () => {
    it('should return text for intermediate difficulty', () => {
      const text = priceCalculator.getCustomerRequestText('intermediate');
      assert.strictEqual(text, '• plus (1) customer-requested modification');
    });

    it('should return text for difficult difficulty', () => {
      const text = priceCalculator.getCustomerRequestText('difficult');
      assert.strictEqual(text, '• plus (2) customer-requested modification');
    });

    it('should return empty string for other difficulties', () => {
      assert.strictEqual(priceCalculator.getCustomerRequestText('simple'), '');
      assert.strictEqual(priceCalculator.getCustomerRequestText('invalid'), '');
    });
  });
});
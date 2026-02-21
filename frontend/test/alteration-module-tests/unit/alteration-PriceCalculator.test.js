import { expect } from 'chai';
import PriceCalculator from '../../../pages/alteration-pages/alteration-modules/alteration-PriceCalculator.js';
import { alterationMaps } from '../../../pages/alteration-pages/alteration-modules/alteration-DataMaps.js';

describe('PriceCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new PriceCalculator(alterationMaps);
  });

  describe('findCategory', () => {
    it('should return correct category for known alteration', () => {
      const category = calculator.findCategory('female-bottom-hem-skirt-straight-slim');
      expect(category).to.equal('female-bottom');
    });

    it('should return null for unknown alteration', () => {
      const category = calculator.findCategory('non-existent');
      expect(category).to.be.null;
    });
  });

  describe('calculatePrice', () => {
    it('should return correct price for known alteration and difficulty', () => {
      const price = calculator.calculatePrice('female-bottom-hem-skirt-straight-slim', 'simple');
      expect(price).to.equal(33);
    });

    it('should return 0 if alteration not found', () => {
      const price = calculator.calculatePrice('unknown', 'simple');
      expect(price).to.equal(0);
    });

    it('should return 0 if difficulty not found or zero', () => {
      const price = calculator.calculatePrice('repair-zippers-on-dress', 'intermediate');
      expect(price).to.equal(0); // intermediate is 0 in map
    });

    it('should return 0 if difficulty missing', () => {
      const price = calculator.calculatePrice('female-bottom-hem-skirt-straight-slim', null);
      expect(price).to.equal(0);
    });
  });

  describe('getAlterationDetails', () => {
    it('should return the full alteration object', () => {
      const details = calculator.getAlterationDetails('female-bottom-hem-skirt-straight-slim');
      expect(details).to.deep.equal(alterationMaps['female-bottom']['female-bottom-hem-skirt-straight-slim']);
    });

    it('should return empty detail object if not found', () => {
      const details = calculator.getAlterationDetails('nonexistent');
      expect(details).to.deep.equal({ detail: '', price: 0 });
    });
  });

  describe('getCustomerRequestText', () => {
    it('should return correct text for intermediate', () => {
      expect(calculator.getCustomerRequestText('intermediate')).to.equal('• plus (1) customer-requested modification');
    });

    it('should return correct text for difficult', () => {
      expect(calculator.getCustomerRequestText('difficult')).to.equal('• plus (2) customer-requested modification');
    });

    it('should return empty string for unknown', () => {
      expect(calculator.getCustomerRequestText('simple')).to.equal('');
    });
  });
});
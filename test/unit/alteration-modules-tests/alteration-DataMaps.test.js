import { assert } from 'chai';
import { alterationMaps } from '../../../src/pages/alteration-pages/alteration-modules/alteration-DataMaps.js';

describe('Alteration DataMaps Module', () => {
  describe('Data Structure Tests', () => {
    it('should have all expected alteration categories', () => {
      const expectedCategories = [
        'female-bottom',
        'female-dress',
        'female-jacket',
        'female-top',
        'male-bottom',
        'male-suits',
        'male-top',
        'repair'
      ];
      
      assert.hasAllKeys(alterationMaps, expectedCategories);
    });

    it('each category should contain alteration objects', () => {
      Object.keys(alterationMaps).forEach(category => {
        assert.isObject(alterationMaps[category]);
        assert.isNotEmpty(alterationMaps[category]);
      });
    });
  });

  describe('Alteration Object Structure Tests', () => {
    it('each alteration should have correct properties', () => {
      Object.keys(alterationMaps).forEach(category => {
        Object.keys(alterationMaps[category]).forEach(alterationKey => {
          const alteration = alterationMaps[category][alterationKey];
          
          assert.isObject(alteration);
          assert.property(alteration, 'simple');
          assert.property(alteration, 'intermediate');
          assert.property(alteration, 'difficult');
          assert.property(alteration, 'detail');
          
          // Check property types
          assert.isNumber(alteration.simple);
          assert.isNumber(alteration.intermediate);
          assert.isNumber(alteration.difficult);
          assert.isString(alteration.detail);
          
          // Check for non-negative prices (some might be 0 for not applicable)
          assert.isAtLeast(alteration.simple, 0);
          assert.isAtLeast(alteration.intermediate, 0);
          assert.isAtLeast(alteration.difficult, 0);
          
          // Check that detail is not empty
          assert.isNotEmpty(alteration.detail);
        });
      });
    });

    it('prices should follow logical progression (simple <= intermediate <= difficult)', () => {
      Object.keys(alterationMaps).forEach(category => {
        Object.keys(alterationMaps[category]).forEach(alterationKey => {
          const alteration = alterationMaps[category][alterationKey];
          
          // Skip if any price is 0 (not applicable)
          if (alteration.simple === 0 || alteration.intermediate === 0 || alteration.difficult === 0) {
            return;
          }
          
          assert.isAtMost(alteration.simple, alteration.intermediate, 
            `Simple price should be <= intermediate for ${alterationKey}`);
          assert.isAtMost(alteration.intermediate, alteration.difficult, 
            `Intermediate price should be <= difficult for ${alterationKey}`);
        });
      });
    });
  });

  describe('Specific Category Tests', () => {
    describe('Female Bottom Category', () => {
      it('should have female-bottom alterations', () => {
        assert.property(alterationMaps, 'female-bottom');
        assert.isNotEmpty(alterationMaps['female-bottom']);
      });

      it('should have correct female-bottom alteration keys', () => {
        const femaleBottomKeys = Object.keys(alterationMaps['female-bottom']);
        assert.isNotEmpty(femaleBottomKeys);
        
        // Check that keys start with category name
        femaleBottomKeys.forEach(key => {
          assert.include(key, 'female-bottom', 
            `Key ${key} should include 'female-bottom'`);
        });
      });
    });

    describe('Repair Category', () => {
      it('should have repair alterations with only simple difficulty', () => {
        const repairAlterations = alterationMaps.repair;
        
        Object.keys(repairAlterations).forEach(key => {
          const repair = repairAlterations[key];
          
          // Repair alterations should only have simple difficulty
          assert.isNumber(repair.simple);
          assert.equal(repair.intermediate, 0, 
            `Repair ${key} should have intermediate=0`);
          assert.equal(repair.difficult, 0, 
            `Repair ${key} should have difficult=0`);
        });
      });
    });
  });

  describe('Edge Case Tests', () => {
    it('should handle zero prices correctly', () => {
      // Check for alterations with 0 prices (not applicable)
      let hasZeroPrice = false;
      
      Object.keys(alterationMaps).forEach(category => {
        Object.keys(alterationMaps[category]).forEach(alterationKey => {
          const alteration = alterationMaps[category][alterationKey];
          
          if (alteration.simple === 0 || alteration.intermediate === 0 || alteration.difficult === 0) {
            hasZeroPrice = true;
            // Zero should only appear in intermediate or difficult for some categories
            assert.isTrue(
              alteration.simple > 0 || 
              (alteration.simple === 0 && alteration.intermediate === 0 && alteration.difficult === 0),
              `Alteration ${alterationKey} should have at least simple price > 0 or all zero`
            );
          }
        });
      });
      
      // Some alterations should have zero for intermediate/difficult
      assert.isTrue(hasZeroPrice, 'Should have some alterations with 0 prices');
    });

    it('should not have duplicate alteration keys', () => {
      const allKeys = [];
      
      Object.keys(alterationMaps).forEach(category => {
        Object.keys(alterationMaps[category]).forEach(key => {
          assert.notInclude(allKeys, key, `Duplicate key found: ${key}`);
          allKeys.push(key);
        });
      });
    });
  });
});
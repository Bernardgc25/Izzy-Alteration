import { assert } from 'chai';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import { initializeAlterationManager } from '../../../src/pages/alteration-pages/alteration-modules/alteration-Manager.js';



describe('Alteration Manager Module', () => {
  let mockAlterationMaps;
  let dom;
  let document;
  
  beforeEach(() => {
    // Create a mock alteration maps object
    mockAlterationMaps = {
      'female-bottom': {
        'female-bottom-hem-skirt-straight-slim': { 
          simple: 33, 
          intermediate: 44, 
          difficult: 55, 
          detail: 'Test detail 1' 
        },
        'female-bottom-hem-full-circle-unlined-skirt': { 
          simple: 44, 
          intermediate: 66, 
          difficult: 88, 
          detail: 'Test detail 2' 
        }
      },
      'male-bottom': {
        'male-bottom-hem-unlined-pants': { 
          simple: 29, 
          intermediate: 41, 
          difficult: 52, 
          detail: 'Test detail 3' 
        }
      },
      'repair': {
        'repair-zippers-on-dress': { 
          simple: 30, 
          intermediate: 0, 
          difficult: 0, 
          detail: 'Test repair detail' 
        }
      }
    };

    // Create DOM with necessary elements
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <select id="alterationSelect1">
            <option value=""></option>
            <option value="female-bottom-hem-skirt-straight-slim">Hem Skirt</option>
            <option value="female-bottom-hem-full-circle-unlined-skirt">Hem Full Circle</option>
          </select>
          <select id="alterationSelect2">
            <option value=""></option>
            <option value="male-bottom-hem-unlined-pants">Hem Pants</option>
          </select>
          <select id="alterationLevel-diff">
            <option value=""></option>
            <option value="simple">Simple</option>
            <option value="intermediate">Intermediate</option>
            <option value="difficult">Difficult</option>
          </select>
          
          <div id="priceCalculation"></div>
          <div id="alteration-note"></div>
          <div id="alteration-description"></div>
          <div id="alteration-customer-request"></div>
          <div id="alteration-type"></div>
          <div id="alteration-level"></div>
          
          <button onclick="handleAdd()">Add</button>
          <button onclick="handleClear()">Clear</button>
        </body>
      </html>
    `);

    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
  });

  afterEach(() => {
    // Clean up
    delete global.document;
    delete global.window;
  });

  describe('Initialization Tests', () => {
    it('should initialize without errors', () => {
      assert.doesNotThrow(() => {
        initializeAlterationManager(mockAlterationMaps);
      });
    });

    it('should return manager object with resetAll method', () => {
      const manager = initializeAlterationManager(mockAlterationMaps);
      assert.isObject(manager);
      assert.isFunction(manager.resetAll);
    });
  });

  describe('DOM Element Selection Tests', () => {
    it('should find all alteration select elements', () => {
      const manager = initializeAlterationManager(mockAlterationMaps);
      
      // Check that elements exist
      assert.isNotNull(document.getElementById('alterationSelect1'));
      assert.isNotNull(document.getElementById('alterationSelect2'));
      assert.isNotNull(document.getElementById('alterationLevel-diff'));
    });

    it('should find all display elements', () => {
      const manager = initializeAlterationManager(mockAlterationMaps);
      
      const displayIds = [
        'priceCalculation',
        'alteration-note',
        'alteration-description',
        'alteration-customer-request',
        'alteration-type',
        'alteration-level'
      ];
      
      displayIds.forEach(id => {
        const element = document.getElementById(id);
        assert.isNotNull(element, `Element with id ${id} should exist`);
      });
    });
  });

  describe('Alteration Selection Tests', () => {
    let manager;
    let select1;
    let select2;
    let difficultySelect;

    beforeEach(() => {
      manager = initializeAlterationManager(mockAlterationMaps);
      select1 = document.getElementById('alterationSelect1');
      select2 = document.getElementById('alterationSelect2');
      difficultySelect = document.getElementById('alterationLevel-diff');
    });

    it('should handle alteration selection', () => {
      // Select an alteration
      select1.value = 'female-bottom-hem-skirt-straight-slim';
      select1.dispatchEvent(new dom.window.Event('change'));

      // Check that other select is reset
      assert.equal(select2.value, '');
    });

    it('should reset other selects when one is selected', () => {
      // First select an option in select2
      select2.value = 'male-bottom-hem-unlined-pants';
      select2.dispatchEvent(new dom.window.Event('change'));
      
      // Now select an option in select1
      select1.value = 'female-bottom-hem-skirt-straight-slim';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      // select2 should be reset
      assert.equal(select2.value, '');
    });

    it('should clear selection when value is empty', () => {
      select1.value = 'female-bottom-hem-skirt-straight-slim';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      // Clear the selection
      select1.value = '';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      // Price display should be cleared
      const priceElement = document.getElementById('priceCalculation');
      assert.equal(priceElement.textContent, '');
    });
  });

  describe('Price Calculation Tests', () => {
    let manager;

    beforeEach(() => {
      manager = initializeAlterationManager(mockAlterationMaps);
    });

    it('should calculate correct price for simple difficulty', () => {
      const select1 = document.getElementById('alterationSelect1');
      const difficultySelect = document.getElementById('alterationLevel-diff');
      
      select1.value = 'female-bottom-hem-skirt-straight-slim';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      difficultySelect.value = 'simple';
      difficultySelect.dispatchEvent(new dom.window.Event('change'));
      
      const priceElement = document.getElementById('priceCalculation');
      assert.equal(priceElement.textContent, '$33.00');
    });

    it('should calculate correct price for difficult difficulty', () => {
      const select1 = document.getElementById('alterationSelect1');
      const difficultySelect = document.getElementById('alterationLevel-diff');
      
      select1.value = 'female-bottom-hem-full-circle-unlined-skirt';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      difficultySelect.value = 'difficult';
      difficultySelect.dispatchEvent(new dom.window.Event('change'));
      
      const priceElement = document.getElementById('priceCalculation');
      assert.equal(priceElement.textContent, '$88.00');
    });

    it('should handle zero price for repair intermediate/difficult', () => {
      // Add a repair select element
      const repairSelect = document.createElement('select');
      repairSelect.id = 'repairSelect';
      repairSelect.innerHTML = `
        <option value=""></option>
        <option value="repair-zippers-on-dress">Repair Zipper</option>
      `;
      document.body.appendChild(repairSelect);
      
      // Reinitialize manager to pick up new select
      manager = initializeAlterationManager(mockAlterationMaps);
      
      const difficultySelect = document.getElementById('alterationLevel-diff');
      
      repairSelect.value = 'repair-zippers-on-dress';
      repairSelect.dispatchEvent(new dom.window.Event('change'));
      
      // Test with intermediate (should show 0 or n/a)
      difficultySelect.value = 'intermediate';
      difficultySelect.dispatchEvent(new dom.window.Event('change'));
      
      const priceElement = document.getElementById('priceCalculation');
      // Price should be n/a or $0.00 depending on implementation
      assert.isTrue(
        priceElement.textContent === 'n/a' || priceElement.textContent === '$0.00',
        `Expected n/a or $0.00, got ${priceElement.textContent}`
      );
    });
  });

  describe('Display Update Tests', () => {
    it('should update all display elements correctly', () => {
      const manager = initializeAlterationManager(mockAlterationMaps);
      const select1 = document.getElementById('alterationSelect1');
      const difficultySelect = document.getElementById('alterationLevel-diff');
      
      // Select alteration and difficulty
      select1.value = 'female-bottom-hem-skirt-straight-slim';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      difficultySelect.value = 'intermediate';
      difficultySelect.dispatchEvent(new dom.window.Event('change'));
      
      // Check all display elements
      assert.equal(document.getElementById('priceCalculation').textContent, '$44.00');
      assert.include(document.getElementById('alteration-note').textContent, 'Prices are determined');
      assert.include(document.getElementById('alteration-description').textContent, 'Test detail 1');
      assert.include(document.getElementById('alteration-customer-request').textContent, 'customer-requested');
      assert.include(document.getElementById('alteration-type').textContent, 'female-bottom-hem-skirt-straight-slim');
      assert.include(document.getElementById('alteration-level').textContent, 'intermediate');
    });

    it('should clear display when no selection', () => {
      const manager = initializeAlterationManager(mockAlterationMaps);
      
      // Initially all should be empty
      assert.equal(document.getElementById('priceCalculation').textContent, '');
      assert.equal(document.getElementById('alteration-note').textContent, '');
      assert.equal(document.getElementById('alteration-description').textContent, '');
      assert.equal(document.getElementById('alteration-customer-request').textContent, '');
      assert.equal(document.getElementById('alteration-type').textContent, '');
      assert.equal(document.getElementById('alteration-level').textContent, '');
    });
  });

  describe('Reset Function Tests', () => {
    it('should reset all selections and displays', () => {
      const manager = initializeAlterationManager(mockAlterationMaps);
      const select1 = document.getElementById('alterationSelect1');
      const difficultySelect = document.getElementById('alterationLevel-diff');
      
      // Make selections
      select1.value = 'female-bottom-hem-skirt-straight-slim';
      select1.dispatchEvent(new dom.window.Event('change'));
      
      difficultySelect.value = 'simple';
      difficultySelect.dispatchEvent(new dom.window.Event('change'));
      
      // Verify selections are made
      assert.equal(select1.value, 'female-bottom-hem-skirt-straight-slim');
      assert.equal(difficultySelect.value, 'simple');
      
      // Call resetAll
      manager.resetAll();
      
      // Verify everything is reset
      assert.equal(select1.value, '');
      assert.equal(difficultySelect.value, '');
      assert.equal(document.getElementById('priceCalculation').textContent, '');
    });
  });
});
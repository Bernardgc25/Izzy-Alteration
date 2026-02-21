import { expect } from 'chai';
import { alterationMaps } from '../../../pages/alteration-pages/alteration-modules/alteration-DataMaps.js';

describe('alteration-DataMaps.js', () => {
  it('should be an object with expected top-level categories', () => {
    expect(alterationMaps).to.be.an('object');
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
    expect(Object.keys(alterationMaps)).to.have.members(expectedCategories);
  });

  it('should have female-dress with many alteration keys', () => {
    const femaleDress = alterationMaps['female-dress'];
    expect(femaleDress).to.be.an('object');
    // Spot check a few entries
    expect(femaleDress['female-dress-hem']).to.exist;
    expect(femaleDress['female-dress-hem']).to.have.property('simple', 75);
    expect(femaleDress['female-dress-hem']).to.have.property('detail').that.is.a('string');
  });

  it('should have repair category with correct structure', () => {
    const repair = alterationMaps['repair'];
    expect(repair['repair-zippers-on-dress']).to.deep.include({
      simple: 30,
      intermediate: 0,
      difficult: 0
    });
  });

  it('should have all price entries as numbers (or zero)', () => {
    const checkPrices = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if ('simple' in obj[key]) {
            expect(obj[key].simple).to.be.a('number');
            expect(obj[key].intermediate).to.be.a('number');
            expect(obj[key].difficult).to.be.a('number');
            expect(obj[key].detail).to.be.a('string');
          } else {
            checkPrices(obj[key]);
          }
        }
      }
    };
    checkPrices(alterationMaps);
  });
});
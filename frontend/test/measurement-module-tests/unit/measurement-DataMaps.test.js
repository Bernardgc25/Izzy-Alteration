// test/test-measurement-DataMaps.js
import { expect } from 'chai';
import {
  measurementDataMap,
  getMeasurement,
  getAllMeasurementsForGender
} from '../../../pages/measurement-pages/measurement-modules/measurement-DataMaps.js';

describe('measurement-DataMaps.js', () => {
  describe('measurementDataMap structure', () => {
    it('should have gender, measurements, and sizes properties', () => {
      expect(measurementDataMap).to.have.property('gender');
      expect(measurementDataMap).to.have.property('measurements');
      expect(measurementDataMap).to.have.property('sizes');
    });

    it('should contain male and female gender entries with imageDesktop', () => {
      expect(measurementDataMap.gender.male).to.have.property('imageDesktop').that.is.a('string');
      expect(measurementDataMap.gender.female).to.have.property('imageDesktop').that.is.a('string');
    });

    it('should have male measurements with expected keys', () => {
      const maleMeas = measurementDataMap.measurements.male;
      expect(maleMeas).to.have.property('neck');
      expect(maleMeas).to.have.property('shoulder-length');
      expect(maleMeas).to.have.property('arm-length');
      // spot-check a few
    });

    it('should have female measurements with expected keys', () => {
      const femaleMeas = measurementDataMap.measurements.female;
      expect(femaleMeas).to.have.property('neck');
      expect(femaleMeas).to.have.property('under-bust');
      expect(femaleMeas).to.have.property('hip-bone-circumference');
    });

    it('should have sizes with cupSize and size-number', () => {
      expect(measurementDataMap.sizes).to.have.property('cupSize');
      expect(measurementDataMap.sizes).to.have.property('size-number');
    });
  });

  describe('getMeasurement', () => {
    it('should return correct measurement object for valid gender and key', () => {
      const result = getMeasurement('male', 'neck');
      expect(result).to.be.an('object');
      expect(result.object).to.equal('Neck Circumference');
    });

    it('should return null for non-existent gender', () => {
      const result = getMeasurement('other', 'neck');
      expect(result).to.be.null;
    });

    it('should return null for non-existent measurement key', () => {
      const result = getMeasurement('male', 'nonexistent');
      expect(result).to.be.null;
    });
  });

  describe('getAllMeasurementsForGender', () => {
    it('should return all measurements for a valid gender', () => {
      const result = getAllMeasurementsForGender('female');
      expect(result).to.be.an('object');
      expect(result).to.have.property('neck');
      expect(result).to.have.property('waist');
    });

    it('should return empty object for invalid gender', () => {
      const result = getAllMeasurementsForGender('other');
      expect(result).to.deep.equal({});
    });
  });
});
import { expect } from 'chai';
import { measurementDataMap, getMeasurement, getAllMeasurementsForGender } from '../../../pages/measurement-pages/measurement-modules/measurement-DataMaps.js';

describe('measurement-DataMaps.js', () => {
  describe('measurementDataMap structure', () => {
    it('should have gender property with male and female keys', () => {
      expect(measurementDataMap).to.have.property('gender');
      expect(measurementDataMap.gender).to.have.property('male');
      expect(measurementDataMap.gender).to.have.property('female');
    });

    it('should have measurements property organized by gender', () => {
      expect(measurementDataMap).to.have.property('measurements');
      expect(measurementDataMap.measurements).to.have.property('male');
      expect(measurementDataMap.measurements).to.have.property('female');
    });

    it('should have sizes property', () => {
      expect(measurementDataMap).to.have.property('sizes');
      expect(measurementDataMap.sizes).to.have.property('cupSize');
      expect(measurementDataMap.sizes).to.have.property('size-number');
    });
  });

  describe('male measurements', () => {
    const maleMeasurements = measurementDataMap.measurements.male;

    it('should have neck measurement', () => {
      expect(maleMeasurements).to.have.property('neck');
      expect(maleMeasurements.neck).to.have.property('object', 'Neck Circumference');
      expect(maleMeasurements.neck).to.have.property('definition');
      expect(maleMeasurements.neck).to.have.property('description');
      expect(maleMeasurements.neck).to.have.property('imageMobile');
    });

    it('should have chest circumference measurement', () => {
      expect(maleMeasurements).to.have.property('chest-circumference');
      expect(maleMeasurements['chest-circumference'].object).to.equal('Chest Circumference');
    });

    it('should have all expected male measurements', () => {
      const expectedMeasurements = [
        'neck', 'shoulder-length', 'arm-length', 'chest-circumference',
        'waist', 'hip-circumference', 'thigh', 'knee', 'calf', 'ankle',
        'bicep', 'elbow', 'wrist', 'inseam-ankle', 'inseam-floor',
        'neck-waist', 'neck-floor', 'waist-floor', 'height',
        'across-front', 'total-rise'
      ];
      
      expectedMeasurements.forEach(measurement => {
        expect(maleMeasurements).to.have.property(measurement);
      });
    });
  });

  describe('female measurements', () => {
    const femaleMeasurements = measurementDataMap.measurements.female;

    it('should have under-bust measurement (female specific)', () => {
      expect(femaleMeasurements).to.have.property('under-bust');
      expect(femaleMeasurements['under-bust'].object).to.equal('Under Bust');
    });

    it('should have cupSize in sizes for females', () => {
      expect(measurementDataMap.sizes.cupSize.gender).to.equal('female');
    });

    it('should have all expected female measurements', () => {
      const expectedMeasurements = [
        'neck', 'shoulder-length', 'arm-length', 'chest-circumference',
        'under-bust', 'waist', 'hip-circumference', 'hip-bone-circumference',
        'thigh', 'knee', 'calf', 'ankle', 'bicep', 'elbow', 'wrist',
        'inseam-ankle', 'inseam-floor', 'neck-waist', 'neck-floor',
        'waist-floor', 'height'
      ];
      
      expectedMeasurements.forEach(measurement => {
        expect(femaleMeasurements).to.have.property(measurement);
      });
    });
  });

  describe('getMeasurement function', () => {
    it('should return null for invalid gender', () => {
      const result = getMeasurement('invalid', 'neck');
      expect(result).to.be.null;
    });

    it('should return null for invalid measurement key', () => {
      const result = getMeasurement('male', 'invalid-measurement');
      expect(result).to.be.null;
    });

    it('should return correct measurement for valid gender and key', () => {
      const result = getMeasurement('male', 'neck');
      expect(result).to.deep.equal(measurementDataMap.measurements.male.neck);
    });

    it('should handle female measurements correctly', () => {
      const result = getMeasurement('female', 'under-bust');
      expect(result).to.deep.equal(measurementDataMap.measurements.female['under-bust']);
    });
  });

  describe('getAllMeasurementsForGender function', () => {
    it('should return empty object for invalid gender', () => {
      const result = getAllMeasurementsForGender('invalid');
      expect(result).to.deep.equal({});
    });

    it('should return all male measurements', () => {
      const result = getAllMeasurementsForGender('male');
      expect(result).to.deep.equal(measurementDataMap.measurements.male);
    });

    it('should return all female measurements', () => {
      const result = getAllMeasurementsForGender('female');
      expect(result).to.deep.equal(measurementDataMap.measurements.female);
    });
  });
});
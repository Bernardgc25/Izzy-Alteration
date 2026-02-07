// IZZY-ALTERATION/test/measurement-module-tests/measurement-DataMaps.test.js

import { expect } from 'chai';
import { 
    measurementDataMap, 
    getMeasurement, 
    getAllMeasurementsForGender 
} from '../../src/pages/measurement-pages/measurement-modules/measurement-DataMaps.js';

describe('measurement-DataMaps', () => {
    describe('measurementDataMap structure', () => {
        it('should have gender property with male and female images', () => {
            expect(measurementDataMap.gender).to.be.an('object');
            expect(measurementDataMap.gender.male).to.have.property('imageDesktop');
            expect(measurementDataMap.gender.female).to.have.property('imageDesktop');
        });

        it('should have measurements for both genders', () => {
            expect(measurementDataMap.measurements).to.be.an('object');
            expect(measurementDataMap.measurements.male).to.be.an('object');
            expect(measurementDataMap.measurements.female).to.be.an('object');
        });

        it('should have common measurement properties', () => {
            const maleNeck = measurementDataMap.measurements.male.neck;
            const femaleNeck = measurementDataMap.measurements.female.neck;
            
            expect(maleNeck).to.have.all.keys('object', 'definition', 'description', 'imageMobile');
            expect(femaleNeck).to.have.all.keys('object', 'definition', 'description', 'imageMobile');
        });

        it('should have gender-specific measurements', () => {
            expect(measurementDataMap.measurements.male).to.have.property('total-rise');
            expect(measurementDataMap.measurements.male).to.have.property('across-front');
            expect(measurementDataMap.measurements.female).to.have.property('under-bust');
            expect(measurementDataMap.measurements.female).to.have.property('hip-bone-circumference');
            expect(measurementDataMap.measurements.female).to.not.have.property('total-rise');
        });

        it('should have sizes property with gender-specific fields', () => {
            expect(measurementDataMap.sizes).to.be.an('object');
            expect(measurementDataMap.sizes.cupSize).to.have.property('gender', 'female');
            expect(measurementDataMap.sizes['size-number']).to.not.have.property('gender');
        });
    });

    describe('getMeasurement helper function', () => {
        it('should return measurement data for valid gender and key', () => {
            const result = getMeasurement('male', 'neck');
            expect(result).to.be.an('object');
            expect(result.object).to.equal('Neck Circumference');
        });

        it('should return null for invalid gender', () => {
            const result = getMeasurement('invalid', 'neck');
            expect(result).to.be.null;
        });

        it('should return null for invalid measurement key', () => {
            const result = getMeasurement('male', 'invalid-key');
            expect(result).to.be.null;
        });

        it('should return null for missing gender', () => {
            const result = getMeasurement(null, 'neck');
            expect(result).to.be.null;
        });

        it('should handle female-specific measurements', () => {
            const result = getMeasurement('female', 'under-bust');
            expect(result).to.be.an('object');
            expect(result.object).to.equal('Under Bust');
        });
    });

    describe('getAllMeasurementsForGender helper function', () => {
        it('should return all measurements for male gender', () => {
            const result = getAllMeasurementsForGender('male');
            expect(result).to.be.an('object');
            expect(result).to.have.property('neck');
            expect(result).to.have.property('chest-circumference');
            expect(result).to.have.property('total-rise');
            expect(Object.keys(result).length).to.be.greaterThan(10);
        });

        it('should return all measurements for female gender', () => {
            const result = getAllMeasurementsForGender('female');
            expect(result).to.be.an('object');
            expect(result).to.have.property('under-bust');
            expect(result).to.have.property('hip-bone-circumference');
            expect(result).to.have.property('cupSize');
            expect(Object.keys(result).length).to.be.greaterThan(10);
        });

        it('should return empty object for invalid gender', () => {
            const result = getAllMeasurementsForGender('invalid');
            expect(result).to.be.an('object');
            expect(Object.keys(result)).to.have.lengthOf(0);
        });

        it('should return empty object for null gender', () => {
            const result = getAllMeasurementsForGender(null);
            expect(result).to.be.an('object');
            expect(Object.keys(result)).to.have.lengthOf(0);
        });
    });
});
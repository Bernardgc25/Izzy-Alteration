/**
 * measurement-DataMaps.test.js
 * Unit tests for MeasurementData module
 */

import { expect } from 'chai';
import { MeasurementData } from '../../../src/pages/measurement-pages/measurement-modules/measurement-DataMaps.js';

describe('MeasurementData Module', () => {
  describe('guideImages', () => {
    it('should have guide images for male and female', () => {
      expect(MeasurementData.guideImages).to.have.property('male');
      expect(MeasurementData.guideImages).to.have.property('female');
      expect(MeasurementData.guideImages.male).to.include('male-chart.jpg');
      expect(MeasurementData.guideImages.female).to.include('female-chart.jpg');
    });
  });

  describe('measurementDefinitions', () => {
    it('should contain all required measurement definitions', () => {
      const requiredMeasurements = [
        'neck', 'shoulder-length', 'arm-length', 'chest-circumference',
        'waist', 'hip-circumference', 'thigh', 'knee', 'calf', 'ankle',
        'bicep', 'elbow', 'wrist', 'inseam-ankle', 'inseam-floor',
        'neck-waist', 'neck-floor', 'waist-floor', 'height'
      ];
      
      requiredMeasurements.forEach(measurement => {
        expect(MeasurementData.measurementDefinitions).to.have.property(measurement);
      });
    });

    it('should have proper structure for each measurement', () => {
      const measurement = MeasurementData.measurementDefinitions.neck;
      expect(measurement).to.have.property('object');
      expect(measurement).to.have.property('definition');
      expect(measurement).to.have.property('description');
      expect(measurement.object).to.equal('Neck');
    });

    it('should have gender-specific measurements', () => {
      expect(MeasurementData.measurementDefinitions).to.have.property('across-front'); // Male
      expect(MeasurementData.measurementDefinitions).to.have.property('total-rise'); // Male
      expect(MeasurementData.measurementDefinitions).to.have.property('under-bust'); // Female
      expect(MeasurementData.measurementDefinitions).to.have.property('hip-bone-circumference'); // Female
    });
  });

  describe('sizeOptions', () => {
    it('should have male size options', () => {
      expect(MeasurementData.sizeOptions.male).to.be.an('array');
      expect(MeasurementData.sizeOptions.male).to.include('38M');
      expect(MeasurementData.sizeOptions.male).to.include('42XL');
    });

    it('should have female cup size options', () => {
      expect(MeasurementData.sizeOptions.female).to.be.an('array');
      expect(MeasurementData.sizeOptions.female).to.include('A');
      expect(MeasurementData.sizeOptions.female).to.include('DD/E');
    });
  });

  describe('config', () => {
    it('should have default configuration', () => {
      expect(MeasurementData.config.measurementUnit).to.equal('inches');
      expect(MeasurementData.config.maxSummaryItems).to.equal(30);
      expect(MeasurementData.config.minZoom).to.equal(0.5);
      expect(MeasurementData.config.maxZoom).to.equal(3);
      expect(MeasurementData.config.defaultZoom).to.equal(1);
    });
  });
});
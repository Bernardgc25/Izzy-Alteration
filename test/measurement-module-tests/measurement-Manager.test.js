// IZZY-ALTERATION/test/measurement-module-tests/measurement-Manager.test.js

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { MeasurementManager } from '../../src/pages/measurement-pages/measurement-modules/measurement-Manager.js';

describe('MeasurementManager', () => {
    let manager;
    let mockDOM;

    beforeEach(() => {
        // Create a mock DOM
        mockDOM = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <form>
                        <input type="date" id="save-date">
                        <input type="text" id="client-name">
                        <input type="text" id="size-number">
                        <input type="text" id="cupSize">
                        <div class="measurement-input" data-min="10" data-max="50" id="neck">20</div>
                    </form>
                </body>
            </html>
        `);

        global.document = mockDOM.window.document;
        manager = new MeasurementManager();
    });

    afterEach(() => {
        delete global.document;
    });

    describe('initialize', () => {
        it('should set gender and return manager instance', () => {
            const result = manager.initialize('male');
            expect(result).to.equal(manager);
            expect(manager.gender).to.equal('male');
        });

        it('should handle female gender', () => {
            manager.initialize('female');
            expect(manager.gender).to.equal('female');
        });
    });

    describe('setupDateField', () => {
        it('should set current date in date field', () => {
            const today = new Date().toISOString().split('T')[0];
            manager.setupDateField();
            
            const dateField = document.getElementById('save-date');
            expect(dateField.value).to.equal(today);
            expect(dateField.max).to.equal(today);
        });

        it('should handle missing date field gracefully', () => {
            const dateField = document.getElementById('save-date');
            dateField.remove();
            
            // Should not throw error
            expect(() => manager.setupDateField()).to.not.throw();
        });
    });

    describe('saveMeasurement', () => {
        beforeEach(() => {
            manager.initialize('male');
        });

        it('should save valid measurement', () => {
            manager.saveMeasurement('neck', '15.5', 'Neck Circumference');
            
            expect(manager.measurements.has('neck')).to.be.true;
            const saved = manager.measurements.get('neck');
            expect(saved.value).to.equal('15.5');
            expect(saved.label).to.equal('Neck Circumference');
            expect(saved.timestamp).to.be.a('string');
        });

        it('should not save empty value', () => {
            manager.saveMeasurement('neck', '', 'Neck Circumference');
            manager.saveMeasurement('neck', '   ', 'Neck Circumference');
            
            expect(manager.measurements.has('neck')).to.be.false;
        });

        it('should overwrite existing measurement', () => {
            manager.saveMeasurement('neck', '15', 'Neck');
            const firstTimestamp = manager.measurements.get('neck').timestamp;
            
            // Small delay to ensure different timestamp
            setTimeout(() => {
                manager.saveMeasurement('neck', '16', 'Neck');
                const secondTimestamp = manager.measurements.get('neck').timestamp;
                
                expect(manager.measurements.get('neck').value).to.equal('16');
                expect(secondTimestamp).to.not.equal(firstTimestamp);
            }, 10);
        });
    });

    describe('getFormData', () => {
        beforeEach(() => {
            manager.initialize('male');
            document.getElementById('client-name').value = 'John Doe';
            document.getElementById('save-date').value = '2024-01-15';
            document.getElementById('size-number').value = 'M';
        });

        it('should collect all form data for male', () => {
            manager.saveMeasurement('neck', '16', 'Neck');
            manager.saveMeasurement('chest', '42', 'Chest');
            
            const formData = manager.getFormData();
            
            expect(formData.name).to.equal('John Doe');
            expect(formData.date).to.equal('2024-01-15');
            expect(formData.gender).to.equal('male');
            expect(formData.sizeNumber).to.equal('M');
            expect(formData.cupSize).to.be.undefined;
            expect(formData.measurements.neck.value).to.equal('16');
            expect(formData.measurements.chest.value).to.equal('42');
            expect(Object.keys(formData.measurements)).to.have.lengthOf(2);
        });

        it('should collect all form data for female', () => {
            manager.initialize('female');
            document.getElementById('cupSize').value = 'C';
            
            manager.saveMeasurement('under-bust', '34', 'Under Bust');
            
            const formData = manager.getFormData();
            
            expect(formData.gender).to.equal('female');
            expect(formData.cupSize).to.equal('C');
            expect(formData.sizeNumber).to.be.undefined;
        });

        it('should handle missing form fields', () => {
            document.getElementById('client-name').value = '';
            document.getElementById('size-number').value = '';
            
            const formData = manager.getFormData();
            
            expect(formData.name).to.equal('');
            expect(formData.sizeNumber).to.equal('');
        });
    });

    describe('generatePrintContent', () => {
        beforeEach(() => {
            manager.initialize('male');
            manager.formData = {
                name: 'John Doe',
                date: '2024-01-15',
                gender: 'male',
                sizeNumber: 'M',
                measurements: new Map([
                    ['neck', { value: '16', label: 'Neck Circumference' }],
                    ['chest', { value: '42', label: 'Chest' }]
                ])
            };
        });

        it('should generate valid HTML content', () => {
            const content = manager.generatePrintContent();
            
            expect(content).to.include('<!DOCTYPE html>');
            expect(content).to.include('Measurement Summary');
            expect(content).to.include('John Doe');
            expect(content).to.include('male');
            expect(content).to.include('Neck Circumference');
            expect(content).to.include('16"');
            expect(content).to.include('Chest');
            expect(content).to.include('42"');
            expect(content).to.include('Size Number');
            expect(content).to.include('M');
        });

        it('should handle missing data gracefully', () => {
            manager.formData = {};
            
            const content = manager.generatePrintContent();
            
            expect(content).to.include('Not provided');
        });

        it('should include print styles', () => {
            const content = manager.generatePrintContent();
            
            expect(content).to.include('<style>');
            expect(content).to.include('@media print');
            expect(content).to.include('.no-print');
        });
    });

    describe('resetFormData', () => {
        it('should clear all stored data', () => {
            manager.initialize('male');
            manager.saveMeasurement('neck', '16', 'Neck');
            manager.saveMeasurement('chest', '42', 'Chest');
            manager.getFormData(); // Sets formData
            
            manager.resetFormData();
            
            expect(manager.measurements.size).to.equal(0);
            expect(manager.formData).to.deep.equal({});
        });
    });
});
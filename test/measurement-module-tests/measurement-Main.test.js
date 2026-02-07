// IZZY-ALTERATION/test/measurement-module-tests/measurement-Main.test.js

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import { MeasurementApp } from '../../src/pages/measurement-pages/measurement-modules/measurement-Main.js';

describe('MeasurementApp', () => {
    let measurementApp;
    let mockDOM;
    let alertStub;
    let confirmStub;

    beforeEach(() => {
        // Create a comprehensive mock DOM
        mockDOM = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <form id="measurement-form" data-gender="male">
                        <input type="text" id="client-name">
                        <input type="date" id="save-date">
                        <select id="size-number">
                            <option value=""></option>
                            <option value="M">M</option>
                        </select>
                        <select id="cupSize">
                            <option value=""></option>
                            <option value="A">A</option>
                        </select>
                        
                        <input type="text" 
                               id="neck" 
                               class="measurement-input" 
                               data-measurement="neck"
                               data-min="10" 
                               data-max="25">
                        <span id="neck-error" class="error-message"></span>
                        
                        <input type="text" 
                               id="chest" 
                               class="measurement-input" 
                               data-measurement="chest"
                               data-min="20" 
                               data-max="60">
                        <span id="chest-error" class="error-message"></span>
                        
                        <button id="save-measurements">Save</button>
                        <button id="reset-form">Reset</button>
                        <button id="print-summary">Print</button>
                    </form>
                    
                    <div id="guide-image"></div>
                    <div id="default-guide"></div>
                    
                    <div id="floating-guide-overlay"></div>
                    <div id="floating-measurement-guide"></div>
                    <button id="close-floating-guide">×</button>
                    
                    <div class="measurement-label">
                        <span class="fa-eye"></span>
                    </div>
                </body>
            </html>
        `);

        global.document = mockDOM.window.document;
        global.window = mockDOM.window;
        
        // Stub window methods
        alertStub = sinon.stub(global.window, 'alert');
        confirmStub = sinon.stub(global.window, 'confirm');
        global.window.print = sinon.stub();
        global.window.open = sinon.stub().returns({
            document: {
                write: sinon.stub(),
                close: sinon.stub()
            }
        });
    });

    afterEach(() => {
        // Restore all stubs
        alertStub.restore();
        confirmStub?.restore();
        delete global.window.print;
        delete global.window.open;
        delete global.document;
        delete global.window;
    });

    describe('constructor and initialization', () => {
        it('should initialize all modules when DOM is loaded', () => {
            // Trigger DOMContentLoaded
            const initSpy = sinon.spy(MeasurementApp.prototype, 'init');
            
            document.addEventListener('DOMContentLoaded', () => {
                measurementApp = new MeasurementApp();
            });
            
            // Simulate DOM ready
            document.dispatchEvent(new Event('DOMContentLoaded'));
            
            expect(initSpy.calledOnce).to.be.true;
            expect(measurementApp).to.be.instanceOf(MeasurementApp);
            expect(measurementApp.manager).to.not.be.null;
            expect(measurementApp.validator).to.not.be.null;
            expect(measurementApp.viewHandler).to.not.be.null;
            expect(measurementApp.debounceTimers).to.be.instanceOf(Map);
            
            initSpy.restore();
        });

        it('should handle missing form gracefully', () => {
            document.getElementById('measurement-form').remove();
            
            const consoleSpy = sinon.spy(console, 'error');
            
            measurementApp = new MeasurementApp();
            
            expect(consoleSpy.calledWith('Measurement form not found')).to.be.true;
            expect(measurementApp.manager).to.be.null;
            
            consoleSpy.restore();
        });
    });

    describe('checkMobileView', () => {
        it('should return true for mobile view', () => {
            measurementApp = new MeasurementApp();
            global.window.innerWidth = 800;
            
            const result = measurementApp.checkMobileView();
            
            expect(result).to.be.true;
        });

        it('should return false for desktop view', () => {
            measurementApp = new MeasurementApp();
            global.window.innerWidth = 1200;
            
            const result = measurementApp.checkMobileView();
            
            expect(result).to.be.false;
        });
    });

    describe('setupInitialState', () => {
        it('should setup date field and guide image', () => {
            // Mock the modules
            measurementApp = new MeasurementApp();
            measurementApp.manager = {
                setupDateField: sinon.stub()
            };
            measurementApp.viewHandler = {
                isMobileView: false,
                setupDesktopGuideImage: sinon.stub()
            };
            
            measurementApp.setupInitialState();
            
            expect(measurementApp.manager.setupDateField.calledOnce).to.be.true;
            // Should call setupDesktopGuideImage after timeout
            setTimeout(() => {
                expect(measurementApp.viewHandler.setupDesktopGuideImage.calledOnce).to.be.true;
            }, 150);
        });

        it('should not setup desktop guide for mobile view', () => {
            measurementApp = new MeasurementApp();
            measurementApp.manager = {
                setupDateField: sinon.stub()
            };
            measurementApp.viewHandler = {
                isMobileView: true,
                setupDesktopGuideImage: sinon.stub()
            };
            
            measurementApp.setupInitialState();
            
            setTimeout(() => {
                expect(measurementApp.viewHandler.setupDesktopGuideImage.called).to.be.false;
            }, 150);
        });
    });

    describe('setupEventListeners', () => {
        it('should setup all event listeners', () => {
            measurementApp = new MeasurementApp();
            
            const setupFormInputSpy = sinon.spy(measurementApp, 'setupFormInputListeners');
            const setupButtonSpy = sinon.spy(measurementApp, 'setupButtonListeners');
            const setupGuideSpy = sinon.spy(measurementApp, 'setupGuideListeners');
            
            measurementApp.setupEventListeners();
            
            expect(setupFormInputSpy.calledOnce).to.be.true;
            expect(setupButtonSpy.calledOnce).to.be.true;
            expect(setupGuideSpy.calledOnce).to.be.true;
            
            setupFormInputSpy.restore();
            setupButtonSpy.restore();
            setupGuideSpy.restore();
        });
    });

    describe('setupFormInputListeners', () => {
        it('should setup listeners for form inputs', () => {
            measurementApp = new MeasurementApp();
            measurementApp.validator = {
                validateField: sinon.stub()
            };
            measurementApp.viewHandler = {
                showMeasurementGuide: sinon.stub()
            };
            
            const nameField = document.getElementById('client-name');
            const measurementInput = document.getElementById('neck');
            
            measurementApp.setupFormInputListeners();
            
            // Test name field input
            nameField.dispatchEvent(new Event('input'));
            nameField.dispatchEvent(new Event('blur'));
            
            // Test measurement input focus
            measurementInput.dispatchEvent(new Event('focus'));
            measurementInput.dispatchEvent(new Event('blur'));
            
            expect(measurementApp.validator.validateField.called).to.be.true;
            expect(measurementApp.viewHandler.showMeasurementGuide.calledWith('neck')).to.be.true;
        });
    });

    describe('debouncedInputHandler', () => {
        it('should debounce input and save measurement', () => {
            measurementApp = new MeasurementApp();
            measurementApp.manager = {
                saveMeasurement: sinon.stub()
            };
            measurementApp.validator = {
                validateField: sinon.stub()
            };
            
            // Create a mock input with parent containing label
            const input = document.getElementById('neck');
            const labelDiv = document.createElement('div');
            labelDiv.className = 'label-text';
            labelDiv.textContent = 'Neck:';
            input.parentElement.appendChild(labelDiv);
            
            const event = { target: input };
            
            measurementApp.debouncedInputHandler(event);
            
            // Wait for debounce
            setTimeout(() => {
                expect(measurementApp.manager.saveMeasurement.calledWith('neck', '', 'Neck')).to.be.true;
                expect(measurementApp.validator.validateField.calledWith('neck')).to.be.true;
            }, 200);
        });
    });

    describe('handleInputFocus', () => {
        it('should show guide and clear error on input focus', () => {
            measurementApp = new MeasurementApp();
            measurementApp.viewHandler = {
                showMeasurementGuide: sinon.stub()
            };
            measurementApp.validator = {
                clearSingleError: sinon.stub()
            };
            
            const input = document.getElementById('neck');
            const event = { target: input };
            
            measurementApp.handleInputFocus(event);
            
            expect(measurementApp.viewHandler.showMeasurementGuide.calledWith('neck')).to.be.true;
            expect(measurementApp.validator.clearSingleError.calledWith('neck')).to.be.true;
        });

        it('should handle input without data-measurement attribute', () => {
            measurementApp = new MeasurementApp();
            measurementApp.viewHandler = {
                showMeasurementGuide: sinon.stub()
            };
            
            const input = document.getElementById('client-name');
            delete input.dataset.measurement;
            const event = { target: input };
            
            measurementApp.handleInputFocus(event);
            
            expect(measurementApp.viewHandler.showMeasurementGuide.called).to.be.false;
        });
    });

    describe('handleSaveMeasurements', () => {
        it('should save measurements when validation passes', () => {
            measurementApp = new MeasurementApp();
            measurementApp.manager = {
                getFormData: sinon.stub().returns({
                    name: 'John Doe',
                    date: '2024-01-15',
                    measurements: { neck: { value: '16' } }
                })
            };
            measurementApp.validator = {
                validateAll: sinon.stub().returns(true)
            };
            measurementApp.viewHandler = {
                showSuccessMessage: sinon.stub()
            };
            
            measurementApp.handleSaveMeasurements();
            
            expect(measurementApp.validator.validateAll.calledOnce).to.be.true;
            expect(measurementApp.manager.getFormData.calledOnce).to.be.true;
            expect(measurementApp.viewHandler.showSuccessMessage.calledOnce).to.be.true;
            expect(alertStub.called).to.be.false;
        });

        it('should show validation error when validation fails', () => {
            measurementApp = new MeasurementApp();
            measurementApp.validator = {
                validateAll: sinon.stub().returns(false)
            };
            measurementApp.viewHandler = {
                focusFirstErrorField: sinon.stub(),
                showValidationErrorAlert: sinon.stub()
            };
            
            measurementApp.handleSaveMeasurements();
            
            expect(measurementApp.validator.validateAll.calledOnce).to.be.true;
            expect(measurementApp.viewHandler.focusFirstErrorField.calledOnce).to.be.true;
            expect(measurementApp.viewHandler.showValidationErrorAlert.calledOnce).to.be.true;
            expect(alertStub.called).to.be.false;
        });
    });

    describe('handleResetForm', () => {
        it('should reset form when confirmed', () => {
            measurementApp = new MeasurementApp();
            measurementApp.manager = {
                resetFormData: sinon.stub(),
                setupDateField: sinon.stub()
            };
            measurementApp.validator = {
                clearErrors: sinon.stub()
            };
            measurementApp.viewHandler = {
                hideFloatingGuide: sinon.stub()
            };
            
            confirmStub.returns(true); // User confirms reset
            
            measurementApp.handleResetForm();
            
            expect(confirmStub.calledOnce).to.be.true;
            expect(measurementApp.manager.resetFormData.calledOnce).to.be.true;
            expect(measurementApp.manager.setupDateField.calledOnce).to.be.true;
            expect(measurementApp.validator.clearErrors.calledOnce).to.be.true;
            expect(measurementApp.viewHandler.hideFloatingGuide.calledOnce).to.be.true;
        });

        it('should not reset form when cancelled', () => {
            measurementApp = new MeasurementApp();
            measurementApp.manager = {
                resetFormData: sinon.stub()
            };
            
            confirmStub.returns(false); // User cancels
            
            measurementApp.handleResetForm();
            
            expect(confirmStub.calledOnce).to.be.true;
            expect(measurementApp.manager.resetFormData.called).to.be.false;
        });
    });

    describe('bindGlobalFunctions', () => {
        it('should bind global functions for HTML onclick handlers', () => {
            measurementApp = new MeasurementApp();
            
            const saveSpy = sinon.spy(measurementApp, 'handleSaveMeasurements');
            const resetSpy = sinon.spy(measurementApp, 'handleResetForm');
            
            measurementApp.bindGlobalFunctions();
            
            // Call global functions
            global.window.handleSaveMeasurements();
            global.window.handleResetForm();
            
            expect(saveSpy.calledOnce).to.be.true;
            expect(resetSpy.calledOnce).to.be.true;
            
            saveSpy.restore();
            resetSpy.restore();
        });
    });

    describe('logInitialization', () => {
        it('should log initialization message', () => {
            measurementApp = new MeasurementApp();
            measurementApp.manager = { gender: 'male' };
            
            const consoleSpy = sinon.spy(console, 'log');
            
            measurementApp.logInitialization();
            
            expect(consoleSpy.calledWith('Measurement App initialized for male')).to.be.true;
            
            consoleSpy.restore();
        });
    });
});
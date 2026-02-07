// IZZY-ALTERATION/test/measurement-module-tests/measurement-ViewHandler.test.js

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import { ViewHandler } from '../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js';

// Mock the getMeasurement function
const mockGetMeasurement = (gender, key) => {
    const measurements = {
        male: {
            'neck': {
                object: 'Neck Circumference',
                definition: 'Measure around the base of the neck',
                description: 'Place tape measure around neck',
                imageMobile: '/images/male-neck-mobile.png'
            },
            'chest': {
                object: 'Chest Circumference',
                definition: 'Measure around fullest part',
                description: 'Wrap tape around chest',
                imageMobile: '/images/male-chest-mobile.png'
            }
        },
        female: {
            'under-bust': {
                object: 'Under Bust',
                definition: 'Measure under bust',
                description: 'Wrap tape under bust',
                imageMobile: '/images/female-underbust-mobile.png'
            }
        }
    };
    
    return measurements[gender]?.[key] || null;
};

// Replace the imported function with our mock
const originalImport = await import('../../../src/pages/measurement-pages/measurement-modules/measurement-DataMaps.js');
originalImport.getMeasurement = mockGetMeasurement;

describe('ViewHandler', () => {
    let viewHandler;
    let mockDOM;
    let alertStub;

    beforeEach(() => {
        // Create a mock DOM with all required elements
        mockDOM = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <div id="guide-image" style="display: none;"></div>
                    <div id="default-guide" style="display: none;"></div>
                    
                    <div id="measure-object"></div>
                    <div id="measure-definition"></div>
                    <div id="measure-description"></div>
                    
                    <div id="floating-measure-object"></div>
                    <div id="floating-measure-definition"></div>
                    <div id="floating-measure-description"></div>
                    
                    <div id="floating-guide-overlay" style="display: none;"></div>
                    <div id="floating-measurement-guide" style="display: none;">
                        <div class="measurement-guide-floating">
                            <div class="floating-guide-images"></div>
                        </div>
                        <button id="close-floating-guide">×</button>
                    </div>
                    
                    <div class="measurement-label">
                        <span class="fa-eye"></span>
                    </div>
                    
                    <input type="text" class="measurement-input" data-measurement="neck">
                    <input type="text" class="measurement-input" data-measurement="chest">
                    
                    <button id="print-summary">Print</button>
                    
                    <input class="error" id="error-field">
                </body>
            </html>
        `);

        global.document = mockDOM.window.document;
        global.window = mockDOM.window;
        
        // Stub alert
        alertStub = sinon.stub(global.window, 'alert');
    });

    afterEach(() => {
        alertStub.restore();
        delete global.document;
        delete global.window;
    });

    describe('constructor and initialization', () => {
        it('should initialize with gender and view type', () => {
            viewHandler = new ViewHandler('male', false);
            expect(viewHandler.gender).to.equal('male');
            expect(viewHandler.isMobileView).to.be.false;
            expect(viewHandler.debounceTimers).to.be.instanceOf(Map);
            expect(viewHandler.zoomState).to.deep.equal({
                scale: 1.0,
                x: 0,
                y: 0,
                isDragging: false,
                startX: 0,
                startY: 0
            });
        });

        it('should initialize for mobile view', () => {
            viewHandler = new ViewHandler('female', true);
            expect(viewHandler.gender).to.equal('female');
            expect(viewHandler.isMobileView).to.be.true;
        });
    });

    describe('getGenderImage', () => {
        it('should return correct image for male', () => {
            viewHandler = new ViewHandler('male', false);
            const image = viewHandler.getGenderImage();
            expect(image).to.equal('/src/images/male-desktop.png');
        });

        it('should return correct image for female', () => {
            viewHandler = new ViewHandler('female', false);
            const image = viewHandler.getGenderImage();
            expect(image).to.equal('/src/images/female-desktop.png');
        });

        it('should return null for invalid gender', () => {
            viewHandler = new ViewHandler('invalid', false);
            const image = viewHandler.getGenderImage();
            expect(image).to.be.null;
        });
    });

    describe('showMeasurementGuide', () => {
        beforeEach(() => {
            viewHandler = new ViewHandler('male', false);
        });

        it('should update guide text for valid measurement', () => {
            viewHandler.showMeasurementGuide('neck');
            
            const objectElement = document.getElementById('measure-object');
            const definitionElement = document.getElementById('measure-definition');
            const descriptionElement = document.getElementById('measure-description');
            
            expect(objectElement.innerHTML).to.include('Object:');
            expect(objectElement.innerHTML).to.include('Neck Circumference');
            expect(definitionElement.innerHTML).to.include('Definition:');
            expect(definitionElement.innerHTML).to.include('Measure around the base of the neck');
            expect(descriptionElement.innerHTML).to.include('Description:');
            expect(descriptionElement.innerHTML).to.include('Place tape measure around neck');
        });

        it('should handle invalid measurement key', () => {
            // Should not throw error
            expect(() => viewHandler.showMeasurementGuide('invalid')).to.not.throw();
        });

        it('should handle missing DOM elements gracefully', () => {
            document.getElementById('measure-object').remove();
            
            // Should not throw error
            expect(() => viewHandler.showMeasurementGuide('neck')).to.not.throw();
        });
    });

    describe('showFloatingGuide and hideFloatingGuide', () => {
        beforeEach(() => {
            viewHandler = new ViewHandler('male', true); // Mobile view
        });

        it('should show floating guide with measurement data', () => {
            viewHandler.showFloatingGuide('neck');
            
            const overlay = document.getElementById('floating-guide-overlay');
            const floatingGuide = document.getElementById('floating-measurement-guide');
            const objectElement = document.getElementById('floating-measure-object');
            const imagesContainer = document.querySelector('.floating-guide-images');
            
            expect(overlay.style.display).to.equal('block');
            expect(floatingGuide.style.display).to.equal('flex');
            expect(objectElement.innerHTML).to.include('Neck Circumference');
            expect(imagesContainer.children.length).to.equal(1);
            expect(imagesContainer.firstChild.src).to.include('/images/male-neck-mobile.png');
        });

        it('should hide floating guide', () => {
            // First show it
            viewHandler.showFloatingGuide('neck');
            
            // Then hide it
            viewHandler.hideFloatingGuide();
            
            const overlay = document.getElementById('floating-guide-overlay');
            const floatingGuide = document.getElementById('floating-measurement-guide');
            
            expect(overlay.style.display).to.equal('none');
            expect(floatingGuide.style.display).to.equal('none');
        });

        it('should handle missing measurement data', () => {
            // Should not throw error
            expect(() => viewHandler.showFloatingGuide('invalid')).to.not.throw();
        });

        it('should handle missing image mobile property', () => {
            const measurement = mockGetMeasurement('male', 'chest');
            measurement.imageMobile = null;
            
            viewHandler.showFloatingGuide('chest');
            
            const imagesContainer = document.querySelector('.floating-guide-images');
            expect(imagesContainer.children.length).to.equal(0);
        });
    });

    describe('setupEyeIconListeners', () => {
        beforeEach(() => {
            viewHandler = new ViewHandler('male', true); // Mobile view
        });

        it('should setup click listeners on eye icons', () => {
            const callback = sinon.stub();
            const eyeIcon = document.querySelector('.fa-eye');
            
            viewHandler.setupEyeIconListeners(callback);
            
            // Simulate click
            eyeIcon.click();
            
            expect(callback.calledOnce).to.be.true;
            expect(callback.firstCall.args[0]).to.equal('neck');
        });

        it('should not trigger callback on desktop view', () => {
            viewHandler = new ViewHandler('male', false); // Desktop view
            const callback = sinon.stub();
            
            viewHandler.setupEyeIconListeners(callback);
            
            const eyeIcon = document.querySelector('.fa-eye');
            eyeIcon.click();
            
            expect(callback.called).to.be.false;
        });
    });

    describe('setupWindowResizeListener', () => {
        it('should call callback when view changes', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub();
            
            viewHandler.setupWindowResizeListener(callback);
            
            // Simulate resize to mobile view
            global.window.innerWidth = 800;
            global.window.dispatchEvent(new Event('resize'));
            
            expect(callback.calledOnce).to.be.true;
            expect(callback.firstCall.args[0]).to.be.true;
        });

        it('should not call callback when view does not change', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub();
            
            viewHandler.setupWindowResizeListener(callback);
            
            // Simulate resize but still desktop view
            global.window.innerWidth = 1200;
            global.window.dispatchEvent(new Event('resize'));
            
            expect(callback.called).to.be.false;
        });
    });

    describe('setupEscapeKeyListener', () => {
        it('should call callback on escape key', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub();
            
            viewHandler.setupEscapeKeyListener(callback);
            
            // Simulate escape key press
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            document.dispatchEvent(event);
            
            expect(callback.calledOnce).to.be.true;
        });

        it('should not call callback on other keys', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub();
            
            viewHandler.setupEscapeKeyListener(callback);
            
            // Simulate other key press
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            document.dispatchEvent(event);
            
            expect(callback.called).to.be.false;
        });
    });

    describe('setupPrintButtonListener', () => {
        it('should setup print button click listener', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub();
            
            viewHandler.setupPrintButtonListener(callback);
            
            const printBtn = document.getElementById('print-summary');
            printBtn.click();
            
            expect(callback.calledOnce).to.be.true;
        });

        it('should handle missing print button', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub();
            
            document.getElementById('print-summary').remove();
            
            // Should not throw error
            expect(() => viewHandler.setupPrintButtonListener(callback)).to.not.throw();
        });

        it('should show alert on callback error', () => {
            viewHandler = new ViewHandler('male', false);
            const callback = sinon.stub().throws(new Error('Print error'));
            
            viewHandler.setupPrintButtonListener(callback);
            
            const printBtn = document.getElementById('print-summary');
            printBtn.click();
            
            expect(alertStub.calledOnce).to.be.true;
            expect(alertStub.firstCall.args[0]).to.equal('Print error');
        });
    });

    describe('showAlert and showValidationErrorAlert', () => {
        beforeEach(() => {
            viewHandler = new ViewHandler('male', false);
        });

        it('should show alert with message', () => {
            viewHandler.showAlert('Test message');
            
            expect(alertStub.calledOnce).to.be.true;
            expect(alertStub.firstCall.args[0]).to.equal('Test message');
        });

        it('should show validation error alert', () => {
            viewHandler.showValidationErrorAlert();
            
            expect(alertStub.calledOnce).to.be.true;
            expect(alertStub.firstCall.args[0]).to.include('Please fill in all required fields');
        });
    });

    describe('showSuccessMessage', () => {
        it('should show success message with form data', () => {
            viewHandler = new ViewHandler('male', false);
            
            const formData = {
                name: 'John Doe',
                date: '2024-01-15',
                measurements: {
                    neck: { value: '16' },
                    chest: { value: '42' }
                }
            };
            
            viewHandler.showSuccessMessage(formData);
            
            expect(alertStub.calledOnce).to.be.true;
            const alertMessage = alertStub.firstCall.args[0];
            expect(alertMessage).to.include('Measurements saved successfully');
            expect(alertMessage).to.include('John Doe');
            expect(alertMessage).to.include('2024-01-15');
            expect(alertMessage).to.include('Total Measurements: 2');
        });
    });

    describe('focusFirstErrorField', () => {
        it('should focus on first error field', () => {
            viewHandler = new ViewHandler('male', false);
            const errorField = document.getElementById('error-field');
            const focusStub = sinon.stub(errorField, 'focus');
            
            viewHandler.focusFirstErrorField();
            
            expect(focusStub.calledOnce).to.be.true;
        });

        it('should handle no error fields gracefully', () => {
            viewHandler = new ViewHandler('male', false);
            document.querySelector('.error').classList.remove('error');
            
            // Should not throw error
            expect(() => viewHandler.focusFirstErrorField()).to.not.throw();
        });
    });

    describe('zoom and pan functionality', () => {
        beforeEach(() => {
            // Add image container for zoom tests
            const container = document.createElement('div');
            container.id = 'image-container';
            const image = document.getElementById('guide-image');
            container.appendChild(image);
            document.body.appendChild(container);
            
            viewHandler = new ViewHandler('male', false);
        });

        describe('handleZoom', () => {
            it('should apply zoom on wheel event', () => {
                const image = document.getElementById('guide-image');
                const event = new WheelEvent('wheel', { 
                    deltaY: -10,
                    clientX: 100,
                    clientY: 100 
                });
                
                // Mock getBoundingClientRect
                const rectStub = sinon.stub(image.parentElement, 'getBoundingClientRect').returns({
                    left: 0,
                    top: 0,
                    right: 200,
                    bottom: 200,
                    width: 200,
                    height: 200
                });
                
                // Simulate the zoom handler
                viewHandler.handleZoom(event, image);
                
                expect(viewHandler.zoomState.scale).to.be.greaterThan(1.0);
                
                rectStub.restore();
            });

            it('should handle zoom out', () => {
                const image = document.getElementById('guide-image');
                const event = new WheelEvent('wheel', { 
                    deltaY: 10,
                    clientX: 100,
                    clientY: 100 
                });
                
                const rectStub = sinon.stub(image.parentElement, 'getBoundingClientRect').returns({
                    left: 0,
                    top: 0,
                    right: 200,
                    bottom: 200,
                    width: 200,
                    height: 200
                });
                
                viewHandler.handleZoom(event, image);
                
                expect(viewHandler.zoomState.scale).to.be.lessThan(1.0);
                
                rectStub.restore();
            });
        });

        describe('resetZoom', () => {
            it('should reset zoom state', () => {
                const image = document.getElementById('guide-image');
                
                // Set some zoom state
                viewHandler.zoomState = {
                    scale: 2.0,
                    x: 50,
                    y: 50,
                    isDragging: false,
                    startX: 0,
                    startY: 0
                };
                
                viewHandler.resetZoom(image);
                
                expect(viewHandler.zoomState.scale).to.equal(1.0);
                expect(viewHandler.zoomState.x).to.equal(0);
                expect(viewHandler.zoomState.y).to.equal(0);
            });
        });
    });
});
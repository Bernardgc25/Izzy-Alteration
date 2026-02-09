import { expect } from 'chai';
import { stub, spy, restore, useFakeTimers } from 'sinon';
import { JSDOM } from 'jsdom';

// Enhanced mock DOM for testing
const html = `<!DOCTYPE html>
<html>
<body>
    <div id="guide-image-container">
        <img id="guide-image" />
        <div id="default-guide"></div>
    </div>
    <div id="floating-guide-overlay" style="display: none;"></div>
    <div id="floating-measurement-guide" style="display: none;"></div>
    <div class="measurement-label">
        <span class="fa fa-eye"></span>
        <div class="form-group">
            <input class="measurement-input" data-measurement="neck" />
        </div>
    </div>
    <div id="measure-object"></div>
    <div id="measure-definition"></div>
    <div id="measure-description"></div>
    <div id="floating-measure-object"></div>
    <div id="floating-measure-definition"></div>
    <div id="floating-measure-description"></div>
    <div class="measurement-guide-floating">
        <div class="floating-guide-images"></div>
    </div>
    <button id="print-summary">Print</button>
</body>
</html>`;

// Create a single JSDOM instance
let dom;

// Mock alert function
global.alert = () => {};

// Mock getMeasurement function
const mockGetMeasurement = (gender, key) => {
    const measurements = {
        male: {
            neck: {
                object: 'Neck Circumference',
                definition: 'Measure around the base of the neck...',
                description: 'Place the tape measure around...',
                imageMobile: '/test/images/neck-mobile.png'
            },
            waist: {
                object: 'Waist',
                definition: 'Measure around the natural waistline...',
                description: 'Wrap tape measure around the waist...',
                imageMobile: '/test/images/waist-mobile.png'
            }
        },
        female: {
            'under-bust': {
                object: 'Under Bust',
                definition: 'Measure around the torso directly under the bust...',
                description: 'Wrap tape measure around the ribcage...',
                imageMobile: '/test/images/under-bust-mobile.png'
            }
        }
    };
    return Promise.resolve(measurements[gender]?.[key] || null);
};

describe('measurement-ViewHandler.js', () => {
    let ViewHandler;
    let viewHandler;
    let consoleWarnStub;
    let alertStub;

    before(async () => {
        // Import the ViewHandler module
        const module = await import('../../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js');
        ViewHandler = module.ViewHandler;
    });

    beforeEach(() => {
        // Reset DOM to clean state
        dom = new JSDOM(html, {
            runScripts: 'dangerously',
            url: 'http://localhost',
            resources: 'usable'
        });
        
        global.window = dom.window;
        global.document = window.document;
        global.HTMLElement = window.HTMLElement;
        global.HTMLInputElement = window.HTMLInputElement;
        global.Element = window.Element;
        global.Event = window.Event;
        global.KeyboardEvent = window.KeyboardEvent;
        global.MouseEvent = window.MouseEvent;
        
        // Stub console.warn and alert
        consoleWarnStub = stub(console, 'warn');
        alertStub = stub(global, 'alert');
        
        // Create new instance for each test with mock getMeasurement
        viewHandler = new ViewHandler('male', true, mockGetMeasurement);
    });

    afterEach(() => {
        // Clean up the ViewHandler instance
        if (viewHandler && typeof viewHandler.cleanup === 'function') {
            viewHandler.cleanup();
        }
        
        // Clean up stubs
        restore();
        
        // Clean up global references
        delete global.window;
        delete global.document;
        delete global.HTMLElement;
        delete global.HTMLInputElement;
        delete global.Element;
        delete global.Event;
        delete global.KeyboardEvent;
        delete global.MouseEvent;
    });

    describe('constructor and initialization', () => {
        it('should set gender and isMobileView properties', () => {
            expect(viewHandler.gender).to.equal('male');
            expect(viewHandler.isMobileView).to.be.true;
        });

        it('should initialize debounceTimers map', () => {
            expect(viewHandler.debounceTimers).to.be.instanceOf(Map);
        });

        it('should initialize eventListeners map', () => {
            expect(viewHandler.eventListeners).to.be.instanceOf(Map);
        });

        it('should initialize zoomState object', () => {
            expect(viewHandler.zoomState).to.deep.equal({
                scale: 1.0,
                x: 0,
                y: 0,
                isDragging: false,
                startX: 0,
                startY: 0
            });
        });

        it('should accept custom getMeasurement function', () => {
            const customFn = stub().returns(Promise.resolve({}));
            const customHandler = new ViewHandler('female', false, customFn);
            expect(customHandler.getMeasurementFunction).to.equal(customFn);
        });
    });

    describe('getGenderImage', () => {
        it('should return correct image for male', () => {
            const image = viewHandler.getGenderImage();
            expect(image).to.equal('/src/images/male-desktop.png');
        });

        it('should return correct image for female', () => {
            viewHandler.gender = 'female';
            const image = viewHandler.getGenderImage();
            expect(image).to.equal('/src/images/female-desktop.png');
        });

        it('should return null for invalid gender', () => {
            viewHandler.gender = 'invalid';
            const image = viewHandler.getGenderImage();
            expect(image).to.be.null;
        });
    });

    describe('getMeasurement method', () => {
        it('should use injected function when provided', async () => {
            const mockFn = stub().returns(Promise.resolve({ object: 'Test' }));
            const handler = new ViewHandler('male', true, mockFn);
            
            const result = await handler.getMeasurement('male', 'neck');
            
            expect(mockFn.calledOnce).to.be.true;
            expect(mockFn.calledWith('male', 'neck')).to.be.true;
            expect(result).to.deep.equal({ object: 'Test' });
        });

        it('should handle async calls properly', async () => {
            const measurement = await viewHandler.getMeasurement('male', 'neck');
            expect(measurement).to.have.property('object', 'Neck Circumference');
        });
    });

    describe('showMeasurementGuide', () => {
        it('should update guide text for valid measurement', async () => {
            await viewHandler.showMeasurementGuide('neck');
            
            const objectElement = document.getElementById('measure-object');
            const definitionElement = document.getElementById('measure-definition');
            const descriptionElement = document.getElementById('measure-description');
            
            // Check innerHTML for HTML content
            expect(objectElement.innerHTML).to.equal('<strong>Object:</strong> Neck Circumference');
            expect(definitionElement.innerHTML).to.equal('<strong>Definition:</strong> Measure around the base of the neck...');
            expect(descriptionElement.innerHTML).to.equal('<strong>Description:</strong> Place the tape measure around...');
            
            // Check textContent for plain text (should be automatically derived from innerHTML)
            expect(objectElement.textContent).to.equal('Object: Neck Circumference');
            expect(definitionElement.textContent).to.equal('Definition: Measure around the base of the neck...');
            expect(descriptionElement.textContent).to.equal('Description: Place the tape measure around...');
        });

        it('should handle invalid measurement gracefully', async () => {
            await viewHandler.showMeasurementGuide('invalid-measurement');
            // Should not throw, just return early
        });
    });

    describe('showFloatingGuide', () => {
        it('should show floating guide for mobile view', async () => {
            await viewHandler.showFloatingGuide('neck');
            
            const overlay = document.getElementById('floating-guide-overlay');
            const floatingGuide = document.getElementById('floating-measurement-guide');
            
            expect(overlay.style.display).to.equal('block');
            expect(floatingGuide.style.display).to.equal('flex');
        });

        it('should update guide text for floating guide', async () => {
            await viewHandler.showFloatingGuide('neck');
            
            const objectElement = document.getElementById('floating-measure-object');
            const definitionElement = document.getElementById('floating-measure-definition');
            const descriptionElement = document.getElementById('floating-measure-description');
            
            // Check innerHTML for HTML content
            expect(objectElement.innerHTML).to.equal('<strong>Object:</strong> Neck Circumference');
            expect(definitionElement.innerHTML).to.equal('<strong>Definition:</strong> Measure around the base of the neck...');
            expect(descriptionElement.innerHTML).to.equal('<strong>Description:</strong> Place the tape measure around...');
            
            // Check textContent for plain text
            expect(objectElement.textContent).to.equal('Object: Neck Circumference');
            expect(definitionElement.textContent).to.equal('Definition: Measure around the base of the neck...');
            expect(descriptionElement.textContent).to.equal('Description: Place the tape measure around...');
        });

        it('should update mobile guide image', async () => {
            await viewHandler.showFloatingGuide('neck');
            
            const imagesContainer = document.querySelector('.floating-guide-images');
            expect(imagesContainer).to.exist;
            
            const image = imagesContainer.querySelector('img');
            expect(image).to.exist;
            expect(image.src).to.include('/test/images/neck-mobile.png');
        });

        it('should not throw when measurement not found', async () => {
            await viewHandler.showFloatingGuide('invalid-measurement');
            // Should not throw
        });
    });

    describe('hideFloatingGuide', () => {
        it('should hide floating guide elements', () => {
            // First show the guide
            const overlay = document.getElementById('floating-guide-overlay');
            const floatingGuide = document.getElementById('floating-measurement-guide');
            
            if (overlay) overlay.style.display = 'block';
            if (floatingGuide) floatingGuide.style.display = 'flex';
            
            // Then hide it
            viewHandler.hideFloatingGuide();
            
            expect(overlay.style.display).to.equal('none');
            expect(floatingGuide.style.display).to.equal('none');
        });
    });

    describe('updateGuideText', () => {
        it('should update all guide text elements', () => {
            const measurement = {
                object: 'Test Object',
                definition: 'Test Definition',
                description: 'Test Description'
            };
            
            viewHandler.updateGuideText(measurement);
            
            const objectElements = [
                document.getElementById('measure-object'),
                document.getElementById('floating-measure-object')
            ];
            
            objectElements.forEach(element => {
                if (element) {
                    expect(element.innerHTML).to.equal('<strong>Object:</strong> Test Object');
                    expect(element.textContent).to.equal('Object: Test Object');
                }
            });
        });

        it('should handle missing elements gracefully', () => {
            // Temporarily remove an element to test graceful handling
            const element = document.getElementById('measure-object');
            const parent = element.parentNode;
            parent.removeChild(element);
            
            const measurement = {
                object: 'Test Object',
                definition: 'Test Definition',
                description: 'Test Description'
            };
            
            expect(() => viewHandler.updateGuideText(measurement)).not.to.throw();
        });
    });

    describe('setupEyeIconListeners', () => {
        it('should setup click listeners on eye icons', () => {
            const callback = stub();
            const result = viewHandler.setupEyeIconListeners(callback);
            
            expect(result).to.be.true; // Should return true when listeners are set up
            
            const eyeIcon = document.querySelector('.fa-eye');
            if (eyeIcon) {
                eyeIcon.click();
                expect(callback.calledOnce).to.be.true;
                expect(callback.calledWith('neck')).to.be.true;
            }
        });

        it('should stop event propagation', () => {
            const callback = stub();
            viewHandler.setupEyeIconListeners(callback);
            
            const eyeIcon = document.querySelector('.fa-eye');
            if (eyeIcon) {
                let parentClicked = false;
                
                if (eyeIcon.parentElement) {
                    eyeIcon.parentElement.addEventListener('click', () => {
                        parentClicked = true;
                    });
                }
                
                const clickEvent = new MouseEvent('click', { bubbles: true });
                eyeIcon.dispatchEvent(clickEvent);
                
                expect(parentClicked).to.be.false;
            }
        });

        it('should not call callback for non-mobile view', () => {
            const handler = new ViewHandler('male', false, mockGetMeasurement);
            const callback = stub();
            
            handler.setupEyeIconListeners(callback);
            
            const eyeIcon = document.querySelector('.fa-eye');
            if (eyeIcon) {
                const clickEvent = new MouseEvent('click', { bubbles: true });
                eyeIcon.dispatchEvent(clickEvent);
                expect(callback.called).to.be.false;
            }
        });

        it('should handle missing data-measurement attribute gracefully', () => {
            // Remove the data-measurement attribute
            const input = document.querySelector('.measurement-input');
            if (input) {
                input.removeAttribute('data-measurement');
            }
            
            const callback = stub();
            viewHandler.setupEyeIconListeners(callback);
            
            const eyeIcon = document.querySelector('.fa-eye');
            if (eyeIcon) {
                eyeIcon.click();
                expect(callback.called).to.be.false;
            }
        });
    });

    describe('setupWindowResizeListener', () => {
        let clock;
        
        beforeEach(() => {
            clock = useFakeTimers();
        });
        
        afterEach(() => {
            clock.restore();
        });

        it('should trigger callback when view changes', () => {
            const callback = stub();
            const handler = new ViewHandler('male', false, mockGetMeasurement);
            handler.setupWindowResizeListener(callback);
            
            // Mock window resize to mobile width
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400
            });
            
            window.dispatchEvent(new Event('resize'));
            
            // Advance timers by 250ms to trigger debounce
            clock.tick(250);
            
            expect(callback.calledOnce).to.be.true;
            expect(callback.firstCall.args[0]).to.be.true; // Should be mobile now
        });

        it('should not trigger callback when view does not change', () => {
            const callback = stub();
            viewHandler.isMobileView = true;
            viewHandler.setupWindowResizeListener(callback);
            
            // Same width, should not trigger
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400
            });
            
            window.dispatchEvent(new Event('resize'));
            
            // Advance timers
            clock.tick(250);
            
            expect(callback.called).to.be.false;
        });
    });

    describe('setupEscapeKeyListener', () => {
        it('should call callback on escape key press', () => {
            const callback = stub();
            viewHandler.setupEscapeKeyListener(callback);
            
            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            document.dispatchEvent(escapeEvent);
            
            expect(callback.calledOnce).to.be.true;
        });

        it('should not call callback on other key press', () => {
            const callback = stub();
            viewHandler.setupEscapeKeyListener(callback);
            
            const otherEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            document.dispatchEvent(otherEvent);
            
            expect(callback.called).to.be.false;
        });
    });

    describe('setupPrintButtonListener', () => {
        it('should setup print button listener', () => {
            const callback = stub();
            viewHandler.setupPrintButtonListener(callback);
            
            const printButton = document.getElementById('print-summary');
            if (printButton) {
                printButton.click();
                expect(callback.calledOnce).to.be.true;
            }
        });

        it('should handle print errors with alert', () => {
            const error = new Error('Popup blocked');
            const callback = stub().throws(error);
            
            viewHandler.setupPrintButtonListener(callback);
            
            const printButton = document.getElementById('print-summary');
            if (printButton) {
                printButton.click();
                expect(alertStub.calledOnce).to.be.true;
                expect(alertStub.firstCall.args[0]).to.equal('Popup blocked');
            }
        });

        it('should handle missing print button gracefully', () => {
            const printButton = document.getElementById('print-summary');
            if (printButton) {
                printButton.parentNode.removeChild(printButton);
            }
            
            expect(() => viewHandler.setupPrintButtonListener(stub())).not.to.throw();
        });
    });

    describe('alert and message methods', () => {
        it('should show alert message', () => {
            viewHandler.showAlert('Test message');
            expect(alertStub.calledOnce).to.be.true;
            expect(alertStub.firstCall.args[0]).to.equal('Test message');
        });

        it('should show validation error alert', () => {
            viewHandler.showValidationErrorAlert();
            expect(alertStub.calledOnce).to.be.true;
            const expectedMessage = 'Please fill in all required fields correctly. Invalid fields are highlighted in red.';
            expect(alertStub.firstCall.args[0]).to.equal(expectedMessage);
        });

        it('should show success message', () => {
            const formData = {
                name: 'John Doe',
                date: '2024-01-01',
                measurements: { neck: {}, waist: {} }
            };
            
            viewHandler.showSuccessMessage(formData);
            
            expect(alertStub.calledOnce).to.be.true;
            const alertMessage = alertStub.firstCall.args[0];
            expect(alertMessage).to.include('Measurements saved successfully!');
            expect(alertMessage).to.include('John Doe');
            expect(alertMessage).to.include('2024-01-01');
            expect(alertMessage).to.include('Total Measurements: 2');
        });
    });

    describe('focusFirstErrorField', () => {
        it('should focus on first error field', () => {
            // Create test elements
            const input1 = document.createElement('input');
            input1.className = 'measurement-input error';
            const input2 = document.createElement('input');
            input2.className = 'measurement-input error';
            
            document.body.appendChild(input1);
            document.body.appendChild(input2);
            
            const focusSpy = spy(input1, 'focus');
            
            viewHandler.focusFirstErrorField();
            
            expect(focusSpy.calledOnce).to.be.true;
        });

        it('should handle no error fields gracefully', () => {
            expect(() => viewHandler.focusFirstErrorField()).not.to.throw();
        });
    });

    describe('zoom and pan functionality', () => {
        it('should apply zoom correctly', () => {
            const image = document.getElementById('guide-image');
            viewHandler.applyZoom(0.1, 100, 100, image);
            expect(viewHandler.zoomState.scale).to.be.greaterThan(1.0);
        });

        it('should clamp zoom scale', () => {
            const image = document.getElementById('guide-image');
            
            // Try to zoom out beyond minimum
            viewHandler.applyZoom(-1, 100, 100, image);
            expect(viewHandler.zoomState.scale).to.equal(0.5);
            
            // Try to zoom in beyond maximum
            viewHandler.zoomState.scale = 3.0;
            viewHandler.applyZoom(0.1, 100, 100, image);
            expect(viewHandler.zoomState.scale).to.equal(3.0);
        });

        it('should reset zoom', () => {
            const image = document.getElementById('guide-image');
            
            viewHandler.zoomState.scale = 2.0;
            viewHandler.zoomState.x = 50;
            viewHandler.zoomState.y = 50;
            
            viewHandler.resetZoom(image);
            
            expect(viewHandler.zoomState.scale).to.equal(1.0);
            expect(viewHandler.zoomState.x).to.equal(0);
            expect(viewHandler.zoomState.y).to.equal(0);
        });

        it('should start and stop pan', () => {
            const event = new MouseEvent('mousedown', { clientX: 100, clientY: 100 });
            viewHandler.startPan(event);
            
            expect(viewHandler.zoomState.isDragging).to.be.true;
            expect(viewHandler.zoomState.startX).to.equal(100);
            expect(viewHandler.zoomState.startY).to.equal(100);
            
            viewHandler.stopPan();
            expect(viewHandler.zoomState.isDragging).to.be.false;
        });
    });

    describe('cleanup', () => {
        it('should clean up event listeners and timers', () => {
            // Setup some event listeners
            const callback = stub();
            viewHandler.setupWindowResizeListener(callback);
            viewHandler.setupEscapeKeyListener(callback);
            
            // Add a debounce timer
            viewHandler.debounceTimers.set('test', setTimeout(() => {}, 1000));
            
            // Store references before cleanup
            const timerSizeBefore = viewHandler.debounceTimers.size;
            const listenerSizeBefore = viewHandler.eventListeners.size;
            
            // Perform cleanup
            viewHandler.cleanup();
            
            // Check that cleanup worked
            expect(viewHandler.debounceTimers.size).to.equal(0);
            expect(timerSizeBefore).to.be.greaterThan(0);
            expect(viewHandler.eventListeners.size).to.equal(0);
        });
    });
});
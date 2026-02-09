import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { JSDOM } from 'jsdom';

// Enhanced mock DOM for testing
const html = `<!DOCTYPE html>
<html>
<body>
<div id="guide-image"></div>
<div id="default-guide"></div>
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
<button id="close-floating-guide">Close</button>
</body>
</html>`;

// Create a single JSDOM instance
const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'http://localhost',
    resources: 'usable'
});

// Set global properties properly
global.window = dom.window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.HTMLInputElement = window.HTMLInputElement;
global.Element = window.Element;
global.Event = window.Event;
global.KeyboardEvent = window.KeyboardEvent;
global.MouseEvent = window.MouseEvent;

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
    return measurements[gender]?.[key] || null;
};

// Mock the DataMaps module
const mockDataMaps = {
    getMeasurement: mockGetMeasurement
};

// Create a dynamic import to mock the DataMaps module
const moduleMock = {
    'measurement-DataMaps.js': {
        getMeasurement: mockGetMeasurement
    }
};

// Set up module mocking before import
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Mock the import using a dynamic import with query parameter
const originalResolve = require.resolve;
require.resolve = (specifier, options) => {
    if (specifier.includes('measurement-DataMaps.js')) {
        return specifier;
    }
    return originalResolve(specifier, options);
};

describe('measurement-ViewHandler.js', () => {
    let ViewHandler;
    let viewHandler;
    let consoleWarnStub;
    let alertStub;

    before(async () => {
        // Clear any existing module cache
        const cacheBuster = `../../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js?v=${Date.now()}`;
        
        // Mock the DataMaps module using import assertions
        // We'll use a different approach - modify the global scope
        global.MeasurementDataMaps = mockDataMaps;
        
        // Import the ViewHandler module
        const module = await import('../../../src/pages/measurement-pages/measurement-modules/measurement-ViewHandler.js');
        ViewHandler = module.ViewHandler;
        
        // Manually override the imported getMeasurement function
        // This is a workaround for module mocking
        module.getMeasurement = mockGetMeasurement;
    });

    beforeEach(() => {
        // Stub console.warn and alert
        consoleWarnStub = stub(console, 'warn');
        alertStub = stub(global, 'alert');
        
        // Create new instance for each test
        viewHandler = new ViewHandler('male', true);
        
        // Reset DOM elements to initial state
        const elements = [
            'measure-object',
            'measure-definition',
            'measure-description',
            'floating-measure-object',
            'floating-measure-definition',
            'floating-measure-description'
        ];
        
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = '';
            }
        });
        
        // Reset floating guide visibility
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
        
        // Clear floating guide images
        const imagesContainer = document.querySelector('.floating-guide-images');
        if (imagesContainer) {
            imagesContainer.innerHTML = '';
        }
    });

    afterEach(() => {
        // Clean up stubs
        if (consoleWarnStub.restore) consoleWarnStub.restore();
        if (alertStub.restore) alertStub.restore();
        
        // Reset any event listeners
        document.querySelectorAll('*').forEach(element => {
            const newElement = element.cloneNode(false);
            element.parentNode?.replaceChild(newElement, element);
        });
    });

    describe('constructor and initialization', () => {
        it('should set gender and isMobileView properties', () => {
            expect(viewHandler.gender).to.equal('male');
            expect(viewHandler.isMobileView).to.be.true;
        });

        it('should initialize debounceTimers map', () => {
            expect(viewHandler.debounceTimers).to.be.instanceOf(Map);
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

    describe('showMeasurementGuide', () => {
        it('should update guide text for valid measurement', () => {
            // Override the imported function for this test
            const originalGetMeasurement = viewHandler.constructor.getMeasurement;
            viewHandler.constructor.getMeasurement = mockGetMeasurement;
            
            viewHandler.showMeasurementGuide('neck');
            
            const objectElement = document.getElementById('measure-object');
            const definitionElement = document.getElementById('measure-definition');
            const descriptionElement = document.getElementById('measure-description');
            
            expect(objectElement.innerHTML).to.include('Neck Circumference');
            expect(definitionElement.innerHTML).to.include('Measure around the base of the neck...');
            expect(descriptionElement.innerHTML).to.include('Place the tape measure around...');
            
            // Restore original function
            if (originalGetMeasurement) {
                viewHandler.constructor.getMeasurement = originalGetMeasurement;
            }
        });

        it('should handle invalid measurement gracefully', () => {
            expect(() => viewHandler.showMeasurementGuide('invalid-measurement')).not.to.throw();
        });
    });

    describe('showFloatingGuide', () => {
        it('should show floating guide for mobile view', () => {
            // Setup mock
            const mockMeasurement = mockGetMeasurement('male', 'neck');
            
            viewHandler.showFloatingGuide('neck');
            
            const overlay = document.getElementById('floating-guide-overlay');
            const floatingGuide = document.getElementById('floating-measurement-guide');
            
            expect(overlay.style.display).to.equal('block');
            expect(floatingGuide.style.display).to.equal('flex');
        });

        it('should update guide text for floating guide', () => {
            viewHandler.showFloatingGuide('neck');
            
            const objectElement = document.getElementById('floating-measure-object');
            const definitionElement = document.getElementById('floating-measure-definition');
            const descriptionElement = document.getElementById('floating-measure-description');
            
            expect(objectElement.innerHTML).to.include('Neck Circumference');
            expect(definitionElement.innerHTML).to.include('Measure around the base of the neck...');
            expect(descriptionElement.innerHTML).to.include('Place the tape measure around...');
        });

        it('should update mobile guide image', () => {
            viewHandler.showFloatingGuide('neck');
            
            const imagesContainer = document.querySelector('.floating-guide-images');
            const image = imagesContainer.querySelector('img');
            
            expect(image).to.exist;
            expect(image.src).to.include('/test/images/neck-mobile.png');
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

    describe('setupEyeIconListeners', () => {
        it('should setup click listeners on eye icons', () => {
            const callback = stub();
            viewHandler.setupEyeIconListeners(callback);
            
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
                
                eyeIcon.click();
                
                expect(parentClicked).to.be.false;
            }
        });
    });

    describe('setupWindowResizeListener', () => {
        beforeEach(() => {
            // Set initial view
            viewHandler.isMobileView = false;
        });

        it('should trigger callback when view changes', (done) => {
            const callback = stub();
            viewHandler.setupWindowResizeListener(callback);
            
            // Mock isMobileView method
            viewHandler.isMobileView = false;
            
            // Force a different view detection
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400
            });
            
            window.dispatchEvent(new Event('resize'));
            
            // Wait for debounce
            setTimeout(() => {
                expect(callback.calledOnce).to.be.true;
                done();
            }, 200);
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
            const container = document.createElement('div');
            document.body.appendChild(container); // Attach to body first
            
            const input1 = document.createElement('input');
            input1.className = 'measurement-input error';
            const input2 = document.createElement('input');
            input2.className = 'measurement-input error';
            
            container.appendChild(input1);
            container.appendChild(input2);
            
            const focusSpy = spy(input1, 'focus');
            
            viewHandler.focusFirstErrorField();
            
            expect(focusSpy.calledOnce).to.be.true;
            
            // Cleanup
            document.body.removeChild(container);
        });

        it('should handle no error fields gracefully', () => {
            expect(() => viewHandler.focusFirstErrorField()).not.to.throw();
        });
    });
});
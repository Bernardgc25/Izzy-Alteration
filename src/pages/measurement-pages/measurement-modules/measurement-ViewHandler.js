/**
 * View Handler - Manages all UI interactions and display logic
 * Separated from business logic for better maintainability
 */

export class ViewHandler {
    constructor(gender, isMobileView, getMeasurementFunction = null) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        this.debounceTimers = new Map();
        this.eventListeners = new Map();
        this.zoomState = {
            scale: 1.0,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
        // Store the getMeasurement function reference
        this.getMeasurementFunction = getMeasurementFunction;
        this.init();
    }

    /**
     * Initialize view handler
     */
    init() {
        this.setupGuideImages();
        this.setupImageInteractions();
    }

    /**
     * Setup guide images based on view type
     */
    setupGuideImages() {
        if (!this.isMobileView) {
            this.setupDesktopGuideImage();
        }
    }

    /**
     * Sets up the desktop measurement guide image
     */
    setupDesktopGuideImage() {
        const guideImage = document.getElementById('guide-image');
        const defaultGuide = document.getElementById('default-guide');
        
        if (!guideImage || !defaultGuide) return;
        
        const genderImage = this.getGenderImage();
        
        if (genderImage) {
            guideImage.src = genderImage;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
        } else {
            guideImage.style.display = 'none';
            defaultGuide.style.display = 'flex';
        }
    }

    /**
     * Get the appropriate gender image for desktop view
     * @returns {string} Image URL for the gender
     */
    getGenderImage() {
        const genderImages = {
            male: "/src/images/male-desktop.png",
            female: "/src/images/female-desktop.png"
        };
        
        return genderImages[this.gender] || null;
    }

    /**
     * Setup image interactions (zoom/pan)
     */
    setupImageInteractions() {
        const image = document.getElementById('guide-image');
        const container = image?.parentElement;
        if (!image || !container) return;

        this.setupZoomEvents(container, image);
        this.setupPanEvents(container, image);
        this.setupZoomResetOnFocus(image);
    }

    /**
     * Setup zoom events
     */
    setupZoomEvents(container, image) {
        const wheelHandler = (e) => {
            e.preventDefault();
            this.handleZoom(e, image);
        };
        container.addEventListener('wheel', wheelHandler);
        this.eventListeners.set('wheel', { element: container, handler: wheelHandler, type: 'wheel' });
    }

    /**
     * Setup pan events
     */
    setupPanEvents(container, image) {
        const mousedownHandler = (e) => {
            this.startPan(e);
            container.style.cursor = 'grabbing';
        };
        
        const mousemoveHandler = (e) => {
            if (!this.zoomState.isDragging) return;
            this.updatePanPosition(e);
            this.updateImageTransform(image);
        };
        
        const mouseupHandler = () => {
            this.stopPan();
            container.style.cursor = 'grab';
        };
        
        const mouseleaveHandler = () => {
            this.stopPan();
            container.style.cursor = 'default';
        };

        container.addEventListener('mousedown', mousedownHandler);
        container.addEventListener('mousemove', mousemoveHandler);
        container.addEventListener('mouseup', mouseupHandler);
        container.addEventListener('mouseleave', mouseleaveHandler);
        
        this.eventListeners.set('mousedown', { element: container, handler: mousedownHandler, type: 'mousedown' });
        this.eventListeners.set('mousemove', { element: container, handler: mousemoveHandler, type: 'mousemove' });
        this.eventListeners.set('mouseup', { element: container, handler: mouseupHandler, type: 'mouseup' });
        this.eventListeners.set('mouseleave', { element: container, handler: mouseleaveHandler, type: 'mouseleave' });
    }

    /**
     * Setup zoom reset when inputs are focused
     */
    setupZoomResetOnFocus(image) {
        const inputs = document.querySelectorAll('input, select');
        const focusHandlers = [];
        
        inputs.forEach(input => {
            const focusHandler = () => {
                this.resetZoom(image);
            };
            input.addEventListener('focus', focusHandler);
            focusHandlers.push({ element: input, handler: focusHandler, type: 'focus' });
        });
        
        this.eventListeners.set('focus', focusHandlers);
    }

    /**
     * Handle zoom event
     */
    handleZoom(event, image) {
        const rect = image.parentElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        
        this.applyZoom(delta, x, y, image);
    }

    /**
     * Apply zoom transformation
     */
    applyZoom(delta, originX, originY, image) {
        const newScale = Math.max(0.5, Math.min(3.0, this.zoomState.scale + delta));
        
        const scaleChange = newScale - this.zoomState.scale;
        this.zoomState.x -= originX * scaleChange;
        this.zoomState.y -= originY * scaleChange;
        this.zoomState.scale = newScale;
        
        this.updateImageTransform(image);
    }

    /**
     * Start panning
     */
    startPan(event) {
        this.zoomState.isDragging = true;
        this.zoomState.startX = event.clientX - this.zoomState.x;
        this.zoomState.startY = event.clientY - this.zoomState.y;
    }

    /**
     * Update pan position
     */
    updatePanPosition(event) {
        this.zoomState.x = event.clientX - this.zoomState.startX;
        this.zoomState.y = event.clientY - this.zoomState.startY;
    }

    /**
     * Stop panning
     */
    stopPan() {
        this.zoomState.isDragging = false;
    }

    /**
     * Update image transform
     */
    updateImageTransform(image) {
        if (!image) return;
        image.style.transform = `
            translate(${this.zoomState.x}px, ${this.zoomState.y}px) 
            scale(${this.zoomState.scale})
        `;
        image.style.transformOrigin = '0 0';
    }

    /**
     * Reset zoom and pan
     */
    resetZoom(image) {
        this.zoomState.scale = 1.0;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
    }

    /**
     * Get measurement data - uses injected function or falls back to import
     */
    getMeasurement(gender, measurementKey) {
        if (this.getMeasurementFunction) {
            return Promise.resolve(this.getMeasurementFunction(gender, measurementKey));
        }
        // Fallback to dynamic import if no function was provided
        return import('./measurement-DataMaps.js')
            .then(module => module.getMeasurement(gender, measurementKey))
            .catch(() => null);
    }

    /**
     * Display measurement guide
     */
    async showMeasurementGuide(measurementKey) {
        try {
            const measurement = await this.getMeasurement(this.gender, measurementKey);
            if (!measurement) return;
            this.updateGuideText(measurement);
        } catch (error) {
            console.warn('Failed to show measurement guide:', error);
        }
    }

    /**
     * Update guide text elements for both desktop and mobile
     */
    updateGuideText(measurement) {
        const elements = {
            'measure-object': measurement.object,
            'measure-definition': measurement.definition,
            'measure-description': measurement.description,
            'floating-measure-object': measurement.object,
            'floating-measure-definition': measurement.definition,
            'floating-measure-description': measurement.description
        };

        Object.entries(elements).forEach(([id, content]) => {
            const element = document.getElementById(id);
            if (element && content !== undefined) {
                const label = id.includes('object') ? 'Object' : 
                            id.includes('definition') ? 'Definition' : 'Description';
                // Set both innerHTML and textContent for compatibility
                element.innerHTML = `<strong>${label}:</strong> ${content}`;
                element.textContent = `${label}: ${content}`;
            }
        });
    }

    /**
     * Show floating guide for mobile
     */
    async showFloatingGuide(measurementKey) {
        try {
            const measurement = await this.getMeasurement(this.gender, measurementKey);
            if (!measurement) return;
            
            this.updateGuideText(measurement);
            await this.updateMobileGuideImage(measurementKey);
            this.showFloatingGuideElements();
        } catch (error) {
            console.warn('Failed to show floating guide:', error);
        }
    }

    /**
     * Show floating guide elements
     */
    showFloatingGuideElements() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'block';
        if (floatingGuide) floatingGuide.style.display = 'flex';
    }

    /**
     * Hide floating guide
     */
    hideFloatingGuide() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }

    /**
     * Update mobile guide image
     */
    async updateMobileGuideImage(measurementKey) {
        try {
            const measurement = await this.getMeasurement(this.gender, measurementKey);
            if (!measurement || !measurement.imageMobile) return;
            
            const floatingGuideImages = document.querySelector('.measurement-guide-floating .floating-guide-images');
            if (!floatingGuideImages) return;
            
            floatingGuideImages.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = measurement.imageMobile;
            img.alt = measurement.object || 'Measurement Guide';
            img.className = 'active';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
            
            floatingGuideImages.appendChild(img);
        } catch (error) {
            console.warn('Failed to update mobile guide image:', error);
        }
    }

    /**
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners(callback) {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        const clickHandlers = [];
        
        eyeIcons.forEach(icon => {
            const clickHandler = (e) => {
                e.stopPropagation();
                const labelElement = e.target.closest('.measurement-label');
                if (!labelElement) return;
                
                // Find the input element within the same form group
                const formGroup = labelElement.closest('.form-group') || labelElement.parentElement;
                if (!formGroup) return;
                
                const inputElement = formGroup.querySelector('.measurement-input') || 
                                     formGroup.querySelector('input');
                if (!inputElement) return;
                
                const measurementKey = inputElement.dataset.measurement || 
                                      inputElement.getAttribute('data-measurement');
                
                if (measurementKey && this.isMobileView && callback) {
                    callback(measurementKey);
                }
            };
            
            icon.addEventListener('click', clickHandler);
            clickHandlers.push({ element: icon, handler: clickHandler, type: 'click' });
        });
        
        this.eventListeners.set('eyeIcons', clickHandlers);
        return clickHandlers.length > 0; // Return true if listeners were set up
    }

    /**
     * Setup window resize listener
     * @param {Function} callback - Callback when view changes
     */
    setupWindowResizeListener(callback) {
        const handleResize = () => {
            if (this.debounceTimers.has('resize')) {
                clearTimeout(this.debounceTimers.get('resize'));
            }
            
            const timerId = setTimeout(() => {
                const newIsMobileView = window.innerWidth <= 992;
                if (newIsMobileView !== this.isMobileView) {
                    this.isMobileView = newIsMobileView;
                    if (callback) callback(newIsMobileView);
                }
            }, 200);
            
            this.debounceTimers.set('resize', timerId);
        };

        window.addEventListener('resize', handleResize);
        this.eventListeners.set('resize', { element: window, handler: handleResize, type: 'resize' });
    }

    /**
     * Setup escape key listener for closing guides
     * @param {Function} callback - Callback when escape is pressed
     */
    setupEscapeKeyListener(callback) {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (callback) callback();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        this.eventListeners.set('escape', { element: document, handler: handleEscape, type: 'keydown' });
    }

    /**
     * Setup print button listener
     * @param {Function} callback - Callback when print button is clicked
     */
    setupPrintButtonListener(callback) {
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            const clickHandler = () => {
                try {
                    if (callback) callback();
                } catch (error) {
                    this.showAlert(error.message);
                }
            };
            
            printBtn.addEventListener('click', clickHandler);
            this.eventListeners.set('print', { element: printBtn, handler: clickHandler, type: 'click' });
        }
    }

    /**
     * Clean up event listeners and timers
     */
    cleanup() {
        // Clear all debounced timers
        this.debounceTimers.forEach((timer, key) => {
            if (typeof timer === 'number') {
                clearTimeout(timer);
            }
            this.debounceTimers.delete(key);
        });

        // Remove all event listeners
        this.eventListeners.forEach((listenerInfo, key) => {
            if (Array.isArray(listenerInfo)) {
                // Handle arrays of listeners (like eye icons)
                listenerInfo.forEach(({ element, handler, type }) => {
                    if (element && handler && type) {
                        element.removeEventListener(type, handler);
                    }
                });
            } else if (listenerInfo && typeof listenerInfo === 'object') {
                // Handle single listeners
                const { element, handler, type } = listenerInfo;
                if (element && handler && type) {
                    element.removeEventListener(type, handler);
                }
            }
        });
        
        this.eventListeners.clear();
    }

    /**
     * Show alert message
     * @param {string} message - Message to display
     */
    showAlert(message) {
        alert(message);
    }

    /**
     * Show validation error alert
     */
    showValidationErrorAlert() {
        alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
    }

    /**
     * Show success message
     * @param {Object} formData - Form data to display
     */
    showSuccessMessage(formData) {
        const message = `
            Measurements saved successfully!
            
            Client: ${formData.name}
            Date: ${formData.date}
            Total Measurements: ${Object.keys(formData.measurements).length}
        `;
        
        alert(message);
    }

    /**
     * Focus on first error field
     */
    focusFirstErrorField() {
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }
}
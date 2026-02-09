/**
 * View Handler - Manages all UI interactions and display logic
 * Separated from business logic for better maintainability
 */

export class ViewHandler {
    constructor(gender, isMobileView, getMeasurementFunction = null) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        this.debounceTimers = new Map();
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
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.handleZoom(e, image);
        });
    }

    /**
     * Setup pan events
     */
    setupPanEvents(container, image) {
        container.addEventListener('mousedown', (e) => {
            this.startPan(e);
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.zoomState.isDragging) return;
            this.updatePanPosition(e);
            this.updateImageTransform(image);
        });

        container.addEventListener('mouseup', () => {
            this.stopPan();
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseleave', () => {
            this.stopPan();
            container.style.cursor = 'default';
        });
    }

    /**
     * Setup zoom reset when inputs are focused
     */
    setupZoomResetOnFocus(image) {
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('focus', () => {
                this.resetZoom(image);
            });
        });
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
            return this.getMeasurementFunction(gender, measurementKey);
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
        const measurement = await this.getMeasurement(this.gender, measurementKey);
        if (!measurement) return;

        this.updateGuideText(measurement);
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
                element.innerHTML = `<strong>${label}:</strong> ${content}`;
            }
        });
    }

    /**
     * Show floating guide for mobile
     */
    async showFloatingGuide(measurementKey) {
        const measurement = await this.getMeasurement(this.gender, measurementKey);
        if (!measurement) return;
        
        this.updateGuideText(measurement);
        this.updateMobileGuideImage(measurementKey);
        this.showFloatingGuideElements();
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
    }

    /**
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners(callback) {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const labelElement = e.target.closest('.measurement-label');
                if (!labelElement) return;
                
                const formGroup = labelElement.closest('.form-group');
                if (!formGroup) return;
                
                const inputElement = formGroup.querySelector('.measurement-input');
                if (!inputElement) return;
                
                const measurementKey = inputElement.dataset.measurement;
                if (measurementKey && this.isMobileView) {
                    callback(measurementKey);
                }
            });
        });
    }

    /**
     * Setup window resize listener
     * @param {Function} callback - Callback when view changes
     */
    setupWindowResizeListener(callback) {
        window.addEventListener('resize', () => {
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
        });
    }

    /**
     * Setup escape key listener for closing guides
     * @param {Function} callback - Callback when escape is pressed
     */
    setupEscapeKeyListener(callback) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (callback) callback();
            }
        });
    }

    /**
     * Setup print button listener
     * @param {Function} callback - Callback when print button is clicked
     */
    setupPrintButtonListener(callback) {
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                try {
                    if (callback) callback();
                } catch (error) {
                    this.showAlert(error.message);
                }
            });
        }
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
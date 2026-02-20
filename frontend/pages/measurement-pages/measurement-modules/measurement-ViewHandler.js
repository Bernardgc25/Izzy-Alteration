/**
 * View Handler - Manages all UI interactions and display logic
 * Now receives dependencies via constructor.
 */
export class ViewHandler {
    constructor({ gender, isMobileView, getMeasurement, genderImageUrl }) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        this.getMeasurement = getMeasurement;          // synchronous function
        this.genderImageUrl = genderImageUrl;          // desktop image URL

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

        this.init();
    }

    init() {
        this.setupGuideImages();
        this.setupImageInteractions();
    }

    // ---------- Desktop guide image ----------
    setupGuideImages() {
        if (!this.isMobileView) {
            this.setupDesktopGuideImage();
        }
    }

    setupDesktopGuideImage() {
        const guideImage = document.getElementById('guide-image');
        const defaultGuide = document.getElementById('default-guide');
        if (!guideImage || !defaultGuide) return;

        if (this.genderImageUrl) {
            guideImage.src = this.genderImageUrl;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
        } else {
            guideImage.style.display = 'none';
            defaultGuide.style.display = 'flex';
        }
    }

    // ---------- Measurement guide text (desktop + floating) ----------
    showMeasurementGuide(measurementKey) {
        const measurement = this.getMeasurement(measurementKey);
        if (measurement) {
            this.updateGuideText(measurement);
        }
    }

    async showFloatingGuide(measurementKey) {
        const measurement = this.getMeasurement(measurementKey);
        if (!measurement) return;

        this.updateGuideText(measurement);
        await this.updateMobileGuideImage(measurementKey);
        this.showFloatingGuideElements();
    }

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
            const el = document.getElementById(id);
            if (el && content !== undefined) {
                const label = id.includes('object') ? 'Object' :
                             id.includes('definition') ? 'Definition' : 'Description';
                el.innerHTML = `<strong>${label}:</strong> ${content}`;
            }
        });
    }

    updateMobileGuideImage(measurementKey) {
        const measurement = this.getMeasurement(measurementKey);
        if (!measurement || !measurement.imageMobile) return;

        // FIX: Use correct selector based on actual HTML structure
        const container = document.querySelector('#floating-measurement-guide .floating-guide-images');
        if (!container) return;

        container.innerHTML = '';
        const img = document.createElement('img');
        img.src = measurement.imageMobile;
        img.alt = measurement.object || 'Measurement Guide';
        img.className = 'active';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        container.appendChild(img);
    }

    showFloatingGuideElements() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        if (overlay) overlay.style.display = 'block';
        if (floatingGuide) floatingGuide.style.display = 'flex';
    }

    hideFloatingGuide() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }

    // ---------- Eye icon listeners (mobile) ----------
    setupEyeIconListeners(callback) {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        const handlers = [];

        eyeIcons.forEach(icon => {
            const handler = (e) => {
                e.stopPropagation();
                const label = e.target.closest('.measurement-label');
                if (!label) return;

                const formGroup = label.closest('.form-group') || label.parentElement;
                if (!formGroup) return;

                const input = formGroup.querySelector('.measurement-input, input');
                if (!input) return;

                const measurementKey = input.dataset.measurement || input.getAttribute('data-measurement');
                if (measurementKey && this.isMobileView && callback) {
                    callback(measurementKey);
                }
            };

            icon.addEventListener('click', handler);
            handlers.push({ element: icon, handler, type: 'click' });
        });

        this.eventListeners.set('eyeIcons', handlers);
    }

    // ---------- Window resize ----------
    setupWindowResizeListener(callback) {
        const handler = () => {
            if (this.debounceTimers.has('resize')) clearTimeout(this.debounceTimers.get('resize'));
            const timer = setTimeout(() => {
                const newIsMobileView = window.innerWidth <= 992;
                if (newIsMobileView !== this.isMobileView) {
                    this.isMobileView = newIsMobileView;
                    if (callback) callback(newIsMobileView);
                }
            }, 200);
            this.debounceTimers.set('resize', timer);
        };

        window.addEventListener('resize', handler);
        this.eventListeners.set('resize', { element: window, handler, type: 'resize' });
    }

    // ---------- Escape key ----------
    setupEscapeKeyListener(callback) {
        const handler = (e) => {
            if (e.key === 'Escape' && callback) callback();
        };
        document.addEventListener('keydown', handler);
        this.eventListeners.set('escape', { element: document, handler, type: 'keydown' });
    }

    // ---------- Print button ----------
    setupPrintButtonListener(callback) {
        const btn = document.getElementById('print-summary');
        if (btn) {
            const handler = () => {
                try {
                    if (callback) callback();
                } catch (error) {
                    this.showAlert(error.message);
                }
            };
            btn.addEventListener('click', handler);
            this.eventListeners.set('print', { element: btn, handler, type: 'click' });
        }
    }

    // ---------- Image zoom/pan (unchanged) ----------
    setupImageInteractions() {
        const image = document.getElementById('guide-image');
        const container = image?.parentElement;
        if (!image || !container) return;

        this.setupZoomEvents(container, image);
        this.setupPanEvents(container, image);
        this.setupZoomResetOnFocus(image);
    }

    setupZoomEvents(container, image) {
        const wheelHandler = (e) => {
            e.preventDefault();
            this.handleZoom(e, image);
        };
        container.addEventListener('wheel', wheelHandler);
        this.eventListeners.set('wheel', { element: container, handler: wheelHandler, type: 'wheel' });
    }

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

    setupZoomResetOnFocus(image) {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            const focusHandler = () => this.resetZoom(image);
            input.addEventListener('focus', focusHandler);
            if (!this.eventListeners.has('focus')) this.eventListeners.set('focus', []);
            this.eventListeners.get('focus').push({ element: input, handler: focusHandler, type: 'focus' });
        });
    }

    handleZoom(event, image) {
        const rect = image.parentElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        this.applyZoom(delta, x, y, image);
    }

    applyZoom(delta, originX, originY, image) {
        const newScale = Math.max(0.5, Math.min(3.0, this.zoomState.scale + delta));
        const scaleChange = newScale - this.zoomState.scale;
        this.zoomState.x -= originX * scaleChange;
        this.zoomState.y -= originY * scaleChange;
        this.zoomState.scale = newScale;
        this.updateImageTransform(image);
    }

    startPan(event) {
        this.zoomState.isDragging = true;
        this.zoomState.startX = event.clientX - this.zoomState.x;
        this.zoomState.startY = event.clientY - this.zoomState.y;
    }

    updatePanPosition(event) {
        this.zoomState.x = event.clientX - this.zoomState.startX;
        this.zoomState.y = event.clientY - this.zoomState.startY;
    }

    stopPan() {
        this.zoomState.isDragging = false;
    }

    updateImageTransform(image) {
        if (!image) return;
        image.style.transform = `translate(${this.zoomState.x}px, ${this.zoomState.y}px) scale(${this.zoomState.scale})`;
        image.style.transformOrigin = '0 0';
    }

    resetZoom(image) {
        this.zoomState.scale = 1.0;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
    }

    // ---------- Utility methods ----------
    cleanup() {
        this.debounceTimers.forEach((timer, key) => {
            if (typeof timer === 'number') clearTimeout(timer);
            this.debounceTimers.delete(key);
        });

        this.eventListeners.forEach((listenerInfo, key) => {
            if (Array.isArray(listenerInfo)) {
                listenerInfo.forEach(({ element, handler, type }) => {
                    if (element && handler && type) element.removeEventListener(type, handler);
                });
            } else if (listenerInfo) {
                const { element, handler, type } = listenerInfo;
                if (element && handler && type) element.removeEventListener(type, handler);
            }
        });
        this.eventListeners.clear();
    }

    showAlert(message) {
        alert(message);
    }

    showValidationErrorAlert() {
        alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
    }

    showSuccessMessage(formData) {
        alert(`Measurements saved successfully!\n\nClient: ${formData.name}\nDate: ${formData.date}\nTotal Measurements: ${Object.keys(formData.measurements).length}`);
    }

    focusFirstErrorField() {
        const firstError = document.querySelector('.error');
        if (firstError) firstError.focus();
    }
}
/**
 * measurement-Manager.js
 * Manages measurement data, state, and operations
 * Handles image interactions, summary updates, and data management
 * REFACTORED: Improved organization and separation of concerns
 */

import { measurementDataMap, getMeasurement } from './measurement-DataMaps.js';

export class MeasurementManager {
    constructor() {
        this.measurements = new Map();
        this.gender = null;
        this.isMobileView = false;
        this.config = {
            defaultZoom: 1.0,
            minZoom: 0.5,
            maxZoom: 3.0
        };
        this.zoomState = {
            scale: this.config.defaultZoom,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
    }

    /**
     * Initializes the manager
     * @param {string} gender - 'male' or 'female'
     * @param {boolean} isMobileView - Whether current view is mobile/tablet
     * @returns {MeasurementManager} this
     */
    initialize(gender, isMobileView) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        
        this.setupGuideImages();
        this.setupDateField();
        this.setupEventListeners();
        
        return this;
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
        
        const imageData = measurementDataMap.gender[this.gender];
        if (imageData && imageData.imageDesktop) {
            guideImage.src = imageData.imageDesktop;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
            this.setupImageInteractions(guideImage);
        }
    }

    /**
     * Setup image interactions (zoom/pan)
     * @param {HTMLImageElement} image - Guide image element
     */
    setupImageInteractions(image) {
        const container = image.parentElement;
        if (!container) return;

        // Setup zoom and pan events
        this.setupZoomEvents(container, image);
        this.setupPanEvents(container, image);
        
        // Setup reset on input focus
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
        const newScale = Math.max(
            this.config.minZoom,
            Math.min(this.config.maxZoom, this.zoomState.scale + delta)
        );
        
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
        this.zoomState.scale = this.config.defaultZoom;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
    }

    /**
     * Sets up date field with current date
     */
    setupDateField() {
        const dateField = document.getElementById('save-date');
        if (!dateField) return;
        
        const today = new Date().toISOString().split('T')[0];
        dateField.value = today;
        dateField.max = today;
    }

    /**
     * Sets up global event listeners
     */
    setupEventListeners() {
        // Removed auto-fill listeners - this was causing the auto-population issue
        this.setupPrintButton();
    }

    /**
     * Setup print button listener
     */
    setupPrintButton() {
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printSummary());
        }
    }

    /**
     * Saves a measurement to the collection
     * @param {string} id - Measurement field ID
     * @param {string} value - Measurement value
     * @param {string} label - Measurement label
     */
    saveMeasurement(id, value, label) {
        if (value && value.trim() !== '') {
            this.measurements.set(id, { 
                value, 
                label: label.replace(':', '').trim(),
                timestamp: new Date().toISOString() 
            });
        }
    }

    /**
     * Prints the measurement summary
     */
    printSummary() {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
            alert('Popup blocked. Please allow popups for this site to print.');
            return;
        }
        
        const printContent = this.generatePrintContent();
        printWindow.document.write(printContent);
        printWindow.document.close();
    }

    /**
     * Generate print content HTML
     */
    generatePrintContent() {
        const formData = this.getFormData();
        const measurementItems = Array.from(this.measurements.entries())
            .map(([id, data]) => `
                <div class="measurement-item">
                    <strong>${data.label}:</strong> ${data.value}"
                </div>
            `).join('');
        
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Measurement Summary - ${formData.name || 'Client'}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            padding: 30px; 
                            color: #333; 
                        }
                        .header { 
                            border-bottom: 2px solid #3498db; 
                            padding-bottom: 15px; 
                            margin-bottom: 20px; 
                        }
                        h1 { color: #2c3e50; margin: 0 0 10px 0; }
                        .client-info { 
                            background: #f8f9fa; 
                            padding: 15px; 
                            border-radius: 5px; 
                            margin-bottom: 20px; 
                        }
                        .client-info p { margin: 5px 0; }
                        .measurements-grid { 
                            display: grid; 
                            grid-template-columns: repeat(2, 1fr); 
                            gap: 10px; 
                        }
                        @media print {
                            body { padding: 15px; }
                            .no-print { display: none; }
                        }
                        .measurement-item { 
                            border-bottom: 1px solid #eee; 
                            padding: 8px 0; 
                        }
                        .footer { 
                            margin-top: 30px; 
                            padding-top: 15px; 
                            border-top: 1px solid #eee; 
                            text-align: center; 
                            font-size: 12px; 
                            color: #666; 
                        }
                        button { 
                            padding: 8px 16px; 
                            margin: 5px; 
                            cursor: pointer; 
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Measurement Summary</h1>
                        <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                    </div>
                    
                    <div class="client-info">
                        <p><strong>Client Name:</strong> ${formData.name || 'Not provided'}</p>
                        <p><strong>Gender:</strong> ${this.gender}</p>
                        <p><strong>Date Taken:</strong> ${formData.date || 'Not provided'}</p>
                        ${formData.sizeNumber ? `<p><strong>Size Number:</strong> ${formData.sizeNumber}</p>` : ''}
                        ${formData.cupSize ? `<p><strong>Cup Size:</strong> ${formData.cupSize}</p>` : ''}
                    </div>
                    
                    <h2>Measurements (in inches)</h2>
                    <div class="measurements-grid">
                        ${measurementItems}
                    </div>
                    
                    <div class="footer">
                        <p>Measurement System v1.0 | All measurements in inches</p>
                        <button class="no-print" onclick="window.print()">Print</button>
                        <button class="no-print" onclick="window.close()">Close</button>
                    </div>
                </body>
            </html>
        `;
    }

    /**
     * Collects all form data
     * @returns {Object} Form data object
     */
    getFormData() {
        const formData = {
            name: document.getElementById('client-name')?.value || '',
            date: document.getElementById('save-date')?.value || '',
            gender: this.gender,
            measurements: Object.fromEntries(this.measurements)
        };

        // Add gender-specific data
        if (this.gender === 'male') {
            formData.sizeNumber = document.getElementById('size-number')?.value || '';
        } else {
            formData.cupSize = document.getElementById('cupSize')?.value || '';
        }

        return formData;
    }

    /**
     * Resets all form fields and data
     */
    resetAll() {
        // Clear form
        const form = document.getElementById('measurement-form');
        if (form) form.reset();
        
        // Clear measurements
        this.measurements.clear();
        
        // Reset date
        this.setupDateField();
        
        // Reset zoom if desktop
        if (!this.isMobileView) {
            const guideImage = document.getElementById('guide-image');
            if (guideImage) {
                this.resetZoom(guideImage);
            }
        }
    }
}
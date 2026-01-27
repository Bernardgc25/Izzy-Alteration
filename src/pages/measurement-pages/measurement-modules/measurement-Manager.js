/**
 * measurement-Manager.js
 * Manages measurement data, state, and operations
 * Handles image interactions, summary updates, and data management
 */

import { MeasurementData } from './measurement-DataMaps.js';

export class MeasurementManager {
    constructor() {
        this.measurements = new Map(); // Stores current measurements
        this.gender = null;
        this.zoomState = {
            scale: MeasurementData.config.defaultZoom,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
    }

    /**
     * Initializes the manager with gender-specific settings
     * @param {string} gender - 'male' or 'female'
     */
    initialize(gender) {
        this.gender = gender;
        this.setupGuideImage();
        this.setupDateField();
        this.setupEventListeners();
        return this;
    }

    /**
     * Sets up the measurement guide image with zoom/pan functionality
     */
    setupGuideImage() {
        const guideContainer = document.getElementById('measurement-guide');
        const guideImage = document.getElementById('guide-image');
        const defaultGuide = document.getElementById('default-guide');
        
        if (guideImage && this.gender && MeasurementData.guideImages[this.gender]) {
            guideImage.src = MeasurementData.guideImages[this.gender];
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
            
            this.setupImageInteraction(guideImage);
        }
    }

    /**
     * Sets up zoom and pan interactions for the guide image
     * @param {HTMLImageElement} image - The guide image element
     */
    setupImageInteraction(image) {
        const container = image.parentElement;
        
        // Mouse wheel zoom with zoom towards cursor
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.zoomImage(image, delta, x, y);
        });

        // Mouse drag pan
        container.addEventListener('mousedown', (e) => {
            this.zoomState.isDragging = true;
            this.zoomState.startX = e.clientX - this.zoomState.x;
            this.zoomState.startY = e.clientY - this.zoomState.y;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.zoomState.isDragging) return;
            
            this.zoomState.x = e.clientX - this.zoomState.startX;
            this.zoomState.y = e.clientY - this.zoomState.startY;
            this.updateImageTransform(image);
        });

        container.addEventListener('mouseup', () => {
            this.zoomState.isDragging = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseleave', () => {
            this.zoomState.isDragging = false;
            container.style.cursor = 'default';
        });

        // Reset zoom when clicking any input field
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.resetZoom(image);
            });
        });
    }

    /**
     * Zooms the image towards cursor position
     * @param {HTMLImageElement} image - Image element
     * @param {number} delta - Zoom amount
     * @param {number} originX - X coordinate relative to image
     * @param {number} originY - Y coordinate relative to image
     */
    zoomImage(image, delta, originX, originY) {
        const newScale = Math.max(
            MeasurementData.config.minZoom,
            Math.min(MeasurementData.config.maxZoom, this.zoomState.scale + delta)
        );
        
        // Calculate translation to zoom towards cursor
        const scaleChange = newScale - this.zoomState.scale;
        this.zoomState.x -= originX * scaleChange;
        this.zoomState.y -= originY * scaleChange;
        this.zoomState.scale = newScale;
        
        this.updateImageTransform(image);
    }

    /**
     * Resets zoom and pan to default state
     * @param {HTMLImageElement} image - Image element
     */
    resetZoom(image) {
        this.zoomState.scale = MeasurementData.config.defaultZoom;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
    }

    /**
     * Updates CSS transform for image based on current zoom state
     * @param {HTMLImageElement} image - Image element
     */
    updateImageTransform(image) {
        image.style.transform = `
            translate(${this.zoomState.x}px, ${this.zoomState.y}px) 
            scale(${this.zoomState.scale})
        `;
        image.style.transformOrigin = '0 0';
    }

    /**
     * Sets up date field with current date
     */
    setupDateField() {
        const dateField = document.getElementById('save-date');
        if (dateField) {
            const today = new Date().toISOString().split('T')[0];
            dateField.value = today;
            // Allow past dates but not future dates
            dateField.max = today;
        }
    }

    /**
     * Sets up global event listeners
     */
    setupEventListeners() {
        // Auto-fill with minimum value when empty input is clicked
        const measurementInputs = document.querySelectorAll('.measurement-input');
        measurementInputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                if (!e.target.value && e.target.dataset.min) {
                    e.target.value = e.target.dataset.min;
                    e.target.classList.add('valid');
                    
                    // Auto-save to summary (keeps internal tracking)
                    const label = e.target.parentElement.querySelector('.label-text').textContent;
                    this.saveMeasurement(e.target.id, e.target.value, label);
                }
            });
        });

        // Print summary button - updated to trigger print window
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printSummary());
        }
    }

    /**
     * Saves a measurement to the collection (internal tracking only)
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
            // Note: We no longer update the visible summary here
        }
    }

    /**
     * Prints the measurement summary in a new window
     */
    printSummary() {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        const formData = this.getFormData();
        
        const printContent = `
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
                        ${Array.from(this.measurements.entries())
                            .map(([id, data]) => `
                                <div class="measurement-item">
                                    <strong>${data.label}:</strong> ${data.value}"
                                </div>
                            `).join('')}
                    </div>
                    
                    <div class="footer">
                        <p>Measurement System v1.0 | All measurements in inches</p>
                        <button class="no-print" onclick="window.print()">Print</button>
                        <button class="no-print" onclick="window.close()">Close</button>
                    </div>
                </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
    }

    /**
     * Collects all form data into a structured object
     * @returns {Object} Form data object
     */
    getFormData() {
        const formData = {
            name: document.getElementById('client-name').value,
            date: document.getElementById('save-date').value,
            gender: this.gender,
            measurements: Object.fromEntries(this.measurements)
        };

        // Add gender-specific data
        if (this.gender === 'male') {
            formData.sizeNumber = document.getElementById('size-number').value;
        } else {
            formData.cupSize = document.getElementById('cupSize').value;
        }

        return formData;
    }

    /**
     * Resets all form fields and clears data
     */
    resetAll() {
        // Clear form
        const form = document.getElementById('measurement-form');
        form.reset();
        
        // Clear measurements
        this.measurements.clear();
        
        // Reset date to today
        this.setupDateField();
        
        // Reset zoom on guide image
        const guideImage = document.getElementById('guide-image');
        if (guideImage) {
            this.resetZoom(guideImage);
        }
    }
}
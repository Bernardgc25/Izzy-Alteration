/**
 * measurement-Manager.js
 * Manages measurement data, state, and operations with responsive behavior
 * Handles image interactions, summary updates, and data management
 */

export class MeasurementManager {
    constructor(measurementData) {
        this.measurementData = measurementData;
        this.measurements = {}; // Stores current measurements
        this.gender = null;
        this.isMobileView = false;
        this.zoomState = {
            scale: this.measurementData.config.defaultZoom,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
        this.currentMeasurement = null;
    }

    /**
     * Initialize the manager with gender and view type
     * @param {string} gender - 'male' or 'female'
     * @param {boolean} isMobileView - Whether current view is mobile/tablet
     */
    initialize(gender, isMobileView) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        
        console.log(`Initializing MeasurementManager for ${gender} (${isMobileView ? 'Mobile' : 'Desktop'})`);
        
        // Initialize measurements object
        this.initializeMeasurements();
        
        // Setup based on view type
        if (!this.isMobileView) {
            this.setupDesktopGuide();
        } else {
            this.setupMobileGuide();
        }
        
        // Setup date field
        this.setupDateField();
        
        // Initialize summary
        this.updateSummary();
        
        return this;
    }

    /**
     * Initialize measurements object with all possible fields
     */
    initializeMeasurements() {
        const fields = this.measurementData.getMeasurementFields(this.gender);
        fields.forEach(field => {
            this.measurements[field] = null;
        });
    }

    /**
     * Set up desktop measurement guide with zoom/pan functionality
     */
    setupDesktopGuide() {
        const guideContainer = document.getElementById('measurement-guide');
        const guideImage = document.getElementById('guide-image');
        const defaultGuide = document.getElementById('default-guide');
        
        if (!guideImage || !guideContainer) return;
        
        // Load appropriate gender chart
        if (this.gender && this.measurementData.guideImages[this.gender]) {
            guideImage.src = this.measurementData.guideImages[this.gender];
            guideImage.style.display = 'block';
            if (defaultGuide) defaultGuide.style.display = 'none';
            
            // Setup zoom and pan functionality
            this.setupZoomPan(guideImage, guideContainer);
        }
    }

    /**
     * Set up mobile/tablet floating guide
     */
    setupMobileGuide() {
        // Hide desktop guide container
        const guideContainer = document.getElementById('measurement-guide');
        if (guideContainer) {
            guideContainer.style.display = 'none';
        }
        
        // Setup floating guide close button
        const closeBtn = document.getElementById('close-floating-guide');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideMobileGuide());
        }
        
        // Setup overlay click to close
        const overlay = document.getElementById('floating-guide-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.hideMobileGuide());
        }
    }

    /**
     * Set up zoom and pan functionality for desktop guide image
     * @param {HTMLImageElement} image - Guide image element
     * @param {HTMLElement} container - Guide container element
     */
    setupZoomPan(image, container) {
        if (!image || !container) return;
        
        // Mouse wheel zoom
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
            container.classList.add('grabbing');
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.zoomState.isDragging) return;
            
            this.zoomState.x = e.clientX - this.zoomState.startX;
            this.zoomState.y = e.clientY - this.zoomState.startY;
            this.updateImageTransform(image);
        });

        const endDrag = () => {
            this.zoomState.isDragging = false;
            container.classList.remove('grabbing');
        };

        container.addEventListener('mouseup', endDrag);
        container.addEventListener('mouseleave', endDrag);
    }

    /**
     * Zoom the guide image
     * @param {HTMLImageElement} image - Image element
     * @param {number} delta - Zoom amount
     * @param {number} originX - X coordinate relative to image
     * @param {number} originY - Y coordinate relative to image
     */
    zoomImage(image, delta, originX, originY) {
        const newScale = Math.max(
            this.measurementData.config.minZoom,
            Math.min(this.measurementData.config.maxZoom, this.zoomState.scale + delta)
        );
        
        const scaleChange = newScale - this.zoomState.scale;
        this.zoomState.x -= originX * scaleChange;
        this.zoomState.y -= originY * scaleChange;
        this.zoomState.scale = newScale;
        
        this.updateImageTransform(image);
    }

    /**
     * Reset zoom to default state
     */
    resetZoom() {
        this.zoomState.scale = this.measurementData.config.defaultZoom;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        
        const guideImage = document.getElementById('guide-image');
        if (guideImage) {
            this.updateImageTransform(guideImage);
        }
    }

    /**
     * Update CSS transform for image based on current zoom state
     * @param {HTMLImageElement} image - Image element
     */
    updateImageTransform(image) {
        image.style.transform = `
            translate(${this.zoomState.x}px, ${this.zoomState.y}px)
            scale(${this.zoomState.scale})
        `;
    }

    /**
     * Show mobile floating guide for specific measurement
     * @param {HTMLElement} eyeIcon - Clicked eye icon element
     */
    showMobileGuide(eyeIcon) {
        // Find associated input field
        const formGroup = eyeIcon.closest('.form-group');
        if (!formGroup) return;
        
        const input = formGroup.querySelector('.measurement-input');
        if (!input) return;
        
        const measurement = input.dataset.measurement;
        this.currentMeasurement = measurement;
        
        // Show overlay
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay && floatingGuide) {
            overlay.style.display = 'block';
            floatingGuide.style.display = 'flex';
            
            // Load appropriate image
            this.loadMobileGuideImage(measurement);
            
            // Load guide text
            this.loadGuideText(measurement, true);
        }
    }

    /**
     * Hide mobile floating guide
     */
    hideMobileGuide() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }

    /**
     * Load mobile guide image for specific measurement
     * @param {string} measurement - Measurement key
     */
    loadMobileGuideImage(measurement) {
        const imageElements = {
            neck: document.getElementById('floating-guide-neck'),
            chest: document.getElementById('floating-guide-chest'),
            waist: document.getElementById('floating-guide-waist'),
            hips: document.getElementById('floating-guide-hips')
        };
        
        // Reset all images
        Object.values(imageElements).forEach(img => {
            if (img) {
                img.classList.remove('active');
                img.style.display = 'none';
            }
        });
        
        // Load appropriate image based on measurement
        if (this.measurementData.guideImagesMobile[this.gender] &&
            this.measurementData.guideImagesMobile[this.gender][measurement]) {
            
            const imageUrl = this.measurementData.guideImagesMobile[this.gender][measurement];
            
            // Determine which image container to use based on measurement type
            let targetImage = imageElements.neck; // Default
            
            if (measurement.includes('chest') || measurement.includes('bust')) {
                targetImage = imageElements.chest;
            } else if (measurement.includes('waist')) {
                targetImage = imageElements.waist;
            } else if (measurement.includes('hip')) {
                targetImage = imageElements.hips;
            }
            
            if (targetImage) {
                targetImage.src = imageUrl;
                targetImage.classList.add('active');
                targetImage.style.display = 'block';
            }
        }
    }

    /**
     * Load guide text for specific measurement
     * @param {string} measurement - Measurement key
     * @param {boolean} isMobile - Whether to load mobile or desktop text
     */
    loadGuideText(measurement, isMobile = false) {
        const definition = this.measurementData.measurementDefinitions[measurement];
        if (!definition) return;
        
        const prefix = isMobile ? 'floating-' : '';
        
        const objectElement = document.getElementById(`${prefix}measure-object`);
        const definitionElement = document.getElementById(`${prefix}measure-definition`);
        const descriptionElement = document.getElementById(`${prefix}measure-description`);
        
        if (objectElement) {
            objectElement.innerHTML = `<strong>What to measure:</strong> ${definition.object}`;
        }
        
        if (definitionElement) {
            definitionElement.innerHTML = `<strong>Definition:</strong> ${definition.definition}`;
        }
        
        if (descriptionElement) {
            descriptionElement.innerHTML = `<strong>How to measure:</strong> ${definition.description}`;
        }
    }

    /**
     * Handle input field focus
     * @param {HTMLInputElement} input - Focused input element
     */
    handleInputFocus(input) {
        if (!this.isMobileView && input.classList.contains('measurement-input')) {
            const measurement = input.dataset.measurement;
            this.loadGuideText(measurement, false);
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const newIsMobileView = this.measurementData.isMobileView();
        
        if (this.isMobileView !== newIsMobileView) {
            this.isMobileView = newIsMobileView;
            this.reinitialize();
        }
    }

    /**
     * Reinitialize for new view type
     */
    reinitialize() {
        // Clear current guide
        if (this.isMobileView) {
            this.hideMobileGuide();
            this.setupMobileGuide();
        } else {
            this.setupDesktopGuide();
        }
    }

    /**
     * Update measurement summary section
     */
    updateSummary() {
        const summaryContent = document.getElementById('summary-content');
        if (!summaryContent) return;
        
        // Collect all filled measurements
        const filledMeasurements = [];
        const measurementInputs = document.querySelectorAll('.measurement-input');
        
        measurementInputs.forEach(input => {
            if (input.value && input.value.trim() !== '') {
                const measurement = input.dataset.measurement;
                const label = this.measurementData.getLabelText(measurement);
                filledMeasurements.push({
                    label: label,
                    value: parseFloat(input.value).toFixed(1),
                    id: input.id
                });
                
                // Update internal measurements object
                this.measurements[measurement] = parseFloat(input.value);
            } else {
                const measurement = input.dataset.measurement;
                this.measurements[measurement] = null;
            }
        });
        
        // Update name
        const nameField = document.getElementById('client-name');
        const clientName = nameField ? nameField.value.trim() : '';
        
        // Update size/cup size
        let sizeInfo = '';
        if (this.gender === 'male') {
            const sizeField = document.getElementById('size-number');
            sizeInfo = sizeField ? sizeField.value : '';
        } else {
            const cupSizeField = document.getElementById('cupSize');
            sizeInfo = cupSizeField ? cupSizeField.value : '';
        }
        
        // Update date
        const dateField = document.getElementById('save-date');
        const date = dateField ? dateField.value : '';
        
        // Generate summary HTML
        let summaryHTML = '';
        
        if (filledMeasurements.length === 0 && !clientName) {
            summaryHTML = `
                <div class="empty-summary">
                    <i class="fas fa-clipboard"></i>
                    <p>No measurements saved yet</p>
                    <p class="small">Fill out the form and click "Save Measurements"</p>
                </div>
            `;
        } else {
            summaryHTML = `
                <div class="summary-details">
                    ${clientName ? `<div class="summary-item"><span class="summary-label">Client Name:</span><span class="summary-value">${clientName}</span></div>` : ''}
                    ${date ? `<div class="summary-item"><span class="summary-label">Date:</span><span class="summary-value">${date}</span></div>` : ''}
                    ${sizeInfo ? `<div class="summary-item"><span class="summary-label">${this.gender === 'male' ? 'Size:' : 'Cup Size:'}</span><span class="summary-value">${sizeInfo.toUpperCase()}</span></div>` : ''}
                    ${filledMeasurements.length > 0 ? '<div class="summary-item" style="border-top: 2px solid #3498db; margin-top: 8px; padding-top: 8px;"></div>' : ''}
                    ${filledMeasurements.map(item => `
                        <div class="summary-item">
                            <span class="summary-label">${item.label}:</span>
                            <span class="summary-value">${item.value}"</span>
                        </div>
                    `).join('')}
                    ${filledMeasurements.length > 0 ? `
                        <div class="summary-item" style="border-top: 2px solid #3498db; margin-top: 8px; padding-top: 8px;">
                            <span class="summary-label">Total Measurements:</span>
                            <span class="summary-value">${filledMeasurements.length}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        summaryContent.innerHTML = summaryHTML;
    }

    /**
     * Print measurement summary in new window
     */
    printSummary() {
        const formData = this.getFormData();
        const filledMeasurements = Object.entries(formData.measurements)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => ({
                label: this.measurementData.getLabelText(key),
                value: value
            }));
        
        if (filledMeasurements.length === 0 && !formData.name) {
            alert('No measurements to print. Please fill out the form first.');
            return;
        }
        
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        const today = new Date().toLocaleDateString();
        
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Measurement Summary - ${formData.name || 'Client'}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
                    .header { border-bottom: 2px solid #3498db; padding-bottom: 20px; margin-bottom: 30px; }
                    h1 { color: #2c3e50; margin: 0 0 10px 0; }
                    .client-info { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 30px; }
                    .client-info p { margin: 8px 0; }
                    .measurements-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
                    .measurement-item { border-bottom: 1px solid #eee; padding: 10px 0; }
                    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #666; }
                    @media print { body { margin: 20px; } .no-print { display: none; } }
                    .summary-title { font-size: 24px; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1 class="summary-title">Measurement Summary</h1>
                    <p><strong>Generated on:</strong> ${today}</p>
                </div>
                
                <div class="client-info">
                    <p><strong>Client Name:</strong> ${formData.name || 'Not provided'}</p>
                    <p><strong>Gender:</strong> ${this.gender}</p>
                    <p><strong>Date Taken:</strong> ${formData.date || 'Not provided'}</p>
                    ${formData.sizeNumber ? `<p><strong>Size Number:</strong> ${formData.sizeNumber.toUpperCase()}</p>` : ''}
                    ${formData.cupSize ? `<p><strong>Cup Size:</strong> ${formData.cupSize.toUpperCase()}</p>` : ''}
                </div>
                
                <h2>Measurements (in inches)</h2>
                <div class="measurements-grid">
                    ${filledMeasurements.map(item => `
                        <div class="measurement-item">
                            <strong>${item.label}:</strong> ${item.value}"
                        </div>
                    `).join('')}
                </div>
                
                <div class="footer">
                    <p>Measurement System v1.0 | All measurements in inches</p>
                    <p class="no-print">
                        <button onclick="window.print()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Print</button>
                        <button onclick="window.close()" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                    </p>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
    }

    /**
     * Get all form data as structured object
     * @returns {Object} Form data
     */
    getFormData() {
        const nameField = document.getElementById('client-name');
        const dateField = document.getElementById('save-date');
        
        const formData = {
            name: nameField ? nameField.value.trim() : '',
            date: dateField ? dateField.value : '',
            gender: this.gender,
            measurements: { ...this.measurements }
        };
        
        // Add gender-specific data
        if (this.gender === 'male') {
            const sizeField = document.getElementById('size-number');
            formData.sizeNumber = sizeField ? sizeField.value : '';
        } else {
            const cupSizeField = document.getElementById('cupSize');
            formData.cupSize = cupSizeField ? cupSizeField.value : '';
        }
        
        return formData;
    }

    /**
     * Reset all form fields and clear data
     */
    resetForm() {
        // Reset form
        const form = document.getElementById('measurement-form');
        if (form) form.reset();
        
        // Reset measurements object
        this.initializeMeasurements();
        
        // Reset zoom if desktop
        if (!this.isMobileView) {
            this.resetZoom();
        }
        
        // Reset date to today
        this.setupDateField();
        
        // Update summary
        this.updateSummary();
        
        // Hide mobile guide if open
        this.hideMobileGuide();
        
        console.log('Form reset successfully');
    }

    /**
     * Set up date field with current date
     */
    setupDateField() {
        const dateField = document.getElementById('save-date');
        if (dateField) {
            const today = new Date().toISOString().split('T')[0];
            dateField.value = today;
            dateField.max = today;
        }
    }
}
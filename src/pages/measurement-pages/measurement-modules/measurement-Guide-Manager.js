/**
 * measurement-guide-manager.js
 * Handles measurement guide display, images, zoom, and pan functionality
 */

import { MEASUREMENT_CONFIG, CSS_CLASSES, ELEMENT_IDS } from './measurement-Constants.js';

export class GuideManager {
    constructor(measurementDataMap) {
        this.measurementDataMap = measurementDataMap;
        this.zoomState = {
            scale: MEASUREMENT_CONFIG.ui.defaultZoom,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
        this.currentGender = null;
        this.isMobileView = false;
    }

    /**
     * Initialize the guide manager
     * @param {string} gender - Current gender setting
     * @param {boolean} isMobileView - Whether in mobile view
     */
    initialize(gender, isMobileView) {
        this.currentGender = gender;
        this.isMobileView = isMobileView;
        
        if (!this.isMobileView) {
            this.setupDesktopGuide();
        }
        
        this.setupEventListeners();
    }

    /**
     * Setup desktop guide image and interactions
     */
    setupDesktopGuide() {
        const guideImage = document.getElementById(ELEMENT_IDS.guideImage);
        const defaultGuide = document.getElementById(ELEMENT_IDS.defaultGuide);
        
        if (!guideImage || !defaultGuide) return;
        
        const imageData = this.measurementDataMap.gender[this.currentGender];
        if (imageData?.imageDesktop) {
            guideImage.src = imageData.imageDesktop;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
            this.setupImageInteractions(guideImage);
        }
    }

    /**
     * Setup image zoom and pan interactions
     * @param {HTMLImageElement} image - Guide image element
     */
    setupImageInteractions(image) {
        const container = image.parentElement;
        if (!container) return;

        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.handleZoom(e, image);
        });

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
            MEASUREMENT_CONFIG.ui.minZoom,
            Math.min(MEASUREMENT_CONFIG.ui.maxZoom, this.zoomState.scale + delta)
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
        this.zoomState.scale = MEASUREMENT_CONFIG.ui.defaultZoom;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
    }

    /**
     * Update guide text for a measurement
     * @param {string} measurementKey - Measurement identifier
     */
    updateGuideText(measurementKey) {
        const measurement = this.getMeasurementData(measurementKey);
        if (!measurement) return;

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
            if (element) {
                const label = id.includes('object') ? 'Object' : 
                            id.includes('definition') ? 'Definition' : 'Description';
                element.innerHTML = `<strong>${label}:</strong> ${content}`;
            }
        });
    }

    /**
     * Show floating guide for mobile
     * @param {string} measurementKey - Measurement identifier
     */
    showFloatingGuide(measurementKey) {
        const measurement = this.getMeasurementData(measurementKey);
        if (!measurement) return;
        
        this.updateGuideText(measurementKey);
        this.updateFloatingGuideImage(measurementKey);
        this.showFloatingGuideElements();
    }

    /**
     * Update floating guide image
     */
    updateFloatingGuideImage(measurementKey) {
        const measurement = this.getMeasurementData(measurementKey);
        if (!measurement?.imageMobile) return;
        
        const floatingGuideImages = document.querySelector('.floating-guide-images');
        if (!floatingGuideImages) return;
        
        floatingGuideImages.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = measurement.imageMobile;
        img.alt = measurement.object || 'Measurement Guide';
        img.className = CSS_CLASSES.active;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        
        floatingGuideImages.appendChild(img);
    }

    /**
     * Show floating guide elements
     */
    showFloatingGuideElements() {
        const overlay = document.getElementById(ELEMENT_IDS.floatingGuideOverlay);
        const floatingGuide = document.getElementById(ELEMENT_IDS.floatingGuide);
        
        if (overlay) overlay.style.display = 'block';
        if (floatingGuide) floatingGuide.style.display = 'flex';
    }

    /**
     * Hide floating guide
     */
    hideFloatingGuide() {
        const overlay = document.getElementById(ELEMENT_IDS.floatingGuideOverlay);
        const floatingGuide = document.getElementById(ELEMENT_IDS.floatingGuide);
        
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }

    /**
     * Get measurement data
     */
    getMeasurementData(measurementKey) {
        return this.measurementDataMap.gender[this.currentGender]?.measurements[measurementKey];
    }

    /**
     * Setup event listeners for guide interactions
     */
    setupEventListeners() {
        const closeBtn = document.getElementById(ELEMENT_IDS.closeFloatingGuide);
        const overlay = document.getElementById(ELEMENT_IDS.floatingGuideOverlay);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideFloatingGuide());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.hideFloatingGuide());
        }
    }
}
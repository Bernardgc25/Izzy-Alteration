/**
 * measurement-constants.js
 * Configuration and constants for the measurement application
 * Centralizes all configurable values for easy maintenance
 */

export const MEASUREMENT_CONFIG = {
    // Validation ranges
    ranges: {
        neck: { min: 20, max: 80 },
        shoulderLength: { min: 10, max: 30 },
        armLength: { min: 15, max: 50 },
        chestCircumference: { min: 10, max: 30 },
        underBust: { min: 60, max: 150 },
        waist: { min: 50, max: 130 },
        hipBoneCircumference: { min: 60, max: 150 },
        hipCircumference: { min: 20, max: 50 },
        thigh: { min: 15, max: 50 },
        knee: { min: 10, max: 30 },
        calf: { min: 8, max: 25 },
        ankle: { min: 5, max: 15 },
        bicep: { min: 8, max: 25 },
        elbow: { min: 6, max: 15 },
        wrist: { min: 4, max: 12 },
        inseamAnkle: { min: 20, max: 50 },
        inseamFloor: { min: 25, max: 60 },
        neckWaist: { min: 10, max: 40 },
        neckFloor: { min: 40, max: 100 },
        waistFloor: { min: 30, max: 70 },
        height: { min: 48, max: 96 }
    },

    // Breakpoints for responsive design
    breakpoints: {
        desktop: 993,
        tablet: 769,
        mobile: 768,
        smallMobile: 576,
        extraSmallMobile: 480
    },

    // UI Configuration
    ui: {
        defaultZoom: 1.0,
        minZoom: 0.5,
        maxZoom: 3.0,
        debounceDelay: 150,
        animationDuration: 200
    },

    // Error messages
    messages: {
        requiredField: 'This field is required',
        invalidRange: 'Value out of range',
        decimalPlaces: 'Only one decimal place allowed'
    },

    // Storage keys
    storageKeys: {
        measurements: 'measurement_app_data',
        formState: 'measurement_form_state'
    }
};

// CSS class names
export const CSS_CLASSES = {
    error: 'error',
    valid: 'valid',
    active: 'active',
    hidden: 'hidden',
    measurementInput: 'measurement-input',
    eyeIcon: 'fa-eye',
    floatingGuide: 'measurement-guide-floating',
    overlay: 'measurement-guide-overlay'
};

// Element IDs
export const ELEMENT_IDS = {
    form: 'measurement-form',
    guideImage: 'guide-image',
    defaultGuide: 'default-guide',
    floatingGuide: 'floating-measurement-guide',
    floatingGuideOverlay: 'floating-guide-overlay',
    closeFloatingGuide: 'close-floating-guide',
    summaryContent: 'summary-content',
    clientName: 'client-name',
    saveDate: 'save-date',
    submitButton: 'submit-button',
    resetButton: 'reset-button',
    printButton: 'print-summary'
};
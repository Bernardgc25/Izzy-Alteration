
**CODE 1 - File: measurement-DataMaps.js**  
[ 
// measurement-DataMaps.js

export const measurementDataMap = {
    // Gender-specific measurement guides and images
    gender: {
        male: {
            imageDesktop: "/frontend/public/images/male-desktop.png",
            // imageMobile: " "
        },
        female: {
            imageDesktop: "/frontend/public/images/female-desktop.png",
            // imageMobile: " "
        }
    },

    // Measurements organized by gender
    measurements: {
        male: {
            // Male-specific measurements
            "neck": {
                object: "Neck Circumference",
                definition: "Measure around the base of the neck where the collar would normally sit.",
                description: "Place the tape measure around the base of the neck, keeping it parallel to the floor. Ensure it's not too tight or too loose.",
                imageMobile: "/frontend/public/images/male-(chart)-tablet-mobile.png"
            },
            "shoulder-length": {
                object: "Shoulder Length",
                definition: "Measure from the edge of one shoulder to the edge of the other shoulder.",
                description: "Place the tape measure from the outer edge of one shoulder bone (acromion) to the other, across the back.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "arm-length": {
                object: "Arm Length",
                definition: "Measure from the shoulder point to the wrist bone.",
                description: "Bend arm slightly at elbow. Measure from the shoulder bone edge, along the outside of the arm, over the elbow, to the wrist bone.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "chest-circumference": {
                object: "Chest Circumference",
                definition: "Measure around the fullest part of the chest.",
                description: "Wrap the tape measure around the fullest part of the chest, under the armpits, and across the shoulder blades. Keep tape parallel to the floor.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "waist": {
                object: "Waist Circumference",
                definition: "Measure around the natural waistline.",
                description: "Find the natural waist (smallest part of torso). Wrap tape measure around waist, keeping it parallel to the floor.",
                imageMobile: "/frontend/public/images/male-(chart)-tablet-mobile.png"
            },
            "hip-circumference": {
                object: "Hip Circumference",
                definition: "Measure around the fullest part of the hips.",
                description: "Wrap tape measure around the fullest part of the hips/buttocks, keeping it parallel to the floor.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "thigh": {
                object: "Thigh Circumference",
                definition: "Measure around the fullest part of the thigh.",
                description: "Wrap tape measure around the fullest part of the thigh, usually about 1-2 inches below the crotch.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "knee": {
                object: "Knee Circumference",
                definition: "Measure around the center of the knee.",
                description: "With leg slightly bent, measure around the center of the knee cap.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "calf": {
                object: "Calf Circumference",
                definition: "Measure around the fullest part of the calf.",
                description: "Stand with feet apart. Measure around the fullest part of the calf muscle.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "ankle": {
                object: "Ankle Circumference",
                definition: "Measure around the narrowest part of the ankle.",
                description: "Measure around the narrowest part of the ankle, just above the ankle bone.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "bicep": {
                object: "Bicep Circumference",
                definition: "Measure around the fullest part of the bicep.",
                description: "With arm relaxed at side, measure around the fullest part of the bicep.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "elbow": {
                object: "Elbow Circumference",
                definition: "Measure around the bent elbow.",
                description: "Bend arm to 90 degrees. Measure around the elbow at its fullest point with arm bent.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "wrist": {
                object: "Wrist Circumference",
                definition: "Measure around the wrist bone.",
                description: "Measure around the wrist bone, just below the hand. Tape should be snug but not tight.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "inseam-ankle": {
                object: "Inseam to Ankle",
                definition: "Measure from crotch to ankle bone.",
                description: "Stand with legs slightly apart. Measure from the crotch along the inside of the leg to the ankle bone.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "inseam-floor": {
                object: "Inseam to Floor",
                definition: "Measure from crotch to floor.",
                description: "Stand with legs slightly apart. Measure from the crotch straight down to the floor along the inside of the leg.",
                imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
            },
            "neck-waist": {
                object: "Neck to Waist",
                definition: "Measure from nape of neck to natural waist.",
                description: "Measure from the prominent bone at the base of the neck (C7 vertebra) down the back to the natural waistline.",
                imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
            },
            "neck-floor": {
                object: "Neck to Floor",
                definition: "Measure from nape of neck to floor.",
                description: "Stand straight. Measure from the prominent bone at the base of the neck (C7 vertebra) straight down to the floor.",
                imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
            },
            "waist-floor": {
                object: "Waist to Floor",
                definition: "Measure from natural waist to floor.",
                description: "Stand straight. Measure from the natural waistline straight down to the floor.",
                imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
            },
            "height": {
                object: "Height",
                definition: "Total standing height.",
                description: "Stand straight against a wall without shoes. Measure from the top of the head to the floor.",
                imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
            },
            "across-front": {
                object: "Across Front",
                definition: "Measure across the front from armhole to armhole.",
                description: "Measure horizontally across the front from one armhole seam to the other, about 1 inch below the underarm.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            },
            "total-rise": {
                object: "Total Rise",
                definition: "Measure from waist front through crotch to waist back.",
                description: "Measure from the front waistline, through the legs, up to the back waistline. This determines pants fit.",
                imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
            }
        },

        female: {
            // Female-specific measurements
            "neck": {
                object: "Neck Circumference",
                definition: "Measure around the base of the neck where the collar would normally sit.",
                description: "Place the tape measure around the base of the neck, keeping it parallel to the floor. Ensure it's not too tight or too loose.",
                imageMobile: "/frontend/public/images/female-(chart)-tablet-mobile.png"
            },
            "shoulder-length": {
                object: "Shoulder Length",
                definition: "Measure from the edge of one shoulder to the edge of the other shoulder.",
                description: "Place the tape measure from the outer edge of one shoulder bone (acromion) to the other, across the back.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "arm-length": {
                object: "Arm Length",
                definition: "Measure from the shoulder point to the wrist bone.",
                description: "Bend arm slightly at elbow. Measure from the shoulder bone edge, along the outside of the arm, over the elbow, to the wrist bone.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "chest-circumference": {
                object: "Bust Circumference",
                definition: "Measure around the fullest part of the bust.",
                description: "Wrap the tape measure around the fullest part of the bust, keeping it parallel to the floor. Do not compress breast tissue.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "under-bust": {
                object: "Under Bust",
                definition: "Measure around the torso directly under the bust.",
                description: "Wrap tape measure around the ribcage directly under the bust. Keep tape parallel to the floor.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "waist": {
                object: "Waist Circumference",
                definition: "Measure around the natural waistline.",
                description: "Find the natural waist (smallest part of torso). Wrap tape measure around waist, keeping it parallel to the floor.",
                imageMobile: "/frontend/public/images/female-(chart)-tablet-mobile.png"
            },
            "hip-circumference": {
                object: "Hip Circumference",
                definition: "Measure around the fullest part of the hips.",
                description: "Wrap tape measure around the fullest part of the hips/buttocks, keeping it parallel to the floor.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "hip-bone-circumference": {
                object: "Hip Bone Circumference",
                definition: "Measure around the hip bones (iliac crest).",
                description: "Measure around the top of the hip bones (iliac crest), usually about 3-4 inches below the natural waist.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "thigh": {
                object: "Thigh Circumference",
                definition: "Measure around the fullest part of the thigh.",
                description: "Wrap tape measure around the fullest part of the thigh, usually about 1-2 inches below the crotch.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "knee": {
                object: "Knee Circumference",
                definition: "Measure around the center of the knee.",
                description: "With leg slightly bent, measure around the center of the knee cap.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "calf": {
                object: "Calf Circumference",
                definition: "Measure around the fullest part of the calf.",
                description: "Stand with feet apart. Measure around the fullest part of the calf muscle.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "ankle": {
                object: "Ankle Circumference",
                definition: "Measure around the narrowest part of the ankle.",
                description: "Measure around the narrowest part of the ankle, just above the ankle bone.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "bicep": {
                object: "Bicep Circumference",
                definition: "Measure around the fullest part of the bicep.",
                description: "With arm relaxed at side, measure around the fullest part of the bicep.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "elbow": {
                object: "Elbow Circumference",
                definition: "Measure around the bent elbow.",
                description: "Bend arm to 90 degrees. Measure around the elbow at its fullest point with arm bent.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "wrist": {
                object: "Wrist Circumference",
                definition: "Measure around the wrist bone.",
                description: "Measure around the wrist bone, just below the hand. Tape should be snug but not tight.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "inseam-ankle": {
                object: "Inseam to Ankle",
                definition: "Measure from crotch to ankle bone.",
                description: "Stand with legs slightly apart. Measure from the crotch along the inside of the leg to the ankle bone.",
                imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
            },
            "inseam-floor": {
                object: "Inseam to Floor",
                definition: "Measure from crotch to floor.",
                description: "Stand with legs slightly apart. Measure from the crotch straight down to the floor along the inside of the leg.",
                imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
            },
            "neck-waist": {
                object: "Neck to Waist",
                definition: "Measure from nape of neck to natural waist.",
                description: "Measure from the prominent bone at the base of the neck (C7 vertebra) down the back to the natural waistline.",
                imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
            },
            "neck-floor": {
                object: "Neck to Floor",
                definition: "Measure from nape of neck to floor.",
                description: "Stand straight. Measure from the prominent bone at the base of the neck (C7 vertebra) straight down to the floor.",
                imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
            },
            "waist-floor": {
                object: "Waist to Floor",
                definition: "Measure from natural waist to floor.",
                description: "Stand straight. Measure from the natural waistline straight down to the floor.",
                imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
            },
            "height": {
                object: "Height",
                definition: "Total standing height.",
                description: "Stand straight against a wall without shoes. Measure from the top of the head to the floor.",
                imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
            }
        }
    },

    // Size-related fields (common to both genders)
    sizes: {
        "cupSize": {
            object: "Cup Size",
            definition: "Bust cup size determined by difference between bust and under-bust measurements.",
            description: "Cup size is calculated from the difference between bust and under-bust measurements: AA (0-1\"), A (1-2\"), B (2-3\"), C (3-4\"), D (4-5\"), DD/E (5-6\"), DDD/F (6-7\").",
            gender: "female",
            imageMobile: "/frontend/public/images/measurements/mobile/cup-size-mobile.jpg"
        },
        "size-number": {
            object: "Size Number",
            definition: "Standard clothing size based on chest/waist measurements.",
            description: "Size number corresponds to chest measurement for men (30=30\", 34=34\", etc.) or dress size for women. Letter indicates height: S=Short, M=Medium, L=Long, XL=Extra Long.",
            imageMobile: "/frontend/public/images/measurements/mobile/size-number-mobile.jpg"
        }
    }
};

// Helper function to get measurement by gender and key
export const getMeasurement = (gender, measurementKey) => {
    if (!gender || !measurementDataMap.measurements[gender]) {
        console.warn(`Gender "${gender}" not found in measurements`);
        return null;
    }
    
    return measurementDataMap.measurements[gender][measurementKey] || null;
};

// Helper function to get all measurements for a specific gender
export const getAllMeasurementsForGender = (gender) => {
    if (!gender || !measurementDataMap.measurements[gender]) {
        console.warn(`Gender "${gender}" not found in measurements`);
        return {};
    }
    
    return measurementDataMap.measurements[gender];
};
]

**CODE 2 - File: measurement-Main.js**  
[
/**
 * Main Application Coordinator
 * Orchestrates interactions between modules
 */
import { MeasurementValidator } from './measurement-Validator.js';
import { MeasurementManager } from './measurement-Manager.js';
import { ViewHandler } from './measurement-ViewHandler.js';
import { getMeasurement, measurementDataMap } from './measurement-DataMaps.js';

export class MeasurementApp {
    constructor() {
        this.manager = null;
        this.validator = null;
        this.viewHandler = null;
        this.debounceTimers = new Map();
        this.init();
    }

    async init() {
        const form = document.getElementById('measurement-form');
        if (!form) {
            console.error('Measurement form not found');
            return;
        }

        const gender = form.dataset.gender;
        const isMobileView = this.checkMobileView();

        // Get gender‑specific desktop image from DataMaps
        const genderImageUrl = measurementDataMap.gender[gender]?.imageDesktop || null;

        // Initialize modules with injected data access
        this.manager = new MeasurementManager().initialize(gender);
        this.validator = new MeasurementValidator(form);
        this.viewHandler = new ViewHandler({
            gender,
            isMobileView,
            getMeasurement: (measurementKey) => getMeasurement(gender, measurementKey),
            genderImageUrl
        });

        this.setupInitialState();
        this.setupEventListeners();
        this.bindGlobalFunctions();
        this.logInitialization();
    }

    checkMobileView() {
        return window.innerWidth <= 992;
    }

    setupInitialState() {
        this.manager.setupDateField();
        // Force initial image load for desktop view
        if (!this.viewHandler.isMobileView) {
            setTimeout(() => {
                this.viewHandler.setupDesktopGuideImage();
            }, 100);
        }
    }

    setupEventListeners() {
        this.setupFormInputListeners();
        this.setupButtonListeners();
        this.setupGuideListeners();
    }

    setupFormInputListeners() {
        // Client name validation
        const nameField = document.getElementById('client-name');
        if (nameField) {
            nameField.addEventListener('input', () => {
                this.debounceValidation('client-name');
            });
            nameField.addEventListener('blur', () => {
                this.validator.validateField('client-name');
            });
        }

        // Date field validation
        const dateField = document.getElementById('save-date');
        if (dateField) {
            dateField.addEventListener('change', () => {
                this.validator.validateField('save-date');
            });
        }

        // Gender‑specific fields
        if (this.manager.gender === 'male') {
            this.setupFieldListener('size-number');
        } else {
            this.setupFieldListener('cupSize');
        }

        // Measurement inputs
        this.setupMeasurementInputListeners();
    }

    setupFieldListener(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', () => {
                this.validator.validateField(fieldId);
            });
        }
    }

    setupMeasurementInputListeners() {
        const inputs = document.querySelectorAll('.measurement-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.debouncedInputHandler(e));
            input.addEventListener('focus', (e) => this.handleInputFocus(e));
            input.addEventListener('blur', (e) => this.validator.validateField(e.target.id));
        });
    }

    setupButtonListeners() {
        const saveBtn = document.getElementById('save-measurements');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.handleSaveMeasurements());
        }

        const resetBtn = document.getElementById('reset-form');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.handleResetForm());
        }

        this.viewHandler.setupPrintButtonListener(() => this.manager.printSummary());
    }

    setupGuideListeners() {
        this.viewHandler.setupEyeIconListeners((measurementKey) => {
            this.viewHandler.showFloatingGuide(measurementKey);
        });

        const closeBtn = document.getElementById('close-floating-guide');
        const overlay = document.getElementById('floating-guide-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.viewHandler.hideFloatingGuide());
        }
        if (overlay) {
            overlay.addEventListener('click', () => this.viewHandler.hideFloatingGuide());
        }

        this.viewHandler.setupEscapeKeyListener(() => this.viewHandler.hideFloatingGuide());
        this.viewHandler.setupWindowResizeListener((isMobileView) => {
            console.log(`View changed to: ${isMobileView ? 'Mobile' : 'Desktop'}`);
        });
    }

    debouncedInputHandler(event) {
        const input = event.target;
        const timerId = input.id;

        clearTimeout(this.debounceTimers.get(timerId));
        const timer = setTimeout(() => {
            const label = input.parentElement.querySelector('.label-text')?.textContent || '';
            this.manager.saveMeasurement(input.id, input.value, label);
            this.validator.validateField(input.id);
        }, 150);
        this.debounceTimers.set(timerId, timer);
    }

    handleInputFocus(event) {
        const input = event.target;
        const measurementKey = input.dataset.measurement;
        if (measurementKey) {
            this.viewHandler.showMeasurementGuide(measurementKey);
        }
        this.validator.clearSingleError(input.id);
    }

    debounceValidation(fieldId) {
        clearTimeout(this.debounceTimers.get(fieldId));
        const timer = setTimeout(() => {
            this.validator.validateField(fieldId);
        }, 150);
        this.debounceTimers.set(fieldId, timer);
    }

    handleSaveMeasurements() {
        if (!this.validator.validateAll()) {
            this.viewHandler.focusFirstErrorField();
            this.viewHandler.showValidationErrorAlert();
            return;
        }

        const formData = this.manager.getFormData();
        this.viewHandler.showSuccessMessage(formData);
        console.log('Measurement data:', JSON.stringify(formData, null, 2));
    }

    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            const form = document.getElementById('measurement-form');
            if (form) form.reset();

            this.manager.resetFormData();
            this.manager.setupDateField();
            this.validator.clearErrors();
            this.viewHandler.hideFloatingGuide();
        }
    }

    bindGlobalFunctions() {
        window.handleSaveMeasurements = () => this.handleSaveMeasurements();
        window.handleResetForm = () => this.handleResetForm();
    }

    logInitialization() {
        console.log(`Measurement App initialized for ${this.manager.gender}`);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MeasurementApp();
});
]
  
**CODE 3  - File: measurement-Manager.js**  
[ 
  /**
 * Measurement Manager - Handles business logic and data management
 * Focuses on data operations, not UI
 */
export class MeasurementManager {
    constructor() {
        this.measurements = new Map();
        this.gender = null;
        this.formData = {};
    }

    /**
     * Initialize manager
     * @param {string} gender - 'male' or 'female'
     */
    initialize(gender) {
        this.gender = gender;
        return this;
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
     * Collects all form data
     * @returns {Object} Form data object
     */
    getFormData() {
        this.formData = {
            name: document.getElementById('client-name')?.value || '',
            date: document.getElementById('save-date')?.value || '',
            gender: this.gender,
            measurements: Object.fromEntries(this.measurements)
        };

        // Add gender-specific data
        if (this.gender === 'male') {
            this.formData.sizeNumber = document.getElementById('size-number')?.value || '';
        } else {
            this.formData.cupSize = document.getElementById('cupSize')?.value || '';
        }

        return this.formData;
    }

    /**
     * Generates HTML content for printing
     * @returns {string} HTML string for print
     */
    generatePrintContent() {
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
                    <title>Measurement Summary - ${this.formData.name || 'Client'}</title>
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
                        <p><strong>Client Name:</strong> ${this.formData.name || 'Not provided'}</p>
                        <p><strong>Gender:</strong> ${this.gender}</p>
                        <p><strong>Date Taken:</strong> ${this.formData.date || 'Not provided'}</p>
                        ${this.formData.sizeNumber ? `<p><strong>Size Number:</strong> ${this.formData.sizeNumber}</p>` : ''}
                        ${this.formData.cupSize ? `<p><strong>Cup Size:</strong> ${this.formData.cupSize}</p>` : ''}
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
     * Prints the measurement summary
     */
    printSummary() {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
            throw new Error('Popup blocked. Please allow popups for this site to print.');
        }
        
        const printContent = this.generatePrintContent();
        printWindow.document.write(printContent);
        printWindow.document.close();
    }

    /**
     * Resets all form data
     */
    resetFormData() {
        this.measurements.clear();
        this.formData = {};
    }
}
]

**CODE 4 - File: measurement-Validator.js**  
[
  /**
 * Measurement Validator - Handles form validation logic
 * Separated from UI concerns for better testability
 */
export class MeasurementValidator {
    constructor(formElement) {
        if (!formElement) {
            throw new Error('Form element is required');
        }
        
        this.form = formElement;
        this.gender = formElement.dataset?.gender || 'male'; // Default to male if not specified
        this.errors = new Set();
        this.init();
    }

    /**
     * Initialize validator
     */
    init() {
        this.setupValidationRules();
    }

    /**
     * Setup gender-specific validation rules
     */
    setupValidationRules() {
        this.rules = {
            'client-name': {
                required: true,
                message: ' '
            },
            'save-date': {
                required: true,
                message: ' '
            }
        };

        // Add gender-specific required fields
        if (this.gender === 'male') {
            this.rules['size-number'] = {
                required: true,
                message: ' '
            };
        } else {
            this.rules['cupSize'] = {
                required: true,
                message: ' '
            };
        }
    }

    /**
     * Validates all form fields
     * @returns {boolean} True if all validations pass
     */
    validateAll() {
        this.errors.clear();
        let allValid = true;

        // Validate required fields
        Object.keys(this.rules).forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                allValid = false;
            }
        });

        // Validate all measurement inputs
        const measurementInputs = this.form.querySelectorAll('.measurement-input');
        measurementInputs.forEach(input => {
            if (!this.validateMeasurementInput(input)) {
                allValid = false;
            }
        });

        return allValid;
    }

    /**
     * Validates a single measurement input field
     * @param {HTMLInputElement} input - The input element to validate
     * @returns {boolean} True if valid
     */
    validateMeasurementInput(input) {
        if (!input) return false;
        
        const value = parseFloat(input.value);
        const min = parseFloat(input.dataset?.min || 0);
        const max = parseFloat(input.dataset?.max || 100);
        const measurementId = input.id;

        // Check if empty
        if (input.value === '' || isNaN(value)) {
            this.addFieldError(measurementId, ' ');
            return false;
        }

        // Check range
        if (value < min || value > max) {
            this.addFieldError(measurementId, `${min}-${max}`);
            return false;
        }

        // Check decimal places
        const decimalCount = (input.value.split('.')[1] || '').length;
        if (decimalCount > 1) {
            this.addFieldError(measurementId, 'Only one decimal place allowed');
            return false;
        }

        return true;
    }

    /**
     * Validates a single field on the fly
     * @param {string} fieldId - Field ID to validate
     * @returns {boolean} True if valid
     */
    validateField(fieldId) {
        if (!fieldId) return true;
        
        const input = document.getElementById(fieldId);
        if (!input) return true;

        // Clear previous error
        this.clearSingleError(fieldId);

        // Check if field is required
        if (this.rules[fieldId] && this.rules[fieldId].required) {
            if (!input.value || input.value.trim() === '') {
                this.addFieldError(fieldId, this.rules[fieldId].message);
                return false;
            }
        }

        // Handle measurement inputs
        if (input.classList.contains('measurement-input')) {
            return this.validateMeasurementInput(input);
        }

        return true;
    }

    /**
     * Adds error to field
     * @param {string} fieldId - The ID of the field with error
     * @param {string} message - Error message to display
     */
    addFieldError(fieldId, message) {
        if (!fieldId) return;
        
        this.errors.add(fieldId);
        
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
            inputElement.classList.remove('valid');
        }
    }

    /**
     * Clears error for a single field
     * @param {string} fieldId - Field ID to clear error for
     */
    clearSingleError(fieldId) {
        if (!fieldId) return;
        
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (inputElement) {
            inputElement.classList.remove('error');
        }
        
        this.errors.delete(fieldId);
    }

    /**
     * Clears all error states and messages
     */
    clearErrors() {
        this.errors.clear();
        
        if (!this.form) return;
        
        // Clear error messages
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(el => {
            el.textContent = '';
        });
        
        // Clear error classes from inputs within the form
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('error', 'valid');
        });
    }

    /**
     * Get first error field for focus
     * @returns {HTMLElement|null} First error element
     */
    getFirstErrorField() {
        if (!this.form) return null;
        // Find the first input/select with error class within the form
        return this.form.querySelector('.error');
    }
}
]

**CODE 5 - File: measurement-ViewHandler.js**
[
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

        const container = document.querySelector('.measurement-guide-floating .floating-guide-images');
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
]


**ERROR/ISSUE:**
[

]

**REQUEST:**
[
    create a mocha unit test for each CODE 

]
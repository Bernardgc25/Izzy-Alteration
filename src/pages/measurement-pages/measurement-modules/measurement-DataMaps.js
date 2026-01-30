/**
 * measurement-DataMaps.js
 * Centralized data store for measurement system with enhanced scalability
 * Contains all static data, images, configuration, and validation rules
 */

export const MeasurementData = {
    // Desktop guide images by gender (for large screens)
    guideImages: {
        male: '/src/images/male-chart.jpg',
        female: '/src/images/female-chart.jpg'
    },
    
    // Mobile/Tablet guide images by measurement (individual images)
    guideImagesMobile: {
        // Male-specific mobile images
        male: {
            neck: '/src/images/male-front.jpg',
            'shoulder-length': '/src/images/mobile/male-shoulder-mobile.png',
            'arm-length': '/src/images/mobile/male-arm-length-mobile.png',
            'across-front': '/src/images/mobile/male-across-front-mobile.png',
            'chest-circumference': '/src/images/mobile/male-chest-mobile.png',
            waist: '/src/images/mobile/male-waist-mobile.png',
            'hip-circumference': '/src/images/mobile/male-hips-mobile.png',
            'total-rise': '/src/images/mobile/male-total-rise-mobile.png',
            thigh: '/src/images/mobile/male-thigh-mobile.png',
            knee: '/src/images/mobile/male-knee-mobile.png',
            calf: '/src/images/mobile/male-calf-mobile.png',
            ankle: '/src/images/mobile/male-ankle-mobile.png',
            bicep: '/src/images/mobile/male-bicep-mobile.png',
            elbow: '/src/images/mobile/male-elbow-mobile.png',
            wrist: '/src/images/mobile/male-wrist-mobile.png',
            'inseam-ankle': '/src/images/mobile/male-inseam-ankle-mobile.png',
            'inseam-floor': '/src/images/mobile/male-inseam-floor-mobile.png',
            'neck-waist': '/src/images/mobile/male-neck-waist-mobile.png',
            'neck-floor': '/src/images/mobile/male-neck-floor-mobile.png',
            'waist-floor': '/src/images/mobile/male-waist-floor-mobile.png',
            height: '/src/images/mobile/male-height-mobile.png'
        },
        // Female-specific mobile images
        female: {
            neck: '/src/images/mobile/female-neck-mobile.png',
            'shoulder-length': '/src/images/mobile/female-shoulder-mobile.png',
            'arm-length': '/src/images/mobile/female-arm-length-mobile.png',
            'chest-circumference': '/src/images/mobile/female-bust-mobile.png',
            'under-bust': '/src/images/mobile/female-under-bust-mobile.png',
            waist: '/src/images/mobile/female-waist-mobile.png',
            'hip-circumference': '/src/images/mobile/female-hips-mobile.png',
            'hip-bone-circumference': '/src/images/mobile/female-hip-bone-mobile.png',
            thigh: '/src/images/mobile/female-thigh-mobile.png',
            knee: '/src/images/mobile/female-knee-mobile.png',
            calf: '/src/images/mobile/female-calf-mobile.png',
            ankle: '/src/images/mobile/female-ankle-mobile.png',
            bicep: '/src/images/mobile/female-bicep-mobile.png',
            elbow: '/src/images/mobile/female-elbow-mobile.png',
            wrist: '/src/images/mobile/female-wrist-mobile.png',
            'inseam-ankle': '/src/images/mobile/female-inseam-ankle-mobile.png',
            'inseam-floor': '/src/images/mobile/female-inseam-floor-mobile.png',
            'neck-waist': '/src/images/mobile/female-neck-waist-mobile.png',
            'neck-floor': '/src/images/mobile/female-neck-floor-mobile.png',
            'waist-floor': '/src/images/mobile/female-waist-floor-mobile.png',
            height: '/src/images/mobile/female-height-mobile.png'
        }
    },
    
    // Comprehensive measurement definitions and guidance text
    measurementDefinitions: {
        // Common measurements (shared by both genders)
        neck: {
            object: 'Neck',
            definition: 'Circumference around the base of the neck',
            description: 'Measure around the neck where the collar would normally sit. Keep tape measure comfortably snug.'
        },
        'shoulder-length': {
            object: 'Shoulder',
            definition: 'Length from neck point to shoulder tip',
            description: 'Measure from base of neck (where collar sits) to edge of shoulder bone.'
        },
        'arm-length': {
            object: 'Arm',
            definition: 'Length from shoulder tip to wrist bone',
            description: 'Measure with arm slightly bent, from shoulder tip over elbow to wrist bone.'
        },
        'chest-circumference': {
            object: 'Chest',
            definition: 'Circumference around the fullest part of chest',
            description: 'Measure around the chest at the fullest part, under armpits and over shoulder blades.'
        },
        waist: {
            object: 'Waist',
            definition: 'Circumference at natural waistline',
            description: 'Measure at the narrowest part of waist, usually above navel and below rib cage.'
        },
        'hip-circumference': {
            object: 'Hip',
            definition: 'Circumference around the fullest part of hips',
            description: 'Measure around the fullest part of hips and buttocks.'
        },
        thigh: {
            object: 'Thigh',
            definition: 'Circumference at fullest part of thigh',
            description: 'Measure around the fullest part of thigh, usually 1-2 inches below crotch.'
        },
        knee: {
            object: 'Knee',
            definition: 'Circumference around the knee',
            description: 'Measure around the center of the knee cap with leg slightly bent.'
        },
        calf: {
            object: 'Calf',
            definition: 'Circumference at fullest part of calf',
            description: 'Measure around the fullest part of calf muscle.'
        },
        ankle: {
            object: 'Ankle',
            definition: 'Circumference around the ankle bone',
            description: 'Measure just above the ankle bone at the narrowest point.'
        },
        bicep: {
            object: 'Bicep',
            definition: 'Circumference at fullest part of upper arm',
            description: 'Measure around the fullest part of bicep with arm relaxed.'
        },
        elbow: {
            object: 'Elbow',
            definition: 'Circumference around elbow joint',
            description: 'Measure around elbow with arm bent at 90 degrees.'
        },
        wrist: {
            object: 'Wrist',
            definition: 'Circumference around wrist bone',
            description: 'Measure just below the wrist bone.'
        },
        'inseam-ankle': {
            object: 'Inseam (to ankle)',
            definition: 'Length from crotch to ankle bone',
            description: 'Measure from crotch along inner leg to ankle bone.'
        },
        'inseam-floor': {
            object: 'Inseam (to floor)',
            definition: 'Length from crotch to floor',
            description: 'Measure from crotch straight down to floor.'
        },
        'neck-waist': {
            object: 'Neck to Waist',
            definition: 'Length from base of neck to waistline',
            description: 'Measure from base of neck at back to natural waistline.'
        },
        'neck-floor': {
            object: 'Neck to Floor',
            definition: 'Full height from neck base to floor',
            description: 'Measure from base of neck at back straight down to floor.'
        },
        'waist-floor': {
            object: 'Waist to Floor',
            definition: 'Length from waistline to floor',
            description: 'Measure from natural waistline straight down to floor.'
        },
        height: {
            object: 'Height',
            definition: 'Total body height',
            description: 'Stand straight against wall and measure from top of head to floor.'
        },
        
        // Male-specific measurements
        'across-front': {
            object: 'Across Front',
            definition: 'Width across chest from armhole to armhole',
            description: 'Measure across front from one armhole seam to the other.'
        },
        'total-rise': {
            object: 'Total Rise',
            definition: 'Length from waist front through crotch to waist back',
            description: 'Measure from waist front, through legs, to waist back.'
        },
        
        // Female-specific measurements
        'under-bust': {
            object: 'Under Bust',
            definition: 'Circumference under the bust',
            description: 'Measure around ribcage directly under the bust.'
        },
        'hip-bone-circumference': {
            object: 'Hip Bone',
            definition: 'Circumference around hip bones',
            description: 'Measure around the hip bones (iliac crest).'
        }
    },
    
    // Size options by gender
    sizeOptions: {
        male: [
            '30S', '34S', '36S', '38S', '40S', '42S', '44S', '46S', '48S', '50S',
            '30M', '34M', '36M', '38M', '40M', '42M', '44M', '46M', '48M', '50M',
            '30L', '34L', '36L', '38L', '40L', '42L', '44L', '46L', '48L', '50L',
            '30XL', '34XL', '36XL', '38XL', '40XL', '42XL', '44XL', '46XL', '48XL', '50XL'
        ],
        female: ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F']
    },
    
    // Validation configuration
    validation: {
        nameRegex: /^[A-Za-z\s]+$/, // Only alphabetic characters and spaces
        minNameLength: 2,
        maxNameLength: 50,
        dateFormat: 'YYYY-MM-DD'
    },
    
    // Default configuration
    config: {
        measurementUnit: 'inches',
        maxSummaryItems: 30,
        zoomResetTime: 500, // ms
        minZoom: 0.5,
        maxZoom: 3,
        defaultZoom: 1,
        mobileBreakpoint: 992, // px
        desktopBreakpoint: 993 // px
    },
    
    // Helper methods for device detection
    isMobileView: function() {
        return window.innerWidth <= this.config.mobileBreakpoint;
    },
    
    isDesktopView: function() {
        return window.innerWidth >= this.config.desktopBreakpoint;
    },
    
    // Method to get all measurement fields for a specific gender
    getMeasurementFields: function(gender) {
        const commonFields = [
            'neck', 'shoulder-length', 'arm-length', 'chest-circumference', 'waist',
            'hip-circumference', 'thigh', 'knee', 'calf', 'ankle', 'bicep', 'elbow',
            'wrist', 'inseam-ankle', 'inseam-floor', 'neck-waist', 'neck-floor',
            'waist-floor', 'height'
        ];
        
        if (gender === 'male') {
            return [...commonFields, 'across-front', 'total-rise'];
        } else if (gender === 'female') {
            return [...commonFields, 'under-bust', 'hip-bone-circumference'];
        }
        
        return commonFields;
    },
    
    // Method to get label text for a measurement
    getLabelText: function(measurementKey) {
        const definitions = {
            'neck': 'Neck circumference',
            'shoulder-length': 'Shoulder length',
            'arm-length': 'Arm length',
            'across-front': 'Across front',
            'chest-circumference': 'Chest circumference',
            'waist': 'Waist circumference',
            'hip-circumference': 'Hip circumference',
            'total-rise': 'Total rise',
            'thigh': 'Thigh',
            'knee': 'Knee',
            'calf': 'Calf',
            'ankle': 'Ankle',
            'bicep': 'Bicep',
            'elbow': 'Elbow',
            'wrist': 'Wrist',
            'inseam-ankle': 'Inseam to ankle',
            'inseam-floor': 'Inseam to floor',
            'neck-waist': 'Neck to waist',
            'neck-floor': 'Neck to floor',
            'waist-floor': 'Waist to floor',
            'height': 'Height',
            'under-bust': 'Under bust',
            'hip-bone-circumference': 'Hip bone circumference'
        };
        
        return definitions[measurementKey] || measurementKey;
    }
};
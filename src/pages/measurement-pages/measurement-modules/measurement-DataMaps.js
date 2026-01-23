/**
 * measurement-DataMaps.js
 * Contains all static data, images, and configuration for the measurement system
 * Centralized data store for easy updates and maintenance
 */

export const MeasurementData = {
    // Measurement guide images by gender
    guideImages: {
        male: '/src/images/male-chart.jpg',
        female: '/src/images/female-chart.jpg'
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
    
    // Default configuration
    config: {
        measurementUnit: 'inches',
        maxSummaryItems: 30,
        zoomResetTime: 500, // ms
        minZoom: 0.5,
        maxZoom: 3,
        defaultZoom: 1
    }
};
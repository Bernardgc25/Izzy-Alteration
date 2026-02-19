// measurement-DataMaps.js

export const measurementDataMap = {
    // Gender-specific measurement guides and images
    gender: {
        male: {
            imageDesktop: "/src/images/male-desktop.png",
            // imageMobile: " "
        },
        female: {
            imageDesktop: "/src/images/female-desktop.png",
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
                imageMobile: "/src/images/male-(chart)-tablet-mobile.png"
            },
            "shoulder-length": {
                object: "Shoulder Length",
                definition: "Measure from the edge of one shoulder to the edge of the other shoulder.",
                description: "Place the tape measure from the outer edge of one shoulder bone (acromion) to the other, across the back.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "arm-length": {
                object: "Arm Length",
                definition: "Measure from the shoulder point to the wrist bone.",
                description: "Bend arm slightly at elbow. Measure from the shoulder bone edge, along the outside of the arm, over the elbow, to the wrist bone.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "chest-circumference": {
                object: "Chest Circumference",
                definition: "Measure around the fullest part of the chest.",
                description: "Wrap the tape measure around the fullest part of the chest, under the armpits, and across the shoulder blades. Keep tape parallel to the floor.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "waist": {
                object: "Waist Circumference",
                definition: "Measure around the natural waistline.",
                description: "Find the natural waist (smallest part of torso). Wrap tape measure around waist, keeping it parallel to the floor.",
                imageMobile: "/src/images/male-(chart)-tablet-mobile.png"
            },
            "hip-circumference": {
                object: "Hip Circumference",
                definition: "Measure around the fullest part of the hips.",
                description: "Wrap tape measure around the fullest part of the hips/buttocks, keeping it parallel to the floor.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "thigh": {
                object: "Thigh Circumference",
                definition: "Measure around the fullest part of the thigh.",
                description: "Wrap tape measure around the fullest part of the thigh, usually about 1-2 inches below the crotch.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "knee": {
                object: "Knee Circumference",
                definition: "Measure around the center of the knee.",
                description: "With leg slightly bent, measure around the center of the knee cap.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "calf": {
                object: "Calf Circumference",
                definition: "Measure around the fullest part of the calf.",
                description: "Stand with feet apart. Measure around the fullest part of the calf muscle.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "ankle": {
                object: "Ankle Circumference",
                definition: "Measure around the narrowest part of the ankle.",
                description: "Measure around the narrowest part of the ankle, just above the ankle bone.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "bicep": {
                object: "Bicep Circumference",
                definition: "Measure around the fullest part of the bicep.",
                description: "With arm relaxed at side, measure around the fullest part of the bicep.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "elbow": {
                object: "Elbow Circumference",
                definition: "Measure around the bent elbow.",
                description: "Bend arm to 90 degrees. Measure around the elbow at its fullest point with arm bent.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "wrist": {
                object: "Wrist Circumference",
                definition: "Measure around the wrist bone.",
                description: "Measure around the wrist bone, just below the hand. Tape should be snug but not tight.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "inseam-ankle": {
                object: "Inseam to Ankle",
                definition: "Measure from crotch to ankle bone.",
                description: "Stand with legs slightly apart. Measure from the crotch along the inside of the leg to the ankle bone.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "inseam-floor": {
                object: "Inseam to Floor",
                definition: "Measure from crotch to floor.",
                description: "Stand with legs slightly apart. Measure from the crotch straight down to the floor along the inside of the leg.",
                imageMobile: "/src/images/male-back-tablet-mobile.png"
            },
            "neck-waist": {
                object: "Neck to Waist",
                definition: "Measure from nape of neck to natural waist.",
                description: "Measure from the prominent bone at the base of the neck (C7 vertebra) down the back to the natural waistline.",
                imageMobile: "/src/images/male-back-tablet-mobile.png"
            },
            "neck-floor": {
                object: "Neck to Floor",
                definition: "Measure from nape of neck to floor.",
                description: "Stand straight. Measure from the prominent bone at the base of the neck (C7 vertebra) straight down to the floor.",
                imageMobile: "/src/images/male-back-tablet-mobile.png"
            },
            "waist-floor": {
                object: "Waist to Floor",
                definition: "Measure from natural waist to floor.",
                description: "Stand straight. Measure from the natural waistline straight down to the floor.",
                imageMobile: "/src/images/male-back-tablet-mobile.png"
            },
            "height": {
                object: "Height",
                definition: "Total standing height.",
                description: "Stand straight against a wall without shoes. Measure from the top of the head to the floor.",
                imageMobile: "/src/images/male-back-tablet-mobile.png"
            },
            "across-front": {
                object: "Across Front",
                definition: "Measure across the front from armhole to armhole.",
                description: "Measure horizontally across the front from one armhole seam to the other, about 1 inch below the underarm.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            },
            "total-rise": {
                object: "Total Rise",
                definition: "Measure from waist front through crotch to waist back.",
                description: "Measure from the front waistline, through the legs, up to the back waistline. This determines pants fit.",
                imageMobile: "/src/images/male-front-tablet-mobile.png"
            }
        },

        female: {
            // Female-specific measurements
            "neck": {
                object: "Neck Circumference",
                definition: "Measure around the base of the neck where the collar would normally sit.",
                description: "Place the tape measure around the base of the neck, keeping it parallel to the floor. Ensure it's not too tight or too loose.",
                imageMobile: "/src/images/female-(chart)-tablet-mobile.png"
            },
            "shoulder-length": {
                object: "Shoulder Length",
                definition: "Measure from the edge of one shoulder to the edge of the other shoulder.",
                description: "Place the tape measure from the outer edge of one shoulder bone (acromion) to the other, across the back.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "arm-length": {
                object: "Arm Length",
                definition: "Measure from the shoulder point to the wrist bone.",
                description: "Bend arm slightly at elbow. Measure from the shoulder bone edge, along the outside of the arm, over the elbow, to the wrist bone.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "chest-circumference": {
                object: "Bust Circumference",
                definition: "Measure around the fullest part of the bust.",
                description: "Wrap the tape measure around the fullest part of the bust, keeping it parallel to the floor. Do not compress breast tissue.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "under-bust": {
                object: "Under Bust",
                definition: "Measure around the torso directly under the bust.",
                description: "Wrap tape measure around the ribcage directly under the bust. Keep tape parallel to the floor.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "waist": {
                object: "Waist Circumference",
                definition: "Measure around the natural waistline.",
                description: "Find the natural waist (smallest part of torso). Wrap tape measure around waist, keeping it parallel to the floor.",
                imageMobile: "/src/images/female-(chart)-tablet-mobile.png"
            },
            "hip-circumference": {
                object: "Hip Circumference",
                definition: "Measure around the fullest part of the hips.",
                description: "Wrap tape measure around the fullest part of the hips/buttocks, keeping it parallel to the floor.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "hip-bone-circumference": {
                object: "Hip Bone Circumference",
                definition: "Measure around the hip bones (iliac crest).",
                description: "Measure around the top of the hip bones (iliac crest), usually about 3-4 inches below the natural waist.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "thigh": {
                object: "Thigh Circumference",
                definition: "Measure around the fullest part of the thigh.",
                description: "Wrap tape measure around the fullest part of the thigh, usually about 1-2 inches below the crotch.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "knee": {
                object: "Knee Circumference",
                definition: "Measure around the center of the knee.",
                description: "With leg slightly bent, measure around the center of the knee cap.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "calf": {
                object: "Calf Circumference",
                definition: "Measure around the fullest part of the calf.",
                description: "Stand with feet apart. Measure around the fullest part of the calf muscle.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "ankle": {
                object: "Ankle Circumference",
                definition: "Measure around the narrowest part of the ankle.",
                description: "Measure around the narrowest part of the ankle, just above the ankle bone.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "bicep": {
                object: "Bicep Circumference",
                definition: "Measure around the fullest part of the bicep.",
                description: "With arm relaxed at side, measure around the fullest part of the bicep.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "elbow": {
                object: "Elbow Circumference",
                definition: "Measure around the bent elbow.",
                description: "Bend arm to 90 degrees. Measure around the elbow at its fullest point with arm bent.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "wrist": {
                object: "Wrist Circumference",
                definition: "Measure around the wrist bone.",
                description: "Measure around the wrist bone, just below the hand. Tape should be snug but not tight.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "inseam-ankle": {
                object: "Inseam to Ankle",
                definition: "Measure from crotch to ankle bone.",
                description: "Stand with legs slightly apart. Measure from the crotch along the inside of the leg to the ankle bone.",
                imageMobile: "/src/images/female-front-tablet-mobile.png"
            },
            "inseam-floor": {
                object: "Inseam to Floor",
                definition: "Measure from crotch to floor.",
                description: "Stand with legs slightly apart. Measure from the crotch straight down to the floor along the inside of the leg.",
                imageMobile: "/src/images/female-back-tablet-mobile.png"
            },
            "neck-waist": {
                object: "Neck to Waist",
                definition: "Measure from nape of neck to natural waist.",
                description: "Measure from the prominent bone at the base of the neck (C7 vertebra) down the back to the natural waistline.",
                imageMobile: "/src/images/female-back-tablet-mobile.png"
            },
            "neck-floor": {
                object: "Neck to Floor",
                definition: "Measure from nape of neck to floor.",
                description: "Stand straight. Measure from the prominent bone at the base of the neck (C7 vertebra) straight down to the floor.",
                imageMobile: "/src/images/female-back-tablet-mobile.png"
            },
            "waist-floor": {
                object: "Waist to Floor",
                definition: "Measure from natural waist to floor.",
                description: "Stand straight. Measure from the natural waistline straight down to the floor.",
                imageMobile: "/src/images/female-back-tablet-mobile.png"
            },
            "height": {
                object: "Height",
                definition: "Total standing height.",
                description: "Stand straight against a wall without shoes. Measure from the top of the head to the floor.",
                imageMobile: "/src/images/female-back-tablet-mobile.png"
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
            imageMobile: "/images/measurements/mobile/cup-size-mobile.jpg"
        },
        "size-number": {
            object: "Size Number",
            definition: "Standard clothing size based on chest/waist measurements.",
            description: "Size number corresponds to chest measurement for men (30=30\", 34=34\", etc.) or dress size for women. Letter indicates height: S=Short, M=Medium, L=Long, XL=Extra Long.",
            imageMobile: "/images/measurements/mobile/size-number-mobile.jpg"
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
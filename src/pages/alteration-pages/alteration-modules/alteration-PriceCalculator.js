/**
 * Price Calculator - Pure function module for price calculations
 * Contains no side effects, easily testable
 */
class PriceCalculator {
    constructor(alterationMaps) {
        this.alterationMaps = alterationMaps;
    }

    // Find category for a given alteration value
    findCategory(alterationValue) {
        if (!alterationValue) return null;

        // Linear search through all categories
        for (const category in this.alterationMaps) {
            if (this.alterationMaps[category][alterationValue]) {
                return category;
            }
        }

        // Try partial match for nested structures
        const parts = alterationValue.split('-');
        for (let i = parts.length - 1; i >= 1; i--) {
            const potentialCategory = parts.slice(0, i).join('-');
            if (this.alterationMaps[potentialCategory] && 
                this.alterationMaps[potentialCategory][alterationValue]) {
                return potentialCategory;
            }
        }

        return null;
    }

    // Calculate price based on alteration and difficulty
    calculatePrice(alterationValue, difficulty) {
        if (!alterationValue || !difficulty) return 0;

        const category = this.findCategory(alterationValue);
        
        if (!category || 
            !this.alterationMaps[category] || 
            !this.alterationMaps[category][alterationValue]) {
            console.warn(`Alteration not found: ${alterationValue}`);
            return 0;
        }

        const alterationData = this.alterationMaps[category][alterationValue];
        
        if (typeof alterationData[difficulty] !== 'number' || 
            alterationData[difficulty] <= 0) {
            return 0;
        }

        return alterationData[difficulty];
    }

    // Get alteration details
    getAlterationDetails(alterationValue) {
        const category = this.findCategory(alterationValue);
        
        if (!category || 
            !this.alterationMaps[category] || 
            !this.alterationMaps[category][alterationValue]) {
            return { detail: '', price: 0 };
        }

        return this.alterationMaps[category][alterationValue];
    }

    // Get customer request text based on difficulty
    getCustomerRequestText(difficulty) {
        const requestMap = {
            intermediate: '• plus (1) customer-requested modification',
            difficult: '• plus (2) customer-requested modification'
        };
        return requestMap[difficulty] || '';
    }
}

export default PriceCalculator;
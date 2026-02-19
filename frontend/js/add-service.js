/**
 * Tailoring Service Selector - Main JavaScript Module
 * This script handles all dynamic functionality for the tailoring service selector
 */

// DOM Element References Module
const elements = {
    // Form elements
    serviceSelect: document.getElementById('serviceSelect'),
    genderGroup: document.getElementById('gender-group'),
    genderSelect: document.getElementById('genderSelect'),
    maleSubgroup: document.getElementById('male-subgroup'),
    femaleSubgroup: document.getElementById('female-subgroup'),
    maleClothing: document.getElementById('maleClothing'),
    femaleClothing: document.getElementById('femaleClothing'),
    
    // Summary elements
    summarySection: document.getElementById('summary-section'),
    summaryContent: document.getElementById('summary-content'),
    
    // Button elements
    continueButton: document.getElementById('continueButton'),
    exitButton: document.getElementById('exitButton')
};

// Service Links Configuration Module
const serviceLinks = {
    // Alteration sub-pages
    'alteration-male-top': '/src/pages/alteration-pages/alteration-male-top.html',
    'alteration-male-bottom': '/src/pages/alteration-pages/alteration-male-bottom.html',
    'alteration-male-suits': '/src/pages/alteration-pages/alteration-male-suits.html',
    'alteration-female-dress': '/src/pages/alteration-pages/alteration-female-dress.html',
    'alteration-female-top': '/src/pages/alteration-pages/alteration-female-top.html',
    'alteration-female-bottom': '/src/pages/alteration-pages/alteration-female-bottom.html',
    'alteration-female-jacket': '/src/pages/alteration-pages/alteration-female-jacket.html',
    
    // Repair page
    'repair': '/src/pages/alteration-pages/alteration-repair.html',
    
    // Custom tailoring page
    'custom-tailoring': ''
};

// UI Control Module - Handles visibility and state of form elements
const uiController = {
    /**
     * Hide all clothing subgroups
     */
    hideAllSubgroups: function() {
        elements.maleSubgroup.style.display = 'none';
        elements.femaleSubgroup.style.display = 'none';
        elements.maleClothing.value = '';
        elements.femaleClothing.value = '';
    },
    
    /**
     * Show gender selection based on service type
     * @param {string} serviceType - The selected service type
     */
    toggleGenderVisibility: function(serviceType) {
        // Hide gender for Repair and Custom Tailoring services
        if (serviceType === 'repair' || serviceType === 'custom-tailoring') {
            elements.genderGroup.style.display = 'none';
            elements.genderSelect.value = '';
            this.hideAllSubgroups();
        } else {
            elements.genderGroup.style.display = 'flex';
        }
    },
    
    /**
     * Show appropriate clothing subgroup based on gender selection
     * @param {string} gender - The selected gender
     */
    toggleClothingSubgroup: function(gender) {
        this.hideAllSubgroups();
        
        if (gender === 'male') {
            elements.maleSubgroup.style.display = 'flex';
        } else if (gender === 'female') {
            elements.femaleSubgroup.style.display = 'flex';
        }
    }
};

// Summary Module - Handles summary display logic
const summaryManager = {
    /**
     * Update summary section based on service selection
     * @param {string} serviceType - The selected service type
     * @param {string} gender - The selected gender (optional)
     * @param {string} clothingType - The selected clothing type (optional)
     */
    updateSummary: function(serviceType, gender = '', clothingType = '') {
        // Show summary only for Alteration and Custom Tailoring
        if (serviceType === 'alteration' || serviceType === 'custom-tailoring') {
            elements.summarySection.style.display = 'block';
            
            if (serviceType === 'alteration') {
                this.displayAlterationSummary(serviceType, gender, clothingType);
            } else if (serviceType === 'custom-tailoring') {
                this.displayCustomTailoringSummary();
            }
        } else {
            // Hide summary for Repair service
            elements.summarySection.style.display = 'none';
        }
    },
    
    /**
     * Display summary for Alteration service
     * @param {string} serviceType - The selected service type
     * @param {string} gender - The selected gender
     * @param {string} clothingType - The selected clothing type
     */
    displayAlterationSummary: function(serviceType, gender, clothingType) {
        if (gender && clothingType) {
            // Format gender and clothing type for display
            const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
            const formattedClothing = clothingType.charAt(0).toUpperCase() + clothingType.slice(1);
            
            elements.summaryContent.innerHTML = `
                <p><strong>Service Type:</strong> ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
                <p><strong>Gender:</strong> ${formattedGender}</p>
                <p><strong>Clothing Type:</strong> ${formattedClothing}</p>
            `;
        } else {
            elements.summaryContent.innerHTML = `<p>Please complete all selections for Alteration service.</p>`;
        }
    },
    
    /**
     * Display summary for Custom Tailoring service
     */
    displayCustomTailoringSummary: function() {
        elements.summaryContent.innerHTML = `
            <p>See our tailor for custom tailoring. Our expert tailors will work with you to create custom-fitted garments.</p>
        `;
    }
};

// Navigation Module - Handles button actions and redirects
const navigationController = {
    /**
     * Get the appropriate redirect URL based on selections
     * @returns {string} The URL to redirect to
     */
    getRedirectUrl: function() {
        const serviceType = elements.serviceSelect.value;
        
        // For Repair and Custom Tailoring, use the service type directly
        if (serviceType === 'repair' || serviceType === 'custom-tailoring') {
            return serviceLinks[serviceType];
        }
        
        // For Alteration, get the link from the clothing select
        if (serviceType === 'alteration') {
            const gender = elements.genderSelect.value;
            
            if (gender === 'male') {
                const clothingSelect = elements.maleClothing;
                const selectedOption = clothingSelect.options[clothingSelect.selectedIndex];
                return serviceLinks[selectedOption.getAttribute('data-link')];
            } else if (gender === 'female') {
                const clothingSelect = elements.femaleClothing;
                const selectedOption = clothingSelect.options[clothingSelect.selectedIndex];
                return serviceLinks[selectedOption.getAttribute('data-link')];
            }
        }
        
        return '#';
    },
    
    /**
     * Validate if all required selections are made
     * @returns {boolean} True if valid, false otherwise
     */
    validateSelections: function() {
        const serviceType = elements.serviceSelect.value;
        
        if (!serviceType) return false;
        
        // For Repair and Custom Tailoring, only service type is required
        if (serviceType === 'repair' || serviceType === 'custom-tailoring') {
            return true;
        }
        
        // For Alteration, gender and clothing type are also required
        if (serviceType === 'alteration') {
            const gender = elements.genderSelect.value;
            if (!gender) return false;
            
            if (gender === 'male') {
                return !!elements.maleClothing.value;
            } else if (gender === 'female') {
                return !!elements.femaleClothing.value;
            }
        }
        
        return false;
    },
    
    /**
     * Update continue button state based on validation
     */
    updateContinueButton: function() {
        elements.continueButton.disabled = !this.validateSelections();
    }
};

// Event Handlers Module
const eventHandlers = {
    /**
     * Handle service selection change
     */
    handleServiceChange: function() {
        const serviceType = elements.serviceSelect.value;
        
        // Reset gender and clothing selections
        elements.genderSelect.value = '';
        uiController.hideAllSubgroups();
        
        // Update UI based on service type
        uiController.toggleGenderVisibility(serviceType);
        
        // Update summary
        summaryManager.updateSummary(serviceType);
        
        // Update button state
        navigationController.updateContinueButton();
    },
    
    /**
     * Handle gender selection change
     */
    handleGenderChange: function() {
        const gender = elements.genderSelect.value;
        const serviceType = elements.serviceSelect.value;
        
        // Show appropriate clothing subgroup
        uiController.toggleClothingSubgroup(gender);
        
        // Update summary
        summaryManager.updateSummary(serviceType, gender);
        
        // Update button state
        navigationController.updateContinueButton();
    },
    
    /**
     * Handle clothing type selection change
     */
    handleClothingChange: function() {
        const serviceType = elements.serviceSelect.value;
        const gender = elements.genderSelect.value;
        
        // Get selected clothing type
        let clothingType = '';
        if (gender === 'male') {
            clothingType = elements.maleClothing.value;
        } else if (gender === 'female') {
            clothingType = elements.femaleClothing.value;
        }
        
        // Update summary
        summaryManager.updateSummary(serviceType, gender, clothingType);
        
        // Update button state
        navigationController.updateContinueButton();
    },
    
    /**
     * Handle continue button click
     */
    handleContinueClick: function() {
        if (navigationController.validateSelections()) {
            const redirectUrl = navigationController.getRedirectUrl();
            window.location.href = redirectUrl;
        }
    },
    
    /**
     * Handle exit button click
     */
    handleExitClick: function() {
        // Reset all form elements
        elements.serviceSelect.value = '';
        elements.genderSelect.value = '';
        elements.maleClothing.value = '';
        elements.femaleClothing.value = '';
        
        // Reset UI state
        elements.genderGroup.style.display = 'flex';
        uiController.hideAllSubgroups();
        elements.summarySection.style.display = 'none';
        elements.continueButton.disabled = true;
        
        // Reset summary content
        elements.summaryContent.innerHTML = `<p>No selections made yet.</p>`;
    }
};

// Initialization Module
const appInitializer = {
    /**
     * Initialize all event listeners
     */
    initEventListeners: function() {
        // Service selection change
        elements.serviceSelect.addEventListener('change', () => {
            eventHandlers.handleServiceChange();
        });
        
        // Gender selection change
        elements.genderSelect.addEventListener('change', () => {
            eventHandlers.handleGenderChange();
        });
        
        // Male clothing selection change
        elements.maleClothing.addEventListener('change', () => {
            eventHandlers.handleClothingChange();
        });
        
        // Female clothing selection change
        elements.femaleClothing.addEventListener('change', () => {
            eventHandlers.handleClothingChange();
        });
        
        // Continue button click
        elements.continueButton.addEventListener('click', () => {
            eventHandlers.handleContinueClick();
        });
        
        // Exit button click
        elements.exitButton.addEventListener('click', () => {
            eventHandlers.handleExitClick();
        });
    },
    
    /**
     * Initialize the application
     */
    init: function() {
        this.initEventListeners();
        console.log('Tailoring Service Selector initialized');
    }
};

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    appInitializer.init();
});
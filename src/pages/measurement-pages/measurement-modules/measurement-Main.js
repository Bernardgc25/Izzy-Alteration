    /**
    * measurement-Main.js
    * Entry point - coordinates all modules and handles user interactions
    * Only this file should be linked in HTML files
    */

    import { MeasurementData } from './measurement-DataMaps.js';
    import { MeasurementValidator } from './measurement-Validation.js';
    import { MeasurementManager } from './measurement-Manager.js';

    // Global app instance (accessible for inline event handlers)
    let measurementApp = null;

    class MeasurementApp {
        constructor() {
            this.manager = null;
            this.validator = null;
            this.initializeApp();
        }

        /**
        * Initializes the application when DOM is loaded
        */
        initializeApp() {
            // Get gender from form data attribute
            const form = document.getElementById('measurement-form');
            if (!form) {
                console.error('Measurement form not found');
                return;
            }

            const gender = form.dataset.gender;
            
            // Initialize modules
            this.manager = new MeasurementManager().initialize(gender);
            this.validator = new MeasurementValidator(form);
            
            // Setup all event listeners
            this.setupGlobalEventListeners();
            this.setupMeasurementInputListeners();
            this.setupClientNameValidation(); // Setup real-time validation for client name
            
            console.log(`Measurement App initialized for ${gender}`);
        }

        /**
        * Sets up global event listeners for form interactions
        */
        setupGlobalEventListeners() {
            // Gender-specific field validation on change
            if (this.manager.gender === 'male') {
                const sizeField = document.getElementById('size-number');
                if (sizeField) {
                    sizeField.addEventListener('change', () => {
                        this.validator.validateField('size-number');
                    });
                }
            } else {
                const cupSizeField = document.getElementById('cupSize');
                if (cupSizeField) {
                    cupSizeField.addEventListener('change', () => {
                        this.validator.validateField('cupSize');
                    });
                }
            }
        }

        /**
        * Sets up listeners for measurement input fields
        */
        setupMeasurementInputListeners() {
            const inputs = document.querySelectorAll('.measurement-input');
            
            inputs.forEach(input => {
                // Real-time validation on input with debouncing for better performance
                let debounceTimer;
                input.addEventListener('input', (e) => {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        const label = e.target.parentElement.querySelector('.label-text').textContent;
                        this.manager.saveMeasurement(e.target.id, e.target.value, label);
                        
                        // Validate immediately when user types
                        this.validator.validateField(e.target.id);
                    }, 150); // 150ms debounce delay
                });
                
                // Show measurement guide on focus
                input.addEventListener('focus', (e) => {
                    this.showMeasurementGuide(e.target.dataset.measurement);
                    // Clear any existing error immediately when field is focused
                    this.validator.clearSingleError(e.target.id);
                });
                
                // Validate on blur for final check
                input.addEventListener('blur', (e) => {
                    // Validate immediately without delay
                    this.validator.validateField(e.target.id);
                });
            });
        }

        /**
        * Sets up real-time validation for client name field
        */
        setupClientNameValidation() {
            const nameField = document.getElementById('client-name');
            if (nameField) {
                // Validate on every keystroke with debouncing
                let debounceTimer;
                nameField.addEventListener('input', (e) => {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        this.validator.validateField('client-name');
                    }, 150);
                });
                
                // Validate on blur for final check
                nameField.addEventListener('blur', (e) => {
                    this.validator.validateField('client-name');
                });
            }
        }

        /**
        * Displays measurement guide for selected measurement
        * @param {string} measurementKey - Key of the measurement to show guide for
        */
        showMeasurementGuide(measurementKey) {
            const definition = MeasurementData.measurementDefinitions[measurementKey];
            if (!definition) return;

            // Update guide text elements
            document.getElementById('measure-object').innerHTML = 
                `<strong>Object:</strong> ${definition.object}`;
            document.getElementById('measure-definition').innerHTML = 
                `<strong>Definition:</strong> ${definition.definition}`;
            document.getElementById('measure-description').innerHTML = 
                `<strong>How to measure:</strong> ${definition.description}`;
        }

        /**
        * Handles save measurements button click
        * Validates form and shows success message
        */
        handleSaveMeasurements() {
            if (!this.validator.validateAll()) {
                // Highlight first error field
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
                alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
                return;
            }

            // Get form data
            const formData = this.manager.getFormData();
            
            // In production, this would send to a server
            console.log('Measurement data ready for database:', JSON.stringify(formData, null, 2));
            
            // Show success message
            alert('Measurements saved successfully!\n\nClient: ' + formData.name + 
                '\nDate: ' + formData.date + 
                '\nTotal Measurements: ' + Object.keys(formData.measurements).length);
        }

        /**
        * Handles reset form button click
        * Confirms with user before resetting
        */
        handleResetForm() {
            if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
                this.manager.resetAll();
                this.validator.clearErrors();
            }
        }
    }

    // Initialize application when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        measurementApp = new MeasurementApp();
    });

    // Global functions for inline event handlers (required by HTML)
    window.handleSaveMeasurements = function() {
        if (measurementApp) measurementApp.handleSaveMeasurements();
    };

    window.handleResetForm = function() {
        if (measurementApp) measurementApp.handleResetForm();
    };
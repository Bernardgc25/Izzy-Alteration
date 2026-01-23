//   DEPRECATED FILE AND NOT NEEDED 
// Measurement guide data with image URLs and instructions
const measurementGuides = {
    chest: {
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        instruction: "Measure around the fullest part of the chest, under the arms and over the shoulder blades."
    },
    waist: {
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
        instruction: "Measure around the natural waistline, which is the narrowest part of the torso."
    },
    shoulder: {
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        instruction: "Measure from the edge of one shoulder to the edge of the other, across the back."
    },
    sleeve: {
        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=300&fit=crop",
        instruction: "Measure from the shoulder point to the wrist bone, with arm slightly bent."
    },
    bicep: {
        image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400&h=300&fit=crop",
        instruction: "Measure around the fullest part of the upper arm with muscles relaxed."
    },
    neck: {
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        instruction: "Measure around the base of the neck where the collar would normally sit."
    },
    hips: {
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        instruction: "Measure around the fullest part of the hips and buttocks."
    },
    thigh: {
        image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=400&h=300&fit=crop",
        instruction: "Measure around the fullest part of the upper leg, just below the buttocks."
    },
    rise: {
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        instruction: "Measure from the front waistband through the legs to the back waistband."
    },
    knees: {
        image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=400&h=300&fit=crop",
        instruction: "Measure around the knee cap with leg straight but relaxed."
    },
    inseam: {
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        instruction: "Measure from the crotch seam to the bottom of the ankle along the inner leg."
    },
    outseam: {
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        instruction: "Measure from the waist to the bottom of the ankle along the outer leg."
    },
    "leg-opening": {
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        instruction: "Measure the circumference of the bottom opening of the pant leg."
    }
};

// Validation ranges for each measurement field
const validationRanges = {
    chest: { min: 20, max: 80 },
    waist: { min: 20, max: 80 },
    shoulder: { min: 10, max: 30 },
    sleeve: { min: 10, max: 40 },
    bicep: { min: 5, max: 25 },
    neck: { min: 10, max: 25 },
    hips: { min: 20, max: 80 },
    thigh: { min: 10, max: 40 },
    rise: { min: 5, max: 20 },
    knees: { min: 8, max: 25 },
    inseam: { min: 20, max: 50 },
    outseam: { min: 30, max: 60 },
    "leg-opening": { min: 5, max: 20 }
};

// Store validation errors
let validationErrors = [];

// DOM elements
const form = document.getElementById('measurement-form');
const errorList = document.getElementById('error-list');
const validationStatus = document.getElementById('validation-status');
const summaryContent = document.getElementById('summary-content');
const guideImage = document.getElementById('guide-image');
const defaultGuide = document.getElementById('default-guide');
const currentGuideText = document.getElementById('current-guide');
const saveDateInput = document.getElementById('save-date');
const printButton = document.getElementById('print-summary');
const viewSummaryButton = document.getElementById('view-summary');
const resetButton = document.getElementById('reset-button');

// Set today's date as default and maximum
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    saveDateInput.value = today;
    saveDateInput.max = today;
}

// Clear the entire form
function clearForm() {
    // Reset the form
    form.reset();
    
    // Reset validation errors
    validationErrors = [];
    
    // Update validation summary
    updateValidationSummary();
    
    // Update measurement summary
    updateMeasurementSummary();
    
    // Reset to today's date
    setTodayDate();
    
    // Reset guide to default
    guideImage.style.display = 'none';
    defaultGuide.style.display = 'flex';
    currentGuideText.innerHTML = '<strong>How to use:</strong> Click on any measurement field to see detailed instructions and visual guidance.';
    
    // Remove validation classes from all inputs
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error', 'valid');
    });
    
    // Clear all error messages
    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
    });
    
    // Show confirmation message (optional)
    console.log('Form cleared successfully');
}

// Show measurement guide when input is focused
function setupMeasurementGuides() {
    const measurementInputs = document.querySelectorAll('input[type="number"]');
    
    measurementInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const measurementId = this.id;
            const guide = measurementGuides[measurementId];
            
            if (guide) {
                // Show image and hide placeholder
                guideImage.src = guide.image;
                guideImage.style.display = 'block';
                defaultGuide.style.display = 'none';
                
                // Update guide text
                currentGuideText.innerHTML = `<strong>${this.name.charAt(0).toUpperCase() + this.name.slice(1)}:</strong> ${guide.instruction}`;
            }
        });
        
        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', function() {
            validateField(this);
            updateValidationSummary();
            updateMeasurementSummary();
        });
        
        // Validate on input change
        input.addEventListener('input', function() {
            validateField(this);
            updateValidationSummary();
            updateMeasurementSummary();
        });
    });
}

// Validate a single field
function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    // Clear previous error
    errorElement.textContent = '';
    field.classList.remove('error', 'valid');
    
    // Check if field is empty
    if (value === '') {
        field.classList.add('error');
        errorElement.textContent = 'This field is required';
        addError(`${field.name} is required`);
        return false;
    }
    
    // Convert to number
    const numValue = parseFloat(value);
    
    // Check if it's a valid number
    if (isNaN(numValue)) {
        field.classList.add('error');
        errorElement.textContent = 'Please enter a valid number';
        addError(`${field.name} must be a valid number`);
        return false;
    }
    
    // Check if within range
    const range = validationRanges[fieldId];
    if (range && (numValue < range.min || numValue > range.max)) {
        field.classList.add('error');
        errorElement.textContent = `Must be between ${range.min} and ${range.max} inches`;
        addError(`${field.name} must be between ${range.min} and ${range.max} inches`);
        return false;
    }
    
    // Field is valid
    field.classList.add('valid');
    removeError(`${field.name} is required`);
    removeError(`${field.name} must be a valid number`);
    removeError(`${field.name} must be between ${range.min} and ${range.max} inches`);
    return true;
}

// Validate name field
function validateName() {
    const nameField = document.getElementById('name');
    const errorElement = document.getElementById('name-error');
    const value = nameField.value.trim();
    
    errorElement.textContent = '';
    nameField.classList.remove('error', 'valid');
    
    if (value === '') {
        nameField.classList.add('error');
        errorElement.textContent = 'Name is required';
        addError('Name is required');
        return false;
    }
    
    if (value.length < 2) {
        nameField.classList.add('error');
        errorElement.textContent = 'Name must be at least 2 characters';
        addError('Name must be at least 2 characters');
        return false;
    }
    
    nameField.classList.add('valid');
    removeError('Name is required');
    removeError('Name must be at least 2 characters');
    return true;
}

// Validate date field
function validateDate() {
    const dateField = document.getElementById('save-date');
    const errorElement = document.getElementById('date-error');
    const value = dateField.value;
    
    errorElement.textContent = '';
    dateField.classList.remove('error', 'valid');
    
    if (value === '') {
        dateField.classList.add('error');
        errorElement.textContent = 'Date is required';
        addError('Date is required');
        return false;
    }
    
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
        dateField.classList.add('error');
        errorElement.textContent = 'Date cannot be in the future';
        addError('Date cannot be in the future');
        return false;
    }
    
    dateField.classList.add('valid');
    removeError('Date is required');
    removeError('Date cannot be in the future');
    return true;
}

// Add error to validationErrors array
function addError(errorMessage) {
    if (!validationErrors.includes(errorMessage)) {
        validationErrors.push(errorMessage);
    }
}

// Remove error from validationErrors array
function removeError(errorMessage) {
    const index = validationErrors.indexOf(errorMessage);
    if (index > -1) {
        validationErrors.splice(index, 1);
    }
}

// Update validation summary UI
function updateValidationSummary() {
    errorList.innerHTML = '';
    
    if (validationErrors.length === 0) {
        validationStatus.innerHTML = '<i class="fas fa-check-circle status-valid"></i><span>No validation errors</span>';
        validationStatus.style.backgroundColor = '#e8f6ef';
    } else {
        validationStatus.innerHTML = `<i class="fas fa-exclamation-circle status-invalid"></i><span>${validationErrors.length} validation error(s)</span>`;
        validationStatus.style.backgroundColor = '#ffeaea';
        
        validationErrors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
    }
}

// Update measurement summary UI
function updateMeasurementSummary() {
    // Only update if there are no validation errors
    if (validationErrors.length > 0) {
        summaryContent.innerHTML = `
            <div class="empty-summary">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Fix validation errors to see summary</p>
                <p class="small">Correct the errors marked in red above</p>
            </div>
        `;
        return;
    }
    
    // Get all measurement values
    const measurements = {};
    const measurementInputs = document.querySelectorAll('input[type="number"]');
    let hasMeasurements = false;
    
    measurementInputs.forEach(input => {
        const value = input.value.trim();
        if (value !== '') {
            measurements[input.name] = value;
            hasMeasurements = true;
        }
    });
    
    // Get name and date
    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('save-date').value;
    
    // If no measurements yet
    if (!hasMeasurements && name === '' && date === '') {
        summaryContent.innerHTML = `
            <div class="empty-summary">
                <i class="fas fa-ruler"></i>
                <p>No measurements saved yet.</p>
                <p class="small">Fill out the form and click "Save Measurements"</p>
            </div>
        `;
        return;
    }
    
    // Build summary HTML
    let summaryHTML = '';
    
    // Add name and date if available
    if (name !== '' || date !== '') {
        summaryHTML += `
            <div class="summary-section">
                <h4>Client Information</h4>
                <div class="summary-item">
                    <span class="summary-label">Name:</span>
                    <span class="summary-value">${name || 'Not provided'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Date:</span>
                    <span class="summary-value">${date || 'Not provided'}</span>
                </div>
            </div>
        `;
    }
    
    // Add measurements if available
    if (hasMeasurements) {
        summaryHTML += `<div class="summary-section"><h4>Measurements (inches)</h4>`;
        
        // Upper body measurements
        const upperBody = ['chest', 'waist', 'shoulder', 'sleeve', 'bicep', 'neck'];
        const lowerBody = ['hips', 'thigh', 'rise', 'knees', 'inseam', 'outseam', 'leg-opening'];
        
        // Check if we have any upper body measurements
        const hasUpperBody = upperBody.some(measurement => measurements[measurement]);
        const hasLowerBody = lowerBody.some(measurement => measurements[measurement]);
        
        if (hasUpperBody) {
            summaryHTML += `<div style="margin-bottom: 10px;"><strong>Upper Body:</strong></div>`;
            upperBody.forEach(measurement => {
                if (measurements[measurement]) {
                    const displayName = measurement.charAt(0).toUpperCase() + measurement.slice(1);
                    summaryHTML += `
                        <div class="summary-item">
                            <span class="summary-label">${displayName}:</span>
                            <span class="summary-value">${measurements[measurement]}"</span>
                        </div>
                    `;
                }
            });
        }
        
        if (hasLowerBody) {
            summaryHTML += `<div style="margin-top: 10px; margin-bottom: 10px;"><strong>Lower Body:</strong></div>`;
            lowerBody.forEach(measurement => {
                if (measurements[measurement]) {
                    const displayName = measurement.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                    summaryHTML += `
                        <div class="summary-item">
                            <span class="summary-label">${displayName}:</span>
                            <span class="summary-value">${measurements[measurement]}"</span>
                        </div>
                    `;
                }
            });
        }
        
        summaryHTML += `</div>`;
    }
    
    summaryContent.innerHTML = summaryHTML;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    validationErrors = [];
    
    // Validate measurement fields
    const measurementInputs = document.querySelectorAll('input[type="number"]');
    measurementInputs.forEach(input => validateField(input));
    
    // Validate name and date
    const isNameValid = validateName();
    const isDateValid = validateDate();
    
    // Update validation summary
    updateValidationSummary();
    
    // Check if form is valid
    if (validationErrors.length === 0) {
        // Form is valid - show success message and update summary
        alert('Measurements saved successfully!');
        updateMeasurementSummary();
        
        // Here you would typically send data to server
        console.log('Form data saved:', {
            name: document.getElementById('name').value,
            date: document.getElementById('save-date').value,
            measurements: getFormData()
        });
        
        // Clear the form after successful submission
        clearForm();
    } else {
        // Form has errors
        alert('Please fix the validation errors before saving.');
    }
}

// Get all form data
function getFormData() {
    const formData = {};
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (input.type !== 'submit' && input.type !== 'reset' && input.type !== 'button') {
            formData[input.name] = input.value;
        }
    });
    
    return formData;
}

// Print summary
function printSummary() {
    const summaryContent = document.getElementById('summary-content').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Measurement Summary</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #2c3e50; }
                    .summary-item { margin-bottom: 8px; }
                    .summary-label { font-weight: bold; }
                    @media print {
                        body { font-size: 12pt; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <h1>Measurement Summary</h1>
                <div>${summaryContent}</div>
                <div class="no-print">
                    <br><br>
                    <button onclick="window.print()">Print</button>
                    <button onclick="window.close()">Close</button>
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
}

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        clearForm();
    }
}

// Initialize the application
function init() {
    // Set today's date
    setTodayDate();
    
    // Setup measurement guides
    setupMeasurementGuides();
    
    // Setup event listeners for name and date validation
    document.getElementById('name').addEventListener('blur', function() {
        validateName();
        updateValidationSummary();
        updateMeasurementSummary();
    });
    
    document.getElementById('name').addEventListener('input', function() {
        validateName();
        updateValidationSummary();
        updateMeasurementSummary();
    });
    
    document.getElementById('save-date').addEventListener('change', function() {
        validateDate();
        updateValidationSummary();
        updateMeasurementSummary();
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Print button
    printButton.addEventListener('click', printSummary);
    
    // View summary button (just focuses on summary)
    viewSummaryButton.addEventListener('click', function() {
        document.getElementById('summary-content').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Reset button
    resetButton.addEventListener('click', resetForm);
    
    // Initial validation and summary update
    updateMeasurementSummary();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
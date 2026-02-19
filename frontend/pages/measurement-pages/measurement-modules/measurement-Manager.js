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
/**
 * measurement-summary-manager.js
 * Handles measurement summary generation, display, and printing
 */

import { ELEMENT_IDS } from './measurement-Constants.js';

export class SummaryManager {
    constructor() {
        this.measurements = new Map();
    }

    /**
     * Add measurement to summary
     * @param {string} id - Measurement ID
     * @param {string} value - Measurement value
     * @param {string} label - Measurement label
     */
    addMeasurement(id, value, label) {
        if (value && value.trim() !== '') {
            this.measurements.set(id, { 
                value, 
                label: label.replace(':', '').trim(),
                timestamp: new Date().toISOString() 
            });
            this.updateSummaryDisplay();
        }
    }

    /**
     * Update the summary display
     */
    updateSummaryDisplay() {
        const summaryContent = document.getElementById(ELEMENT_IDS.summaryContent);
        if (!summaryContent) return;

        if (this.measurements.size === 0) {
            summaryContent.innerHTML = `
                <div class="empty-summary">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No measurements yet</p>
                    <p class="small">Fill out the form and click "Save Measurements"</p>
                </div>
            `;
            return;
        }

        let summaryHTML = '';
        this.measurements.forEach((data, id) => {
            summaryHTML += `
                <div class="summary-item" data-measurement="${id}">
                    <span class="summary-label">${data.label}:</span>
                    <span class="summary-value">${data.value}"</span>
                </div>
            `;
        });

        summaryContent.innerHTML = summaryHTML;
    }

    /**
     * Print the measurement summary
     */
    printSummary() {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
            alert('Popup blocked. Please allow popups for this site to print.');
            return;
        }
        
        const printContent = this.generatePrintContent();
        printWindow.document.write(printContent);
        printWindow.document.close();
    }

    /**
     * Generate print content HTML
     */
    generatePrintContent() {
        const formData = this.collectFormData();
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
                    <title>Measurement Summary - ${formData.name || 'Client'}</title>
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
                        <p><strong>Client Name:</strong> ${formData.name || 'Not provided'}</p>
                        <p><strong>Gender:</strong> ${formData.gender}</p>
                        <p><strong>Date Taken:</strong> ${formData.date || 'Not provided'}</p>
                        ${formData.sizeNumber ? `<p><strong>Size Number:</strong> ${formData.sizeNumber}</p>` : ''}
                        ${formData.cupSize ? `<p><strong>Cup Size:</strong> ${formData.cupSize}</p>` : ''}
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
     * Collect form data for printing
     */
    collectFormData() {
        const form = document.getElementById(ELEMENT_IDS.form);
        if (!form) return {};

        const formData = new FormData(form);
        return {
            name: formData.get('client-name') || '',
            date: formData.get('save-date') || '',
            gender: form.dataset.gender,
            sizeNumber: formData.get('size-number') || '',
            cupSize: formData.get('cupSize') || ''
        };
    }

    /**
     * Clear all measurements
     */
    clear() {
        this.measurements.clear();
        this.updateSummaryDisplay();
    }
}
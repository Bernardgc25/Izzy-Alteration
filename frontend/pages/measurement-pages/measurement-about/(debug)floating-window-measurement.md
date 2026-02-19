**CODE 1 - File: measurements.css**  
[/* measurements-compact.css - Optimized Compact Design */
/* original design */
/* with floating window for measurement guide on mobile/tablet */
.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 15px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    position: relative;
}

h1 {
    text-align: center;
    margin-bottom: 10px;
    padding: 8px 0;
    border-bottom: 2px solid #333;
    color: #333;
    font-size: 1.5rem;
}

h2, h3 {
    margin-bottom: 5px;
    text-align: left;
    color: #2c3e50;
    font-size: 1.1rem;
}

.measurement-container {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 12px;
}

.top, .bottom {
    display: grid;
    gap: 8px;
    margin-bottom: 8px;
}

.top {
    grid-template-columns: 0.8fr 0.8fr 2.4fr;
    gap: 10px;
}

.bottom {
    grid-template-columns: 2fr 1fr 0.8fr;
    gap: 12px;
}

.measurement-container-left,
.measurement-container-middle,
.summary-section-container-left,
.name-date-section-container-middle {
    padding: 10px;
    border-radius: 6px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
}

.name-date-section-container-middle {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group {
    margin-bottom: 4px;
    width: 100%;
    text-align: left;
}

.form-group label {
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-bottom: 2px;
    color: #2c3e50;
    gap: 4px;
    font-size: 0.82rem;
}

.measurement-label {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.label-letter {
    font-weight: 700;
    color: #e74c3c;
    font-size: 0.85rem;
    min-width: 20px;
}

.label-text {
    flex: 1;
    font-size: 0.82rem;
}

/* HIDE EYE ICON ON DESKTOP/LAPTOP */
.measurement-label .fa-eye,
.measurement-label .fa-regular.fa-eye {
    display: none !important;
}

input[type="number"],
input[type="text"],
input[type="date"],
select,
.measurement-input {
    padding: 5px 7px;
    border: 1px solid #ced4da;
    border-radius: 3px;
    font-size: 0.82rem;
    transition: border 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    width: 100%;
    height: 32px;
}

.measurement-input {
    margin-top: 2px;
}

input:focus, select:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.15);
}

::placeholder {
    color: #adb5bd;
    font-size: 0.8rem;
}

.button-section-right {
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: flex-end;
}

.btn-primary, .btn-secondary, .btn-tertiary, .btn-icon {
    padding: 7px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.82rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    height: 36px;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
}

.btn-secondary {
    background-color: #e9ecef;
    color: #495057;
    border: 1px solid #ced4da;
}

.btn-secondary:hover {
    background-color: #dee2e6;
    transform: translateY(-1px);
}

.btn-icon {
    padding: 5px 8px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    width: auto;
    height: auto;
    align-self: flex-start;
}

.btn-icon:hover {
    background-color: #e9ecef;
}

#measurement-guide {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px;
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.guide-image-container {
    height: 75vh;
    background-color: white;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    overflow: hidden;
    flex-shrink: 0;
}

.guide-placeholder {
    text-align: center;
    color: #6c757d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.guide-placeholder i {
    font-size: 2rem;
    margin-bottom: 5px;
    color: #adb5bd;
}

.guide-placeholder p {
    font-size: 0.8rem;
    margin: 0;
}

#guide-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

/* ENHANCED: Compact guide-text for desktop/laptop */
.guide-text {
    font-size: 0.78rem;
    line-height: 1.2;
    min-height: 25%;
    padding: 4px 2px;
}

#current-guide {
    margin-bottom: 6px;
    font-size: 0.8rem;
}

#measure-object,
#measure-definition,
#measure-description {
    display: block;
    margin-bottom: 2px;
}

.measurement-guide-container-right #measure-object{
    color: #e74c3c;
    margin-right: 4px;
    font-size: 0.8rem;
}

#measure-object strong,
#measure-definition strong,
#measure-description strong {
    color: #2c3e50;
    margin-right: 4px;
    font-size: 0.8rem;
}

.summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.summary-header h3 {
    margin: 0;
    font-size: 1rem;
}

#summary-content {
    min-height: 100px;
    font-size: 0.78rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.empty-summary {
    text-align: center;
    color: #6c757d;
    padding: 12px 6px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.empty-summary i {
    font-size: 1.8rem;
    margin-bottom: 6px;
    color: #adb5bd;
}

.empty-summary p {
    margin: 2px 0;
    font-size: 0.8rem;
}

.empty-summary .small {
    font-size: 0.72rem;
    margin-top: 2px;
    color: #868e96;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    border-bottom: 1px dotted #dee2e6;
    font-size: 0.78rem;
}

.summary-label {
    font-weight: 600;
    color: #495057;
}

.summary-value {
    color: #3498db;
    font-weight: 500;
}

.error-message {
    color: #e74c3c;
    font-size: 0.7rem;
    display: block;
    margin-top: 1px;
    min-height: 14px;
}

input.error, select.error, .measurement-input.error {
    border-color: #e74c3c;
    background-color: #fff5f5;
}

input.valid, select.valid, .measurement-input.valid {
    border-color: #2ecc71;
}

footer {
    margin-top: 12px;
    text-align: center;
    padding-top: 8px;
    border-top: 1px solid #e9ecef;
    font-size: 0.7rem;
    color: #6c757d;
}

/* =========================================== */
/* FLOATING GUIDE STYLES - ENHANCED & DEVICE-RESPONSIVE */
/* =========================================== */

.measurement-guide-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
}

/* Base floating guide styles - Desktop default */
.measurement-guide-floating {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    flex-direction: column;
    overflow: hidden;
}

/* Desktop/Laptop specific floating guide (992px and above) */
@media (min-width: 993px) {
    .measurement-guide-floating {
        width: 600px; /* Smaller window for desktop */
        height: 500px; /* Moderate height for desktop */
        max-width: 80%; /* Percentage based on screen */
        max-height: 80vh;
    }
    
    .measurement-guide-floating .floating-guide-images {
        height: 300px; /* Moderate image height for desktop */
        max-height: 60%;
    }
    
    .measurement-guide-floating .floating-guide-text {
        padding: 10px 15px 15px; /* Reduced padding */
        font-size: 0.78rem; /* Same as desktop guide */
        max-height: 40%;
        line-height: 1.2; /* Match desktop line height */
    }
}

/* Tablet (768px - 992px) */
@media (max-width: 992px) and (min-width: 769px) {
    .measurement-guide-floating {
        width: 90%; /* Larger percentage for tablets */
        height: 70vh; /* Taller for tablets */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .measurement-guide-floating .floating-guide-images {
        height: 350px;
        max-height: 60vh;
    }
}

/* Mobile (below 768px) */
@media (max-width: 768px) {
    .measurement-guide-floating {
        width: 95%; /* Almost full width for mobile */
        height: 85vh; /* Very tall for mobile */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .measurement-guide-floating .floating-guide-images {
        height: 400px;
        max-height: 70vh;
    }
}

/* Common floating guide elements */
.measurement-guide-floating .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding: 0;
}

.measurement-guide-floating .close-btn:hover {
    background: #c0392b;
}

.measurement-guide-floating h2 {
    margin-top: 0;
    margin-bottom: 8px; /* Reduced margin */
    padding-right: 40px;
    font-size: 1.2rem; /* Slightly smaller */
    color: #2c3e50;
    padding: 12px 15px 0 15px; /* Adjusted padding */
}

/* Add to the floating guide styles section */
.measurement-guide-floating .floating-guide-images {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
    margin: 0 15px;
    min-height: 200px;
    width: calc(100% - 30px);
}

.measurement-guide-floating .floating-guide-images img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: none;
}

.measurement-guide-floating .floating-guide-images img.active {
    display: block;
}

.measurement-guide-floating .floating-guide-text {
    font-size: 0.78rem; /* Match desktop size */
    line-height: 1.2; /* Match desktop line height */
    overflow-y: auto;
    border-top: 1px solid #e9ecef;
    margin: 8px 15px 0; /* Reduced margin */
    padding: 6px 0; /* Reduced padding */
}

.measurement-guide-floating #current-guide {
    margin-bottom: 4px; /* Reduced margin */
    font-size: 0.8rem;
    color: #2c3e50;
}

/* FIXED: Removed line gaps in floating guide - made compact like desktop */
.measurement-guide-floating #floating-measure-object,
.measurement-guide-floating #floating-measure-definition,
.measurement-guide-floating #floating-measure-description {
    display: block;
    margin-bottom: 2px; /* Reduced from 8px to match desktop */
    color: #495057;
    padding: 1px 0; /* Reduced padding */
    font-size: 0.78rem; /* Match desktop font size */
    line-height: 1.2; /* Match desktop line height */
}

.measurement-guide-floating #floating-measure-object {
    color: #e74c3c; /* Match desktop color */
    margin-bottom: 2px; /* Reduced margin */
}

.measurement-guide-floating #floating-measure-object strong,
.measurement-guide-floating #floating-measure-definition strong,
.measurement-guide-floating #floating-measure-description strong {
    color: #2c3e50;
    margin-right: 4px; /* Match desktop spacing */
    font-size: 0.8rem; /* Match desktop font size */
    font-weight: 600;
}

.measurement-guide-floating .floating-guide-text span {
    display: block;
    margin-bottom: 2px; /* Reduced from 6px to match desktop */
}

/* =========================================== */
/* RESPONSIVE DESIGN FOR DIFFERENT SCREEN SIZES */
/* =========================================== */

/* Large Laptops (1200px - 1440px) */
@media (max-width: 1440px) {
    .container {
        max-width: 1100px;
    }
    
    .top {
        grid-template-columns: 0.9fr 0.9fr 2.2fr;
    }
    
    .guide-image-container {
        height: 70vh;
    }
}

/* Standard Laptops (992px - 1200px) */
@media (max-width: 1200px) {
    .container {
        max-width: 95%;
        padding: 12px;
    }
    
    .top {
        grid-template-columns: 1fr 1fr 2fr;
        gap: 8px;
    }
    
    .bottom {
        grid-template-columns: 2fr 1fr 0.9fr;
        gap: 10px;
    }
    
    .guide-image-container {
        height: 65vh;
    }
    
    .measurement-container-left,
    .measurement-container-middle {
        padding: 8px;
    }
}

/* Tablets (768px - 992px) */
@media (max-width: 992px) {
    .container {
        padding: 10px;
        margin: 15px auto;
    }
    
    h1 {
        font-size: 1.4rem;
        padding: 6px 0;
    }
    
    .top {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 15px;
    }
    
    #measurement-guide {
        display: none;
    }
    
    .guide-image-container {
        height: 50vh;
    }
    
    .bottom {
        grid-template-columns: 1.5fr 1fr;
        grid-template-rows: auto auto;
        gap: 15px;
    }
    
    .button-section-right {
        grid-column: span 2;
        grid-row: 2;
        flex-direction: row;
        gap: 15px;
        margin-top: 10px;
    }
    
    .btn-primary, .btn-secondary {
        width: 50%;
    }
    
    .measurement-label {
        flex-wrap: wrap;
    }
    
    .label-text {
        font-size: 0.8rem;
    }
    
    /* SHOW EYE ICON ON TABLET/MOBILE */
    .measurement-label .fa-eye,
    .measurement-label .fa-regular.fa-eye {
        display: inline-flex !important;
        font-size: 0.75rem;
        color: #3498db;
        cursor: pointer;
        margin-left: 4px;
    }
    
    /* Tablet floating guide adjustments */
    .measurement-guide-floating {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 70vh;
    }
    
    .measurement-guide-floating .floating-guide-images {
        min-height: 280px;
        max-height: 60vh;
    }
    
    .measurement-guide-floating .floating-guide-text {
        padding: 8px 12px 12px; /* Adjusted padding */
        margin: 6px 12px 0; /* Adjusted margin */
        font-size: 0.78rem; /* Match desktop size */
    }
    
    .measurement-guide-floating #floating-measure-object,
    .measurement-guide-floating #floating-measure-definition,
    .measurement-guide-floating #floating-measure-description {
        margin-bottom: 2px; /* Match desktop spacing */
        font-size: 0.78rem; /* Match desktop size */
    }
}

/* Large Mobile (576px - 768px) */
@media (max-width: 768px) {
    .container {
        padding: 8px;
        margin: 10px auto;
        border-radius: 8px;
    }
    
    h1 {
        font-size: 1.3rem;
        margin-bottom: 8px;
    }
    
    .top {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    #measurement-guide {
        display: none;
    }
    
    .guide-image-container {
        height: 40vh;
    }
    
    .bottom {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .button-section-right {
        grid-column: 1;
        grid-row: 3;
        flex-direction: column;
        margin-top: 0;
    }
    
    .btn-primary, .btn-secondary {
        width: 100%;
    }
    
    .summary-section-container-left,
    .name-date-section-container-middle {
        padding: 12px;
    }
    
    .form-group label {
        font-size: 0.85rem;
    }
    
    .label-letter {
        font-size: 0.9rem;
        min-width: 22px;
    }
    
    input[type="number"],
    input[type="text"],
    input[type="date"],
    select,
    .measurement-input {
        font-size: 0.85rem;
        height: 34px;
        padding: 6px 8px;
    }
    
    .btn-primary, .btn-secondary {
        height: 38px;
        font-size: 0.85rem;
    }
    
    /* SHOW EYE ICON ON MOBILE */
    .measurement-label .fa-eye,
    .measurement-label .fa-regular.fa-eye {
        display: inline-flex !important;
        font-size: 0.8rem;
        color: #3498db;
        cursor: pointer;
        margin-left: 4px;
    }
    
    /* Mobile floating guide adjustments */
    .measurement-guide-floating {
        width: 95%;
        height: 85vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .measurement-guide-floating .floating-guide-images {
        min-height: 300px;
        max-height: 65vh;
        margin: 0 10px;
        width: calc(100% - 20px);
    }
    
    .measurement-guide-floating .floating-guide-text {
        padding: 6px 8px 8px; /* Adjusted padding */
        margin: 4px 10px 0; /* Adjusted margin */
        font-size: 0.78rem; /* Match desktop size */
        line-height: 1.2; /* Match desktop line height */
    }
    
    .measurement-guide-floating h2 {
        font-size: 1.2rem;
        padding: 10px 12px 0 12px; /* Adjusted padding */
        margin-bottom: 6px; /* Reduced margin */
    }
    
    .measurement-guide-floating #floating-measure-object,
    .measurement-guide-floating #floating-measure-definition,
    .measurement-guide-floating #floating-measure-description {
        margin-bottom: 2px; /* Match desktop spacing */
        font-size: 0.78rem; /* Match desktop size */
    }
}

/* Small Mobile (480px - 576px) */
@media (max-width: 576px) {
    .container {
        padding: 6px;
        margin: 8px auto;
        box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    
    h1 {
        font-size: 1.2rem;
        padding: 5px 0;
    }
    
    h3 {
        font-size: 1rem;
    }
    
    .top, .bottom {
        gap: 12px;
    }
    
    .measurement-container-left,
    .measurement-container-middle {
        padding: 10px;
    }
    
    .guide-image-container {
        height: 35vh;
    }
    
    .guide-text {
        font-size: 0.85rem;
    }
    
    .form-group {
        margin-bottom: 6px;
    }
    
    .form-group label {
        font-size: 0.88rem;
    }
    
    .label-text {
        font-size: 0.88rem;
    }
    
    .label-letter {
        font-size: 0.95rem;
    }
    
    input[type="number"],
    input[type="text"],
    input[type="date"],
    select,
    .measurement-input {
        font-size: 0.88rem;
        height: 36px;
        padding: 5px 7px;
    }
    
    .btn-primary, .btn-secondary {
        height: 40px;
        font-size: 0.88rem;
    }
    
    .summary-header h3 {
        font-size: 0.95rem;
    }
    
    .summary-item {
        font-size: 0.85rem;
    }
    
    /* SHOW EYE ICON ON SMALL MOBILE */
    .measurement-label .fa-eye,
    .measurement-label .fa-regular.fa-eye {
        display: inline-flex !important;
        font-size: 0.85rem;
        color: #3498db;
        cursor: pointer;
        margin-left: 4px;
    }
    
    /* Small mobile floating guide adjustments */
    .measurement-guide-floating {
        width: 98%;
        height: 90vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
    }
    
    .measurement-guide-floating .floating-guide-images {
        min-height: 320px;
        max-height: 70vh;
    }
    
    .measurement-guide-floating .floating-guide-text {
        padding: 4px 6px 6px; /* Adjusted padding */
        margin: 3px 8px 0; /* Adjusted margin */
        font-size: 0.78rem; /* Match desktop size */
    }
    
    .measurement-guide-floating h2 {
        font-size: 1.1rem;
        padding: 8px 10px 0 10px; /* Adjusted padding */
        margin-bottom: 4px; /* Reduced margin */
    }
    
    .measurement-guide-floating #floating-measure-object,
    .measurement-guide-floating #floating-measure-definition,
    .measurement-guide-floating #floating-measure-description {
        font-size: 0.78rem; /* Match desktop size */
        margin-bottom: 2px; /* Match desktop spacing */
    }
}

/* Extra Small Mobile (below 480px) */
@media (max-width: 480px) {
    .container {
        padding: 5px;
        margin: 5px auto;
    }
    
    h1 {
        font-size: 1.1rem;
        padding: 4px 0;
    }
    
    .measurement-container-left,
    .measurement-container-middle,
    .summary-section-container-left,
    .name-date-section-container-middle {
        padding: 8px;
    }
    
    .guide-image-container {
        height: 30vh;
    }
    
    .form-group label {
        flex-wrap: wrap;
    }
    
    .measurement-label {
        gap: 3px;
    }
    
    .label-text {
        font-size: 0.86rem;
    }
    
    input[type="number"],
    input[type="text"],
    input[type="date"],
    select,
    .measurement-input {
        font-size: 0.86rem;
        height: 34px;
        padding: 5px 7px;
    }
    
    .btn-primary, .btn-secondary {
        padding: 8px 12px;
        height: 38px;
        font-size: 0.86rem;
    }
    
    .button-section-right {
        gap: 8px;
    }
    
    /* SHOW EYE ICON ON EXTRA SMALL MOBILE */
    .measurement-label .fa-eye,
    .measurement-label .fa-regular.fa-eye {
        display: inline-flex !important;
        font-size: 0.9rem;
        color: #3498db;
        cursor: pointer;
        margin-left: 4px;
        flex-shrink: 0;
    }
    
    /* Extra small mobile floating guide adjustments */
    .measurement-guide-floating {
        width: 100%;
        height: 95vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 6px;
    }
    
    .measurement-guide-floating .floating-guide-images {
        min-height: 340px;
        max-height: 75vh;
        margin: 0 5px;
        width: calc(100% - 10px);
    }
    
    .measurement-guide-floating .floating-guide-text {
        padding: 3px 5px 5px; /* Adjusted padding */
        margin: 2px 5px 0; /* Adjusted margin */
        font-size: 0.76rem;
        line-height: 1.2;
    }
    
    .measurement-guide-floating h2 {
        font-size: 1rem;
        padding: 6px 8px 0 8px; /* Adjusted padding */
        margin-bottom: 3px; /* Reduced margin */
    }
    
    .measurement-guide-floating #floating-measure-object,
    .measurement-guide-floating #floating-measure-definition,
    .measurement-guide-floating #floating-measure-description {
        margin-bottom: 2px; /* Match desktop spacing */
        font-size: 0.76rem;
    }
    
    /* Improve touch targets */
    .measurement-input, select, input[type="date"], input[type="text"] {
        min-height: 36px;
    }
}

/* Print Styles */
@media print {
    .container {
        box-shadow: none;
        padding: 0;
        margin: 0;
        max-width: 100%;
    }
    
    .button-section-right,
    .btn-icon,
    .guide-image-container {
        display: none !important;
    }
    
    .top {
        grid-template-columns: 1fr 1fr;
    }
    
    #measurement-guide,
    .measurement-guide-floating,
    .measurement-guide-overlay {
        display: none !important;
    }
    
    .bottom {
        grid-template-columns: 1fr;
    }
    
    input, select {
        border: 1px solid #ccc;
        background: transparent;
    }
    
    /* Hide eye icon in print */
    .measurement-label .fa-eye,
    .measurement-label .fa-regular.fa-eye {
        display: none !important;
    }
} ]

**CODE 2 - File: measurement-DataMaps.js**  
[  <div class="container">
        <!-- tablet and mobile floating measurement guide -->
        <div class="measurement-guide-overlay" id="floating-guide-overlay" style="display: none;"></div>
        <div class="measurement-guide-floating" id="floating-measurement-guide">
            <h2>Measurement Guide</h2>
            <button id="close-floating-guide" class="close-btn">&times;</button>
            
            <div class="floating-guide-images">
                <!-- Images will be dynamically inserted here -->
            </div>
            
            <div class="floating-guide-text">
                <div id="current-guide">Current Measurement:</div>
                <span id="floating-measure-object"></span>
                <span id="floating-measure-definition"></span>
                <span id="floating-measure-description"></span>
            </div>
        </div>
        
        <h1 id="measurement-info"><i class="fa-solid fa-circle-info"></i></i> Measurement Information (female)</h1>
        
        <form id="measurement-form" class="measurement-form" data-gender="female" action="#" method="post">
            <div class="measurement-container">
                <div class="top">
                    <div class="measurement-container-left">
                        <div class="form-group">
                            <label for="neck" class="measurement-label">
                                <span class="label-letter">A.</span>
                                <span class="label-text">Neck circumference:</span>
                                <span class="error-message" id="neck-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="neck" name="neck" class="measurement-input"
                                data-measurement="neck" data-min="20" data-max="80" step="0.5" 
                                placeholder="inches (20-80)">
                                
                        </div>

                        <div class="form-group">
                            <label for="shoulder-length" class="measurement-label">
                                <span class="label-letter">B.</span>
                                <span class="label-text">Shoulder length:</span>
                                <span class="error-message" id="shoulder-length-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="shoulder-length" name="shoulder-length" class="measurement-input"
                                data-measurement="shoulder-length" data-min="10" data-max="30" step="0.5" 
                                placeholder="inches (10-30)">
                        </div>

                        <div class="form-group">
                            <label for="arm-length" class="measurement-label">
                                <span class="label-letter">C.</span>
                                <span class="label-text">Arm length:</span>
                                <span class="error-message" id="arm-length-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="arm-length" name="arm-length" class="measurement-input"
                                data-measurement="arm-length" data-min="15" data-max="50" step="0.5" 
                                placeholder="inches (15-50)">
                        </div>

                        <div class="form-group">
                            <label for="chest-circumference" class="measurement-label">
                                <span class="label-letter">D.</span>
                                <span class="label-text">Chest circumference:</span>
                                <span class="error-message" id="chest-circumference-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="chest-circumference" name="chest-circumference" class="measurement-input"
                                data-measurement="chest-circumference" data-min="10" data-max="30" step="0.5" 
                                placeholder="inches (10-30)">
                        </div>
                        
                        <div class="form-group">
                            <label for="under-bust" class="measurement-label">
                                <span class="label-letter">E.</span>
                                <span class="label-text">Under bust:</span>
                                <span class="error-message" id="under-bust-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="under-bust" name="under-bust" class="measurement-input"
                                data-measurement="under-bust" data-min="60" data-max="150" step="0.5" 
                                placeholder="inches (60-150)">
                        </div>
                        
                        <div class="form-group">
                            <label for="waist" class="measurement-label">
                                <span class="label-letter">F.</span>
                                <span class="label-text">Waist circumference:</span>
                                <span class="error-message" id="waist-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="waist" name="waist" class="measurement-input"
                                data-measurement="waist" data-min="50" data-max="130" step="0.5" 
                                placeholder="inches (50-130)">
                        </div>

                        <div class="form-group">
                            <label for="hip-bone-circumference" class="measurement-label">
                                <span class="label-letter">G.</span>
                                <span class="label-text">Hip bone circumference:</span>
                                <span class="error-message" id="hip-bone-circumference-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="hip-bone-circumference" name="hip-bone-circumference" class="measurement-input"
                                data-measurement="hip-bone-circumference" data-min="60" data-max="150" step="0.5" 
                                placeholder="inches (60-150)">
                        </div>
                    
                        <div class="form-group">
                            <label for="hip-circumference" class="measurement-label">
                                <span class="label-letter">H.</span>
                                <span class="label-text">Hip circumference:</span>
                                <span class="error-message" id="hip-circumference-error"></span>
                                 <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="hip-circumference" name="hip-circumference" class="measurement-input"
                                data-measurement="hip-circumference" data-min="20" data-max="50" step="0.5" 
                                placeholder="inches (20-50)">
                        </div>
                        
                        <div class="form-group">
                            <label for="thigh" class="measurement-label">
                                <span class="label-letter">I.</span>
                                <span class="label-text">Thigh:</span>
                                <span class="error-message" id="thigh-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="thigh" name="thigh" class="measurement-input"
                                data-measurement="thigh" data-min="15" data-max="50" step="0.5" 
                                placeholder="inches (15-50)">
                        </div>

                        <div class="form-group">
                            <label for="knee" class="measurement-label">
                                <span class="label-letter">J.</span>
                                <span class="label-text">Knee:</span>
                                <span class="error-message" id="knee-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="knee" name="knee" class="measurement-input"
                                data-measurement="knee" data-min="10" data-max="30" step="0.5" 
                                placeholder="inches (10-30)">
                        </div>
                    </div>

                    <div class="measurement-container-middle">
                        <div class="form-group">
                            <label for="calf" class="measurement-label">
                                <span class="label-letter">K.</span>
                                <span class="label-text">Calf:</span>
                                <span class="error-message" id="calf-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="calf" name="calf" class="measurement-input"
                                data-measurement="calf" data-min="8" data-max="25" step="0.5" 
                                placeholder="inches (8-25)">
                        </div>

                        <div class="form-group">
                            <label for="ankle" class="measurement-label">
                                <span class="label-letter">L.</span>
                                <span class="label-text">Ankle:</span>
                                <span class="error-message" id="ankle-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="ankle" name="ankle" class="measurement-input"
                                data-measurement="ankle" data-min="5" data-max="15" step="0.5" 
                                placeholder="inches (5-15)">
                        </div>

                        <div class="form-group">
                            <label for="bicep" class="measurement-label">
                                <span class="label-letter">M.</span>
                                <span class="label-text">Bicep:</span>
                                <span class="error-message" id="bicep-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="bicep" name="bicep" class="measurement-input"
                                data-measurement="bicep" data-min="8" data-max="25" step="0.5" 
                                placeholder="inches (8-25)">
                        </div>

                        <div class="form-group">
                            <label for="elbow" class="measurement-label">
                                <span class="label-letter">N.</span>
                                <span class="label-text">Elbow:</span>
                                <span class="error-message" id="elbow-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="elbow" name="elbow" class="measurement-input"
                                data-measurement="elbow" data-min="6" data-max="15" step="0.5" 
                                placeholder="inches (6-15)">
                        </div>

                        <div class="form-group">
                            <label for="wrist" class="measurement-label">
                                <span class="label-letter">O.</span>
                                <span class="label-text">Wrist:</span>
                                <span class="error-message" id="wrist-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="wrist" name="wrist" class="measurement-input"
                                data-measurement="wrist" data-min="4" data-max="12" step="0.5" 
                                placeholder="inches (4-12)">
                        </div>

                        <div class="form-group">
                            <label for="inseam-ankle" class="measurement-label">
                                <span class="label-letter">P.</span>
                                <span class="label-text">Inseam to ankle:</span>
                                <span class="error-message" id="inseam-ankle-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="inseam-ankle" name="inseam-ankle" class="measurement-input"
                                data-measurement="inseam-ankle" data-min="20" data-max="50" step="0.5" 
                                placeholder="inches (20-50)">
                        </div>

                        <div class="form-group">
                            <label for="inseam-floor" class="measurement-label">
                                <span class="label-letter">Q.</span>
                                <span class="label-text">Inseam to floor:</span>
                                <span class="error-message" id="inseam-floor-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="inseam-floor" name="inseam-floor" class="measurement-input"
                                data-measurement="inseam-floor" data-min="25" data-max="60" step="0.5" 
                                placeholder="inches (25-60)">
                        </div>

                        <div class="form-group">
                            <label for="neck-waist" class="measurement-label">
                                <span class="label-letter">R.</span>
                                <span class="label-text">Neck to waist:</span>
                                <span class="error-message" id="neck-waist-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="neck-waist" name="neck-waist" class="measurement-input"
                                data-measurement="neck-waist" data-min="10" data-max="40" step="0.5" 
                                placeholder="inches (10-40)">
                        </div>

                        <div class="form-group">
                            <label for="neck-floor" class="measurement-label">
                                <span class="label-letter">S.</span>
                                <span class="label-text">Neck to floor:</span>
                                <span class="error-message" id="neck-floor-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="neck-floor" name="neck-floor" class="measurement-input"
                                data-measurement="neck-floor" data-min="40" data-max="100" step="0.5" 
                                placeholder="inches (40-100)">
                        </div>

                        <div class="form-group">
                            <label for="waist-floor" class="measurement-label">
                                <span class="label-letter">T.</span>
                                <span class="label-text">Waist to floor:</span>
                                <span class="error-message" id="waist-floor-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="waist-floor" name="waist-floor" class="measurement-input"
                                data-measurement="waist-floor" data-min="30" data-max="70" step="0.5" 
                                placeholder="inches (30-70)">
                        </div>

                        <div class="form-group">
                            <label for="height" class="measurement-label">
                                <span class="label-letter">U.</span>
                                <span class="label-text">Height:</span>
                                <span class="error-message" id="height-error"></span>
                                <i class="fa-regular fa-eye"></i>
                            </label>
                            <input type="number" id="height" name="height" class="measurement-input"
                                data-measurement="height" data-min="48" data-max="96" step="0.5" 
                                placeholder="inches (48-96)">
                        </div>
                    </div>

                    <div class="measurement-guide-container-right" id="measurement-guide">
                        <h3><i class="fas fa-ruler"></i></i> Measurement Guide</h3>
                        <div class="guide-image-container">
                            <div class="guide-placeholder" id="default-guide">
                                <i class="fas fa-mouse-pointer"></i>
                                <p>Select a measurement field to see guidance</p>
                            </div>
                            <img id="guide-image" src="" alt="Measurement Guide" style="display: none;">
                        </div>
                        <div class="guide-text">
                            <!-- <p id="current-guide"><strong>How to use:</strong> Click on any measurement field to see detailed instructions and visual guidance.</p> -->
                            <span id="measure-object"></span>
                            <span id="measure-definition"></span>
                            <span id="measure-description"></span>
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    <div class="summary-section-container-left">
                        <div class="summary-header">
                            <h3><i class="fas fa-clipboard-list"></i> Measurement Summary</h3>
                            <button type="button" id="print-summary" class="btn-icon" title="Print Summary">
                                <i class="fas fa-print"></i>
                            </button>
                        </div>
                        <div id="summary-content">
                            <div class="empty-summary">
                               
                                <p class="small">Fill out the form and click "Save Measurements"</p>
                        </div>
                    </div>
                </div>

                    <div class="name-date-section-container-middle">
                        <div class="form-group">
                            
                            <label for="client-name">Name: 
                                <span class="error-message" id="client-name-error"></span>
                            </label>
                            <input type="text" id="client-name" name="client-name" placeholder="Enter full name" maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="cupSize">Cup Size: <span class="error-message" id="cupSize-error"></span></label>
                            <select id="cupSize" name="cupSize" class="gender-specific">
                                <option value="">select</option>
                                <option value="aa">AA</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                                <option value="d">D</option>
                                <option value="dd">DD/E</option>
                                <option value="ddd">DDD/F</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="save-date">Date: <span class="error-message" id="date-error"></span></label>
                            <input type="date" id="save-date" name="save-date">
                        </div>
                    </div>
                    
                    <div class="button-section-right">
                        <button type="button" id="submit-button" class="btn-primary" onclick="handleSaveMeasurements()">
                            <i class="fas fa-save"></i> Save Measurements
                        </button>
                        <button type="button" id="reset-button" class="btn-secondary" onclick="handleResetForm()">
                            <i class="fas fa-redo"></i> Reset Form
                        </button>
                    </div>
                </div>
            </div>
        </form>

        <footer>
            <p class="footer-note">Measurement System v1.0 | All measurements in inches</p>
        </footer>       
    </div> ]

**CODE 3 - File: measurement-Validation.js**  
[/**
 * measurement-Validation.js
 * Handles all form validation logic with comprehensive error checking
 * Uses data attributes from HTML for dynamic validation rules
 * REFACTORED: Improved code structure and readability
 */

export class MeasurementValidator {
    constructor(formElement) {
        this.form = formElement;
        this.gender = formElement.dataset.gender;
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
                // message: 'Name is required'
                message: ' '

            },
            'save-date': {
                required: true,
                //message: 'Date is required'
                message: ' '
            }
        };

        // Add gender-specific required fields
        if (this.gender === 'male') {
            this.rules['size-number'] = {
                required: true,
                //message: 'Size number is required'
                message: ' '
            };
        } else {
            this.rules['cupSize'] = {
                required: true,
                //message: 'Cup size is required'
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
        const value = parseFloat(input.value);
        const min = parseFloat(input.dataset.min);
        const max = parseFloat(input.dataset.max);
        const measurementId = input.id;
        const errorElement = document.getElementById(`${measurementId}-error`);

        // Clear previous error state
        this.clearInputErrorState(input, errorElement);

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

        // Mark as valid
        this.markInputAsValid(input);
        return true;
    }

    /**
     * Validates a single field on the fly
     * @param {string} fieldId - Field ID to validate
     * @returns {boolean} True if valid
     */
    validateField(fieldId) {
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

        // Handle different input types
        if (input.classList.contains('measurement-input')) {
            return this.validateMeasurementInput(input);
        }

        // Mark valid fields
        input.classList.add('valid');
        return true;
    }

    /**
     * Adds error to field
     * @param {string} fieldId - The ID of the field with error
     * @param {string} message - Error message to display
     */
    addFieldError(fieldId, message) {
        this.errors.add(fieldId);
        
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
            inputElement.classList.remove('valid');
            
            // Handle select wrapper styling
            if (inputElement.tagName === 'SELECT' && inputElement.parentElement) {
                inputElement.parentElement.classList.add('error');
            }
        }
    }

    /**
     * Clears error for a single field
     * @param {string} fieldId - Field ID to clear error for
     */
    clearSingleError(fieldId) {
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
        
        // Clear error messages
        this.form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Clear error classes
        this.form.querySelectorAll('input, select').forEach(input => {
            input.classList.remove('error', 'valid');
            if (input.parentElement) {
                input.parentElement.classList.remove('error');
            }
        });
    }

    /**
     * Clear input error state
     * @param {HTMLInputElement} input - Input element
     * @param {HTMLElement} errorElement - Error message element
     */
    clearInputErrorState(input, errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.classList.remove('error', 'valid');
    }

    /**
     * Mark input as valid
     * @param {HTMLInputElement} input - Input element
     */
    markInputAsValid(input) {
        input.classList.add('valid');
        input.classList.remove('error');
        
        // Ensure error message is cleared
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Remove from errors set
        this.errors.delete(input.id);
    }
}]

**CODE 4 - File: measurement-Manager.js**
[/**
 * measurement-Manager.js
 * Manages measurement data, state, and operations
 * Handles image interactions, summary updates, and data management
 * REFACTORED: Improved organization and separation of concerns
 */

import { measurementDataMap, getMeasurement } from './measurement-DataMaps.js';

export class MeasurementManager {
    constructor() {
        this.measurements = new Map();
        this.gender = null;
        this.isMobileView = false;
        this.config = {
            defaultZoom: 1.0,
            minZoom: 0.5,
            maxZoom: 3.0
        };
        this.zoomState = {
            scale: this.config.defaultZoom,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
    }

    /**
     * Initializes the manager
     * @param {string} gender - 'male' or 'female'
     * @param {boolean} isMobileView - Whether current view is mobile/tablet
     * @returns {MeasurementManager} this
     */
    initialize(gender, isMobileView) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        
        this.setupGuideImages();
        this.setupDateField();
        this.setupEventListeners();
        
        return this;
    }

    /**
     * Setup guide images based on view type
     */
    setupGuideImages() {
        if (!this.isMobileView) {
            this.setupDesktopGuideImage();
        }
    }

    /**
     * Sets up the desktop measurement guide image
     */
    setupDesktopGuideImage() {
        const guideImage = document.getElementById('guide-image');
        const defaultGuide = document.getElementById('default-guide');
        
        if (!guideImage || !defaultGuide) return;
        
        const imageData = measurementDataMap.gender[this.gender];
        if (imageData && imageData.imageDesktop) {
            guideImage.src = imageData.imageDesktop;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
            this.setupImageInteractions(guideImage);
        }
    }

    /**
     * Setup image interactions (zoom/pan)
     * @param {HTMLImageElement} image - Guide image element
     */
    setupImageInteractions(image) {
        const container = image.parentElement;
        if (!container) return;

        // Setup zoom and pan events
        this.setupZoomEvents(container, image);
        this.setupPanEvents(container, image);
        
        // Setup reset on input focus
        this.setupZoomResetOnFocus(image);
    }

    /**
     * Setup zoom events
     */
    setupZoomEvents(container, image) {
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.handleZoom(e, image);
        });
    }

    /**
     * Setup pan events
     */
    setupPanEvents(container, image) {
        container.addEventListener('mousedown', (e) => {
            this.startPan(e);
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.zoomState.isDragging) return;
            this.updatePanPosition(e);
            this.updateImageTransform(image);
        });

        container.addEventListener('mouseup', () => {
            this.stopPan();
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseleave', () => {
            this.stopPan();
            container.style.cursor = 'default';
        });
    }

    /**
     * Setup zoom reset when inputs are focused
     */
    setupZoomResetOnFocus(image) {
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('focus', () => {
                this.resetZoom(image);
            });
        });
    }

    /**
     * Handle zoom event
     */
    handleZoom(event, image) {
        const rect = image.parentElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        
        this.applyZoom(delta, x, y, image);
    }

    /**
     * Apply zoom transformation
     */
    applyZoom(delta, originX, originY, image) {
        const newScale = Math.max(
            this.config.minZoom,
            Math.min(this.config.maxZoom, this.zoomState.scale + delta)
        );
        
        const scaleChange = newScale - this.zoomState.scale;
        this.zoomState.x -= originX * scaleChange;
        this.zoomState.y -= originY * scaleChange;
        this.zoomState.scale = newScale;
        
        this.updateImageTransform(image);
    }

    /**
     * Start panning
     */
    startPan(event) {
        this.zoomState.isDragging = true;
        this.zoomState.startX = event.clientX - this.zoomState.x;
        this.zoomState.startY = event.clientY - this.zoomState.y;
    }

    /**
     * Update pan position
     */
    updatePanPosition(event) {
        this.zoomState.x = event.clientX - this.zoomState.startX;
        this.zoomState.y = event.clientY - this.zoomState.startY;
    }

    /**
     * Stop panning
     */
    stopPan() {
        this.zoomState.isDragging = false;
    }

    /**
     * Update image transform
     */
    updateImageTransform(image) {
        image.style.transform = `
            translate(${this.zoomState.x}px, ${this.zoomState.y}px) 
            scale(${this.zoomState.scale})
        `;
        image.style.transformOrigin = '0 0';
    }

    /**
     * Reset zoom and pan
     */
    resetZoom(image) {
        this.zoomState.scale = this.config.defaultZoom;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
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
     * Sets up global event listeners
     */
    setupEventListeners() {
        // Removed auto-fill listeners - this was causing the auto-population issue
        this.setupPrintButton();
    }

    /**
     * Setup print button listener
     */
    setupPrintButton() {
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printSummary());
        }
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
     * Prints the measurement summary
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
        const formData = this.getFormData();
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
                        <p><strong>Gender:</strong> ${this.gender}</p>
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
     * Collects all form data
     * @returns {Object} Form data object
     */
    getFormData() {
        const formData = {
            name: document.getElementById('client-name')?.value || '',
            date: document.getElementById('save-date')?.value || '',
            gender: this.gender,
            measurements: Object.fromEntries(this.measurements)
        };

        // Add gender-specific data
        if (this.gender === 'male') {
            formData.sizeNumber = document.getElementById('size-number')?.value || '';
        } else {
            formData.cupSize = document.getElementById('cupSize')?.value || '';
        }

        return formData;
    }

    /**
     * Resets all form fields and data
     */
    resetAll() {
        // Clear form
        const form = document.getElementById('measurement-form');
        if (form) form.reset();
        
        // Clear measurements
        this.measurements.clear();
        
        // Reset date
        this.setupDateField();
        
        // Reset zoom if desktop
        if (!this.isMobileView) {
            const guideImage = document.getElementById('guide-image');
            if (guideImage) {
                this.resetZoom(guideImage);
            }
        }
    }
}]

**CODE 5 - File: measurement-Main.js**
[/**
 * measurement-Main.js
 * Entry point - coordinates all modules and handles user interactions
 * Only this file should be linked in HTML files
 * REFACTORED: Better separation of concerns and event handling
 */

import { measurementDataMap, getMeasurement } from './measurement-DataMaps.js';
import { MeasurementValidator } from './measurement-Validation.js';
import { MeasurementManager } from './measurement-Manager.js';

// Global app instance
let measurementApp = null;

class MeasurementApp {
    constructor() {
        this.manager = null;
        this.validator = null;
        this.isMobileView = this.checkMobileView();
        this.debounceTimers = new Map();
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        this.setupApp();
        this.bindEventListeners();
        this.logInitialization();
    }

    /**
     * Setup application components
     */
    setupApp() {
        const form = document.getElementById('measurement-form');
        if (!form) {
            console.error('Measurement form not found');
            return;
        }

        const gender = form.dataset.gender;
        
        // Initialize manager and validator
        this.manager = new MeasurementManager().initialize(gender, this.isMobileView);
        this.validator = new MeasurementValidator(form);
        
        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Check if current view is mobile
     */
    checkMobileView() {
        return window.innerWidth <= 992; // Tablet breakpoint
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        this.setupGenderFieldListeners();
        this.setupMeasurementInputListeners();
        this.setupClientNameValidation();
        this.setupFloatingGuideListeners();
        this.setupWindowResizeListener();
    }

    /**
     * Setup gender-specific field listeners
     */
    setupGenderFieldListeners() {
        if (this.manager.gender === 'male') {
            this.setupFieldListener('size-number');
        } else {
            this.setupFieldListener('cupSize');
        }
    }

    /**
     * Setup field change listener
     */
    setupFieldListener(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', () => {
                this.validator.validateField(fieldId);
            });
        }
    }

    /**
     * Setup measurement input listeners
     */
    setupMeasurementInputListeners() {
        const inputs = document.querySelectorAll('.measurement-input');
        
        inputs.forEach(input => {
            this.setupInputEvents(input);
        });
        
        this.setupEyeIconListeners();
    }

    /**
     * Setup input event listeners
     */
    setupInputEvents(input) {
        // Debounced input event
        input.addEventListener('input', (e) => {
            this.debouncedInputHandler(e);
        });
        
        // Focus event for showing guide
        input.addEventListener('focus', (e) => {
            this.handleInputFocus(e);
        });
        
        // Blur event for validation
        input.addEventListener('blur', (e) => {
            this.handleInputBlur(e);
        });
    }

    /**
     * Debounced input handler
     */
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

    /**
     * Handle input focus
     */
    handleInputFocus(event) {
        const input = event.target;
        this.showMeasurementGuide(input.dataset.measurement);
        this.validator.clearSingleError(input.id);
    }

    /**
     * Handle input blur
     */
    handleInputBlur(event) {
        this.validator.validateField(event.target.id);
    }

    /**
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners() {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleEyeIconClick(e);
            });
        });
    }

    /**
     * Handle eye icon click
     */
    handleEyeIconClick(event) {
        event.stopPropagation();
        
        const labelElement = event.target.closest('.measurement-label');
        if (!labelElement) return;
        
        const formGroup = labelElement.closest('.form-group');
        if (!formGroup) return;
        
        const inputElement = formGroup.querySelector('.measurement-input');
        if (!inputElement) return;
        
        const measurementKey = inputElement.dataset.measurement;
        if (measurementKey && this.isMobileView) {
            this.showFloatingGuide(measurementKey);
        }
    }

    /**
     * Setup client name validation
     */
    setupClientNameValidation() {
        const nameField = document.getElementById('client-name');
        if (!nameField) return;

        // Debounced input validation
        nameField.addEventListener('input', (e) => {
            this.debouncedValidation('client-name');
        });
        
        // Validate on blur
        nameField.addEventListener('blur', () => {
            this.validator.validateField('client-name');
        });
    }

    /**
     * Debounced field validation
     */
    debouncedValidation(fieldId) {
        clearTimeout(this.debounceTimers.get(fieldId));
        
        const timer = setTimeout(() => {
            this.validator.validateField(fieldId);
        }, 150);
        
        this.debounceTimers.set(fieldId, timer);
    }

    /**
     * Setup floating guide listeners
     */
    setupFloatingGuideListeners() {
        this.setupGuideCloseListeners();
        this.setupEscapeKeyListener();
    }

    /**
     * Setup guide close listeners
     */
    setupGuideCloseListeners() {
        const closeBtn = document.getElementById('close-floating-guide');
        const overlay = document.getElementById('floating-guide-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideFloatingGuide());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.hideFloatingGuide());
        }
    }

    /**
     * Setup escape key listener
     */
    setupEscapeKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideFloatingGuide();
            }
        });
    }

    /**
     * Setup window resize listener
     */
    setupWindowResizeListener() {
        window.addEventListener('resize', () => {
            this.isMobileView = this.checkMobileView();
        });
    }

    /**
     * Bind event listeners for window functions
     */
    bindEventListeners() {
        window.handleSaveMeasurements = () => this.handleSaveMeasurements();
        window.handleResetForm = () => this.handleResetForm();
    }

    /**
     * Display measurement guide
     */
    showMeasurementGuide(measurementKey) {
        const measurement = getMeasurement(this.manager.gender, measurementKey);
        if (!measurement) return;

        // Update guide text
        this.updateGuideText(measurement);
        
        // Update desktop guide image if needed
        if (!this.isMobileView && this.manager) {
            this.manager.updateDesktopGuideImage?.(measurementKey);
        }
    }

    /**
     * Update guide text elements for both desktop and mobile
     */
    updateGuideText(measurement) {
        const elements = {
            'measure-object': measurement.object,
            'measure-definition': measurement.definition,
            'measure-description': measurement.description,
            // ADD THESE FOR FLOATING GUIDE
            'floating-measure-object': measurement.object,
            'floating-measure-definition': measurement.definition,
            'floating-measure-description': measurement.description
        };

        Object.entries(elements).forEach(([id, content]) => {
            const element = document.getElementById(id);
            if (element) {
                const label = id.includes('object') ? 'Object' : 
                            id.includes('definition') ? 'Definition' : 'Description';
                element.innerHTML = `<strong>${label}:</strong> ${content}`;
            }
        });
    }

    /**
     * Show floating guide for mobile
     */
    showFloatingGuide(measurementKey) {
        const measurement = getMeasurement(this.manager.gender, measurementKey);
        if (!measurement) return;
        
        // Update guide text
        this.showMeasurementGuide(measurementKey);
        
        // Show overlay and guide
        this.showFloatingGuideElements();
        
        // Update mobile guide image
        this.updateMobileGuideImage(measurementKey);
    }

    /**
     * Show floating guide elements
     */
    showFloatingGuideElements() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'block';
        if (floatingGuide) floatingGuide.style.display = 'flex';
    }

    /**
     * Hide floating guide
     */
    hideFloatingGuide() {
        const overlay = document.getElementById('floating-guide-overlay');
        const floatingGuide = document.getElementById('floating-measurement-guide');
        
        if (overlay) overlay.style.display = 'none';
        if (floatingGuide) floatingGuide.style.display = 'none';
    }

    /**
     * Update mobile guide image
     */
    updateMobileGuideImage(measurementKey) {
        const measurement = getMeasurement(this.manager.gender, measurementKey);
        if (!measurement || !measurement.imageMobile) return;
        
        const floatingGuideImages = document.querySelector('.measurement-guide-floating .floating-guide-images');
        if (!floatingGuideImages) return;
        
        // Clear existing images
        floatingGuideImages.innerHTML = '';
        
        // Create and add the new image
        const img = document.createElement('img');
        img.src = measurement.imageMobile;
        img.alt = measurement.object || 'Measurement Guide';
        img.className = 'active';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        
        floatingGuideImages.appendChild(img);
    }

    /**
     * Show floating guide for mobile
     */
    showFloatingGuide(measurementKey) {
        const measurement = getMeasurement(this.manager.gender, measurementKey);
        if (!measurement) return;
        
        // Update guide text
        this.showMeasurementGuide(measurementKey);
        
        // Update mobile guide image BEFORE showing
        this.updateMobileGuideImage(measurementKey);
        
        // Show overlay and guide
        this.showFloatingGuideElements();
    }

    /**
     * Handle save measurements
     */
    handleSaveMeasurements() {
        if (!this.validator.validateAll()) {
            this.showValidationError();
            return;
        }

        const formData = this.manager.getFormData();
        this.showSuccessMessage(formData);
        
        // Log data (in production, send to server)
        console.log('Measurement data:', JSON.stringify(formData, null, 2));
    }

    /**
     * Show validation error
     */
    showValidationError() {
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
    }

    /**
     * Show success message
     */
    showSuccessMessage(formData) {
        const message = `
            Measurements saved successfully!
            
            Client: ${formData.name}
            Date: ${formData.date}
            Total Measurements: ${Object.keys(formData.measurements).length}
        `;
        
        alert(message);
    }

    /**
     * Handle reset form
     */
    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            this.manager.resetAll();
            this.validator.clearErrors();
            this.hideFloatingGuide();
        }
    }

    /**
     * Log initialization message
     */
    logInitialization() {
        console.log(`Measurement App initialized for ${this.manager.gender} (${this.isMobileView ? 'Mobile/Tablet' : 'Desktop'} view)`);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    measurementApp = new MeasurementApp();
});]


**ERROR/ISSUE:**
[]

**REQUEST:**

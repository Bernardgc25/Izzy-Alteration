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
}]

**CODE 2 - File: measurement-DataMaps.js**  
[ // measurement-DataMaps.js

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
}; ]

**CODE 3 - File: measurement-Validator.js**  
[/**
 * Measurement Validator - Handles form validation logic
 * Separated from UI concerns for better testability
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
                message: ' '
            },
            'save-date': {
                required: true,
                message: ' '
            }
        };

        // Add gender-specific required fields
        if (this.gender === 'male') {
            this.rules['size-number'] = {
                required: true,
                message: ' '
            };
        } else {
            this.rules['cupSize'] = {
                required: true,
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

        // Handle measurement inputs
        if (input.classList.contains('measurement-input')) {
            return this.validateMeasurementInput(input);
        }

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
        });
    }

    /**
     * Get first error field for focus
     * @returns {HTMLElement|null} First error element
     */
    getFirstErrorField() {
        const firstError = this.form.querySelector('.error');
        return firstError;
    }
}]

**CODE 4 - File: measurement-Manager.js**
[/**
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
}]

**CODE 5 - File: measurement-ViewHandler.js**
[/**
 * View Handler - Manages all UI interactions and display logic
 * Separated from business logic for better maintainability
 */
import { getMeasurement } from './measurement-DataMaps.js';

export class ViewHandler {
    constructor(gender, isMobileView) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        this.debounceTimers = new Map();
        this.zoomState = {
            scale: 1.0,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
        this.init();
    }

    /**
     * Initialize view handler
     */
    init() {
        this.setupGuideImages();
        this.setupImageInteractions();
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
        
        // Get the appropriate gender image from measurementDataMap
        // You need to import getGenderImage from DataMaps or similar
        const genderImage = this.getGenderImage();
        
        if (genderImage) {
            guideImage.src = genderImage;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
        } else {
            // If no gender image found, show default placeholder
            guideImage.style.display = 'none';
            defaultGuide.style.display = 'flex';
        }
    }

    /**
     * Get the appropriate gender image for desktop view
     * @returns {string} Image URL for the gender
     */
    getGenderImage() {
        // This should reference your data map or configuration
        // Based on CODE 2, the images are in measurementDataMap.gender
        const genderImages = {
            male: "/src/images/male-desktop.png",
            female: "/src/images/female-desktop.png"
        };
        
        return genderImages[this.gender] || null;
    }

    /**
     * Setup image interactions (zoom/pan)
     */
    setupImageInteractions() {
        const image = document.getElementById('guide-image');
        const container = image?.parentElement;
        if (!image || !container) return;

        this.setupZoomEvents(container, image);
        this.setupPanEvents(container, image);
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
        const newScale = Math.max(0.5, Math.min(3.0, this.zoomState.scale + delta));
        
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
        this.zoomState.scale = 1.0;
        this.zoomState.x = 0;
        this.zoomState.y = 0;
        this.updateImageTransform(image);
    }

    /**
     * Display measurement guide
     */
    showMeasurementGuide(measurementKey) {
        const measurement = getMeasurement(this.gender, measurementKey);
        if (!measurement) return;

        this.updateGuideText(measurement);
    }

    /**
     * Update guide text elements for both desktop and mobile
     */
    updateGuideText(measurement) {
        const elements = {
            'measure-object': measurement.object,
            'measure-definition': measurement.definition,
            'measure-description': measurement.description,
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
        const measurement = getMeasurement(this.gender, measurementKey);
        if (!measurement) return;
        
        this.updateGuideText(measurement);
        this.updateMobileGuideImage(measurementKey);
        this.showFloatingGuideElements();
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
        const measurement = getMeasurement(this.gender, measurementKey);
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
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners(callback) {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const labelElement = e.target.closest('.measurement-label');
                if (!labelElement) return;
                
                const formGroup = labelElement.closest('.form-group');
                if (!formGroup) return;
                
                const inputElement = formGroup.querySelector('.measurement-input');
                if (!inputElement) return;
                
                const measurementKey = inputElement.dataset.measurement;
                if (measurementKey && this.isMobileView) {
                    callback(measurementKey);
                }
            });
        });
    }

    /**
     * Setup window resize listener
     * @param {Function} callback - Callback when view changes
     */
    setupWindowResizeListener(callback) {
        window.addEventListener('resize', () => {
            const newIsMobileView = window.innerWidth <= 992;
            if (newIsMobileView !== this.isMobileView) {
                this.isMobileView = newIsMobileView;
                if (callback) callback(newIsMobileView);
            }
        });
    }

    /**
     * Setup escape key listener for closing guides
     * @param {Function} callback - Callback when escape is pressed
     */
    setupEscapeKeyListener(callback) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (callback) callback();
            }
        });
    }

    /**
     * Setup print button listener
     * @param {Function} callback - Callback when print button is clicked
     */
    setupPrintButtonListener(callback) {
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                try {
                    if (callback) callback();
                } catch (error) {
                    this.showAlert(error.message);
                }
            });
        }
    }

    /**
     * Show alert message
     * @param {string} message - Message to display
     */
    showAlert(message) {
        alert(message);
    }

    /**
     * Show validation error alert
     */
    showValidationErrorAlert() {
        alert('Please fill in all required fields correctly. Invalid fields are highlighted in red.');
    }

    /**
     * Show success message
     * @param {Object} formData - Form data to display
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
     * Focus on first error field
     */
    focusFirstErrorField() {
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }
}]

**CODE 6 - File: measurement-Main.js**
[/**
 * Main Application Coordinator
 * Orchestrates interactions between modules
 */
import { MeasurementValidator } from './measurement-Validator.js';
import { MeasurementManager } from './measurement-Manager.js';
import { ViewHandler } from './measurement-ViewHandler.js';

class MeasurementApp {
    constructor() {
        this.manager = null;
        this.validator = null;
        this.viewHandler = null;
        this.debounceTimers = new Map();
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        const form = document.getElementById('measurement-form');
        if (!form) {
            console.error('Measurement form not found');
            return;
        }

        const gender = form.dataset.gender;
        const isMobileView = this.checkMobileView();
        
        // Initialize modules
        this.manager = new MeasurementManager().initialize(gender);
        this.validator = new MeasurementValidator(form);
        this.viewHandler = new ViewHandler(gender, isMobileView);
        
        // Setup initial state
        this.setupInitialState();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Bind global functions
        this.bindGlobalFunctions();
        
        this.logInitialization();
    }

    /**
     * Check if current view is mobile
     */
    checkMobileView() {
        return window.innerWidth <= 992;
    }

    /**
     * Setup initial application state
     */
    setupInitialState() {
        this.manager.setupDateField();
        
        // Force initial image load for desktop view
        if (!this.viewHandler.isMobileView) {
            setTimeout(() => {
                this.viewHandler.setupDesktopGuideImage();
            }, 100);
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        this.setupFormInputListeners();
        this.setupButtonListeners();
        this.setupGuideListeners();
    }

    /**
     * Setup form input listeners
     */
    setupFormInputListeners() {
        // Client name validation
        const nameField = document.getElementById('client-name');
        if (nameField) {
            nameField.addEventListener('input', () => {
                this.debounceValidation('client-name');
            });
            nameField.addEventListener('blur', () => {
                this.validator.validateField('client-name');
            });
        }

        // Date field validation
        const dateField = document.getElementById('save-date');
        if (dateField) {
            dateField.addEventListener('change', () => {
                this.validator.validateField('save-date');
            });
        }

        // Gender-specific fields
        if (this.manager.gender === 'male') {
            this.setupFieldListener('size-number');
        } else {
            this.setupFieldListener('cupSize');
        }

        // Measurement inputs
        this.setupMeasurementInputListeners();
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
                this.validator.validateField(e.target.id);
            });
        });
    }

    /**
     * Setup button listeners
     */
    setupButtonListeners() {
        // Save button
        const saveBtn = document.getElementById('save-measurements');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.handleSaveMeasurements();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('reset-form');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.handleResetForm();
            });
        }

        // Print button (handled by viewHandler)
        this.viewHandler.setupPrintButtonListener(() => {
            this.manager.printSummary();
        });
    }

    /**
     * Setup guide-related listeners
     */
    setupGuideListeners() {
        // Eye icon listeners
        this.viewHandler.setupEyeIconListeners((measurementKey) => {
            this.viewHandler.showFloatingGuide(measurementKey);
        });

        // Guide close listeners
        const closeBtn = document.getElementById('close-floating-guide');
        const overlay = document.getElementById('floating-guide-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.viewHandler.hideFloatingGuide();
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.viewHandler.hideFloatingGuide();
            });
        }

        // Escape key listener
        this.viewHandler.setupEscapeKeyListener(() => {
            this.viewHandler.hideFloatingGuide();
        });

        // Window resize listener
        this.viewHandler.setupWindowResizeListener((isMobileView) => {
            // Handle view change if needed
            console.log(`View changed to: ${isMobileView ? 'Mobile' : 'Desktop'}`);
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
        const measurementKey = input.dataset.measurement;
        
        if (measurementKey) {
            this.viewHandler.showMeasurementGuide(measurementKey);
        }
        
        this.validator.clearSingleError(input.id);
    }

    /**
     * Debounced field validation
     */
    debounceValidation(fieldId) {
        clearTimeout(this.debounceTimers.get(fieldId));
        
        const timer = setTimeout(() => {
            this.validator.validateField(fieldId);
        }, 150);
        
        this.debounceTimers.set(fieldId, timer);
    }

    /**
     * Handle save measurements
     */
    handleSaveMeasurements() {
        if (!this.validator.validateAll()) {
            this.viewHandler.focusFirstErrorField();
            this.viewHandler.showValidationErrorAlert();
            return;
        }

        const formData = this.manager.getFormData();
        this.viewHandler.showSuccessMessage(formData);
        
        // Log data (in production, send to server)
        console.log('Measurement data:', JSON.stringify(formData, null, 2));
    }

    /**
     * Handle reset form
     */
    handleResetForm() {
        if (confirm('Are you sure you want to reset all measurements? This action cannot be undone.')) {
            // Clear form
            const form = document.getElementById('measurement-form');
            if (form) form.reset();
            
            // Reset manager data
            this.manager.resetFormData();
            
            // Reset date field
            this.manager.setupDateField();
            
            // Clear validation errors
            this.validator.clearErrors();
            
            // Hide floating guide
            this.viewHandler.hideFloatingGuide();
        }
    }

    /**
     * Bind global functions for HTML onclick handlers
     */
    bindGlobalFunctions() {
        window.handleSaveMeasurements = () => this.handleSaveMeasurements();
        window.handleResetForm = () => this.handleResetForm();
    }

    /**
     * Log initialization message
     */
    logInitialization() {
        console.log(`Measurement App initialized for ${this.manager.gender}`);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MeasurementApp();
});]


**ERROR/ISSUE:**
[non]

**REQUEST:**
explain how the program works, how modules interact with one another 

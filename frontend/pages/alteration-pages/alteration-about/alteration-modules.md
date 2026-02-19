I have a codebase with multiple files:

**CODE 1 - File: alteration.css**  
[/* alteration.css - Responsive Version */

.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 15px;
}

/* Main container with 3 columns */
.alteration-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    border: 1px solid #ddd;
    padding: 15px;
    background-color: #fff;
    border-radius: 12px;
}

/* Column styles - each with border and background color */
.alteration-container > div:nth-child(2) {
    /* First column (after the title) */
    border: 1px solid #ccc;
    padding: 12px;
    background-color: rgb(227, 234, 234);
    border-radius: 4px;
}

.alteration-container > div:nth-child(3) {
    /* Second column */
    border: 1px solid #ccc;
    padding: 12px;
    background-color: rgb(227, 234, 234);
    border-radius: 4px;
}

.alteration-container > div:nth-child(4) {
    /* Third column */
    border: 1px solid #ccc;
    padding: 12px;
    background-color: rgb(227, 234, 234);
    border-radius: 4px;
}

/* Price list title */
#price-list {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 2px solid #333;
    color: #333;
    background-color: transparent; /* Keep title transparent */
}

/* Form elements styling */
.alteration-list,
.alteration-level,
.amount-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    font-weight: bold;
    font-size: 14px;
    color: #555;
    margin-bottom: 2px;
}

select {
    padding: 6px 8px;
    border: 1px solid #bbb;
    border-radius: 3px;
    font-size: 14px;
    background-color: #f9f9f9;
    width: 100%;
}

/* Amount section */
#amount {
    font-weight: bold;
    color: #333;
}

#priceCalculation {
    color: #e44d26;
    font-weight: bold;
}

/* Amount row with inline layout */
.amount-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
}

#amount {
    font-weight: bold;
    color: #333;
    white-space: nowrap;
}

#priceCalculation {
    color: #e44d26;
    font-weight: bold;
    min-width: 60px;
    white-space: nowrap;
}

.button-group {
    display: flex;
    gap: 5px;
    margin-left: auto;
}

#add-button,
button[onclick*="handleAdd"] {
    padding: 6px 12px;
    background-color: #4CAF50; 
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    width: 80px;
    transition: background-color 0.2s;
}

#clear-button,
button[onclick*="handleClear"] {
    padding: 6px 12px;
    background-color: #f44336; 
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    width: 80px;
    transition: background-color 0.2s;
}



/* Compact buttons */
button {
    padding: 6px 12px;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    width: 80px; 
    margin-right: 5px;
    transition: background-color 0.2s;
} 

/* Details sections */
details {
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 8px;
    background-color: #f9f9f9;
}

summary {
    font-weight: bold;
    cursor: pointer;
    color: #333;
    font-size: 14px;
}

details p {
    margin-top: 5px;
    font-size: 13px;
    color: #666;
    line-height: 1.4;
}

/* ===== RESPONSIVE BREAKPOINTS BASED ON SAMPLE.CSS ===== */

/* Large Desktops: 1200px and above */
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
        padding: 0 20px;
    }
    
    .alteration-container {
        gap: 20px;
        padding: 20px;
    }
}

/* Desktops: 992px - 1199px */
@media (min-width: 992px) and (max-width: 1199px) {
    .container {
        max-width: 960px;
        padding: 0 15px;
    }
    
    .alteration-container {
        gap: 15px;
        padding: 15px;
    }
    
    .alteration-container > div:nth-child(2),
    .alteration-container > div:nth-child(3),
    .alteration-container > div:nth-child(4) {
        padding: 10px;
    }
}

/* Landscape Tablets: 768px - 991px */
@media (min-width: 768px) and (max-width: 991px) {
    .container {
        max-width: 720px;
        padding: 0 12px;
    }
    
    .alteration-container {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 12px;
    }
    
    .alteration-container > div:nth-child(2),
    .alteration-container > div:nth-child(3),
    .alteration-container > div:nth-child(4) {
        padding: 10px;
    }
    
    /* Adjust amount row for smaller screens */
    .amount-row {
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .button-group {
        margin-left: 0;
        width: 100%;
        justify-content: flex-start;
    }
}

/* Tablets: 576px - 767px */
@media (min-width: 576px) and (max-width: 767px) {
    .container {
        max-width: 540px;
        padding: 0 10px;
        margin: 15px auto;
    }
    
    .alteration-container {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 10px;
    }
    
    .alteration-container > div:nth-child(2),
    .alteration-container > div:nth-child(3),
    .alteration-container > div:nth-child(4) {
        padding: 8px;
    }
    
    #price-list {
        font-size: 1.25rem;
        margin-bottom: 8px;
        padding-bottom: 6px;
    }
    
    label {
        font-size: 13px;
    }
    
    select {
        font-size: 13px;
        padding: 5px 7px;
    }
    
    .amount-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .button-group {
        margin-left: 0;
        width: 100%;
        justify-content: flex-start;
    }
    
    button {
        width: 70px;
        padding: 5px 10px;
        font-size: 13px;
    }
    
    details {
        padding: 6px;
    }
    
    summary {
        font-size: 13px;
    }
    
    details p {
        font-size: 12px;
    }
}

/* Mobile Phones: 480px - 575px */
@media (min-width: 480px) and (max-width: 575px) {
    .container {
        max-width: 100%;
        padding: 0 8px;
        margin: 10px auto;
    }
    
    .alteration-container {
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 8px;
        border-radius: 8px;
    }
    
    .alteration-container > div:nth-child(2),
    .alteration-container > div:nth-child(3),
    .alteration-container > div:nth-child(4) {
        padding: 6px;
        border-radius: 3px;
    }
    
    #price-list {
        font-size: 1.1rem;
        margin-bottom: 6px;
        padding-bottom: 4px;
    }
    
    .alteration-list,
    .alteration-level,
    .amount-container {
        gap: 6px;
    }
    
    label {
        font-size: 12px;
    }
    
    select {
        font-size: 12px;
        padding: 4px 6px;
    }
    
    .amount-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        margin-bottom: 6px;
    }
    
    #amount, #priceCalculation {
        font-size: 13px;
    }
    
    .button-group {
        margin-left: 0;
        width: 100%;
        justify-content: flex-start;
        gap: 8px;
    }
    
    button {
        width: 65px;
        padding: 4px 8px;
        font-size: 12px;
    }
    
    details {
        margin-top: 8px;
        padding: 5px;
    }
    
    summary {
        font-size: 12px;
    }
    
    details p {
        font-size: 11px;
        line-height: 1.3;
    }
}

/* Small Mobile Phones: below 480px */
@media (max-width: 479px) {
    .container {
        max-width: 100%;
        padding: 0 5px;
        margin: 8px auto;
    }
    
    .alteration-container {
        grid-template-columns: 1fr;
        gap: 6px;
        padding: 6px;
        border-radius: 6px;
    }
    
    .alteration-container > div:nth-child(2),
    .alteration-container > div:nth-child(3),
    .alteration-container > div:nth-child(4) {
        padding: 5px;
        border-radius: 2px;
    }
    
    #price-list {
        font-size: 1rem;
        margin-bottom: 5px;
        padding-bottom: 3px;
    }
    
    .alteration-list,
    .alteration-level,
    .amount-container {
        gap: 5px;
    }
    
    label {
        font-size: 11px;
    }
    
    select {
        font-size: 11px;
        padding: 3px 5px;
    }
    
    .amount-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        margin-bottom: 5px;
    }
    
    #amount, #priceCalculation {
        font-size: 12px;
    }
    
    .button-group {
        margin-left: 0;
        width: 100%;
        justify-content: flex-start;
        gap: 6px;
    }
    
    button {
        width: 60px;
        padding: 3px 6px;
        font-size: 11px;
    }
    
    details {
        margin-top: 6px;
        padding: 4px;
    }
    
    summary {
        font-size: 11px;
    }
    
    details p {
        font-size: 10px;
        line-height: 1.2;
    }
}

/* Additional responsive queries for specific orientations */
/* Portrait orientation for tablets */
@media (min-width: 768px) and (orientation: portrait) {
    .container {
        max-width: 720px;
    }
    
    .alteration-container {
        grid-template-columns: 1fr;
    }
}

/* Landscape orientation for tablets */
@media (min-width: 992px) and (orientation: landscape) {
    .alteration-container {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

/* Extra Large Screens: 1440px and above */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
        padding: 0 30px;
    }
    
    .alteration-container {
        gap: 25px;
        padding: 25px;
    }
    
    .alteration-container > div:nth-child(2),
    .alteration-container > div:nth-child(3),
    .alteration-container > div:nth-child(4) {
        padding: 15px;
    }
    
    label {
        font-size: 15px;
    }
    
    select {
        font-size: 15px;
        padding: 8px 10px;
    }
    
    button {
        width: 85px;
        padding: 7px 14px;
        font-size: 15px;
    }
    
    details {
        padding: 10px;
    }
    
    summary {
        font-size: 15px;
    }
    
    details p {
        font-size: 14px;
    }
}]

**CODE 2 - File: alteration-DataMaps.js**  
[export const alterationMaps = {
    // Female Bottom
    "female-bottom": {
        "female-bottom-hem-skirt-straight-slim": { simple: 33, intermediate: 44, difficult: 55, detail: "Shorten hem on straight or slim skirt, maintaining original line and finish" },
        "female-bottom-hem-full/circle-unlined-skirt": { simple: 44, intermediate: 66, difficult: 88, detail: "Shorten hem on unlined full or circle skirt, managing flare distribution" },
        "female-bottom-hem-full/circle-lined-skirt": { simple: 66, intermediate: 77, difficult: 93.5, detail: "Shorten hem on lined full/circle skirt, adjusting both outer fabric and lining layers evenly" },
        "female-bottom-hem-unlined-pants": { simple: 44, intermediate: 66, difficult: 88, detail: "Shorten pant legs on unlined trousers, preserving original break and taper" },
        "female-bottom-hem-lined-pants": { simple: 66, intermediate: 88, difficult: 110, detail: "Shorten pant legs on lined trousers, adjusting both outer fabric and lining layers" },
        "female-bottom-take-in-side-seams-unlined-pants": { simple: 44, intermediate: 66, difficult: 88, detail: "Take in side seams on unlined pants to reduce waist/hip circumference" },
        "female-bottom-take-in-side-seams-lined-pants": { simple: 66, intermediate: 88, difficult: 110, detail: "Take in side seams on lined pants, adjusting both outer fabric and lining layers" },
        "female-bottom-taper-legs-unlined-pants": { simple: 44, intermediate: 66, difficult: 88, detail: "Narrow pant legs from knee to hem on unlined trousers" },
        "female-bottom-taper-legs-lined-pants": { simple: 66, intermediate: 88, difficult: 110, detail: "Narrow pant legs from knee to hem on lined trousers, adjusting both outer fabric and lining layers" }
    },
    
    // Female Dress
    "female-dress": {
        //Bodice
        "female-dress-halter-neckline": { simple: 20, intermediate: 30, difficult: 40, detail: "Adjust halter neckline for proper fit and support" },
        "female-dress-take-in-neckline": { simple: 15, intermediate: 25, difficult: 35, detail: "Take in neckline to reduce gaping or improve fit" },
        "female-dress-line-bind-neckline": { simple: 15, intermediate: 20, difficult: 25, detail: "Line and bind neckline edges for finished look" },
        "female-dress-take-in-shoulders": { simple: 20, intermediate: 35, difficult: 50, detail: "Adjust shoulder seams to lift bodice" },
        "female-dress-shorten-straps": { simple: 10, intermediate: 0, difficult: 20, detail: "Shorten dress straps for proper length" },
        "female-dress-coordinating-straps": { simple: 20, intermediate: 0, difficult: 30, detail: "Coordinate multiple straps for even alignment" },
        "female-dress-adjust-slide-bust": { simple: 35, intermediate: 50, difficult: 65, detail: "Adjust bust area for proper fit and support" },
        "female-dress-take-in-zipper": { simple: 30, intermediate: 50, difficult: 65, detail: "Take in side seams including zipper adjustment" },
        "female-dress-reshape-armhole": { simple: 15, intermediate: 20, difficult: 25, detail: "Reshape armhole for comfort and appearance" },
        "female-dress-shorten-bodice": { simple: 40, intermediate: 50, difficult: 60, detail: "Shorten bodice length from shoulder or waist" },
        "female-dress-add-gusset": { simple: 40, intermediate: 50, difficult: 65, detail: "Add fabric gusset for additional room" },
        "female-dress-temple-fill-bodice": { simple: 30, intermediate: 40, difficult: 50, detail: "Add temple fill for bodice structure" },
        "female-dress-additional-coverage": { simple: 15, intermediate: 0, difficult: 0, detail: "Add fabric for additional coverage" },
        "female-dress-corset-back": { simple: 15, intermediate: 0, difficult: 115, detail: "Install corset back closure system" },
        "female-dress-corset-ties": { simple: 20, intermediate: 0, difficult: 0, detail: "Add or replace corset ties" },
        "female-dress-modesty-panel": { simple: 30, intermediate: 0, difficult: 0, detail: "Add modesty panel for back coverage" },
        //Sleeve
        "female-dress-shorten-sleeve": { simple: 35, intermediate: 45, difficult: 55, detail: "Shorten sleeve length" },
        "female-dress-take-in-let-out-sleeve": { simple: 15, intermediate: 25, difficult: 35, detail: "Adjust sleeve width through seams" },
        "female-dress-take-in-elastic": { simple: 10, intermediate: 20, difficult: 0, detail: "Take in sleeve using elastic" },
        "female-dress-add-lingerie": { simple: 10, intermediate: 0, difficult: 0, detail: "Add lingerie straps or supports" },
        "female-dress-reset-sleeve": { simple: 25, intermediate: 35, difficult: 45, detail: "Remove and reset sleeve for better fit" },
        "female-dress-reshape-armholes": { simple: 10, intermediate: 20, difficult: 30, detail: "Reshape armholes for sleeve attachment" },
        "female-dress-temple-fill-sleeves": { simple: 40, intermediate: 50, difficult: 60, detail: "Add temple fill to sleeves" },
        "female-dress-cap-sleeve-1": { simple: 40, intermediate: 0, difficult: 0, detail: "Add basic cap sleeves" },
        "female-dress-cap-sleeve-2": { simple: 40, intermediate: 0, difficult: 0, detail: "Add detailed cap sleeves" },
        "female-dress-flutter-sleeve": { simple: 40, intermediate: 0, difficult: 0, detail: "Add flutter sleeves" },
        "female-dress-short-sleeve-ss1": { simple: 50, intermediate: 0, difficult: 0, detail: "Add short sleeves style 1" },
        "female-dress-long-sleeve-ls1": { simple: 60, intermediate: 0, difficult: 0, detail: "Add long sleeves style 1" },
        //Skirt
        "female-dress-hem": { simple: 75, intermediate: 95, difficult: 120, detail: "Hem skirt to desired length" },
        "female-dress-waistband": { simple: 15, intermediate: 20, difficult: 25, detail: "Adjust or replace waistband" },
        "female-dress-side-seams": { simple: 30, intermediate: 40, difficult: 50, detail: "Take in or let out side seams" },
        "female-dress-slit": { simple: 10, intermediate: 15, difficult: 20, detail: "Add or adjust skirt slit" },
        //Bustle
        "female-dress-over-bustle": { simple: 35, intermediate: 0, difficult: 0, detail: "Create over bustle for train" },
        "female-dress-add-over-bustle": { simple: 5, intermediate: 0, difficult: 0, detail: "Add additional over bustle point" },
        "female-dress-under-bustle": { simple: 50, intermediate: 0, difficult: 0, detail: "Create under bustle for train" },
        "female-dress-add-under-bustle": { simple: 7, intermediate: 0, difficult: 0, detail: "Add additional under bustle point" },
        "female-dress-royal-bustle": { simple: 50, intermediate: 0, difficult: 0, detail: "Create royal bustle style" },
        "female-dress-each-additional-royal": { simple: 15, intermediate: 0, difficult: 0, detail: "Each additional royal bustle point" },
        "female-dress-ballroom-bustle": { simple: 35, intermediate: 0, difficult: 0, detail: "Create ballroom bustle style" },
        "female-dress-add-ballroom-bustle": { simple: 5, intermediate: 0, difficult: 0, detail: "Add additional ballroom bustle point" },
        "female-dress-bustle-point-each": { simple: 5, intermediate: 0, difficult: 0, detail: "Each standard bustle point" },
        "female-dress-ribbon-bustle-point": { simple: 3, intermediate: 0, difficult: 0, detail: "Ribbon bustle point attachment" },
        "female-dress-add-wristloop": { simple: 25, intermediate: 0, difficult: 0, detail: "Add wrist loop for train carrying" },
        //Veil
        "female-dress-loop_comb": { simple: 5, intermediate: 0, difficult: 0, detail: "Add loop to comb attachment" },
        "female-dress-velcro_veil": { simple: 10, intermediate: 0, difficult: 0, detail: "Add velcro veil attachment" },
        "female-dress-veil_bustle": { simple: 5, intermediate: 0, difficult: 0, detail: "Bustle veil for reception" },
        //Others    
        "female-dress-move-add-hooks-eyes": { simple: 5, intermediate: 0, difficult: 0, detail: "Move or add hooks and eyes" },
        "female-dress-add-bra-cups": { simple: 20, intermediate: 0, difficult: 0, detail: "Add bra cups for support" },
        "female-dress-hem-single-layer": { simple: 15, intermediate: 0, difficult: 0, detail: "Hem single layer garment" },
        "female-dress-hem-slip": { simple: 30, intermediate: 25, difficult: 35, detail: "Hem slip or undergarment" }
    },
    
    // Female Jacket
    "female-jacket": {
        "female-jacket-hem-sleeves-unlined": { simple: 35, intermediate: 46, difficult: 58, detail: "Shorten sleeves on unlined jacket, adjusting length as needed" },
        "female-jacket-hem-sleeves-lined": { simple: 46, intermediate: 69, difficult: 92, detail: "Shorten sleeves on lined jacket, adjusting both outer fabric and lining" },
        "female-jacket-take-in-waist": { simple: 69, intermediate: 81, difficult: 98, detail: "Take in waist area for better fit through midsection" },
        "female-jacket-taper-sides-unlined": { simple: 35, intermediate: 46, difficult: 58, detail: "Taper side seams on unlined jacket to reduce width" },
        "female-jacket-taper-sides-lined": { simple: 46, intermediate: 69, difficult: 92, detail: "Taper side seams on lined jacket, adjusting both outer fabric and lining" },
        "female-jacket-shorten-length": { simple: 69, intermediate: 81, difficult: 98, detail: "Shorten overall jacket length, adjusting hem and proportions" }
    },
    
    // Female Top
    "female-top": {
        "female-top-shorten-straps": { simple: 40, intermediate: 50, difficult: 65, detail: "Shorten shoulder straps for proper fit and support" },
        "female-top-take-in-unlined": { simple: 50, intermediate: 75, difficult: 95, detail: "Take in side seams to reduce width for better fit" },
        "female-top-take-in-lined": { simple: 75, intermediate: 85, difficult: 105, detail: "Take in side seams of lined top, adjusting both layers" },
        "female-top-hem-unlined": { simple: 50, intermediate: 75, difficult: 95, detail: "Shorten hem length of unlined top" },
        "female-top-hem-lined": { simple: 75, intermediate: 95, difficult: 120, detail: "Shorten hem length of lined top, adjusting both layers" },
        "female-top-hem-sleeves-unlined": { simple: 50, intermediate: 75, difficult: 95, detail: "Shorten sleeves on unlined top" },
        "female-top-hem-sleeves-lined": { simple: 60, intermediate: 95, difficult: 130, detail: "Shorten sleeves on lined top, adjusting both layers" }
    },
    
    // Male Bottom
    "male-bottom": {
        "male-bottom-hem-unlined-pants": { simple: 29, intermediate: 41, difficult: 52, detail: "Shorten or lengthen unlined pants by adjusting the hem" },
        "male-bottom-hem-lined-pants": { simple: 35, intermediate: 46, difficult: 58, detail: "Shorten or lengthen lined pants, requiring extra work to preserve lining" },
        "male-bottom-take-in-unlined-pants": { simple: 52, intermediate: 69, difficult: 87, detail: "Take in waist or seat of unlined pants for better fit" },
        "male-bottom-take-in-lined-pants": { simple: 58, intermediate: 75, difficult: 92, detail: "Take in waist or seat of lined pants, requiring lining adjustments" },
        "male-bottom-taper-unlined-pants": { simple: 41, intermediate: 52, difficult: 64, detail: "Narrow pants legs from thigh to ankle for slimmer fit on unlined pants" },
        "male-bottom-taper-lined-pants": { simple: 46, intermediate: 58, difficult: 75, detail: "Narrow pants legs from thigh to ankle on lined pants with lining adjustments" }
    },
    
    // Male Suits
    "male-suits": {
        "male-suits-vest-take-in-side-seam": { simple: 30, intermediate: 45, difficult: 60, detail: "Take in or let out vest side seams for proper torso fit" },
        "male-suits-vest-take-in-shoulder": { simple: 25, intermediate: 40, difficult: 55, detail: "Adjust vest shoulder width by taking in shoulder seams" },
        "male-suits-vest-reshape-armhole": { simple: 30, intermediate: 45, difficult: 65, detail: "Reshape vest armholes for better fit and movement" },
        "male-suits-jacket-hem-sleeves-unlined": { simple: 45, intermediate: 65, difficult: 85, detail: "Shorten unlined jacket sleeves from the shoulder seam" },
        "male-suits-jacket-hem-sleeves-lined": { simple: 45, intermediate: 65, difficult: 85, detail: "Shorten lined jacket sleeves from the shoulder seam" },
        "male-suits-jacket-take-in-waist": { simple: 50, intermediate: 70, difficult: 90, detail: "Take in jacket waist for a more fitted silhouette" },
        "male-suits-jacket-taper-sides": { simple: 50, intermediate: 70, difficult: 90, detail: "Taper jacket side seams from armpit to waist" },
        "male-suits-jacket-shoulder-take-in": { simple: 55, intermediate: 75, difficult: 95, detail: "Take in jacket shoulders for improved shoulder line and fit" },
        "male-suits-jacket-reshape-armhole": { simple: 45, intermediate: 65, difficult: 85, detail: "Reshape jacket armholes for better sleeve attachment and comfort" },
        "male-suits-jacket-back-seam": { simple: 40, intermediate: 60, difficult: 80, detail: "Take in jacket center back seam for improved back fit" },
        "male-suits-pants-take-in-waist": { simple: 30, intermediate: 45, difficult: 60, detail: "Take in pants waistband for proper waist fit" },
        "male-suits-pants-adjust-length": { simple: 25, intermediate: 35, difficult: 50, detail: "Adjust pants length by hemming or letting down" },
        "male-suits-pants-side-taper": { simple: 35, intermediate: 55, difficult: 75, detail: "Taper pants from thigh to ankle for slimmer fit" }
    },
    
    // Male Top
    "male-top": {
        "male-top-shorten-straps": { simple: 35, intermediate: 49, difficult: 63, detail: "Shorten or lengthen shoulder straps on tops, tank tops, or overalls" },
        "male-top-hem-sleeves": { simple: 42, intermediate: 56, difficult: 70, detail: "Shorten or lengthen sleeves on shirts, tops, or jackets" },
        "male-top-take-in-taper": { simple: 63, intermediate: 83, difficult: 105, detail: "Take in or taper the sides of shirts or tops for a better fit" }
    },
    
    // Repair
    "repair": {
        "repair-zippers-on-dress": { "simple": 30, "intermediate": 0, "difficult": 0, "detail": "Repair or replace zippers on dresses, jumpsuits, or one-piece garments" },
        "repair-zippers-on-pants": { "simple": 36, "intermediate": 0, "difficult": 0, "detail": "Repair or replace zippers on pants, trousers, or shorts" },
        "repair-zippers-on-coats-jackets": { "simple": 60, "intermediate": 0, "difficult": 0, "detail": "Repair or replace zippers on coats, jackets, or blazers" },
        "repair-apply-patches": { "simple": 45, "intermediate": 0, "difficult": 0, "detail": "Apply patches to cover holes, tears, or worn areas on garments" },
        "repair-sew-in-rips-tears": { "simple": 35, "intermediate": 0, "difficult": 0, "detail": "Repair rips, tears, or splits in fabric using stitching techniques" },
        "repair-button-replacement": { "simple": 10, "intermediate": 0, "difficult": 0, "detail": "Replace missing or damaged buttons on shirts, jackets, or coats" }
    }
};]

**CODE 3 - File: alteration-CartManager.js**  
[/**
 * Cart Manager - Handles shopping cart functionality
 * Separates cart logic from main calculator
 */
class CartManager {
    constructor() {
        this.cart = [];
    }

    // Add item to cart
    addItem(description, price) {
        const item = {
            id: Date.now(),
            description,
            price,
            timestamp: new Date().toISOString()
        };
        
        this.cart.push(item);
        return item;
    }

    // Remove item from cart
    removeItem(itemId) {
        const index = this.cart.findIndex(item => item.id === itemId);
        if (index > -1) {
            return this.cart.splice(index, 1)[0];
        }
        return null;
    }

    // Clear cart
    clearCart() {
        this.cart = [];
    }

    // Get cart total
    getTotal() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    // Get cart items
    getItems() {
        return [...this.cart];
    }
}

export default CartManager;]

**CODE 4 - File: alteration-DOMRenderer.js** 
[/**
 * DOM Renderer - Handles all DOM manipulation and rendering
 * Centralizes DOM operations for easier maintenance
 */
class DOMRenderer {
    constructor() {
        // Cache DOM elements
        this.elements = {
            priceElement: document.getElementById('priceCalculation'),
            noteElement: document.getElementById('alteration-note'),
            descriptionElement: document.getElementById('alteration-description'),
            customerRequestElement: document.getElementById('alteration-customer-request'),
            typeElement: document.getElementById('alteration-type'),
            levelElement: document.getElementById('alteration-level')
        };
    }

    // Clear all display elements
    clearDisplay() {
        Object.values(this.elements).forEach(element => {
            if (element) element.textContent = '';
        });
    }

    // Update display based on state
    render(state) {
        this.clearDisplay();

        const { selectedAlteration, selectedDifficulty, currentPrice, alterationDetails } = state;

        // Validate and render price
        if (currentPrice > 0) {
            this.elements.priceElement.textContent = `$${currentPrice.toFixed(2)}`;
            this.elements.noteElement.textContent = '• Prices are determined by the complexity and the specific requirements of the customer request.';
            
            if (alterationDetails && alterationDetails.detail) {
                this.elements.descriptionElement.textContent = `• ${alterationDetails.detail}`;
            }

            // Update customer request
            const requestText = this.getCustomerRequestText(selectedDifficulty);
            if (requestText) {
                this.elements.customerRequestElement.textContent = requestText;
            }

            // Update order summary
            if (selectedAlteration) {
                this.elements.typeElement.textContent = `Alteration type: ${selectedAlteration}`;
            }
            if (selectedDifficulty) {
                this.elements.levelElement.textContent = `Alteration level: ${selectedDifficulty}`;
            }
        } else {
            this.elements.priceElement.textContent = 'n/a';
            this.elements.noteElement.textContent = ' ';
        }
    }

    // Get customer request text
    getCustomerRequestText(difficulty) {
        const requestMap = {
            intermediate: '• plus (1) customer-requested modification',
            difficult: '• plus (2) customer-requested modification'
        };
        return requestMap[difficulty] || '';
    }

    // Reset all select elements
    resetSelects(alterationSelects, difficultySelect) {
        alterationSelects.forEach(select => select.value = '');
        if (difficultySelect) difficultySelect.value = '';
    }
}

export default DOMRenderer;]

**CODE 5 - File: alteration-EventManager.js** 
[/**
 * Event Manager - Handles all event listeners and DOM interactions
 * Decouples event handling from business logic
 */
class EventManager {
    constructor(stateManager, priceCalculator, domRenderer) {
        this.stateManager = stateManager;
        this.priceCalculator = priceCalculator;
        this.domRenderer = domRenderer;
        
        // Get DOM elements
        this.alterationSelects = document.querySelectorAll('select[id$="Select"]');
        this.difficultySelect = document.getElementById('alterationLevel-diff');
        
        // Bind methods
        this.handleAlterationChange = this.handleAlterationChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.resetOtherSelects = this.resetOtherSelects.bind(this);
    }

    // Initialize all event listeners
    initialize() {
        this.alterationSelects.forEach(select => {
            if (select.id !== 'alterationLevel-diff') {
                select.addEventListener('change', this.handleAlterationChange);
            }
        });

        if (this.difficultySelect) {
            this.difficultySelect.addEventListener('change', this.handleDifficultyChange);
        }
    }

    // Handle alteration selection change
    handleAlterationChange(event) {
        const value = event.target.value;
        const currentState = this.stateManager.getState();

        if (value) {
            this.resetOtherSelects(event.target);
            
            // Calculate price and get details
            const difficulty = currentState.selectedDifficulty;
            const price = difficulty ? this.priceCalculator.calculatePrice(value, difficulty) : 0;
            const alterationDetails = this.priceCalculator.getAlterationDetails(value);

            this.stateManager.setState({
                selectedAlteration: value,
                currentPrice: price,
                alterationDetails,
                lastSelectedElement: event.target
            });
        } else {
            this.stateManager.setState({
                selectedAlteration: null,
                currentPrice: 0,
                alterationDetails: null
            });
        }
    }

    // Handle difficulty selection change
    handleDifficultyChange(event) {
        const difficulty = event.target.value;
        const currentState = this.stateManager.getState();
        const alteration = currentState.selectedAlteration;

        if (difficulty) {
            const price = alteration ? this.priceCalculator.calculatePrice(alteration, difficulty) : 0;
            const alterationDetails = alteration ? this.priceCalculator.getAlterationDetails(alteration) : null;

            this.stateManager.setState({
                selectedDifficulty: difficulty,
                currentPrice: price,
                alterationDetails
            });
        } else {
            this.stateManager.setState({
                selectedDifficulty: null,
                currentPrice: 0
            });
        }
    }

    // Reset other select elements when one is selected
    resetOtherSelects(currentSelect) {
        this.alterationSelects.forEach(select => {
            if (select !== currentSelect && select.id !== 'alterationLevel-diff') {
                select.value = '';
            }
        });
    }

    // Clean up event listeners
    cleanup() {
        this.alterationSelects.forEach(select => {
            select.removeEventListener('change', this.handleAlterationChange);
        });
        
        if (this.difficultySelect) {
            this.difficultySelect.removeEventListener('change', this.handleDifficultyChange);
        }
    }
}

export default EventManager;]

**CODE 6 - File: alteration-PriceCalculator.js** 
[/**
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

export default PriceCalculator;]

**CODE 7 - File: alteration-StateManager.js** 
[/**
 * State Manager - Centralized state management for the alteration calculator
 * Single source of truth for application state
 */
class StateManager {
    constructor(alterationMaps) {
        this.state = {
            selectedAlteration: null,
            selectedDifficulty: null,
            currentPrice: 0,
            alterationDetails: null,
            lastSelectedElement: null
        };
        this.alterationMaps = alterationMaps;
        this.listeners = [];
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) this.listeners.splice(index, 1);
        };
    }

    // Update state and notify listeners
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.notifyListeners();
    }

    // Notify all subscribed listeners
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Reset all state
    reset() {
        this.setState({
            selectedAlteration: null,
            selectedDifficulty: null,
            currentPrice: 0,
            alterationDetails: null,
            lastSelectedElement: null
        });
    }
}

export default StateManager;]
**CODE 8 - File: alteration-Main.js**
[/**
 * Main Entry Point - Initializes and coordinates all modules
 * Dependency injection and module composition
 */
import { alterationMaps } from './alteration-DataMaps.js';
import StateManager from './alteration-StateManager.js';
import PriceCalculator from './alteration-PriceCalculator.js';
import DOMRenderer from './alteration-DOMRenderer.js';
import EventManager from './alteration-EventManager.js';
import CartManager from './alteration-CartManager.js';

class AlterationApp {
    constructor() {
        // Initialize modules with dependency injection
        this.stateManager = new StateManager(alterationMaps);
        this.priceCalculator = new PriceCalculator(alterationMaps);
        this.domRenderer = new DOMRenderer();
        this.cartManager = new CartManager();
        
        // EventManager needs references to other modules
        this.eventManager = new EventManager(
            this.stateManager,
            this.priceCalculator,
            this.domRenderer
        );

        // Set up subscriptions
        this.setupSubscriptions();
    }

    // Set up subscriptions to state changes
    setupSubscriptions() {
        // When state changes, update the DOM
        this.stateManager.subscribe((state) => {
            this.domRenderer.render(state);
        });
    }

    // Initialize the application
    initialize() {
        this.eventManager.initialize();
        this.setupGlobalHandlers();
    }

    // Set up global button handlers
    setupGlobalHandlers() {
        window.handleAdd = () => {
            const state = this.stateManager.getState();
            
            if (state.currentPrice > 0 && state.selectedAlteration) {
                const description = `Alteration: ${state.selectedAlteration} (${state.selectedDifficulty})`;
                const item = this.cartManager.addItem(description, state.currentPrice);
                
                alert(`Added to cart: ${description} - $${state.currentPrice.toFixed(2)}`);
                
                // Optional: Reset after adding to cart
                this.reset();
            } else {
                alert('Please select a valid alteration and difficulty level first.');
            }
        };

        window.handleClear = () => {
            this.reset();
        };
    }

    // Reset the application
    reset() {
        this.stateManager.reset();
        this.domRenderer.resetSelects(
            this.eventManager.alterationSelects,
            this.eventManager.difficultySelect
        );
    }

    // Clean up resources
    destroy() {
        this.eventManager.cleanup();
        // Clear any other resources
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AlterationApp();
    app.initialize();
    
    // Optional: Expose app for debugging or advanced usage
    window.alterationApp = app;
});]

refactor the codebase into more maintainable, testable and upgradeable modules:
1. do not change the code 1 and code 2
1. preserve the functionality and behavior
2. add comments
3. explain how each module interacts with others
4. explain how the program flow works
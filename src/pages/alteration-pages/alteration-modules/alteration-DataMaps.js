export const alterationMaps = {
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
};
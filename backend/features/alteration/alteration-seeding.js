const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'alteration-database.sqlite');
const db = new sqlite3.Database(dbPath);

const alterationSeedData = [
  // ------------------------- Female Bottom -------------------------
  {
    category: 'female-bottom',
    service_key: 'female-bottom-hem-skirt-straight-slim',
    label: 'hem skirt straight slim',
    description: 'Shorten hem on straight or slim skirt, maintaining original line and finish',
    simple_price: 33,
    intermediate_price: 44,
    difficult_price: 55
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-hem-full/circle-unlined-skirt',
    label: 'hem full/circle unlined skirt',
    description: 'Shorten hem on unlined full or circle skirt, managing flare distribution',
    simple_price: 44,
    intermediate_price: 66,
    difficult_price: 88
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-hem-full/circle-lined-skirt',
    label: 'hem full/circle lined skirt',
    description: 'Shorten hem on lined full/circle skirt, adjusting both outer fabric and lining layers evenly',
    simple_price: 66,
    intermediate_price: 77,
    difficult_price: 93.5
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-hem-unlined-pants',
    label: 'hem unlined pants',
    description: 'Shorten pant legs on unlined trousers, preserving original break and taper',
    simple_price: 44,
    intermediate_price: 66,
    difficult_price: 88
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-hem-lined-pants',
    label: 'hem lined pants',
    description: 'Shorten pant legs on lined trousers, adjusting both outer fabric and lining layers',
    simple_price: 66,
    intermediate_price: 88,
    difficult_price: 110
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-take-in-side-seams-unlined-pants',
    label: 'take-in side seams unlined pants',
    description: 'Take in side seams on unlined pants to reduce waist/hip circumference',
    simple_price: 44,
    intermediate_price: 66,
    difficult_price: 88
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-take-in-side-seams-lined-pants',
    label: 'take-in side seams lined pants',
    description: 'Take in side seams on lined pants, adjusting both outer fabric and lining layers',
    simple_price: 66,
    intermediate_price: 88,
    difficult_price: 110
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-taper-legs-unlined-pants',
    label: 'taper legs unlined pants',
    description: 'Narrow pant legs from knee to hem on unlined trousers',
    simple_price: 44,
    intermediate_price: 66,
    difficult_price: 88
  },
  {
    category: 'female-bottom',
    service_key: 'female-bottom-taper-legs-lined-pants',
    label: 'taper legs lined pants',
    description: 'Narrow pant legs from knee to hem on lined trousers, adjusting both outer fabric and lining layers',
    simple_price: 66,
    intermediate_price: 88,
    difficult_price: 110
  },

  // ------------------------- Female Dress: Bodice -------------------------
  {
    category: 'female-dress',
    service_key: 'female-dress-halter-neckline',
    label: 'halter neckline',
    description: 'Adjust halter neckline for proper fit and support',
    simple_price: 20,
    intermediate_price: 30,
    difficult_price: 40
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-take-in-neckline',
    label: 'take in neckline',
    description: 'Take in neckline to reduce gaping or improve fit',
    simple_price: 15,
    intermediate_price: 25,
    difficult_price: 35
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-line-bind-neckline',
    label: 'line/bind neckline',
    description: 'Line and bind neckline edges for finished look',
    simple_price: 15,
    intermediate_price: 20,
    difficult_price: 25
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-take-in-shoulders',
    label: 'take in shoulders',
    description: 'Adjust shoulder seams to lift bodice',
    simple_price: 20,
    intermediate_price: 35,
    difficult_price: 50
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-shorten-straps',
    label: 'shorten straps per set (2)',
    description: 'Shorten dress straps for proper length',
    simple_price: 10,
    intermediate_price: 0,
    difficult_price: 20
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-coordinating-straps',
    label: 'coordinating add on straps',
    description: 'Coordinate multiple straps for even alignment',
    simple_price: 20,
    intermediate_price: 0,
    difficult_price: 30
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-adjust-slide-bust',
    label: 'adjust-slide-bust',
    description: 'Adjust bust area for proper fit and support',
    simple_price: 35,
    intermediate_price: 50,
    difficult_price: 65
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-take-in-zipper',
    label: 'take in zipper',
    description: 'Take in side seams including zipper adjustment',
    simple_price: 30,
    intermediate_price: 50,
    difficult_price: 65
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-reshape-armhole',
    label: 'reshape armhole',
    description: 'Reshape armhole for comfort and appearance',
    simple_price: 15,
    intermediate_price: 20,
    difficult_price: 25
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-shorten-bodice',
    label: 'shorten bodice',
    description: 'Shorten bodice length from shoulder or waist',
    simple_price: 40,
    intermediate_price: 50,
    difficult_price: 60
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-gusset',
    label: 'add gusset, cust, provides fabric',
    description: 'Add fabric gusset for additional room',
    simple_price: 40,
    intermediate_price: 50,
    difficult_price: 65
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-temple-fill-bodice',
    label: 'temple fill bodice front/back **customer provides fabric**',
    description: 'Add temple fill for bodice structure',
    simple_price: 30,
    intermediate_price: 40,
    difficult_price: 50
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-additional-coverage',
    label: 'additional bra or back coverage **customer provides fabric**',
    description: 'Add fabric for additional coverage',
    simple_price: 15,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-corset-back',
    label: 'add pre made corset back',
    description: 'Install corset back closure system',
    simple_price: 15,
    intermediate_price: 0,
    difficult_price: 115
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-corset-ties',
    label: 'corset ties (36 inches)',
    description: 'Add or replace corset ties',
    simple_price: 20,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-modesty-panel',
    label: 'add pre made modesty',
    description: 'Add modesty panel for back coverage',
    simple_price: 30,
    intermediate_price: 0,
    difficult_price: 0
  },

  // ------------------------- Female Dress: Sleeve -------------------------
  {
    category: 'female-dress',
    service_key: 'female-dress-shorten-sleeve',
    label: 'shorten sleeve',
    description: 'Shorten sleeve length',
    simple_price: 35,
    intermediate_price: 45,
    difficult_price: 55
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-take-in-let-out-sleeve',
    label: 'take in/let out sleeve',
    description: 'Adjust sleeve width through seams',
    simple_price: 15,
    intermediate_price: 25,
    difficult_price: 35
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-take-in-elastic',
    label: 'take in elastic',
    description: 'Take in sleeve using elastic',
    simple_price: 10,
    intermediate_price: 20,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-lingerie',
    label: 'add lingerie straps',
    description: 'Add lingerie straps or supports',
    simple_price: 10,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-reset-sleeve',
    label: 'reset sleeve (may need to cut down armhole)',
    description: 'Remove and reset sleeve for better fit',
    simple_price: 25,
    intermediate_price: 35,
    difficult_price: 45
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-reshape-armholes',
    label: 'reshape/reset armholes/sleeves',
    description: 'Reshape armholes for sleeve attachment',
    simple_price: 10,
    intermediate_price: 20,
    difficult_price: 30
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-temple-fill-sleeves',
    label: 'temple fill sleeves **customer provides fabric**',
    description: 'Add temple fill to sleeves',
    simple_price: 40,
    intermediate_price: 50,
    difficult_price: 60
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-cap-sleeve-1',
    label: 'cap sleeve 1',
    description: 'Add basic cap sleeves',
    simple_price: 40,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-cap-sleeve-2',
    label: 'cap sleeve 2',
    description: 'Add detailed cap sleeves',
    simple_price: 40,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-flutter-sleeve',
    label: 'flutter sleeve',
    description: 'Add flutter sleeves',
    simple_price: 40,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-short-sleeve-ss1',
    label: 'short sleeve SS1',
    description: 'Add short sleeves style 1',
    simple_price: 50,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-long-sleeve-ls1',
    label: 'long sleeve LS1',
    description: 'Add long sleeves style 1',
    simple_price: 60,
    intermediate_price: 0,
    difficult_price: 0
  },

  // ------------------------- Female Dress: Skirt -------------------------
  {
    category: 'female-dress',
    service_key: 'female-dress-hem',
    label: 'hem',
    description: 'Hem skirt to desired length',
    simple_price: 75,
    intermediate_price: 95,
    difficult_price: 120
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-waistband',
    label: 'waistband',
    description: 'Adjust or replace waistband',
    simple_price: 15,
    intermediate_price: 20,
    difficult_price: 25
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-side-seams',
    label: 'side seams',
    description: 'Take in or let out side seams',
    simple_price: 30,
    intermediate_price: 40,
    difficult_price: 50
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-slit',
    label: 'slit',
    description: 'Add or adjust skirt slit',
    simple_price: 10,
    intermediate_price: 15,
    difficult_price: 20
  },

  // ------------------------- Female Dress: Bustle -------------------------
  {
    category: 'female-dress',
    service_key: 'female-dress-over-bustle',
    label: 'over bustle, first three',
    description: 'Create over bustle for train',
    simple_price: 35,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-over-bustle',
    label: 'each additional over bustle button/loop',
    description: 'Add additional over bustle point',
    simple_price: 5,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-under-bustle',
    label: 'under bustle, first three',
    description: 'Create under bustle for train',
    simple_price: 50,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-under-bustle',
    label: 'each additional under bustle button/loop',
    description: 'Add additional under bustle point',
    simple_price: 7,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-royal-bustle',
    label: 'royal bustle, first pull',
    description: 'Create royal bustle style',
    simple_price: 50,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-each-additional-royal',
    label: 'each additional royal bustle pull',
    description: 'Each additional royal bustle point',
    simple_price: 15,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-ballroom-bustle',
    label: 'ballroom bustle first three',
    description: 'Create ballroom bustle style',
    simple_price: 35,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-ballroom-bustle',
    label: 'each additional ballroom bustle button/loop',
    description: 'Add additional ballroom bustle point',
    simple_price: 5,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-bustle-point-each',
    label: 'bustle point/each',
    description: 'Each standard bustle point',
    simple_price: 5,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-ribbon-bustle-point',
    label: 'ribbon rose bustle point **customer provides ribbon**',
    description: 'Ribbon bustle point attachment',
    simple_price: 3,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-wristloop',
    label: 'add wristloop',
    description: 'Add wrist loop for train carrying',
    simple_price: 25,
    intermediate_price: 0,
    difficult_price: 0
  },

  // ------------------------- Female Dress: Veil -------------------------
  {
    category: 'female-dress',
    service_key: 'female-dress-loop_comb',
    label: 'loop/comb',
    description: 'Add loop to comb attachment',
    simple_price: 5,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-velcro_veil',
    label: 'velcro',
    description: 'Add velcro veil attachment',
    simple_price: 10,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-veil_bustle',
    label: 'veil bustle (per hook/eye)',
    description: 'Bustle veil for reception',
    simple_price: 5,
    intermediate_price: 0,
    difficult_price: 0
  },

  // ------------------------- Female Dress: Others -------------------------
  {
    category: 'female-dress',
    service_key: 'female-dress-move-add-hooks-eyes',
    label: 'move/add snaps, hooks and eyes',
    description: 'Move or add hooks and eyes',
    simple_price: 5,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-add-bra-cups',
    label: 'add bra cups',
    description: 'Add bra cups for support',
    simple_price: 20,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-hem-single-layer',
    label: 'hem single layer accessory',
    description: 'Hem single layer garment',
    simple_price: 15,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'female-dress',
    service_key: 'female-dress-hem-slip',
    label: 'hem slip',
    description: 'Hem slip or undergarment',
    simple_price: 30,
    intermediate_price: 25,
    difficult_price: 35
  },

  // ------------------------- Female Jacket -------------------------
  {
    category: 'female-jacket',
    service_key: 'female-jacket-hem-sleeves-unlined',
    label: 'hem sleeves unlined',
    description: 'Shorten sleeves on unlined jacket, adjusting length as needed',
    simple_price: 35,
    intermediate_price: 46,
    difficult_price: 58
  },
  {
    category: 'female-jacket',
    service_key: 'female-jacket-hem-sleeves-lined',
    label: 'hem sleeves lined',
    description: 'Shorten sleeves on lined jacket, adjusting both outer fabric and lining',
    simple_price: 46,
    intermediate_price: 69,
    difficult_price: 92
  },
  {
    category: 'female-jacket',
    service_key: 'female-jacket-take-in-waist',
    label: 'take-in waist',
    description: 'Take in waist area for better fit through midsection',
    simple_price: 69,
    intermediate_price: 81,
    difficult_price: 98
  },
  {
    category: 'female-jacket',
    service_key: 'female-jacket-taper-sides-unlined',
    label: 'taper sides unlined',
    description: 'Taper side seams on unlined jacket to reduce width',
    simple_price: 35,
    intermediate_price: 46,
    difficult_price: 58
  },
  {
    category: 'female-jacket',
    service_key: 'female-jacket-taper-sides-lined',
    label: 'taper sides lined',
    description: 'Taper side seams on lined jacket, adjusting both outer fabric and lining',
    simple_price: 46,
    intermediate_price: 69,
    difficult_price: 92
  },
  {
    category: 'female-jacket',
    service_key: 'female-jacket-shorten-length',
    label: 'shorten length',
    description: 'Shorten overall jacket length, adjusting hem and proportions',
    simple_price: 69,
    intermediate_price: 81,
    difficult_price: 98
  },

  // ------------------------- Female Top -------------------------
  {
    category: 'female-top',
    service_key: 'female-top-shorten-straps',
    label: 'shorten straps',
    description: 'Shorten shoulder straps for proper fit and support',
    simple_price: 40,
    intermediate_price: 50,
    difficult_price: 65
  },
  {
    category: 'female-top',
    service_key: 'female-top-take-in-unlined',
    label: 'take-in unlined',
    description: 'Take in side seams to reduce width for better fit',
    simple_price: 50,
    intermediate_price: 75,
    difficult_price: 95
  },
  {
    category: 'female-top',
    service_key: 'female-top-take-in-lined',
    label: 'take-in lined',
    description: 'Take in side seams of lined top, adjusting both layers',
    simple_price: 75,
    intermediate_price: 85,
    difficult_price: 105
  },
  {
    category: 'female-top',
    service_key: 'female-top-hem-unlined',
    label: 'hem unlined',
    description: 'Shorten hem length of unlined top',
    simple_price: 50,
    intermediate_price: 75,
    difficult_price: 95
  },
  {
    category: 'female-top',
    service_key: 'female-top-hem-lined',
    label: 'hem lined',
    description: 'Shorten hem length of lined top, adjusting both layers',
    simple_price: 75,
    intermediate_price: 95,
    difficult_price: 120
  },
  {
    category: 'female-top',
    service_key: 'female-top-hem-sleeves-unlined',
    label: 'hem sleeves unlined',
    description: 'Shorten sleeves on unlined top',
    simple_price: 50,
    intermediate_price: 75,
    difficult_price: 95
  },
  {
    category: 'female-top',
    service_key: 'female-top-hem-sleeves-lined',
    label: 'hem sleeves lined',
    description: 'Shorten sleeves on lined top, adjusting both layers',
    simple_price: 60,
    intermediate_price: 95,
    difficult_price: 130
  },

  // ------------------------- Male Bottom -------------------------
  {
    category: 'male-bottom',
    service_key: 'male-bottom-hem-unlined-pants',
    label: 'hem unlined pants',
    description: 'Shorten or lengthen unlined pants by adjusting the hem',
    simple_price: 29,
    intermediate_price: 41,
    difficult_price: 52
  },
  {
    category: 'male-bottom',
    service_key: 'male-bottom-hem-lined-pants',
    label: 'hem lined pants',
    description: 'Shorten or lengthen lined pants, requiring extra work to preserve lining',
    simple_price: 35,
    intermediate_price: 46,
    difficult_price: 58
  },
  {
    category: 'male-bottom',
    service_key: 'male-bottom-take-in-unlined-pants',
    label: 'take-in unlined pants',
    description: 'Take in waist or seat of unlined pants for better fit',
    simple_price: 52,
    intermediate_price: 69,
    difficult_price: 87
  },
  {
    category: 'male-bottom',
    service_key: 'male-bottom-take-in-lined-pants',
    label: 'take-in lined pants',
    description: 'Take in waist or seat of lined pants, requiring lining adjustments',
    simple_price: 58,
    intermediate_price: 75,
    difficult_price: 92
  },
  {
    category: 'male-bottom',
    service_key: 'male-bottom-taper-unlined-pants',
    label: 'taper unlined pants',
    description: 'Narrow pants legs from thigh to ankle for slimmer fit on unlined pants',
    simple_price: 41,
    intermediate_price: 52,
    difficult_price: 64
  },
  {
    category: 'male-bottom',
    service_key: 'male-bottom-taper-lined-pants',
    label: 'bottom taper lined-pants',
    description: 'Narrow pants legs from thigh to ankle on lined pants with lining adjustments',
    simple_price: 46,
    intermediate_price: 58,
    difficult_price: 75
  },

  // ------------------------- Male Suits -------------------------
  {
    category: 'male-suits',
    service_key: 'male-suits-vest-take-in-side-seam',
    label: 'take-in side seam',
    description: 'Take in or let out vest side seams for proper torso fit',
    simple_price: 30,
    intermediate_price: 45,
    difficult_price: 60
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-vest-take-in-shoulder',
    label: 'take-in shoulder',
    description: 'Adjust vest shoulder width by taking in shoulder seams',
    simple_price: 25,
    intermediate_price: 40,
    difficult_price: 55
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-vest-reshape-armhole',
    label: 'reshape armholes',
    description: 'Reshape vest armholes for better fit and movement',
    simple_price: 30,
    intermediate_price: 45,
    difficult_price: 65
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-hem-sleeves-unlined',
    label: 'hem sleeves unlined',
    description: 'Shorten unlined jacket sleeves from the shoulder seam',
    simple_price: 45,
    intermediate_price: 65,
    difficult_price: 85
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-hem-sleeves-lined',
    label: 'hem sleeves lined',
    description: 'Shorten lined jacket sleeves from the shoulder seam',
    simple_price: 45,
    intermediate_price: 65,
    difficult_price: 85
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-take-in-waist',
    label: 'take-in waist',
    description: 'Take in jacket waist for a more fitted silhouette',
    simple_price: 50,
    intermediate_price: 70,
    difficult_price: 90
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-taper-sides',
    label: 'taper sides',
    description: 'Taper jacket side seams from armpit to waist',
    simple_price: 50,
    intermediate_price: 70,
    difficult_price: 90
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-shoulder-take-in',
    label: 'shoulder take-in',
    description: 'Take in jacket shoulders for improved shoulder line and fit',
    simple_price: 55,
    intermediate_price: 75,
    difficult_price: 95
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-reshape-armhole',
    label: 'reshape armhole',
    description: 'Reshape jacket armholes for better sleeve attachment and comfort',
    simple_price: 45,
    intermediate_price: 65,
    difficult_price: 85
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-jacket-back-seam',
    label: 'back-seam',
    description: 'Take in jacket center back seam for improved back fit',
    simple_price: 40,
    intermediate_price: 60,
    difficult_price: 80
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-pants-take-in-waist',
    label: 'take-in waist',
    description: 'Take in pants waistband for proper waist fit',
    simple_price: 30,
    intermediate_price: 45,
    difficult_price: 60
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-pants-adjust-length',
    label: 'adjust length',
    description: 'Adjust pants length by hemming or letting down',
    simple_price: 25,
    intermediate_price: 35,
    difficult_price: 50
  },
  {
    category: 'male-suits',
    service_key: 'male-suits-pants-side-taper',
    label: 'side taper',
    description: 'Taper pants from thigh to ankle for slimmer fit',
    simple_price: 35,
    intermediate_price: 55,
    difficult_price: 75
  },

  // ------------------------- Male Top -------------------------
  {
    category: 'male-top',
    service_key: 'male-top-shorten-straps',
    label: 'shorten straps',
    description: 'Shorten or lengthen shoulder straps on tops, tank tops, or overalls',
    simple_price: 35,
    intermediate_price: 49,
    difficult_price: 63
  },
  {
    category: 'male-top',
    service_key: 'male-top-hem-sleeves',
    label: 'hem sleeves',
    description: 'Shorten or lengthen sleeves on shirts, tops, or jackets',
    simple_price: 42,
    intermediate_price: 56,
    difficult_price: 70
  },
  {
    category: 'male-top',
    service_key: 'male-top-take-in-taper',
    label: 'take-in taper',
    description: 'Take in or taper the sides of shirts or tops for a better fit',
    simple_price: 63,
    intermediate_price: 83,
    difficult_price: 105
  },

  // ------------------------- Repair -------------------------
  {
    category: 'repair',
    service_key: 'repair-zippers-on-dress',
    label: 'zippers on dress',
    description: 'Repair or replace zippers on dresses, jumpsuits, or one-piece garments',
    simple_price: 30,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'repair',
    service_key: 'repair-zippers-on-pants',
    label: 'zippers on pants',
    description: 'Repair or replace zippers on pants, trousers, or shorts',
    simple_price: 36,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'repair',
    service_key: 'repair-zippers-on-coats-jackets',
    label: 'zippers on coats/jackets',
    description: 'Repair or replace zippers on coats, jackets, or blazers',
    simple_price: 60,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'repair',
    service_key: 'repair-apply-patches',
    label: 'apply patches',
    description: 'Apply patches to cover holes, tears, or worn areas on garments',
    simple_price: 45,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'repair',
    service_key: 'repair-sew-in-rips-tears',
    label: 'sew-in rips tears',
    description: 'Repair rips, tears, or splits in fabric using stitching techniques',
    simple_price: 35,
    intermediate_price: 0,
    difficult_price: 0
  },
  {
    category: 'repair',
    service_key: 'repair-button-replacement',
    label: 'button replacement',
    description: 'Replace missing or damaged buttons on shirts, jackets, or coats',
    simple_price: 10,
    intermediate_price: 0,
    difficult_price: 0
  }
];

console.log('🌱 Seeding AlterationItem table...');

db.serialize(() => {
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO AlterationItem (
      category,
      service_key,
      label,
      description,
      simple_price,
      intermediate_price,
      difficult_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  let insertedCount = 0;

  alterationSeedData.forEach((item, index) => {
    insertStmt.run(
      item.category,
      item.service_key,
      item.label,
      item.description,
      item.simple_price,
      item.intermediate_price,
      item.difficult_price,
      function (err) {
        if (err) {
          console.error(`❌ Error inserting item ${index + 1} (${item.service_key}):`, err.message);
        } else if (this.changes > 0) {
          insertedCount++;
          console.log(`   ✅ Inserted: ${item.service_key}`);
        }
      }
    );
  });

  insertStmt.finalize(() => {
    console.log(`🎉 Seeding complete. ${insertedCount} record(s) inserted.`);
    db.close(err => {
      if (err) console.error('❌ Error closing database:', err.message);
      else console.log('🔒 Database connection closed.');
    });
  });
});
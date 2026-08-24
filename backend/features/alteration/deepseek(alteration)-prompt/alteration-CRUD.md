**CODE 1 - File:alteration-female-bottom.html**  
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#"  class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--alterations bottom female list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                <label for="alteration-top-Select">Bottom (female):</label>
                <select id="alteration-top-Select">
                    <option id="alteration-type-default" value="" data-link="" hidden></option>
                    <option value="female-bottom-hem-skirt-straight-slim" data-link="">hem skirt straight slim</option>
                    <option value="female-bottom-hem-full/circle-unlined-skirt" data-link="">hem full/circle unlined skirt</option>
                    <option value="female-bottom-hem-full/circle-lined-skirt" data-link="">hem full/circle lined skirt</option>
                    <option value="female-bottom-hem-unlined-pants" data-link="">hem unlined pants</option>
                    <option value="female-bottom-hem-lined-pants" data-link="">hem lined pants</option>
                    <option value="female-bottom-take-in-side-seams-unlined-pants" data-link="">take-in side seams unlined pants</option>
                    <option value="female-bottom-take-in-side-seams-lined-pants" data-link="">take-in side seams lined pants</option>
                    <option value="female-bottom-taper-legs-unlined-pants" data-link="">taper legs unlined pants</option>
                    <option value="female-bottom-taper-legs-lined-pants" data-link="">taper legs lined pants</option>
                    <!-- for unit test only comment when done testing -->
                    <!-- <option value="male-bottom-taper-legs-lined-pants" data-link="">taper legs lined pants</option> -->
                </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                <label for="alterationLevel-diff">Level of difficulty:</label>
                <select id="alterationLevel-diff" class="alteration-select">
                    <option value="" data-link="" hidden></option>
                    <option value="simple" data-link="">simple</option>
                    <option value="intermediate" data-link="">intermediate</option>
                    <option value="difficult" data-link="">difficult</option>
                </select>       
                </div>
                
                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>
]

**CODE 2 - File:alteration-female-dress.html**  
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#"class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                    <!--alterations Dress female list of services-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <!--Bodice-->
                    <label for="alteration-bodice-Select">Bodice: (female)</label>
                    <select id="alteration-bodice-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-dress-halter-neckline" data-link="">halter neckline</option>
                        <option value="female-dress-take-in-neckline" data-link="">take in neckline</option>
                        <option value="female-dress-line-bind-neckline" data-link="">line/bind neckline</option>
                        <option value="female-dress-take-in-shoulders" data-link="">take in shoulders</option>
                        <option value="female-dress-shorten-straps" data-link="">shorten straps per set (2)</option>
                        <option value="female-dress-coordinating-straps" data-link="">coordinating add on straps</option>
                        <option value="female-dress-adjust-slide-bust" data-link="">adjust-slide-bust</option>
                        <option value="female-dress-take-in-zipper" data-link="">take in zipper</option>
                        <option value="female-dress-reshape-armhole" data-link="">reshape armhole</option>
                        <option value="female-dress-shorten-bodice" data-link="">shorten bodice</option>
                        <option value="female-dress-add-gusset" data-link="">add gusset, cust, provides fabric</option>
                        <option value="female-dress-temple-fill-bodice" data-link="">temple fill bodice front/back **customer provides fabric**</option>
                        <option value="female-dress-additional-coverage" data-link="">additional bra or back coverage **customer provides fabric**</option>
                        <option value="female-dress-corset-back" data-link="">add pre made corset back</option>
                        <option value="female-dress-corset-ties" data-link="">corset ties (36 inches)</option>
                        <option value="female-dress-modesty-panel" data-link="">add pre made modesty</option>
                    </select>

                    <!--Sleeve-->
                    <label for="alteration-sleeve-Select">Sleeve:</label>
                    <select id="alteration-sleeve-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-dress-shorten-sleeve" data-link="">shorten sleeve</option>
                        <option value="female-dress-take-in-let-out-sleeve" data-link="">take in/let out sleeve</option>
                        <option value="female-dress-take-in-elastic" data-link="">take in elastic</option>
                        <option value="female-dress-add-lingerie" data-link="">add lingerie straps</option>
                        <option value="female-dress-reset-sleeve" data-link="">reset sleeve (may need to cut down armhole)</option>
                        <option value="female-dress-reshape-armholes" data-link="">reshape/reset armholes/sleeves</option>
                        <option value="female-dress-temple-fill-sleeves" data-link="">temple fill sleeves **customer provides fabric**</option>
                        <option value="female-dress-cap-sleeve-1" data-link="">cap sleeve 1</option>
                        <option value="female-dress-cap-sleeve-2" data-link="">cap sleeve 2</option>
                        <option value="female-dress-flutter-sleeve" data-link="">flutter sleeve</option>
                        <option value="female-dress-short-sleeve-ss1" data-link="">short sleeve SS1</option>
                        <option value="female-dress-long-sleeve-ls1" data-link="">long sleeve LS1</option>
                    </select>

                    <!--Skirt-->
                    <label for="alteration-skirt-select">Skirt:</label>
                    <select id="alteration-skirt-select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-dress-hem" data-link="">hem</option>
                        <option value="female-dress-waistband" data-link="">waistband</option>
                        <option value="female-dress-side-seams" data-link="">side seams</option>
                        <option value="female-dress-slit" data-link="">slit</option>
                    </select>

                    <!--Bustle-->
                    <label for="alteration-bustle-Select">Bustle:</label>
                    <select id="alteration-bustle-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-dress-over-bustle" data-link="">over bustle, first three</option>
                        <option value="female-dress-add-over-bustle" data-link="">each additional over bustle button/loop</option>
                        <option value="female-dress-under-bustle" data-link="">under bustle, first three</option>
                        <option value="female-dress-add-under-bustle" data-link="">each additional under bustle button/loop</option>
                        <option value="female-dress-royal-bustle" data-link="">royal bustle, first pull</option>
                        <option value="female-dress-each-additional-royal" data-link="">each additional royal bustle pull</option>
                        <option value="female-dress-ballroom-bustle" data-link="">ballroom bustle first three</option>
                        <option value="female-dress-add-ballroom-bustle" data-link="">each additional ballroom bustle button/loop</option>
                        <option value="female-dress-bustle-point-each" data-link="">bustle point/each</option>
                        <option value="female-dress-ribbon-bustle-point" data-link="">ribbon rose bustle point **customer provides ribbon**</option>
                        <option value="female-dress-add-wristloop" data-link="">add wristloop</option>
                    </select>

                    <!--Veil-->
                    <label for="alteration-veil-Select">Veil:</label>
                    <select id="alteration-veil-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-dress-loop_comb" data-link="">loop/comb</option>
                        <option value="female-dress-velcro_veil" data-link="">velcro</option>
                        <option value="female-dress-veil_bustle" data-link="">veil bustle (per hook/eye)</option>
                    </select>

                    <!--Others-->
                    <label for="alteration-others-Select">Others:</label>
                    <select id="alteration-others-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-dress-move-add-hooks-eyes" data-link="">move/add snaps, hooks and eyes</option>
                        <option value="female-dress-add-bra-cups" data-link="">add bra cups</option>
                        <option value="female-dress-hem-single-layer" data-link="">hem single layer accessory</option>
                        <option value="female-dress-hem-slip" data-link="">hem slip</option>
                    </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                    <label for="alterationLevel-diff">Level of difficulty:</label>
                    <select id="alterationLevel-diff" class="alteration-select">
                        <option value="" data-link="" hidden></option>
                        <option value="simple" data-link="">simple</option>
                        <option value="intermediate" data-link="">intermediate</option>
                        <option value="difficult" data-link="">difficult</option>
                    </select>
                    
                </div>

                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>    
] 

**CODE 3 - File:**  alteration-female-jacket.html
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--alterations jacket female list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <label for="alteration-top-Select">Jacket (female):</label>
                    <select id="alteration-top-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-jacket-hem-sleeves-unlined" data-link="">hem sleeves unlined</option>
                        <option value="female-jacket-hem-sleeves-lined" data-link="">hem sleeves lined</option>
                        <option value="female-jacket-take-in-waist" data-link="">take-in waist</option>
                        <option value="female-jacket-taper-sides-unlined" data-link="">taper sides unlined</option>
                        <option value="female-jacket-taper-sides-lined" data-link="">taper sides lined</option>
                        <option value="female-jacket-shorten-length" data-link="">shorten length</option>
                    </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                    <label for="alterationLevel-diff">Level of difficulty:</label>
                    <select id="alterationLevel-diff" class="alteration-select">
                        <option value="" data-link="" hidden></option>
                        <option value="simple" data-link="">simple</option>
                        <option value="intermediate" data-link="">intermediate</option>
                        <option value="difficult" data-link="">difficult</option>
                    </select>                  
                </div>
                
                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>
]

**CODE 4 - File:alteration-female-top.html**  
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--alterations Top female list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <label for="alteration-top-Select">Top (female):</label>
                    <select id="alteration-top-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="female-top-shorten-straps" data-link="">shorten straps</option>
                        <option value="female-top-take-in-unlined" data-link="">take-in unlined</option>
                        <option value="female-top-take-in-lined" data-link="">take-in lined</option>
                        <option value="female-top-hem-unlined" data-link="">hem unlined</option>
                        <option value="female-top-hem-lined" data-link="">hem lined</option>
                        <option value="female-top-hem-sleeves-unlined" data-link="">hem sleeves unlined</option>
                        <option value="female-top-hem-sleeves-lined" data-link="">hem sleeves lined</option>
                    </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                <label for="alterationLevel-diff">Level of difficulty:</label>
                <select id="alterationLevel-diff" class="alteration-select">
                    <option value="" data-link="" hidden></option>
                    <option value="simple" data-link="">simple</option>
                    <option value="intermediate" data-link="">intermediate</option>
                    <option value="difficult" data-link="">difficult</option>
                </select>
                                                        
                </div>
                
                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>                        
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>
]

**CODE 5 - File:alteration-male-bottom.html**  
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#"  class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--alterations Bottom male list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <label for="alteration-bottom-Select">Bottom (male):</label>
                    <select id="alteration-bottom-Select" name="alteration-bottom-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="male-bottom-hem-unlined-pants" data-link="">hem unlined pants</option>
                        <option value="male-bottom-hem-lined-pants" data-link="">hem lined pants</option>
                        <option value="male-bottom-take-in-unlined-pants" data-link="">take-in unlined pants</option>
                        <option value="male-bottom-take-in-lined-pants" data-link="">take-in lined pants</option>
                        <option value="male-bottom-taper-unlined-pants" data-link="">taper unlined pants</option>
                        <option value="male-bottom-taper-lined-pants" data-link="">bottom taper lined-pants</option>
                    </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                    <label for="alterationLevel-diff">Level of difficulty:</label>
                    <select id="alterationLevel-diff" class="alteration-select">
                        <option value="" data-link="" hidden></option>
                        <option value="simple" data-link="">simple</option>
                        <option value="intermediate" data-link="">intermediate</option>
                        <option value="difficult" data-link="">difficult</option>
                    </select>      
                </div>
                
                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>    
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html> 
]

**CODE 6 - File:alteration-male-suits.html**
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--alterations Suits male list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <label for="alteration-vest-Select">Vest: (male-suits)</label>
                    <select id="alteration-vest-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="male-suits-vest-take-in-side-seam" data-link="">take-in side seam</option>
                        <option value="male-suits-vest-take-in-shoulder" data-link="">take-in shoulder</option>
                        <option value="male-suits-vest-reshape-armhole" data-link="">reshape armholes</option>
                    </select>

                    <label for="alteration-jacket-Select">Jacket:</label>
                    <select id="alteration-jacket-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="male-suits-jacket-hem-sleeves-unlined" data-link="">hem sleeves unlined</option>
                        <option value="male-suits-jacket-hem-sleeves-lined" data-link="">hem sleeves lined</option>
                        <option value="male-suits-jacket-take-in-waist" data-link="">take-in waist</option>
                        <option value="male-suits-jacket-taper-sides" data-link="">taper sides</option>
                        <option value="male-suits-jacket-shoulder-take-in" data-link="">shoulder take-in</option>
                        <option value="male-suits-jacket-reshape-armhole" data-link="">reshape armhole</option>
                        <option value="male-suits-jacket-back-seam" data-link="">back-seam</option>
                    </select>

                 <label for="alteration-pants-Select">Pants:</label>
                <select id="alteration-pants-Select">
                    <option id="alteration-type-default" value="" data-link="" hidden></option>
                    <option value="male-suits-pants-take-in-waist" data-link="">take-in waist</option>
                    <option value="male-suits-pants-adjust-length" data-link="">adjust length</option>
                    <option value="male-suits-pants-side-taper" data-link="">side taper</option>
                </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                <label for="alterationLevel-diff">Level of difficulty:</label>
                <select id="alterationLevel-diff" class="alteration-select">
                    <option value="" data-link="" hidden></option>
                    <option value="simple" data-link="">simple</option>
                    <option value="intermediate" data-link="">intermediate</option>
                    <option value="difficult" data-link="">difficult</option>
                </select>
                </div>

                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>
]

**CODE 7 - File:alteration-male-top.html**
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">

</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--alterations Top male list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <label for="alteration-top-Select">Top (male):</label>
                    <select id="alteration-top-Select">
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="male-top-shorten-straps" data-link="">shorten straps</option>
                        <option value="male-top-hem-sleeves" data-link="">hem sleeves</option>
                        <option value="male-top-take-in-taper" data-link="">take-in taper</option>
                    </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                    <label for="alterationLevel-diff">Level of difficulty:</label>
                    <select id="alterationLevel-diff" class="alteration-select">
                        <option value="" data-link="" hidden></option>
                        <option value="simple" data-link="">simple</option>
                        <option value="intermediate" data-link="">intermediate</option>
                        <option value="difficult" data-link="">difficult</option>
                    </select>             
                </div>

                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                       <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>
]

**CODE 8 - File:alteration-repair.html**
[
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izzy Alteration</title>
    <!--relative path-->
    <link rel="stylesheet" href="/frontend/public/css/index.css">
    <link rel="stylesheet" href="/frontend/public/css/alteration.css">
</head>
<body>
    <!--Header Section-->
    <header>
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/frontend/pages/index.html">Izzy Alteration</a>
                </div>
                
                <button class="menu-toggle" aria-label="Toggle menu">☰</button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Book an Appointment</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            Account ⌄ 
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/frontend/pages/signup.html" class="dropdown-link">Create</a></li>
                            <li><a href="/frontend/pages/login.html" class="dropdown-link">Log In</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="/frontend/pages/services.html" class="nav-link">Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">About</a>
                    </li>
                    
                
                </ul>
            </div>
        </nav>
    </header>

    <!--Alteration Section-->
    <div class="container">
        <form id="myForm" action="/submit" method="POST">
            <div class="alteration-container">
                <!--Repair list of services-->
                <!--first column-->
                <h2 id="price-list">Price list</h2>      
                <div class="alteration-list">
                    <label for="alteration-top-Select">repair (unisex):</label>
                    <select id="alteration-top-Select">
                        <!--Zippers-->
                        <option id="alteration-type-default" value="" data-link="" hidden></option>
                        <option value="repair-zippers-on-dress" data-link="">zippers on dress</option>
                        <option value="repair-zippers-on-pants" data-link="">zippers on pants</option>
                        <option value="repair-zippers-on-coats-jackets" data-link="">zippers on coats/jackets</option>
                    
                        <!--Tears/Holes-->
                        <option value="repair-apply-patches" data-link="">apply patches</option>
                        <option value="repair-sew-in-rips-tears" data-link="">sew-in rips tears</option>
                    
                        <!-- Buttons -->
                        <option value="repair-button-replacement" data-link="">button replacement</option>                    
                    </select>
                </div>

                <!--alteration level-->
                <!--second column-->
                <div class="alteration-level">
                    <label for="alterationLevel-diff">Level of difficulty:</label>
                    <select id="alterationLevel-diff" class="alteration-select">
                        <option value="" data-link="" hidden></option>
                        <option value="simple" data-link="">simple</option>
                        <option value="intermediate" data-link="">intermediate</option>
                        <option value="difficult" data-link="">difficult</option>
                    </select>                  
                </div>
                
                <!--third column-->
                <!--fee amount calculator-->
                <div class="amount-container">
                    <div class="amount-row">
                        <span id="amount">Amount = </span>
                        <span id="priceCalculation"></span>
                        <div class="button-group">
                            <button id="add-button" type="button" onclick="handleAdd()">Add</button> 
                            <button id="clear-button" type="button" onclick="handleClear()">Clear</button>
                        </div>
                    </div>
                    <!-- depending on the level of difficulty, the price will be calculated accordingly. -->
                    <details open>
                        <summary>note</summary>
                        <p id="alteration-note"></p>
                    </details>
                    <!--description of alteration-->
                    <details open>
                        <summary>description</summary>
                        <p id="alteration-description"></p>
                        <p id="alteration-customer-request"></p>
                    </details>
                    
                    <!--summary detail-->
                    <details open>
                        <summary>order summary</summary>
                        <p id="alteration-type"></p>
                        <p id="alteration-level"></p>
                    </details>
                </div>
            </div>
        </form>
    </div>

    <script src="/frontend/public/js/index.js"></script>
    <script type="module" src="/frontend/pages/alteration-pages/alteration-modules/alteration-Main.js"></script>



</body>
</html>
]

**CODE 9 - File:alteration-CartManager.js**
[
/**
 * Cart Manager - Handles shopping cart functionality
 * Separates cart logic from main calculator
 */
class CartManager {
    constructor() {
        this.cart = [];
        this.nextId = 1; // Add counter
    }

    // Add item to cart
    addItem(description, price) {
        const item = {
            id: this.nextId++, // Use and increment counter
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

export default CartManager;
]

**CODE 10 - File:alteration-DataMaps.js**
[
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
]

**CODE 11 - File:alteration-DOMRenderer.js**
[
/**
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

export default DOMRenderer;
]

**CODE 12 - File:alteration-EventManager.js**
[
/**
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
            // Compare by id instead of reference to avoid test/environment discrepancies
            if (select.id !== currentSelect.id && select.id !== 'alterationLevel-diff') {
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

export default EventManager;
]

**CODE 13 - File:alteration-Main.js**
[
/**
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

// Only run the auto‑initialization in a browser environment
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new AlterationApp();
        app.initialize();
        
        // Optional: Expose app for debugging or advanced usage
        window.alterationApp = app;
    });
}

export default AlterationApp;
]

**CODE 14 - File:alteration-PriceCalculator.js**
[
/**
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

export default PriceCalculator;
]

**CODE 15 - File:alteration-StateManager.js**
[
/**
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

export default StateManager;
]

**CODE 16 - File:measurement-female-migration.js**
[
const sqlite3 = require('sqlite3');
const path = require('path');

// Use absolute path to avoid directory confusion
const dbPath = path.resolve(__dirname, 'measurement-male-database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create table
  db.run(`CREATE TABLE IF NOT EXISTS MaleMeasurement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    neck DECIMAL(5,2),                    -- A
    shoulder_length DECIMAL(5,2),         -- B
    arm_length DECIMAL(5,2),              -- C
    across_front DECIMAL(5,2),            -- D
    chest_circumference DECIMAL(5,2),     -- E
    waist DECIMAL(5,2),                   -- F
    hip_circumference DECIMAL(5,2),       -- G
    total_rise DECIMAL(5,2),              -- H
    thigh DECIMAL(5,2),                   -- I
    knee DECIMAL(5,2),                    -- J    
    calf DECIMAL(5,2),                    -- K 
    ankle DECIMAL(5,2),                   -- L  
    bicep DECIMAL(5,2),                   -- M
    elbow DECIMAL(5,2),                   -- N
    wrist DECIMAL(5,2),                   -- O
    inseam_ankle DECIMAL(5,2),            -- P
    inseam_floor DECIMAL(5,2),            -- Q
    neck_waist DECIMAL(5,2),              -- R
    neck_floor DECIMAL(5,2),              -- S
    waist_floor DECIMAL(5,2),             -- T
    height DECIMAL(5,2),                  -- U  
    client_name TEXT NOT NULL,            
    size_number TEXT,                       
    measurement_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('❌ Error creating MaleMeasurement table:', err.message);
    } else {
      console.log('✅ MaleMeasurement table ready.');
    }
  });

  // Create indexes
  ['client_name', 'measurement_date', 'size_number'].forEach(field => {
    db.run(`CREATE INDEX IF NOT EXISTS idx_malemeasurement_${field} ON MaleMeasurement(${field})`, (err) => {
      if (err) console.error(`❌ Index idx_malemeasurement_${field} failed:`, err.message);
      else console.log(`✅ Index idx_malemeasurement_${field} created.`);
    });
  });

  // Create trigger for auto-updating timestamp
  db.run(`CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
    AFTER UPDATE ON MaleMeasurement
    BEGIN
      UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END`, (err) => {
    if (err) console.error('❌ Trigger creation failed:', err.message);
    else console.log('✅ Trigger update_malemeasurement_timestamp created.');
  });
});

db.close((err) => {
  if (err) console.error('❌ Error closing database:', err.message);
  else console.log('🔒 Database connection closed.');
});
]

**CODE 17 - File:measurement-male-routes.js**
[
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

// Use absolute path like the migration script does
const db = new sqlite3.Database(  process.env.TEST_DATABASE || path.resolve(__dirname, 'measurement-male-database.sqlite'));
const measurementMaleRouter = express.Router();

// GET /api/measurements/male - Get all male measurements
measurementMaleRouter.get('/', (req, res) => {
  db.all('SELECT * FROM MaleMeasurement', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GET /api/measurements/male/:id - Get a specific male measurement by ID
measurementMaleRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM MaleMeasurement WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Measurement not found' });
    }
  });
});

// POST /api/measurements/male - Create a new male measurement
measurementMaleRouter.post('/', (req, res) => {
  const {
    neck,                 // A
    shoulder_length,      // B
    arm_length,           // C
    across_front,         // D  
    chest_circumference,  // E
    waist,                // F
    hip_circumference,    // G
    total_rise,           // H
    thigh,                // I
    knee,                 // J
    calf,                 // K
    ankle,                // L
    bicep,                // M
    elbow,                // N
    wrist,                // O
    inseam_ankle,         // P
    inseam_floor,         // Q
    neck_waist,           // R
    neck_floor,           // S
    waist_floor,          // T
    height,               // U
    client_name,
    size_number,
    measurement_date
  } = req.body;

  // Fixed: now has 24 placeholders (one for each column)
  const sql = `INSERT INTO MaleMeasurement (
    neck, shoulder_length, arm_length, across_front, chest_circumference, waist, hip_circumference, total_rise,
    thigh, knee, calf, ankle, bicep, elbow, wrist, inseam_ankle, inseam_floor, neck_waist, neck_floor,
    waist_floor, height, client_name, size_number, measurement_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    neck,                 // A
    shoulder_length,      // B
    arm_length,           // C
    across_front,         // D  
    chest_circumference,  // E
    waist,                // F
    hip_circumference,    // G
    total_rise,           // H
    thigh,                // I
    knee,                 // J
    calf,                 // K
    ankle,                // L
    bicep,                // M
    elbow,                // N
    wrist,                // O
    inseam_ankle,         // P
    inseam_floor,         // Q
    neck_waist,           // R
    neck_floor,           // S
    waist_floor,          // T
    height,               // U
    client_name,
    size_number,
    measurement_date
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// PUT /api/measurements/male/:id - Update an existing male measurement
measurementMaleRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const {
    neck,                 // A
    shoulder_length,      // B
    arm_length,           // C
    across_front,         // D  
    chest_circumference,  // E
    waist,                // F
    hip_circumference,    // G
    total_rise,           // H
    thigh,                // I
    knee,                 // J
    calf,                 // K
    ankle,                // L
    bicep,                // M
    elbow,                // N
    wrist,                // O
    inseam_ankle,         // P
    inseam_floor,         // Q
    neck_waist,           // R
    neck_floor,           // S
    waist_floor,          // T
    height,               // U
    client_name,
    size_number,
    measurement_date
  } = req.body;

  const sql = `UPDATE MaleMeasurement SET
    neck = ?, shoulder_length = ?, arm_length = ?, across_front = ?, chest_circumference = ?, waist = ?,
    hip_circumference = ?, total_rise = ?, thigh = ?, knee = ?, calf = ?, ankle = ?, bicep = ?, elbow = ?, wrist = ?, inseam_ankle = ?, inseam_floor = ?, neck_waist = ?, neck_floor = ?,
    waist_floor = ?, height = ?, client_name = ?, size_number = ?, measurement_date = ?
    WHERE id = ?`;

  const params = [
    neck,                 // A
    shoulder_length,      // B
    arm_length,           // C
    across_front,         // D  
    chest_circumference,  // E
    waist,                // F
    hip_circumference,    // G
    total_rise,           // H
    thigh,                // I
    knee,                 // J
    calf,                 // K
    ankle,                // L
    bicep,                // M
    elbow,                // N
    wrist,                // O
    inseam_ankle,         // P
    inseam_floor,         // Q
    neck_waist,           // R
    neck_floor,           // S
    waist_floor,          // T
    height,               // U
    client_name,
    size_number,
    measurement_date,
    id
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Measurement not found' });
    } else {
      res.json({ message: 'Measurement updated successfully' });
    }
  });
});

// DELETE /api/measurements/male/:id - Delete a male measurement
measurementMaleRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM MaleMeasurement WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Measurement not found' });
    } else {
      res.json({ message: 'Measurement deleted successfully' });
    }
  });
});

 
module.exports = measurementMaleRouter;
]

**CODE 18 - File:measurement-male-seeding.js**
[
// =============================================================================
// File: backend/features/measurement/male/measurement-male-seeding.js
// HOW TO RUN:
//   From the project root, go to the backend directory and execute:
//   node features/measurement/male/measurement-male-seeding.js
//   OR, if you are already in the "male" folder:
//   node measurement-male-seeding.js
// =============================================================================

const sqlite3 = require('sqlite3');
const path = require('path');

// Path to the database file (same database used by the migration script and routes)
const dbPath = path.resolve(__dirname, 'measurement-male-database.sqlite');
const db = new sqlite3.Database(dbPath);

// -----------------------------------------------------------------------------
// Sample measurement data to seed (4 records, can be extended as needed)
// -----------------------------------------------------------------------------
const sampleMeasurements = [
  {
    neck: 38.0,
    shoulder_length: 16.5,
    arm_length: 60.0,
    across_front: 42.0,
    chest_circumference: 98.0,
    waist: 84.0,
    hip_circumference: 102.0,
    total_rise: 28.0,
    thigh: 58.0,
    knee: 37.0,
    calf: 36.0,
    ankle: 24.0,
    bicep: 32.0,
    elbow: 26.0,
    wrist: 18.0,
    inseam_ankle: 76.0,
    inseam_floor: 78.0,
    neck_waist: 44.0,
    neck_floor: 140.0,
    waist_floor: 108.0,
    height: 178.0,
    client_name: 'John Doe',
    size_number: 'M',
    measurement_date: '2025-07-01'
  },
  {
    neck: 40.0,
    shoulder_length: 17.0,
    arm_length: 62.0,
    across_front: 44.0,
    chest_circumference: 104.0,
    waist: 90.0,
    hip_circumference: 108.0,
    total_rise: 30.0,
    thigh: 62.0,
    knee: 39.0,
    calf: 38.0,
    ankle: 25.5,
    bicep: 34.0,
    elbow: 28.0,
    wrist: 19.0,
    inseam_ankle: 79.0,
    inseam_floor: 81.0,
    neck_waist: 46.0,
    neck_floor: 144.0,
    waist_floor: 112.0,
    height: 182.0,
    client_name: 'Michael Smith',
    size_number: 'L',
    measurement_date: '2025-07-05'
  },
  {
    neck: 37.0,
    shoulder_length: 16.0,
    arm_length: 58.0,
    across_front: 40.0,
    chest_circumference: 92.0,
    waist: 78.0,
    hip_circumference: 96.0,
    total_rise: 26.0,
    thigh: 54.0,
    knee: 35.0,
    calf: 34.0,
    ankle: 22.5,
    bicep: 30.0,
    elbow: 24.5,
    wrist: 17.0,
    inseam_ankle: 73.0,
    inseam_floor: 75.0,
    neck_waist: 42.0,
    neck_floor: 136.0,
    waist_floor: 104.0,
    height: 175.0,
    client_name: 'Robert Johnson',
    size_number: 'S',
    measurement_date: '2025-07-10'
  },
  {
    neck: 42.0,
    shoulder_length: 18.0,
    arm_length: 64.0,
    across_front: 46.0,
    chest_circumference: 110.0,
    waist: 96.0,
    hip_circumference: 114.0,
    total_rise: 32.0,
    thigh: 66.0,
    knee: 41.0,
    calf: 40.0,
    ankle: 27.0,
    bicep: 36.0,
    elbow: 30.0,
    wrist: 20.0,
    inseam_ankle: 82.0,
    inseam_floor: 84.0,
    neck_waist: 48.0,
    neck_floor: 148.0,
    waist_floor: 116.0,
    height: 185.0,
    client_name: 'David Williams',
    size_number: 'XL',
    measurement_date: '2025-07-15'
  }
];

// -----------------------------------------------------------------------------
// Insert seed data (no pre‑check – always adds the sample rows)
// -----------------------------------------------------------------------------
console.log('🌱 Seeding MaleMeasurement table...');

db.serialize(() => {
  // Prepare the insert statement once
  const insertStmt = db.prepare(`
    INSERT INTO MaleMeasurement (
      neck, shoulder_length, arm_length, across_front, chest_circumference,
      waist, hip_circumference, total_rise,
      thigh, knee, calf, ankle, bicep, elbow, wrist,
      inseam_ankle, inseam_floor, neck_waist, neck_floor,
      waist_floor, height, client_name, size_number, measurement_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let insertedCount = 0;
  sampleMeasurements.forEach((m, index) => {
    insertStmt.run(
      m.neck, m.shoulder_length, m.arm_length, m.across_front,
      m.chest_circumference, m.waist, m.hip_circumference, m.total_rise,
      m.thigh, m.knee, m.calf, m.ankle, m.bicep, m.elbow, m.wrist,
      m.inseam_ankle, m.inseam_floor, m.neck_waist, m.neck_floor,
      m.waist_floor, m.height, m.client_name, m.size_number, m.measurement_date,
      function (err) {
        if (err) {
          console.error(`❌ Error inserting sample ${index + 1} (${m.client_name}):`, err.message);
        } else {
          insertedCount++;
          console.log(`   ✅ Inserted: ${m.client_name} (ID: ${this.lastID})`);
        }
      }
    );
  });

  // Finalize the statement and close the database when all insert attempts are done
  insertStmt.finalize(() => {
    console.log(`🎉 Seeding complete. ${insertedCount} record(s) added.`);
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('🔒 Database connection closed.');
      }
    });
  });
});
]

**CODE 19 - File:server.js**
[
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');

const apiRouter = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', apiRouter);

// Basic error logging (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});
app.use(errorhandler());

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});

module.exports = app;
]

**CODE 20 - File:package.json**
[
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test:measurements": "mocha test/measurement/measurement-female.test.js test/measurement/measurement-male.test.js --timeout 5000",
    "test:female": "mocha test/measurement/measurement-female.test.js --timeout 5000",
    "test:male": "mocha test/measurement/measurement-male.test.js --timeout 5000"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^2.2.2",
    "cors": "^2.8.6",
    "errorhandler": "^1.5.2",
    "express": "^5.2.1",
    "morgan": "^1.10.1",
    "random-flat-colors": "^1.0.4",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-router-dom": "^4.2.2",
    "sqlite3": "^5.1.7",
    "whatwg-fetch": "^2.0.3"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "chai": "^6.2.2",
    "chai-http": "^5.1.2",
    "mocha": "^11.7.5",
    "supertest": "^7.2.2",
    "webpack": "^3.5.5"
  }
}  
]

**CODE 21 - File:api.js**
[
const express = require('express');
const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes');
const measurementFemaleRouter = require('./features/measurement/female/measurement-female-routes'); // <-- changed variable name

const apiRouter = express.Router();

apiRouter.use('/measurements/male', measurementMaleRouter);
apiRouter.use('/measurements/female', measurementFemaleRouter);

module.exports = apiRouter;
]

**CODE 22 - File:README.md**
[

```
Izzy-Alteration
├─ Package-list.md
├─ backend
│  ├─ api.js
│  ├─ backend-deepseek-prompt
│  │  ├─ features-measurement-routes-migration.md
│  │  ├─ measurement-API-postman-test.md
│  │  ├─ measurement-male-routes-migration-test.md
│  │  └─ measurement-unit-test.md
│  ├─ features
│  │  ├─ alteration
│  │  │  └─ deepseek(alteration)-prompt
│  │  │     └─ alteration-CRUD.md
│  │  └─ measurement
│  │     ├─ Instruction(migration script).md
│  │     ├─ female
│  │     │  ├─ measurement-female-migration.js
│  │     │  ├─ measurement-female-routes.js
│  │     │  └─ measurement-female-seeding.js
│  │     └─ male
│  │        ├─ measurement-male-migration.js
│  │        ├─ measurement-male-routes.js
│  │        └─ measurement-male-seeding.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postman
│  │  └─ measurment-API-test
│  │     ├─ female-measurements-crud-tests.postman_collection.json
│  │     └─ male-measurements-crud-tests.postman_collection.json
│  ├─ server.js
│  └─ test
│     └─ measurement
│        ├─ Instruction-measurement-test.md
│        ├─ measurement-female.test.js
│        └─ measurement-male.test.js
├─ deepseek-template-prompt(utilize this)
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ pages
│  │  ├─ account-menu.html
│  │  ├─ add-service.html
│  │  ├─ alteration-pages
│  │  │  ├─ alteration-about
│  │  │  │  ├─ (debug)alteration-modules.md
│  │  │  │  ├─ alteration(how-the-program-works).md
│  │  │  │  ├─ alteration-female.txt
│  │  │  │  ├─ alteration-functionality-prompt.md
│  │  │  │  ├─ alteration-modules.md
│  │  │  │  └─ alteration-responsive-page.md
│  │  │  ├─ alteration-female-bottom.html
│  │  │  ├─ alteration-female-dress.html
│  │  │  ├─ alteration-female-jacket.html
│  │  │  ├─ alteration-female-top.html
│  │  │  ├─ alteration-male-bottom.html
│  │  │  ├─ alteration-male-suits.html
│  │  │  ├─ alteration-male-top.html
│  │  │  ├─ alteration-modules
│  │  │  │  ├─ alteration-CartManager.js
│  │  │  │  ├─ alteration-DOMRenderer.js
│  │  │  │  ├─ alteration-DataMaps.js
│  │  │  │  ├─ alteration-EventManager.js
│  │  │  │  ├─ alteration-Main.js
│  │  │  │  ├─ alteration-PriceCalculator.js
│  │  │  │  └─ alteration-StateManager.js
│  │  │  └─ alteration-repair.html
│  │  ├─ index.html
│  │  ├─ login.html
│  │  ├─ measurement-pages
│  │  │  ├─ measurement-about
│  │  │  │  ├─ (debug)floating-window-measurement.md
│  │  │  │  ├─ (debug)measurement-split-modules.md
│  │  │  │  ├─ (refactor)measurement-modules.md
│  │  │  │  ├─ measurement(how-the-program-works).md
│  │  │  │  ├─ measurement-functionality-prompt.md
│  │  │  │  ├─ measurement-modules.md
│  │  │  │  └─ measurements-about.txt
│  │  │  ├─ measurement-modules
│  │  │  │  ├─ measurement-DataMaps.js
│  │  │  │  ├─ measurement-Main.js
│  │  │  │  ├─ measurement-Manager.js
│  │  │  │  ├─ measurement-Validator.js
│  │  │  │  └─ measurement-ViewHandler.js
│  │  │  ├─ measurements-female.html
│  │  │  ├─ measurements-male.html
│  │  │  └─ sample.html
│  │  ├─ order-history.html
│  │  ├─ services.html
│  │  └─ signup.html
│  ├─ public
│  │  ├─ css
│  │  │  ├─ account-menu.css
│  │  │  ├─ add-service.css
│  │  │  ├─ alteration-female.css
│  │  │  ├─ alteration.css
│  │  │  ├─ index.css
│  │  │  ├─ login.css
│  │  │  ├─ measurements.css
│  │  │  ├─ order-history.css
│  │  │  ├─ services.css
│  │  │  └─ signup.css
│  │  ├─ images
│  │  │  ├─ female-(chart)-tablet-mobile.png
│  │  │  ├─ female-back-tablet-mobile.png
│  │  │  ├─ female-desktop.png
│  │  │  ├─ female-front-tablet-mobile.png
│  │  │  ├─ male-(chart)-tablet-mobile.png
│  │  │  ├─ male-back-tablet-mobile.png
│  │  │  ├─ male-desktop.png
│  │  │  └─ male-front-tablet-mobile.png
│  │  └─ js
│  │     ├─ account.js
│  │     ├─ add-service.js
│  │     ├─ alteration-female.js
│  │     ├─ alteration-price-calculator.js
│  │     ├─ index.js
│  │     ├─ login.js
│  │     ├─ order-history.js
│  │     ├─ services.js
│  │     └─ signup.js
│  └─ test
│     ├─ TEST(how to run).md
│     ├─ alteration-module-tests
│     │  ├─ alteration-TEST(about)
│     │  │  ├─ (debug)alteration-test-unit.md
│     │  │  ├─ (refactor)alteration-test-unit.md
│     │  │  └─ alteration-unit-tests-prompt.md
│     │  └─ unit
│     │     ├─ alteration-CartManager.test.js
│     │     ├─ alteration-DOMRenderer.test.js
│     │     ├─ alteration-DataMaps.test.js
│     │     ├─ alteration-EventManager.test.js
│     │     ├─ alteration-Main.test.js
│     │     ├─ alteration-PriceCalculator.test.js
│     │     └─ alteration-StateManager.test.js
│     └─ measurement-module-tests
│        ├─ measurement-TEST(about)
│        │  ├─ (debug)measurement-test-unit.md
│        │  ├─ (refactor)measurement-test-unit.md
│        │  └─ measurement-unit-tests-prompt.md
│        └─ unit
│           ├─ measurement-DataMaps.test.js
│           ├─ measurement-Main.test.js
│           ├─ measurement-Manager.test.js
│           ├─ measurement-Validator.test.js
│           └─ measurement-ViewHandler.test.js
├─ package-lock.json
└─ package.json

```
]

**ERROR/ISSUE:**
[
  none
]

**REQUEST:**
[  
1. design and implement CRUD operations with RESTful API backend that would work for frontend pages and modules on CODE 1 - CODE 15
2. utilize the structure for CODE 16 - CODE 18 as reference  
3. create a mocha test and provide instruction how to use.  
4. create a postman API test and provide instruction how to use.
5. update CODE 19 - CODE 21 if necessary 
6. utilize CODE 22 as reference for placement of new files
]
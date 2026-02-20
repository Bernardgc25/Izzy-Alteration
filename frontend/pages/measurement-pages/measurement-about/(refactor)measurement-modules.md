
**CODE 1 - File: measurements-female.html**
[
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Body Measurements</title>
        <link rel="stylesheet" href="/frontend/public/css/index.css">
        <link rel="stylesheet" href="/frontend/public/css/measurements.css">
        <link rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
                                <li><a href="/frontend/pages/index.html" class="dropdown-link">Log Out</a></li>
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

        <!--Main Content Section-->
        <div class="container">
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
        </div> 
    
        <script src="/frontend/public/js/index.js"></script>
        <script type="module" src="/frontend/pages/measurement-pages/measurement-modules/measurement-Main.js"></script>

    </body>
    </html>
]  


**CODE 2 - File: measurement-DataMaps.js**  
[ 
    // measurement-DataMaps.js

    export const measurementDataMap = {
        // Gender-specific measurement guides and images
        gender: {
            male: {
                imageDesktop: "/frontend/public/images/male-desktop.png",
                // imageMobile: " "
            },
            female: {
                imageDesktop: "/frontend/public/images/female-desktop.png",
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
                    imageMobile: "/frontend/public/images/male-(chart)-tablet-mobile.png"
                },
                "shoulder-length": {
                    object: "Shoulder Length",
                    definition: "Measure from the edge of one shoulder to the edge of the other shoulder.",
                    description: "Place the tape measure from the outer edge of one shoulder bone (acromion) to the other, across the back.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "arm-length": {
                    object: "Arm Length",
                    definition: "Measure from the shoulder point to the wrist bone.",
                    description: "Bend arm slightly at elbow. Measure from the shoulder bone edge, along the outside of the arm, over the elbow, to the wrist bone.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "chest-circumference": {
                    object: "Chest Circumference",
                    definition: "Measure around the fullest part of the chest.",
                    description: "Wrap the tape measure around the fullest part of the chest, under the armpits, and across the shoulder blades. Keep tape parallel to the floor.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "waist": {
                    object: "Waist Circumference",
                    definition: "Measure around the natural waistline.",
                    description: "Find the natural waist (smallest part of torso). Wrap tape measure around waist, keeping it parallel to the floor.",
                    imageMobile: "/frontend/public/images/male-(chart)-tablet-mobile.png"
                },
                "hip-circumference": {
                    object: "Hip Circumference",
                    definition: "Measure around the fullest part of the hips.",
                    description: "Wrap tape measure around the fullest part of the hips/buttocks, keeping it parallel to the floor.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "thigh": {
                    object: "Thigh Circumference",
                    definition: "Measure around the fullest part of the thigh.",
                    description: "Wrap tape measure around the fullest part of the thigh, usually about 1-2 inches below the crotch.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "knee": {
                    object: "Knee Circumference",
                    definition: "Measure around the center of the knee.",
                    description: "With leg slightly bent, measure around the center of the knee cap.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "calf": {
                    object: "Calf Circumference",
                    definition: "Measure around the fullest part of the calf.",
                    description: "Stand with feet apart. Measure around the fullest part of the calf muscle.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "ankle": {
                    object: "Ankle Circumference",
                    definition: "Measure around the narrowest part of the ankle.",
                    description: "Measure around the narrowest part of the ankle, just above the ankle bone.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "bicep": {
                    object: "Bicep Circumference",
                    definition: "Measure around the fullest part of the bicep.",
                    description: "With arm relaxed at side, measure around the fullest part of the bicep.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "elbow": {
                    object: "Elbow Circumference",
                    definition: "Measure around the bent elbow.",
                    description: "Bend arm to 90 degrees. Measure around the elbow at its fullest point with arm bent.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "wrist": {
                    object: "Wrist Circumference",
                    definition: "Measure around the wrist bone.",
                    description: "Measure around the wrist bone, just below the hand. Tape should be snug but not tight.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "inseam-ankle": {
                    object: "Inseam to Ankle",
                    definition: "Measure from crotch to ankle bone.",
                    description: "Stand with legs slightly apart. Measure from the crotch along the inside of the leg to the ankle bone.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "inseam-floor": {
                    object: "Inseam to Floor",
                    definition: "Measure from crotch to floor.",
                    description: "Stand with legs slightly apart. Measure from the crotch straight down to the floor along the inside of the leg.",
                    imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
                },
                "neck-waist": {
                    object: "Neck to Waist",
                    definition: "Measure from nape of neck to natural waist.",
                    description: "Measure from the prominent bone at the base of the neck (C7 vertebra) down the back to the natural waistline.",
                    imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
                },
                "neck-floor": {
                    object: "Neck to Floor",
                    definition: "Measure from nape of neck to floor.",
                    description: "Stand straight. Measure from the prominent bone at the base of the neck (C7 vertebra) straight down to the floor.",
                    imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
                },
                "waist-floor": {
                    object: "Waist to Floor",
                    definition: "Measure from natural waist to floor.",
                    description: "Stand straight. Measure from the natural waistline straight down to the floor.",
                    imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
                },
                "height": {
                    object: "Height",
                    definition: "Total standing height.",
                    description: "Stand straight against a wall without shoes. Measure from the top of the head to the floor.",
                    imageMobile: "/frontend/public/images/male-back-tablet-mobile.png"
                },
                "across-front": {
                    object: "Across Front",
                    definition: "Measure across the front from armhole to armhole.",
                    description: "Measure horizontally across the front from one armhole seam to the other, about 1 inch below the underarm.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                },
                "total-rise": {
                    object: "Total Rise",
                    definition: "Measure from waist front through crotch to waist back.",
                    description: "Measure from the front waistline, through the legs, up to the back waistline. This determines pants fit.",
                    imageMobile: "/frontend/public/images/male-front-tablet-mobile.png"
                }
            },

            female: {
                // Female-specific measurements
                "neck": {
                    object: "Neck Circumference",
                    definition: "Measure around the base of the neck where the collar would normally sit.",
                    description: "Place the tape measure around the base of the neck, keeping it parallel to the floor. Ensure it's not too tight or too loose.",
                    imageMobile: "/frontend/public/images/female-(chart)-tablet-mobile.png"
                },
                "shoulder-length": {
                    object: "Shoulder Length",
                    definition: "Measure from the edge of one shoulder to the edge of the other shoulder.",
                    description: "Place the tape measure from the outer edge of one shoulder bone (acromion) to the other, across the back.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "arm-length": {
                    object: "Arm Length",
                    definition: "Measure from the shoulder point to the wrist bone.",
                    description: "Bend arm slightly at elbow. Measure from the shoulder bone edge, along the outside of the arm, over the elbow, to the wrist bone.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "chest-circumference": {
                    object: "Bust Circumference",
                    definition: "Measure around the fullest part of the bust.",
                    description: "Wrap the tape measure around the fullest part of the bust, keeping it parallel to the floor. Do not compress breast tissue.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "under-bust": {
                    object: "Under Bust",
                    definition: "Measure around the torso directly under the bust.",
                    description: "Wrap tape measure around the ribcage directly under the bust. Keep tape parallel to the floor.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "waist": {
                    object: "Waist Circumference",
                    definition: "Measure around the natural waistline.",
                    description: "Find the natural waist (smallest part of torso). Wrap tape measure around waist, keeping it parallel to the floor.",
                    imageMobile: "/frontend/public/images/female-(chart)-tablet-mobile.png"
                },
                "hip-circumference": {
                    object: "Hip Circumference",
                    definition: "Measure around the fullest part of the hips.",
                    description: "Wrap tape measure around the fullest part of the hips/buttocks, keeping it parallel to the floor.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "hip-bone-circumference": {
                    object: "Hip Bone Circumference",
                    definition: "Measure around the hip bones (iliac crest).",
                    description: "Measure around the top of the hip bones (iliac crest), usually about 3-4 inches below the natural waist.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "thigh": {
                    object: "Thigh Circumference",
                    definition: "Measure around the fullest part of the thigh.",
                    description: "Wrap tape measure around the fullest part of the thigh, usually about 1-2 inches below the crotch.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "knee": {
                    object: "Knee Circumference",
                    definition: "Measure around the center of the knee.",
                    description: "With leg slightly bent, measure around the center of the knee cap.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "calf": {
                    object: "Calf Circumference",
                    definition: "Measure around the fullest part of the calf.",
                    description: "Stand with feet apart. Measure around the fullest part of the calf muscle.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "ankle": {
                    object: "Ankle Circumference",
                    definition: "Measure around the narrowest part of the ankle.",
                    description: "Measure around the narrowest part of the ankle, just above the ankle bone.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "bicep": {
                    object: "Bicep Circumference",
                    definition: "Measure around the fullest part of the bicep.",
                    description: "With arm relaxed at side, measure around the fullest part of the bicep.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "elbow": {
                    object: "Elbow Circumference",
                    definition: "Measure around the bent elbow.",
                    description: "Bend arm to 90 degrees. Measure around the elbow at its fullest point with arm bent.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "wrist": {
                    object: "Wrist Circumference",
                    definition: "Measure around the wrist bone.",
                    description: "Measure around the wrist bone, just below the hand. Tape should be snug but not tight.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "inseam-ankle": {
                    object: "Inseam to Ankle",
                    definition: "Measure from crotch to ankle bone.",
                    description: "Stand with legs slightly apart. Measure from the crotch along the inside of the leg to the ankle bone.",
                    imageMobile: "/frontend/public/images/female-front-tablet-mobile.png"
                },
                "inseam-floor": {
                    object: "Inseam to Floor",
                    definition: "Measure from crotch to floor.",
                    description: "Stand with legs slightly apart. Measure from the crotch straight down to the floor along the inside of the leg.",
                    imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
                },
                "neck-waist": {
                    object: "Neck to Waist",
                    definition: "Measure from nape of neck to natural waist.",
                    description: "Measure from the prominent bone at the base of the neck (C7 vertebra) down the back to the natural waistline.",
                    imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
                },
                "neck-floor": {
                    object: "Neck to Floor",
                    definition: "Measure from nape of neck to floor.",
                    description: "Stand straight. Measure from the prominent bone at the base of the neck (C7 vertebra) straight down to the floor.",
                    imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
                },
                "waist-floor": {
                    object: "Waist to Floor",
                    definition: "Measure from natural waist to floor.",
                    description: "Stand straight. Measure from the natural waistline straight down to the floor.",
                    imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
                },
                "height": {
                    object: "Height",
                    definition: "Total standing height.",
                    description: "Stand straight against a wall without shoes. Measure from the top of the head to the floor.",
                    imageMobile: "/frontend/public/images/female-back-tablet-mobile.png"
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
                imageMobile: "/frontend/public/images/measurements/mobile/cup-size-mobile.jpg"
            },
            "size-number": {
                object: "Size Number",
                definition: "Standard clothing size based on chest/waist measurements.",
                description: "Size number corresponds to chest measurement for men (30=30\", 34=34\", etc.) or dress size for women. Letter indicates height: S=Short, M=Medium, L=Long, XL=Extra Long.",
                imageMobile: "/frontend/public/images/measurements/mobile/size-number-mobile.jpg"
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
    };
]

**CODE 3 - File: measurement-Main.js**
[
    /**
    * Main Application Coordinator
    * Orchestrates interactions between modules
    */
    import { MeasurementValidator } from './measurement-Validator.js';
    import { MeasurementManager } from './measurement-Manager.js';
    import { ViewHandler } from './measurement-ViewHandler.js';

    export class MeasurementApp {
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
    });
]

**CODE 4 - File: measurement-Manager.js**  
[ 
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
]

**CODE 5 - File: measurement-Validator.js**  
[
    /**
    * Measurement Validator - Handles form validation logic
    * Separated from UI concerns for better testability
    */
    export class MeasurementValidator {
        constructor(formElement) {
            if (!formElement) {
                throw new Error('Form element is required');
            }
            
            this.form = formElement;
            this.gender = formElement.dataset?.gender || 'male'; // Default to male if not specified
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
            if (!input) return false;
            
            const value = parseFloat(input.value);
            const min = parseFloat(input.dataset?.min || 0);
            const max = parseFloat(input.dataset?.max || 100);
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
            if (!fieldId) return true;
            
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
            if (!fieldId) return;
            
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
            if (!fieldId) return;
            
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
            
            if (!this.form) return;
            
            // Clear error messages
            const errorMessages = this.form.querySelectorAll('.error-message');
            errorMessages.forEach(el => {
                el.textContent = '';
            });
            
            // Clear error classes from inputs within the form
            const inputs = this.form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.classList.remove('error', 'valid');
            });
        }

        /**
        * Get first error field for focus
        * @returns {HTMLElement|null} First error element
        */
        getFirstErrorField() {
            if (!this.form) return null;
            // Find the first input/select with error class within the form
            return this.form.querySelector('.error');
        }
    }
]

**CODE 6 - File: measurement-ViewHandler.js**
[
   /**
 * View Handler - Manages all UI interactions and display logic
 * Separated from business logic for better maintainability
 */

export class ViewHandler {
    constructor(gender, isMobileView, getMeasurementFunction = null) {
        this.gender = gender;
        this.isMobileView = isMobileView;
        this.debounceTimers = new Map();
        this.eventListeners = new Map();
        this.zoomState = {
            scale: 1.0,
            x: 0,
            y: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        };
        // Store the getMeasurement function reference
        this.getMeasurementFunction = getMeasurementFunction;
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
        
        const genderImage = this.getGenderImage();
        
        if (genderImage) {
            guideImage.src = genderImage;
            guideImage.style.display = 'block';
            defaultGuide.style.display = 'none';
        } else {
            guideImage.style.display = 'none';
            defaultGuide.style.display = 'flex';
        }
    }

    /**
     * Get the appropriate gender image for desktop view
     * @returns {string} Image URL for the gender
     */
    getGenderImage() {
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
        const wheelHandler = (e) => {
            e.preventDefault();
            this.handleZoom(e, image);
        };
        container.addEventListener('wheel', wheelHandler);
        this.eventListeners.set('wheel', { element: container, handler: wheelHandler, type: 'wheel' });
    }

    /**
     * Setup pan events
     */
    setupPanEvents(container, image) {
        const mousedownHandler = (e) => {
            this.startPan(e);
            container.style.cursor = 'grabbing';
        };
        
        const mousemoveHandler = (e) => {
            if (!this.zoomState.isDragging) return;
            this.updatePanPosition(e);
            this.updateImageTransform(image);
        };
        
        const mouseupHandler = () => {
            this.stopPan();
            container.style.cursor = 'grab';
        };
        
        const mouseleaveHandler = () => {
            this.stopPan();
            container.style.cursor = 'default';
        };

        container.addEventListener('mousedown', mousedownHandler);
        container.addEventListener('mousemove', mousemoveHandler);
        container.addEventListener('mouseup', mouseupHandler);
        container.addEventListener('mouseleave', mouseleaveHandler);
        
        this.eventListeners.set('mousedown', { element: container, handler: mousedownHandler, type: 'mousedown' });
        this.eventListeners.set('mousemove', { element: container, handler: mousemoveHandler, type: 'mousemove' });
        this.eventListeners.set('mouseup', { element: container, handler: mouseupHandler, type: 'mouseup' });
        this.eventListeners.set('mouseleave', { element: container, handler: mouseleaveHandler, type: 'mouseleave' });
    }

    /**
     * Setup zoom reset when inputs are focused
     */
    setupZoomResetOnFocus(image) {
        const inputs = document.querySelectorAll('input, select');
        const focusHandlers = [];
        
        inputs.forEach(input => {
            const focusHandler = () => {
                this.resetZoom(image);
            };
            input.addEventListener('focus', focusHandler);
            focusHandlers.push({ element: input, handler: focusHandler, type: 'focus' });
        });
        
        this.eventListeners.set('focus', focusHandlers);
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
        if (!image) return;
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
     * Get measurement data - uses injected function or falls back to import
     */
    getMeasurement(gender, measurementKey) {
        if (this.getMeasurementFunction) {
            return Promise.resolve(this.getMeasurementFunction(gender, measurementKey));
        }
        // Fallback to dynamic import if no function was provided
        return import('./measurement-DataMaps.js')
            .then(module => module.getMeasurement(gender, measurementKey))
            .catch(() => null);
    }

    /**
     * Display measurement guide
     */
    async showMeasurementGuide(measurementKey) {
        try {
            const measurement = await this.getMeasurement(this.gender, measurementKey);
            if (!measurement) return;
            this.updateGuideText(measurement);
        } catch (error) {
            console.warn('Failed to show measurement guide:', error);
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
            'floating-measure-object': measurement.object,
            'floating-measure-definition': measurement.definition,
            'floating-measure-description': measurement.description
        };

        Object.entries(elements).forEach(([id, content]) => {
            const element = document.getElementById(id);
            if (element && content !== undefined) {
                const label = id.includes('object') ? 'Object' : 
                            id.includes('definition') ? 'Definition' : 'Description';
                // Only set innerHTML to preserve HTML tags
                element.innerHTML = `<strong>${label}:</strong> ${content}`;
            }
        });
    }

    /**
     * Show floating guide for mobile
     */
    async showFloatingGuide(measurementKey) {
        try {
            const measurement = await this.getMeasurement(this.gender, measurementKey);
            if (!measurement) return;
            
            this.updateGuideText(measurement);
            await this.updateMobileGuideImage(measurementKey);
            this.showFloatingGuideElements();
        } catch (error) {
            console.warn('Failed to show floating guide:', error);
        }
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
    async updateMobileGuideImage(measurementKey) {
        try {
            const measurement = await this.getMeasurement(this.gender, measurementKey);
            if (!measurement || !measurement.imageMobile) return;
            
            const floatingGuideImages = document.querySelector('.measurement-guide-floating .floating-guide-images');
            if (!floatingGuideImages) return;
            
            floatingGuideImages.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = measurement.imageMobile;
            img.alt = measurement.object || 'Measurement Guide';
            img.className = 'active';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
            
            floatingGuideImages.appendChild(img);
        } catch (error) {
            console.warn('Failed to update mobile guide image:', error);
        }
    }

    /**
     * Setup eye icon listeners for mobile guide
     */
    setupEyeIconListeners(callback) {
        const eyeIcons = document.querySelectorAll('.measurement-label .fa-eye, .measurement-label .fa-regular.fa-eye');
        const clickHandlers = [];
        
        eyeIcons.forEach(icon => {
            const clickHandler = (e) => {
                e.stopPropagation();
                const labelElement = e.target.closest('.measurement-label');
                if (!labelElement) return;
                
                // Find the input element within the same form group
                const formGroup = labelElement.closest('.form-group') || labelElement.parentElement;
                if (!formGroup) return;
                
                const inputElement = formGroup.querySelector('.measurement-input') || 
                                     formGroup.querySelector('input');
                if (!inputElement) return;
                
                const measurementKey = inputElement.dataset.measurement || 
                                      inputElement.getAttribute('data-measurement');
                
                if (measurementKey && this.isMobileView && callback) {
                    callback(measurementKey);
                }
            };
            
            icon.addEventListener('click', clickHandler);
            clickHandlers.push({ element: icon, handler: clickHandler, type: 'click' });
        });
        
        this.eventListeners.set('eyeIcons', clickHandlers);
        return clickHandlers.length > 0; // Return true if listeners were set up
    }

    /**
     * Setup window resize listener
     * @param {Function} callback - Callback when view changes
     */
    setupWindowResizeListener(callback) {
        const handleResize = () => {
            if (this.debounceTimers.has('resize')) {
                clearTimeout(this.debounceTimers.get('resize'));
            }
            
            const timerId = setTimeout(() => {
                const newIsMobileView = window.innerWidth <= 992;
                if (newIsMobileView !== this.isMobileView) {
                    this.isMobileView = newIsMobileView;
                    if (callback) callback(newIsMobileView);
                }
            }, 200);
            
            this.debounceTimers.set('resize', timerId);
        };

        window.addEventListener('resize', handleResize);
        this.eventListeners.set('resize', { element: window, handler: handleResize, type: 'resize' });
    }

    /**
     * Setup escape key listener for closing guides
     * @param {Function} callback - Callback when escape is pressed
     */
    setupEscapeKeyListener(callback) {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (callback) callback();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        this.eventListeners.set('escape', { element: document, handler: handleEscape, type: 'keydown' });
    }

    /**
     * Setup print button listener
     * @param {Function} callback - Callback when print button is clicked
     */
    setupPrintButtonListener(callback) {
        const printBtn = document.getElementById('print-summary');
        if (printBtn) {
            const clickHandler = () => {
                try {
                    if (callback) callback();
                } catch (error) {
                    this.showAlert(error.message);
                }
            };
            
            printBtn.addEventListener('click', clickHandler);
            this.eventListeners.set('print', { element: printBtn, handler: clickHandler, type: 'click' });
        }
    }

    /**
     * Clean up event listeners and timers
     */
    cleanup() {
        // Clear all debounced timers
        this.debounceTimers.forEach((timer, key) => {
            if (typeof timer === 'number') {
                clearTimeout(timer);
            }
            this.debounceTimers.delete(key);
        });

        // Remove all event listeners
        this.eventListeners.forEach((listenerInfo, key) => {
            if (Array.isArray(listenerInfo)) {
                // Handle arrays of listeners (like eye icons)
                listenerInfo.forEach(({ element, handler, type }) => {
                    if (element && handler && type) {
                        element.removeEventListener(type, handler);
                    }
                });
            } else if (listenerInfo && typeof listenerInfo === 'object') {
                // Handle single listeners
                const { element, handler, type } = listenerInfo;
                if (element && handler && type) {
                    element.removeEventListener(type, handler);
                }
            }
        });
        
        this.eventListeners.clear();
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
}
]

**CODE 7 - File: README.md(folder structure)**
[
    Izzy-Alteration
    ├─ about
    │  ├─ deepseek
    │  │  └─ alteration-female.txt
    │  └─ measurements-about.txt
    └─ frontend
    ├─ package-lock.json
    ├─ package.json
    ├─ pages
    │  ├─ account-menu.html
    │  ├─ add-service.html
    │  ├─ alteration-pages
    │  │  ├─ alteration-about
    │  │  │  ├─ (debug)alteration-modules.md
    │  │  │  ├─ alteration(how-the-program-works).md
    │  │  │  ├─ alteration-functionality-prompt.md
    │  │  │  ├─ alteration-modules.md
    │  │  │  └─ alteration-responsive-page.md
    │  │  ├─ alteration-female-bottom.html
    │  │  ├─ alteration-female-dress.html
    │  │  ├─ alteration-female-jacket.html
    │  │  ├─ alteration-female-top.html
    │  │  ├─ alteration-male-bottom.html
    │  │  ├─ alteration-male-suits.html
    │  │  ├─ alteration-male-top.html
    │  │  ├─ alteration-modules
    │  │  │  ├─ alteration-CartManager.js
    │  │  │  ├─ alteration-DOMRenderer.js
    │  │  │  ├─ alteration-DataMaps.js
    │  │  │  ├─ alteration-EventManager.js
    │  │  │  ├─ alteration-Main.js
    │  │  │  ├─ alteration-PriceCalculator.js
    │  │  │  └─ alteration-StateManager.js
    │  │  └─ alteration-repair.html
    │  ├─ index.html
    │  ├─ login.html
    │  ├─ measurement-pages
    │  │  ├─ measurement-about
    │  │  │  ├─ (debug)floating-window-measurement.md
    │  │  │  ├─ (debug)measurement-split-modules.md
    │  │  │  ├─ (refactor)measurement-modules.md
    │  │  │  ├─ measurement(how-the-program-works).md
    │  │  │  ├─ measurement-functionality-prompt.md
    │  │  │  └─ measurement-modules.md
    │  │  ├─ measurement-modules
    │  │  │  ├─ measurement-DataMaps.js
    │  │  │  ├─ measurement-Main.js
    │  │  │  ├─ measurement-Manager.js
    │  │  │  ├─ measurement-Validator.js
    │  │  │  └─ measurement-ViewHandler.js
    │  │  ├─ measurements-female.html
    │  │  ├─ measurements-male.html
    │  │  └─ sample.html
    │  ├─ order-history.html
    │  ├─ services.html
    │  └─ signup.html
    ├─ public
    │  ├─ css
    │  │  ├─ account-menu.css
    │  │  ├─ add-service.css
    │  │  ├─ alteration-female.css
    │  │  ├─ alteration.css
    │  │  ├─ index.css
    │  │  ├─ login.css
    │  │  ├─ measurements.css
    │  │  ├─ order-history.css
    │  │  ├─ services.css
    │  │  └─ signup.css
    │  ├─ images
    │  │  ├─ female-(chart)-tablet-mobile.png
    │  │  ├─ female-back-tablet-mobile.png
    │  │  ├─ female-desktop.png
    │  │  ├─ female-front-tablet-mobile.png
    │  │  ├─ male-(chart)-tablet-mobile.png
    │  │  ├─ male-back-tablet-mobile.png
    │  │  ├─ male-desktop.png
    │  │  └─ male-front-tablet-mobile.png
    │  └─ js
    │     ├─ account.js
    │     ├─ add-service.js
    │     ├─ alteration-female.js
    │     ├─ alteration-price-calculator.js
    │     ├─ index.js
    │     ├─ login.js
    │     ├─ order-history.js
    │     ├─ services.js
    │     └─ signup.js
    └─ test
        ├─ TEST(how to run).md
        ├─ alteration-module-tests
        │  ├─ alteration-TEST(about)
        │  │  ├─ (debug)alteration-test-unit.md
        │  │  └─ alteration-unit-tests-prompt.md
        │  └─ unit
        │     ├─ AlterationApp.test.js
        │     ├─ CartManager.test.js
        │     ├─ DOMRenderer.test.js
        │     ├─ EventManager.test.js
        │     ├─ PriceCalculator.test.js
        │     └─ StateManager.test.js
        └─ measurement-module-tests
            ├─ measurement-TEST(about)
            │  ├─ (debug)measurement-test-unit.md
            │  └─ measurement-unit-tests-prompt.md
            └─ unit
                ├─ measurement-DataMaps.test.js
                ├─ measurement-Manager.test.js
                ├─ measurement-Validator.test.js
                └─ measurement-ViewHandler.test.js
]

**ERROR/ISSUE:**
[
    1. why the image in .guide-image-container is not showing any image despite changing the path based on folder structure on CODE 6?
    2. is the module design bad?
]

**REQUEST:**
[
    1. analyze the entire module if there is an issue 
    2. if there is an issue, create a better design but preserve the behavior and functionality of the entire module
    3. rewrite an updated version

]
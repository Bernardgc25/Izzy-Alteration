┌─────────────────────────────────────────────────────┐
│                    HTML/UI Layer                    │
├─────────────────────────────────────────────────────┤
│         measurement-Main.js (Orchestrator)          │
├─────────┬─────────┬──────────┬────────────┬────────┤
│  Validator │  Manager  │ ViewHandler │ DataMaps  │
│  (CODE 3)  │ (CODE 4)  │  (CODE 5)   │ (CODE 2)  │
└─────────┴─────────┴──────────┴────────────┴────────┘

Module Responsibilities & Interactions
1. measurement-Main.js (Orchestrator/Controller)
    *Purpose: Central coordinator that initializes and connects all modules
    *Key Functions:
        -Initializes all other modules
        -Sets up event listeners
        -Orchestrates data flow between modules
        -Manages debounced input handling

    *Interactions:
        -Creates instances of Validator, Manager, and ViewHandler
        -Passes data between modules when events occur
        -Calls appropriate methods on each module based on user actions

2. measurement-Validator.js (Validation Logic)
    *Purpose: Handles all form validation rules and error states
    *Key Functions:
        -Validates individual fields and entire forms
        -Manages gender-specific validation rules
        -Tracks error states and messages

    *Interactions:
        -Called by Main.js when validation is needed
        -Updates CSS classes on form elements (adds/removes 'error', 'valid')
        -Communicates errors to ViewHandler for display

3. measurement-Manager.js (Business Logic & Data)
    *Purpose: Manages business logic, data storage, and operations
    *Key Functions:
        -Stores measurement data in a Map
        -Generates printable HTML content
        -Handles date management
        -Prepares data for persistence

    *Interactions:
        -Receives validated data from Validator
        -Provides processed data to ViewHandler for display
        -Called by Main.js when data needs to be saved or printed

4. measurement-ViewHandler.js (UI & Display Logic)
    *Purpose: Handles all UI interactions, animations, and display updates
    *Key Functions:
        -Manages image zoom/pan functionality
        -Shows/hides measurement guides
        -Updates mobile/desktop views
        -Handles responsive design interactions

    *Interactions:
        -Uses DataMaps to get measurement-specific images/text
        -Updates DOM elements based on user interactions
        -Receives display instructions from Main.js

5. measurement-DataMaps.js (Configuration Data)
    *Purpose: Central data store for measurement definitions and images
    *Key Functions:
        -Provides gender-specific measurement data
        -Supplies image paths for different views
        -Contains measurement definitions and descriptions

    *Interactions:
        -Passive data source - other modules query it
        -ViewHandler uses it for guide content
        -Manager may reference it for data structure

6. measurements.css (Presentation Layer)
    *Purpose: Handles all styling and responsive design
    *Key Functions:
        -Defines layout for different screen sizes
        -Manages floating guide display logic
        -Controls visual feedback for validation states

    *Interactions:
        -Passive - other modules manipulate CSS classes defined here
        Contains responsive breakpoints that ViewHandler respects


Data Flow Example: User Saves Measurement
1.User enters measurement value → Input event triggers
2.Main.js receives event, debounces it
3.Manager.js saves the value to its internal Map
Validator.js validates the input value
5.If invalid:
    *Validator adds 'error' CSS class
    *ViewHandler shows error in UI

6.If valid:
    *Validator adds 'valid' CSS class
    ViewHandler may update guide display


View Switching Flow: Desktop vs Mobile
1.Window resizes → ViewHandler detects change
2.ViewHandler updates internal isMobileView state
3.CSS media queries automatically adjust layout
4.ViewHandler shows/hides appropriate guide elements:
    *Desktop: Sidebar guide with zoom/pan
    *Mobile: Floating popup guide with eye icons


Guide Display Flow
1.User focuses on measurement field or clicks eye icon (mobile)
2.Main.js captures the event
3.Main.js calls ViewHandler.showMeasurementGuide(key)
4.ViewHandler queries DataMaps.getMeasurement(gender, key)
5.ViewHandler updates DOM with measurement data and image
ViewHandler shows appropriate guide (desktop inline or mobile popup)

Validation Flow on Save
1.User clicks Save button
2.Main.js calls Validator.validateAll()
Validator checks all required fields and measurement ranges
4.If invalid:
    *Validator returns false
    *Main.js calls ViewHandler.focusFirstErrorField()
    *ViewHandler shows validation alert
5.If valid:
    *Main.js calls Manager.getFormData()
    *Manager collects all data
    *Main.js calls ViewHandler.showSuccessMessage()


Key Design Patterns Used
1.Single Responsibility Principle: Each module has one clear purpose
2.Observer Pattern: Event listeners monitor user interactions
3.Dependency Injection: Main.js injects dependencies into modules
4.Module Pattern: Each file exports a specific class/function
5.Responsive Design: CSS media queries + JavaScript view detection

Cross-Module Communication
1.Main.js → All modules: Direct method calls
2.Modules → Main.js: Callbacks and event handlers
3.Modules → CSS: CSS class manipulation
4.ViewHandler → DataMaps: Data queries
5.Manager ←→ Validator: Data validation and storage

This architecture makes the application maintainable, testable, and extensible. 
New features can be added to individual modules without affecting others, and 
each module can be tested independently.
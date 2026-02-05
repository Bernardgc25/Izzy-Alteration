┌─────────────────────────────────────────────────────────┐
│                    alteration-Main.js                    │
│   (Orchestrator - Initializes and coordinates all)      │
└─────────────┬───────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                 alteration-StateManager.js               │
│      (Single source of truth - manages application state)│
└─────────────┬───────────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ alteration-     │ │ alteration-     │
│ PriceCalculator │ │ DOMRenderer.js  │
│ (Pure functions)│ │ (DOM updates)   │
└─────────┬───────┘ └────────┬────────┘
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                alteration-EventManager.js                │
│       (Handles user interactions and DOM events)         │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                alteration-CartManager.js                 │
│            (Handles shopping cart logic)                │
└─────────────────────────────────────────────────────────┘


Program Flow
1.Initialization (alteration-Main.js):
    *DOMContentLoaded event triggers app creation
    *All modules are instantiated with proper dependencies
    *Event listeners are attached

2.User Interaction:
    *User selects an alteration → EventManager.handleAlterationChange()
    *User selects difficulty → EventManager.handleDifficultyChange()

3.State Update Flow:
    (flow of program)
    User Action → EventManager → StateManager.setState() → 
    Notify Listeners → DOMRenderer.render()

4.Price Calculation:
    (flow of program)``
    EventManager → PriceCalculator.calculatePrice() → 
    Update State → DOMRenderer

5.Cart Operations:
    (flow of program)
    *Add" button → CartManager.addItem()
    *Clear" button → StateManager.reset()


Key Benefits of This Architecture
1.Single Responsibility Principle: Each module has one clear purpose
2.Testability: Pure functions in PriceCalculator, mockable dependencies
3.Maintainability: Changes isolated to specific modules
4.Upgradability: New features can be added as separate modules
5.Reusability: Modules can be used independently
6.State Management: Centralized state prevents scattered logic
7.Dependency Injection: Easy to mock for testing

Testing Strategy
    *Each module can be tested independently:
    *PriceCalculator: Unit tests for calculation logic
    *StateManager: Unit tests for state transitions
    *DOMRenderer: Integration tests for DOM updates
    *EventManager: Mock tests for event handling

This architecture makes the codebase more maintainable, testable, and ready for future enhancements like:
    *Adding new alteration categories
    *Implementing a shopping cart UI
    *Adding user authentication
    *Saving calculation history
    *Exporting price quotes
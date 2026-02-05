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
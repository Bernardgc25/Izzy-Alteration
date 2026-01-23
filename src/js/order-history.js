// Main order history functionality
document.addEventListener('DOMContentLoaded', function() {
    // Orders data (in a real app, this would come from a server via POST)
    let orders = [];
    let filteredOrders = [];
    let currentPage = 1;
    const ordersPerPage = 5;
    
    // DOM Elements
    const ordersList = document.getElementById('ordersList');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const timeFilter = document.getElementById('timeFilter');
    const sortBy = document.getElementById('sortBy');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const totalOrdersSpan = document.getElementById('totalOrders');
    const totalSpentSpan = document.getElementById('totalSpent');
    const avgOrderSpan = document.getElementById('avgOrder');
    const orderModal = document.getElementById('orderModal');
    const modalBody = document.getElementById('modalBody');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const exportBtn = document.getElementById('exportBtn');
    const postStatus = document.getElementById('postStatus');
    
    // Initialize the page
    function initPage() {
        // Check if we have orders in sessionStorage (simulated POST data)
        const storedOrders = sessionStorage.getItem('orderHistoryData');
        
        if (storedOrders) {
            orders = JSON.parse(storedOrders);
            postStatus.textContent = `${orders.length} orders received via POST`;
            postStatus.style.color = "#28a745";
        } else {
            // If no POST data, show message and load sample data
            postStatus.textContent = "No POST data received. Loading sample data.";
            postStatus.style.color = "#dc3545";
            loadSampleData();
        }
        
        filteredOrders = [...orders];
        updateStats();
        renderOrders();
        setupEventListeners();
    }
    
    // Load sample data if no POST data is available
    function loadSampleData() {
        orders = [
            {
                id: "ORD-789012",
                date: "2024-03-15",
                items: ["Wireless Headphones", "Phone Case"],
                total: 89.99,
                status: "delivered",
                shippingAddress: "123 Main St, Anytown, USA",
                paymentMethod: "Visa ending in 4321"
            },
            {
                id: "ORD-789011",
                date: "2024-03-10",
                items: ["Laptop Backpack", "USB-C Cable", "Screen Cleaner"],
                total: 67.50,
                status: "shipped",
                shippingAddress: "456 Oak Ave, Somewhere, USA",
                paymentMethod: "Mastercard ending in 8765"
            },
            {
                id: "ORD-789010",
                date: "2024-03-05",
                items: ["Smart Watch"],
                total: 199.99,
                status: "processing",
                shippingAddress: "789 Pine Rd, Anycity, USA",
                paymentMethod: "PayPal"
            },
            {
                id: "ORD-789009",
                date: "2024-02-28",
                items: ["Gaming Mouse", "Mechanical Keyboard"],
                total: 145.75,
                status: "delivered",
                shippingAddress: "321 Elm Blvd, Otherplace, USA",
                paymentMethod: "Visa ending in 4321"
            },
            {
                id: "ORD-789008",
                date: "2024-02-20",
                items: ["Bluetooth Speaker", "Audio Cable"],
                total: 65.25,
                status: "cancelled",
                shippingAddress: "654 Maple Dr, Nowhere, USA",
                paymentMethod: "American Express ending in 1234"
            },
            {
                id: "ORD-789007",
                date: "2024-02-15",
                items: ["Tablet", "Tablet Case", "Stylus Pen"],
                total: 349.99,
                status: "delivered",
                shippingAddress: "987 Cedar Ln, Somewhere, USA",
                paymentMethod: "Visa ending in 4321"
            },
            {
                id: "ORD-789006",
                date: "2024-02-10",
                items: ["Wireless Earbuds"],
                total: 79.99,
                status: "delivered",
                shippingAddress: "147 Birch St, Anytown, USA",
                paymentMethod: "Mastercard ending in 8765"
            },
            {
                id: "ORD-789005",
                date: "2024-02-05",
                items: ["External Hard Drive", "USB Hub"],
                total: 124.50,
                status: "shipped",
                shippingAddress: "258 Walnut Ave, Anycity, USA",
                paymentMethod: "PayPal"
            }
        ];
    }
    
    // Update statistics
    function updateStats() {
        totalOrdersSpan.textContent = orders.length;
        
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        totalSpentSpan.textContent = `$${totalSpent.toFixed(2)}`;
        
        const avgOrder = orders.length > 0 ? totalSpent / orders.length : 0;
        avgOrderSpan.textContent = `$${avgOrder.toFixed(2)}`;
    }
    
    // Filter and sort orders
    function filterAndSortOrders() {
        let result = [...orders];
        
        // Filter by search input
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            result = result.filter(order => 
                order.id.toLowerCase().includes(searchTerm) ||
                order.items.some(item => item.toLowerCase().includes(searchTerm))
            );
        }
        
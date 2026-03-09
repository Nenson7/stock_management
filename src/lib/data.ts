export interface Product {
	id: string;
	name: string;
	price: number;
	quantity: number;
	category: string;
}

export interface BillingRecord {
	id: string;
	customer: string;
	date: string;
	amount: number;
	status: 'paid' | 'pending' | 'overdue';
	items: number;
}

export interface DashboardStats {
	totalRevenue: number;
	totalProducts: number;
	totalOrders: number;
	lowStockItems: number;
	recentSales: { date: string; amount: number }[];
}

export const products: Product[] = [
	{ id: '1', name: 'Premium Coffee Beans', price: 1200, quantity: 50, category: 'Beverages' },
	{ id: '2', name: 'Organic Green Tea', price: 850, quantity: 30, category: 'Beverages' },
	{ id: '3', name: 'Dark Chocolate 70%', price: 450, quantity: 100, category: 'Snacks' },
	{ id: '4', name: 'Himalayan Pink Salt', price: 150, quantity: 200, category: 'Ingredients' },
	{ id: '5', name: 'Cold Brew Kit', price: 3200, quantity: 15, category: 'Equipment' },
	{ id: '6', name: 'Bamboo Steamer', price: 1800, quantity: 8, category: 'Equipment' },
	{ id: '7', name: 'Ceramic Mug', price: 600, quantity: 75, category: 'Equipment' },
	{ id: '8', name: 'Eco-friendly Filter', price: 900, quantity: 40, category: 'Supplies' },
	{ id: '9', name: 'Artisan Honey', price: 1100, quantity: 25, category: 'Ingredients' },
	{ id: '10', name: 'Almond Milk (1L)', price: 550, quantity: 60, category: 'Beverages' }
];

export const billingRecords: BillingRecord[] = [
	{ id: 'INV-001', customer: 'John Doe', date: '2026-03-09', amount: 4500, status: 'paid', items: 3 },
	{ id: 'INV-002', customer: 'Jane Smith', date: '2026-03-08', amount: 2200, status: 'paid', items: 2 },
	{ id: 'INV-003', customer: 'Bob Wilson', date: '2026-03-08', amount: 8900, status: 'pending', items: 5 },
	{ id: 'INV-004', customer: 'Alice Brown', date: '2026-03-07', amount: 1500, status: 'paid', items: 1 },
	{ id: 'INV-005', customer: 'Charlie Davis', date: '2026-03-07', amount: 6700, status: 'overdue', items: 4 },
	{ id: 'INV-006', customer: 'Eva Martinez', date: '2026-03-06', amount: 3200, status: 'paid', items: 2 },
	{ id: 'INV-007', customer: 'Frank Miller', date: '2026-03-05', amount: 9800, status: 'paid', items: 6 },
	{ id: 'INV-008', customer: 'Grace Lee', date: '2026-03-04', amount: 1800, status: 'pending', items: 1 }
];

export const dashboardStats: DashboardStats = {
	totalRevenue: 154200,
	totalProducts: 603,
	totalOrders: 124,
	lowStockItems: 3,
	recentSales: [
		{ date: '2026-03-09', amount: 12500 },
		{ date: '2026-03-08', amount: 18200 },
		{ date: '2026-03-07', amount: 9800 },
		{ date: '2026-03-06', amount: 15400 },
		{ date: '2026-03-05', amount: 22100 }
	]
};

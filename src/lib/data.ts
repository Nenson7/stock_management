export interface User {
	id: string;
	username: string;
	role: 'admin' | 'user';
	name?: string;
}

export interface Product {
	id: string;
	name: string;
	price: number;
	quantity: number;
	category: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface InvoiceItem {
	id: string;
	invoiceId: string;
	productId: string;
	quantity: number;
	price: number;
}

export interface Invoice {
	id: string;
	customerName: string;
	date: Date;
	totalAmount: number;
	status: 'paid' | 'pending' | 'overdue';
	userId?: string;
	items?: InvoiceItem[];
}

export interface DashboardStats {
	totalRevenue: number;
	totalProducts: number;
	totalOrders: number;
	lowStockItems: number;
	recentSales: { date: string; amount: number }[];
}

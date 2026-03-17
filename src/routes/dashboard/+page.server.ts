import { db } from '$lib/db';
import { products, invoices } from '$lib/db/schema';
import { sql, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allProducts = await db.select().from(products);
	const allInvoices = await db.select().from(invoices).orderBy(desc(invoices.date)).limit(5);

	const totalRevenue = allProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0); // This is stock value
	const actualRevenue = (await db.select({ 
		total: sql<number>`sum(${invoices.totalAmount})` 
	}).from(invoices))[0].total || 0;

	const totalProducts = (await db.select({ 
		count: sql<number>`count(*)` 
	}).from(products))[0].count;

	const lowStockItems = (await db.select({ 
		count: sql<number>`count(*)` 
	}).from(products).where(sql`${products.quantity} < 20`))[0].count;

	// Recent sales (last 7 days)
	const recentSales = await db.select()
		.from(invoices)
		.where(sql`${invoices.date} > now() - interval '7 days'`)
		.orderBy(desc(invoices.date));

	return {
		stats: {
			totalRevenue: actualRevenue,
			totalProducts,
			totalOrders: (await db.select({ count: sql<number>`count(*)` }).from(invoices))[0].count,
			lowStockItems,
			recentSales: recentSales.map(s => ({ date: s.date.toISOString().split('T')[0], amount: s.totalAmount }))
		},
		recentInvoices: allInvoices
	};
};

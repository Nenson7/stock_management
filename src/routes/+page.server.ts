import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { products, invoices } from '$lib/db/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	} else {
		throw redirect(303, '/login');
	}
};

export const loadLandingStats: PageServerLoad = async () => {
	const [productCount] = await db.select({ count: count() }).from(products);
	const [invoiceCount] = await db.select({ count: count() }).from(invoices);
	const [paidCount] = await db.select({ count: count() }).from(invoices).where(eq(invoices.status, 'paid'));
	const [pendingCount] = await db.select({ count: count() }).from(invoices).where(eq(invoices.status, 'pending'));

	return {
		totalProducts: productCount?.count || 0,
		totalInvoices: invoiceCount?.count || 0,
		paidInvoices: paidCount?.count || 0,
		pendingInvoices: pendingCount?.count || 0
	};
};

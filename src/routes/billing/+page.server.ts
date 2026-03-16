import { db } from '$lib/db';
import { invoices, invoiceItems, products } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allInvoices = await db.query.invoices.findMany({
		with: {
			items: true
		},
		orderBy: desc(invoices.date)
	});
	
	const allProducts = await db.select().from(products);

	return {
		invoices: allInvoices,
		products: allProducts
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const customerName = formData.get('customerName') as string;
		const productIds = formData.getAll('productId') as string[];
		const quantities = formData.getAll('quantity').map(q => parseInt(q as string));

		if (!customerName || productIds.length === 0) {
			return fail(400, { message: 'Missing customer name or items' });
		}

		const invoiceId = crypto.randomUUID();
		let totalAmount = 0;

		const itemsToInsert = [];
		for (let i = 0; i < productIds.length; i++) {
			const productId = productIds[i];
			const quantity = quantities[i];
			
			const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
			if (product) {
				const itemPrice = product.price;
				totalAmount += itemPrice * quantity;
				itemsToInsert.push({
					id: crypto.randomUUID(),
					invoiceId,
					productId,
					quantity,
					price: itemPrice
				});
				
				// Deduct stock
				await db.update(products)
					.set({ quantity: product.quantity - quantity })
					.where(eq(products.id, productId));
			}
		}

		await db.insert(invoices).values({
			id: invoiceId,
			customerName,
			date: new Date(),
			totalAmount,
			status: 'paid',
			userId: locals.user?.id
		});

		if (itemsToInsert.length > 0) {
			await db.insert(invoiceItems).values(itemsToInsert);
		}

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const invoiceId = formData.get('invoiceId') as string;

		if (!invoiceId) {
			return fail(400, { message: 'Invoice ID required' });
		}

		await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId));
		await db.delete(invoices).where(eq(invoices.id, invoiceId));

		return { success: true };
	}
};

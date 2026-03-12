import { db } from '$lib/db';
import { products } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const allProducts = await db.select().from(products).orderBy(desc(products.updatedAt));
	return {
		products: allProducts
	};
};

export const actions: Actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const price = parseInt(formData.get('price') as string);
		const quantity = parseInt(formData.get('quantity') as string);
		const category = formData.get('category') as string;
		const description = formData.get('description') as string;

		if (!name || isNaN(price) || isNaN(quantity) || !category) {
			return fail(400, { message: 'Missing or invalid fields' });
		}

		await db.insert(products).values({
			id: crypto.randomUUID(),
			name,
			price,
			quantity,
			category,
			description,
			updatedAt: new Date()
		});

		return { success: true };
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		if (id) {
			await db.delete(products).where(eq(products.id, id));
		}
		return { success: true };
	}
};

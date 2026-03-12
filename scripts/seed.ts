import { db } from '../src/lib/db';
import { users, products, invoices, invoiceItems } from '../src/lib/db/schema';
import { products as oldProducts, billingRecords as oldRecords } from '../src/lib/data';

async function seed() {
	console.log('Seeding database...');

	// Create admin user
	const adminId = crypto.randomUUID();
	await db.insert(users).values({
		id: adminId,
		username: 'admin',
		password: await Bun.password.hash('admin'),
		role: 'admin',
		name: 'Administrator'
	}).onConflictDoNothing();

	// Insert products
	const moreProducts = [
		{ id: '11', name: 'Paper Cups (50pk)', price: 450, quantity: 120, category: 'Supplies' },
		{ id: '12', name: 'Sugar Packets (100pk)', price: 300, quantity: 80, category: 'Supplies' },
		{ id: '13', name: 'Stirring Sticks (100pk)', price: 150, quantity: 200, category: 'Supplies' },
		{ id: '14', name: 'Moka Pot', price: 2800, quantity: 12, category: 'Equipment' },
		{ id: '15', name: 'French Press', price: 2400, quantity: 18, category: 'Equipment' },
	];

	for (const p of [...oldProducts, ...moreProducts]) {
		await db.insert(products).values({
			id: p.id,
			name: p.name,
			price: p.price,
			quantity: p.quantity,
			category: p.category,
		}).onConflictDoNothing();
	}

	// Insert invoices
	for (const r of oldRecords) {
		const invoiceId = r.id;
		await db.insert(invoices).values({
			id: invoiceId,
			customerName: r.customer,
			date: new Date(r.date),
			totalAmount: r.amount,
			status: r.status,
			userId: adminId
		}).onConflictDoNothing();
		
		// Add some dummy items for these invoices
		await db.insert(invoiceItems).values({
			id: crypto.randomUUID(),
			invoiceId: invoiceId,
			productId: '1', // Just pick one
			quantity: r.items,
			price: r.amount / r.items
		}).onConflictDoNothing();
	}

	console.log('Seeding complete!');
	process.exit(0);
}

seed().catch(console.error);

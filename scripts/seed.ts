import { db } from '../src/lib/db';
import { users, products, invoices, invoiceItems } from '../src/lib/db/schema';

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

    const mockProducts = [
        { id: '1', name: 'Premium Coffee Beans', price: 1200, quantity: 50, category: 'Beverages' },
        { id: '2', name: 'Organic Green Tea', price: 850, quantity: 30, category: 'Beverages' },
        { id: '3', name: 'Dark Chocolate 70%', price: 450, quantity: 100, category: 'Snacks' },
        { id: '4', name: 'Himalayan Pink Salt', price: 150, quantity: 200, category: 'Ingredients' },
        { id: '5', name: 'Cold Brew Kit', price: 3200, quantity: 15, category: 'Equipment' },
        { id: '6', name: 'Bamboo Steamer', price: 1800, quantity: 8, category: 'Equipment' },
        { id: '7', name: 'Ceramic Mug', price: 600, quantity: 75, category: 'Equipment' },
        { id: '8', name: 'Eco-friendly Filter', price: 900, quantity: 40, category: 'Supplies' },
        { id: '9', name: 'Artisan Honey', price: 1100, quantity: 25, category: 'Ingredients' },
        { id: '10', name: 'Almond Milk (1L)', price: 550, quantity: 60, category: 'Beverages' },
        { id: '11', name: 'Paper Cups (50pk)', price: 450, quantity: 120, category: 'Supplies' },
        { id: '12', name: 'Sugar Packets (100pk)', price: 300, quantity: 80, category: 'Supplies' },
        { id: '13', name: 'Stirring Sticks (100pk)', price: 150, quantity: 200, category: 'Supplies' },
        { id: '14', name: 'Moka Pot', price: 2800, quantity: 12, category: 'Equipment' },
        { id: '15', name: 'French Press', price: 2400, quantity: 18, category: 'Equipment' },
    ];

	for (const p of mockProducts) {
		await db.insert(products).values({
			id: p.id,
			name: p.name,
			price: p.price,
			quantity: p.quantity,
			category: p.category,
		}).onConflictDoNothing();
	}

    const mockRecords = [
        { id: 'INV-001', customer: 'John Doe', date: '2026-03-09', amount: 4500, status: 'paid', items: 3 },
        { id: 'INV-002', customer: 'Jane Smith', date: '2026-03-08', amount: 2200, status: 'paid', items: 2 },
        { id: 'INV-003', customer: 'Bob Wilson', date: '2026-03-08', amount: 8900, status: 'pending', items: 5 },
        { id: 'INV-004', customer: 'Alice Brown', date: '2026-03-07', amount: 1500, status: 'paid', items: 1 },
        { id: 'INV-005', customer: 'Charlie Davis', date: '2026-03-07', amount: 6700, status: 'overdue', items: 4 },
        { id: 'INV-006', customer: 'Eva Martinez', date: '2026-03-06', amount: 3200, status: 'paid', items: 2 },
        { id: 'INV-007', customer: 'Frank Miller', date: '2026-03-05', amount: 9800, status: 'paid', items: 6 },
        { id: 'INV-008', customer: 'Grace Lee', date: '2026-03-04', amount: 1800, status: 'pending', items: 1 }
    ];

	// Insert invoices
	for (const r of mockRecords) {
		const invoiceId = r.id;
		await db.insert(invoices).values({
			id: invoiceId,
			customerName: r.customer,
			date: new Date(r.date),
			totalAmount: r.amount,
			status: r.status as 'paid' | 'pending' | 'overdue',
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

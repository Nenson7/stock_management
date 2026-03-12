import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
	name: text('name'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const products = sqliteTable('products', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	price: integer('price').notNull(), // in cents or whole units
	quantity: integer('quantity').notNull(),
	category: text('category').notNull(),
	description: text('description'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const invoices = sqliteTable('invoices', {
	id: text('id').primaryKey(),
	customerName: text('customer_name').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	totalAmount: integer('total_amount').notNull(),
	status: text('status', { enum: ['paid', 'pending', 'overdue'] }).notNull().default('pending'),
	userId: text('user_id').references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const invoiceItems = sqliteTable('invoice_items', {
	id: text('id').primaryKey(),
	invoiceId: text('invoice_id').notNull().references(() => invoices.id),
	productId: text('product_id').notNull().references(() => products.id),
	quantity: integer('quantity').notNull(),
	price: integer('price').notNull(), // price at time of sale
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const usersRelations = relations(users, ({ many }) => ({
	invoices: many(invoices)
}));

export const invoicesRelations = relations(invoices, ({ many, one }) => ({
	items: many(invoiceItems),
	user: one(users, {
		fields: [invoices.userId],
		references: [users.id]
	})
}));

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
	invoice: one(invoices, {
		fields: [invoiceItems.invoiceId],
		references: [invoices.id]
	}),
	product: one(products, {
		fields: [invoiceItems.productId],
		references: [products.id]
	})
}));

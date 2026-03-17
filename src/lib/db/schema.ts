import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
	name: text('name'),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const products = pgTable('products', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	price: integer('price').notNull(),
	quantity: integer('quantity').notNull(),
	category: text('category').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const invoices = pgTable('invoices', {
	id: text('id').primaryKey(),
	customerName: text('customer_name').notNull(),
	date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
	totalAmount: integer('total_amount').notNull(),
	status: text('status', { enum: ['paid', 'pending', 'overdue'] }).notNull().default('pending'),
	userId: text('user_id').references(() => users.id),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const invoiceItems = pgTable('invoice_items', {
	id: text('id').primaryKey(),
	invoiceId: text('invoice_id').notNull().references(() => invoices.id),
	productId: text('product_id').notNull().references(() => products.id),
	quantity: integer('quantity').notNull(),
	price: integer('price').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
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

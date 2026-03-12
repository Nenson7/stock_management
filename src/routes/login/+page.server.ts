import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!username || !password) {
			return fail(400, { message: 'Missing credentials' });
		}

		const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return fail(401, { message: 'Invalid username or password' });
		}

		// Simple session-based cookie (in production, use a secure session store)
		cookies.set('session', user.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/dashboard');
	},
	register: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		const role = formData.get('role') as 'admin' | 'user';

		if (!username || !password || !role) {
			return fail(400, { message: 'Missing required fields' });
		}

		// Check if user already exists
		const [existingUser] = await db.select().from(users).where(eq(users.username, username)).limit(1);
		if (existingUser) {
			return fail(400, { message: 'Username already taken' });
		}

		const userId = crypto.randomUUID();
		const hashedPassword = bcrypt.hashSync(password, 10);

		await db.insert(users).values({
			id: userId,
			username,
			password: hashedPassword,
			name,
			role
		});

		cookies.set('session', userId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/dashboard');
	},
	logout: async ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		throw redirect(303, '/login');
	}
};

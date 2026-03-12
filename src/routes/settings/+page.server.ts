import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		// Only admins can manage users, but for now we'll allow seeing settings
	}
	
	const allUsers = await db.select({
		id: users.id,
		username: users.username,
		role: users.role,
		name: users.name
	}).from(users);

	return {
		users: allUsers
	};
};

export const actions: Actions = {
	addUser: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const role = formData.get('role') as 'admin' | 'user';
		const name = formData.get('name') as string;

		if (!username || !password || !role) {
			return fail(400, { message: 'Missing fields' });
		}

		await db.insert(users).values({
			id: crypto.randomUUID(),
			username,
			password: await Bun.password.hash(password),
			role,
			name
		});

		return { success: true };
	},
	deleteUser: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		
		if (id === locals.user?.id) {
			return fail(400, { message: 'Cannot delete yourself' });
		}

		if (id) {
			await db.delete(users).where(eq(users.id, id));
		}
		
		return { success: true };
	}
};

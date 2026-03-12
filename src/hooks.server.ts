import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		const [user] = await db.select().from(users).where(eq(users.id, sessionToken)).limit(1);
		if (user) {
			event.locals.user = {
				id: user.id,
				username: user.username,
				role: user.role,
				name: user.name
			};
		}
	}

	// Simple auth check for protected routes
	const path = event.url.pathname;
	const protectedRoutes = ['/dashboard', '/records', '/billing', '/settings'];
	if (protectedRoutes.some(route => path.startsWith(route)) && !event.locals.user) {
		throw redirect(302, '/login');
	}

	const response = await resolve(event);
	return response;
};

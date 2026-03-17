import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL && typeof import.meta !== 'undefined' && import.meta.env) {
	DATABASE_URL = import.meta.env.DATABASE_URL;
}

if (!DATABASE_URL) {
	try {
		const dotenv = await import('dotenv');
		dotenv.config();
		DATABASE_URL = process.env.DATABASE_URL;
	} catch {}
}


if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const sql = neon(DATABASE_URL);

export const db = drizzle(sql, { schema });

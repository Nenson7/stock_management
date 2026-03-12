import vercel from '@sveltejs/adapter-vercel';
import bun from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Use Vercel adapter if VERCEL env is set, otherwise use Bun adapter
		adapter: process.env.VERCEL ? vercel() : bun()
	}
};

export default config;

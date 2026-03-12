<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let isRegistering = $state(false);
	let loading = $state(false);

	const toggleMode = () => {
		isRegistering = !isRegistering;
	};
</script>

<div class="w-full max-w-md">
	<div class="card p-8 shadow-2xl bg-surface-900 border border-surface-700 rounded-2xl">
		<div class="text-center mb-6">
			<div class="inline-flex items-center justify-center size-12 rounded-full bg-primary-500 mb-4">
				<svg class="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h1 class="h1 text-white">{isRegistering ? 'Create Account' : 'Welcome Back'}</h1>
			<p class="text-surface-400 mt-2">{isRegistering ? 'Sign up to get started' : 'Sign in to your account'}</p>
		</div>
		
		<form 
			method="POST" 
			action={isRegistering ? '?/register' : '?/login'} 
			use:enhance={() => {
				loading = true;
				return async ({ result }) => {
					loading = false;
					if (result.type === 'success') {
						(window as any).showToast?.(isRegistering ? 'Account created successfully!' : 'Logged in successfully!', 'success');
					}
				};
			}} 
			class="space-y-4"
		>
			{#if isRegistering}
				<label class="label">
					<span class="text-surface-300">Full Name</span>
					<input class="input bg-surface-800 border-surface-700 text-white" type="text" name="name" placeholder="John Doe" required />
				</label>
			{/if}

			<label class="label">
				<span class="text-surface-300">Username</span>
				<input class="input bg-surface-800 border-surface-700 text-white" type="text" name="username" placeholder="Enter username" required />
			</label>
			
			<label class="label">
				<span class="text-surface-300">Password</span>
				<input class="input bg-surface-800 border-surface-700 text-white" type="password" name="password" placeholder="••••••••" required />
			</label>

			{#if isRegistering}
				<label class="label">
					<span class="text-surface-300">Role</span>
					<select name="role" class="select bg-surface-800 border-surface-700 text-white" required>
						<option value="user">Normal User</option>
						<option value="admin">Administrator</option>
					</select>
				</label>
			{/if}
			
			{#if form?.message}
				<div class="p-3 bg-error-500/20 border border-error-500/50 text-error-200 rounded-lg text-sm text-center">
					{form.message}
				</div>
			{/if}
			
			<button type="submit" class="btn variant-filled-primary w-full py-3 font-semibold transition-all hover:scale-[1.02] disabled:opacity-50" disabled={loading}>
				{loading ? 'Please wait...' : (isRegistering ? 'Sign Up' : 'Sign In')}
			</button>
		</form>

		<div class="mt-6 text-center">
			<button class="text-primary-400 hover:text-primary-300 text-sm" onclick={toggleMode}>
				{isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
			</button>
		</div>
	</div>
</div>

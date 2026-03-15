<script lang="ts">
	import { enhance } from '$app/forms';
	import UserIcon from '@lucide/svelte/icons/user';
	import UserPlusIcon from '@lucide/svelte/icons/user-plus';

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
				{#if isRegistering}
					<UserPlusIcon class="size-6 text-white" />
				{:else}
					<UserIcon class="size-6 text-white" />
				{/if}
			</div>
			<h1 class="h1 text-white">{isRegistering ? 'Create Account' : 'Welcome Back'}</h1>
			<p class="text-surface-400 mt-2">{isRegistering ? 'Sign up to get started' : 'Sign in to your account'}</p>
		</div>
		
		<form 
			method="POST" 
			action={isRegistering ? '?/register' : '?/login'} 
			use:enhance={() => {
				loading = true;
				return async ({ result, update }) => {
					loading = false;
					await update();
				};
			}} 
			class="space-y-4"
		>
			{#if isRegistering}
				<div class="space-y-2">
					<label class="text-surface-300 text-sm font-medium" for="name">Full Name</label>
					<input 
						id="name" 
						name="name" 
						type="text" 
						placeholder="John Doe" 
						required 
						class="input bg-surface-800 border border-surface-700 text-white rounded-lg px-4 py-2.5 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
					/>
				</div>
			{/if}

			<div class="space-y-2">
				<label class="text-surface-300 text-sm font-medium" for="username">Username</label>
				<input 
					id="username" 
					name="username" 
					type="text" 
					placeholder="Enter username" 
					required 
					class="input bg-surface-800 border border-surface-700 text-white rounded-lg px-4 py-2.5 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
				/>
			</div>
			
			<div class="space-y-2">
				<label class="text-surface-300 text-sm font-medium" for="password">Password</label>
				<input 
					id="password" 
					name="password" 
					type="password" 
					placeholder="••••••••" 
					required 
					class="input bg-surface-800 border border-surface-700 text-white rounded-lg px-4 py-2.5 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
				/>
			</div>

			{#if isRegistering}
				<div class="space-y-2">
					<label class="text-surface-300 text-sm font-medium" for="role">Role</label>
					<select 
						id="role" 
						name="role" 
						class="select bg-surface-800 border border-surface-700 text-white rounded-lg px-4 py-2.5 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
						required
					>
						<option value="user">Normal User</option>
						<option value="admin">Administrator</option>
					</select>
				</div>
			{/if}
			
			{#if form?.message}
				<div class="p-4 bg-error-500/20 border border-error-500/50 rounded-lg">
					<p class="text-error-200 text-sm text-center">{form.message}</p>
				</div>
			{/if}
			
			<button 
				type="submit" 
				class="btn variant-filled-primary w-full py-3 font-semibold rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={loading}
			>
				{#if loading}
					<span class="flex items-center justify-center gap-2">
						<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Please wait...
					</span>
				{:else if isRegistering}
					Sign Up
				{:else}
					Sign In
				{/if}
			</button>
		</form>

		<div class="mt-6 text-center">
			<button 
				class="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
				onclick={toggleMode}
			>
				{isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
			</button>
		</div>
	</div>
</div>

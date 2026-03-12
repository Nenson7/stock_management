<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="flex items-center justify-center min-h-[80vh]">
	<div class="card p-8 w-full max-w-md shadow-xl bg-surface-100-900 border border-surface-200-800 rounded-xl">
		<h1 class="h1 text-center mb-6">Admin Login</h1>
		
		<form method="POST" use:enhance class="space-y-4">
			<label class="label">
				<span>Username</span>
				<input class="input" type="text" name="username" placeholder="Enter username" required />
			</label>
			
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" name="password" placeholder="••••••••" required />
			</label>
			
			{#if form?.message}
				<div class="alert variant-filled-error p-2 text-sm text-center rounded">
					{form.message}
				</div>
			{/if}
			
			<button type="submit" class="btn variant-filled-primary w-full py-2 font-bold transition-all hover:scale-[1.02]">
				Sign In
			</button>
		</form>
	</div>
</div>

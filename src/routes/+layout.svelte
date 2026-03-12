<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/Sidebar.svelte';
	import { Toast } from '@skeletonlabs/skeleton-svelte';
	import { get } from 'svelte/store';
	
	let { children, data } = $props();
	
	let toasts = $state<Array<{id: number, message: string, type: 'success' | 'error' | 'info'}>>([]);
	let toastId = 0;
	
	const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
		const id = ++toastId;
		toasts = [...toasts, { id, message, type }];
		setTimeout(() => {
			toasts = toasts.filter(t => t.id !== id);
		}, 4000);
	};
	
	const removeToast = (id: number) => {
		toasts = toasts.filter(t => t.id !== id);
	};
	
	$effect(() => {
		(window as any).showToast = addToast;
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Sidebar>
	{@render children()}
</Sidebar>

<!-- Toast Container -->
<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
	{#each toasts as toast (toast.id)}
		<div 
			class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right
			{toast.type === 'success' ? 'bg-success-500 text-white' : ''}
			{toast.type === 'error' ? 'bg-error-500 text-white' : ''}
			{toast.type === 'info' ? 'bg-primary-500 text-white' : ''}"
		>
			<span class="flex-1">{toast.message}</span>
			<button class="opacity-70 hover:opacity-100" onclick={() => removeToast(toast.id)} aria-label="Close notification">
				<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>
		</div>
	{/each}
</div>

<style>
	@keyframes slideIn {
		from { transform: translateX(100%); opacity: 0; }
		to { transform: translateX(0); opacity: 1; }
	}
	.animate-in { animation: slideIn 0.3s ease-out; }
</style>
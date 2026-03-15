<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/Sidebar.svelte';
	import CheckCircleIcon from '@lucide/svelte/icons/circle-check';
	import XCircleIcon from '@lucide/svelte/icons/circle-x';
	import InfoIcon from '@lucide/svelte/icons/circle-help';
	import XIcon from '@lucide/svelte/icons/x';
	
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
			class="flex items-start gap-3 p-4 rounded-lg shadow-lg max-w-sm border animate-in
			{toast.type === 'success' ? 'bg-success-500/90 border-success-400/50 text-white' : ''}
			{toast.type === 'error' ? 'bg-error-500/90 border-error-400/50 text-white' : ''}
			{toast.type === 'info' ? 'bg-primary-500/90 border-primary-400/50 text-white' : ''}"
		>
			{#if toast.type === 'success'}
				<CheckCircleIcon class="size-5 flex-shrink-0 mt-0.5" />
			{:else if toast.type === 'error'}
				<XCircleIcon class="size-5 flex-shrink-0 mt-0.5" />
			{:else}
				<InfoIcon class="size-5 flex-shrink-0 mt-0.5" />
			{/if}
			<span class="flex-1">{toast.message}</span>
			<button class="opacity-70 hover:opacity-100 flex-shrink-0" onclick={() => removeToast(toast.id)} aria-label="Close notification">
				<XIcon class="size-4" />
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
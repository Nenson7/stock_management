<script lang="ts">
	import { page } from '$app/state';
	import BookIcon from '@lucide/svelte/icons/book'
	import HouseIcon from '@lucide/svelte/icons/house'
	import SettingsIcon from '@lucide/svelte/icons/settings'
	import DollarSignIcon from '@lucide/svelte/icons/dollar-sign'
	import ArchiveIcon from '@lucide/svelte/icons/archive';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import MenuIcon from '@lucide/svelte/icons/menu';

	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();

	let collapsed = $state(false);
	let hidden = $state(false);

	const linksSidebar = {
		management: [
			{ label: 'Records', href: '/records', icon: ArchiveIcon },
			{ label: 'Billing', href: '/billing', icon: BookIcon },
		]
	};

	const isActive = (path: string) => page.url.pathname === path;

	const toggleSidebar = () => {
		collapsed = !collapsed;
	};

	const toggleHidden = () => {
		hidden = !hidden;
	};

	const user = $derived(page.data.user);
</script>

<div class="w-full min-h-screen flex flex-col md:grid md:grid-cols-[auto_1fr] items-stretch border border-surface-200-800">
	<!-- Mobile Toggle -->
	<div class="md:hidden flex items-center justify-between p-4 bg-surface-100-900 border-b border-surface-200-800">
		<div class="flex items-center gap-2">
			<DollarSignIcon class="size-6 text-primary-500" />
			<span class="text-lg font-bold">Stock Management</span>
		</div>
		<button class="btn-icon variant-filled-surface" onclick={toggleHidden}>
			<MenuIcon class="size-6" />
		</button>
	</div>

	<Navigation 
		layout="sidebar" 
		class="grid grid-rows-[auto_1fr_auto] gap-4 {collapsed ? 'w-16' : 'w-64'} {hidden ? 'hidden' : 'fixed inset-0 z-50 md:relative md:flex'} transition-all duration-300 bg-surface-100-900 border-r border-surface-200-800"
	>
		<Navigation.Header class="flex justify-between items-center px-2 py-4">
			<div class="flex items-center gap-2">
				<a href="/" class="btn-icon btn-icon-lg {isActive('/') ? 'preset-filled-primary-500' : 'preset-tonal-surface'}">
					<DollarSignIcon class="size-6" />
				</a>
				{#if !collapsed}
					<span class="text-lg font-bold">Stock</span>
				{/if}
			</div>
			<button class="md:hidden btn-icon" onclick={toggleHidden}>
				<ChevronLeftIcon class="size-6" />
			</button>
		</Navigation.Header>

		<Navigation.Content>
			<Navigation.Group>
				<Navigation.Menu>
					<Navigation.TriggerAnchor 
						href="/dashboard" 
						class={isActive('/dashboard') ? 'preset-filled-primary-500' : ''}
					>
						<HouseIcon class="size-4" />
						{#if !collapsed}
							<Navigation.TriggerText>Dashboard</Navigation.TriggerText>
						{/if}
					</Navigation.TriggerAnchor>
				</Navigation.Menu>
			</Navigation.Group>

			{#each Object.entries(linksSidebar) as [category, links]}
				<Navigation.Group>
					{#if !collapsed}
						<Navigation.Label class="capitalize pl-2">{category}</Navigation.Label>
					{/if}
					<Navigation.Menu>
						{#each links as link (link.href)}
							{@const Icon = link.icon}
							<Navigation.TriggerAnchor 
								href={link.href} 
								title={link.label} 
								aria-label={link.label}
								class={isActive(link.href) ? 'preset-filled-primary-500' : ''}
							>
								<Icon class="size-4" />
								{#if !collapsed}
									<Navigation.TriggerText>{link.label}</Navigation.TriggerText>
								{/if}
							</Navigation.TriggerAnchor>
						{/each}
					</Navigation.Menu>
				</Navigation.Group>
			{/each}
		</Navigation.Content>

		<Navigation.Footer class="flex flex-col gap-2 p-2">
			{#if user}
				<div class="flex items-center gap-2 px-2 py-1 mb-2 bg-surface-200-800 rounded-lg overflow-hidden">
					<div class="size-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shrink-0">
						{user.username[0].toUpperCase()}
					</div>
					{#if !collapsed}
						<div class="flex-1 overflow-hidden">
							<p class="text-sm font-bold truncate">{user.username}</p>
							<p class="text-xs opacity-60 truncate">{user.role}</p>
						</div>
						<form action="/login?/logout" method="POST">
							<button class="btn-icon btn-icon-sm variant-soft-error">
								<LogOutIcon class="size-4" />
							</button>
						</form>
					{/if}
				</div>
			{/if}
			
			<div class="flex gap-2">
				<button 
					class="btn-icon variant-soft flex-1 justify-center"
					onclick={toggleSidebar}
					aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				>
					{#if collapsed}
						<ChevronRightIcon class="size-4" />
					{:else}
						<ChevronLeftIcon class="size-4" />
					{/if}
				</button>
				<Navigation.TriggerAnchor 
					href="/settings" 
					title="Settings" 
					aria-label="Settings" 
					class="variant-soft {isActive('/settings') ? 'preset-filled-primary-500' : ''}"
				>
					<SettingsIcon class="size-4" />
					{#if !collapsed}
						<Navigation.TriggerText>Settings</Navigation.TriggerText>
					{/if}
				</Navigation.TriggerAnchor>
			</div>
		</Navigation.Footer>
	</Navigation>

	<main class="p-4 min-h-screen bg-surface-50-950 flex-1 overflow-x-hidden">
		{@render children()}
	</main>
</div>

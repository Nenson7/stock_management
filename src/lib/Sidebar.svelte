<script lang="ts">
	import { page } from '$app/state';
	import BookIcon from '@lucide/svelte/icons/book'
	import HouseIcon from '@lucide/svelte/icons/house'
	import SettingsIcon from '@lucide/svelte/icons/settings'
	import DollarSignIcon from '@lucide/svelte/icons/dollar-sign'
	import ArchiveIcon from '@lucide/svelte/icons/archive';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';

	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();

	let collapsed = $state(false);

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
</script>

<div class="w-full min-h-screen grid grid-cols-[auto_1fr] items-stretch border border-surface-200-800">
	<Navigation layout="sidebar" class="grid grid-rows-[auto_1fr_auto] gap-4 {collapsed ? 'w-16' : 'w-64'} transition-all duration-300">
		<Navigation.Header class="flex justify-between items-center px-2">
			<a href="/" class="btn-icon btn-icon-lg {isActive('/') ? 'preset-filled-primary-500' : 'preset-tonal-surface'}">
				<DollarSignIcon class="size-6" />
			</a>
			{#if !collapsed}
				<span class="text-lg font-bold">Stock</span>
			{/if}
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

		<Navigation.Footer class="flex flex-col gap-2">
			<button 
				class="btn-icon w-full justify-center"
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
				class={isActive('/settings') ? 'preset-filled-primary-500' : 'preset-filled-error-400-600'}
			>
				<SettingsIcon class="size-4" />
				{#if !collapsed}
					<Navigation.TriggerText>Settings</Navigation.TriggerText>
				{/if}
			</Navigation.TriggerAnchor>
		</Navigation.Footer>
	</Navigation>

	<main class="p-4 min-h-screen">
		{@render children()}
	</main>
</div>

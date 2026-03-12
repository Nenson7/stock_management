<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import BookIcon from '@lucide/svelte/icons/book'
	import HouseIcon from '@lucide/svelte/icons/house'
	import SettingsIcon from '@lucide/svelte/icons/settings'
	import DollarSignIcon from '@lucide/svelte/icons/dollar-sign'
	import ArchiveIcon from '@lucide/svelte/icons/archive';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import LogInIcon from '@lucide/svelte/icons/log-in';
	import XIcon from '@lucide/svelte/icons/x';

	let { children } = $props();

	let collapsed = $state(false);
	let mobileOpen = $state(false);

	const linksSidebar = {
		main: [
			{ label: 'Dashboard', href: '/dashboard', icon: HouseIcon },
		],
		management: [
			{ label: 'Records', href: '/records', icon: ArchiveIcon },
			{ label: 'Billing', href: '/billing', icon: BookIcon },
		]
	};

	const isActive = (path: string) => page.url.pathname === path;

	const toggleSidebar = () => {
		collapsed = !collapsed;
	};

	const toggleMobile = () => {
		mobileOpen = !mobileOpen;
	};

	const closeMobile = () => {
		mobileOpen = false;
	};

	const navigate = (href: string) => {
		goto(href);
		closeMobile();
	};

	const user = $derived(page.data.user);
</script>

<div class="min-h-screen">
	<!-- Mobile Header -->
	<header class="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-surface-900 border-b border-surface-700">
		<button class="flex items-center gap-2" onclick={toggleMobile}>
			<MenuIcon class="size-6 text-white" />
			<span class="text-lg font-bold text-white">Stock</span>
		</button>
		{#if user}
			<form action="/login?/logout" method="POST">
				<button class="btn btn-sm variant-soft-error">
					<LogOutIcon class="size-4" />
				</button>
			</form>
		{/if}
	</header>

	<!-- Sidebar -->
	<aside 
		class="fixed top-0 left-0 h-full z-40 bg-surface-900 border-r border-surface-700 flex flex-col
		w-64 transform transition-transform duration-300 ease-in-out
		{mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
		{collapsed ? 'md:w-16' : ''}"
	>
		<!-- Logo & Brand -->
		<div class="flex items-center justify-between p-4 border-b border-surface-700">
			<div class="flex items-center gap-2 overflow-hidden">
				<div class="size-8 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
					<DollarSignIcon class="size-5 text-white" />
				</div>
				{#if !collapsed}
					<span class="text-lg font-bold text-white whitespace-nowrap">Stock Manager</span>
				{/if}
			</div>
			<button class="md:hidden text-white opacity-70 hover:opacity-100" onclick={closeMobile}>
				<XIcon class="size-5" />
			</button>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 p-3 overflow-y-auto">
			{#if user}
				{#each Object.entries(linksSidebar) as [category, links]}
					<div class="mb-4">
						{#if !collapsed}
							<p class="px-3 py-2 text-xs font-semibold text-surface-400 uppercase tracking-wider">{category}</p>
						{/if}
						<ul class="space-y-1">
							{#each links as link}
								{@const Icon = link.icon}
								<li>
									<button
										onclick={() => navigate(link.href)}
										class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
										{isActive(link.href) 
											? 'bg-primary-500 text-white' 
											: 'text-surface-300 hover:bg-surface-800 hover:text-white'}"
										title={link.label}
									>
										<Icon class="size-5 shrink-0" />
										{#if !collapsed}
											<span class="whitespace-nowrap">{link.label}</span>
										{/if}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			{:else}
				<div class="px-3 py-2">
					<p class="text-xs text-surface-500 mb-2">Sign in to access</p>
					<button
						onclick={() => navigate('/login')}
						class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-surface-300 hover:bg-surface-800 hover:text-white transition-all"
					>
						<LogInIcon class="size-5 shrink-0" />
						{#if !collapsed}
							<span>Login / Sign Up</span>
						{/if}
					</button>
				</div>
			{/if}
		</nav>

		<!-- Footer -->
		<div class="p-3 border-t border-surface-700">
			{#if user}
				<div class="flex items-center gap-3 px-3 py-2 mb-2 bg-surface-800 rounded-lg">
					<div class="size-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shrink-0">
						{user.username[0].toUpperCase()}
					</div>
					{#if !collapsed}
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-white truncate">{user.username}</p>
							<p class="text-xs text-surface-400 capitalize">{user.role}</p>
						</div>
						<form action="/login?/logout" method="POST">
							<button class="btn-icon btn-icon-sm text-surface-400 hover:text-error-500">
								<LogOutIcon class="size-4" />
							</button>
						</form>
					{/if}
				</div>
			{/if}
			
			<div class="flex items-center gap-2">
				<button
					onclick={toggleSidebar}
					class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-surface-400 hover:bg-surface-800 hover:text-white transition-all"
					title={collapsed ? 'Expand' : 'Collapse'}
				>
					{#if collapsed}
						<ChevronRightIcon class="size-5" />
					{:else}
						<ChevronLeftIcon class="size-5" />
					{/if}
				</button>
				<button
					onclick={() => navigate('/settings')}
					class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all
					{isActive('/settings') 
						? 'bg-primary-500 text-white' 
						: 'text-surface-400 hover:bg-surface-800 hover:text-white'}"
					title="Settings"
				>
					<SettingsIcon class="size-5" />
					{#if !collapsed}
						<span>Settings</span>
					{/if}
				</button>
			</div>
		</div>
	</aside>

	<!-- Mobile Overlay -->
	{#if mobileOpen}
		<button 
			class="fixed inset-0 z-30 bg-black/60 md:hidden"
			onclick={closeMobile}
			aria-label="Close menu"
		></button>
	{/if}

	<!-- Main Content -->
	<main 
		class="min-h-screen bg-surface-50-900 transition-all duration-300 pt-16 md:pt-0
		{collapsed ? 'md:pl-16' : 'md:pl-64'}"
	>
		<div class="p-4 md:p-8 max-w-7xl mx-auto">
			{@render children()}
		</div>
	</main>
</div>

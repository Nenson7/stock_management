<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import PackageIcon from '@lucide/svelte/icons/package';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import DatabaseIcon from '@lucide/svelte/icons/database';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import LogInIcon from '@lucide/svelte/icons/log-in';
</script>

<div class="space-y-8">
	<header class="text-center py-8">
		<div class="inline-flex items-center justify-center size-16 rounded-full bg-primary-500 mb-4">
			<DatabaseIcon class="size-8 text-white" />
		</div>
		<h1 class="h1 text-surface-900 dark:text-white mb-2">Stock Management System</h1>
		<p class="text-surface-600 dark:text-surface-400 text-lg">Manage your products, inventory, and billing all in one place.</p>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<a href="/login" class="card p-6 bg-surface-900 border border-surface-700 hover:border-primary-500 transition-all group">
			<div class="flex items-center justify-between mb-4">
				<div class="size-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
					<LogInIcon class="size-6 text-primary-400" />
				</div>
				<ArrowRightIcon class="size-5 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
			</div>
			<h3 class="text-xl font-bold text-white mb-2">Get Started</h3>
			<p class="text-surface-400 text-sm">Sign in to access your dashboard and start managing your stock.</p>
		</a>

		<a href="/records" class="card p-6 bg-surface-900 border border-surface-700 hover:border-secondary-500 transition-all group">
			<div class="flex items-center justify-between mb-4">
				<div class="size-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
					<PackageIcon class="size-6 text-secondary-400" />
				</div>
				<ArrowRightIcon class="size-5 text-surface-500 group-hover:text-secondary-400 group-hover:translate-x-1 transition-all" />
			</div>
			<h3 class="text-xl font-bold text-white mb-2">Products</h3>
			<p class="text-surface-400 text-sm">View and manage your product inventory and stock levels.</p>
		</a>

		<a href="/billing" class="card p-6 bg-surface-900 border border-surface-700 hover:border-tertiary-500 transition-all group">
			<div class="flex items-center justify-between mb-4">
				<div class="size-12 rounded-xl bg-tertiary-500/20 flex items-center justify-center">
					<FileTextIcon class="size-6 text-tertiary-400" />
				</div>
				<ArrowRightIcon class="size-5 text-surface-500 group-hover:text-tertiary-400 group-hover:translate-x-1 transition-all" />
			</div>
			<h3 class="text-xl font-bold text-white mb-2">Invoices</h3>
			<p class="text-surface-400 text-sm">Create and manage customer invoices and billing.</p>
		</a>
	</div>

	<div class="card p-6 bg-surface-900 border border-surface-700 rounded-xl">
		<h2 class="h3 text-white mb-4 flex items-center gap-2">
			<TrendingUpIcon class="size-5 text-primary-400" />
			Features
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div class="p-4 bg-surface-800 rounded-lg">
				<PackageIcon class="size-8 text-secondary-400 mb-2" />
				<p class="font-semibold text-white">Product Management</p>
				<p class="text-sm text-surface-400">Track inventory levels</p>
			</div>
			<div class="p-4 bg-surface-800 rounded-lg">
				<FileTextIcon class="size-8 text-tertiary-400 mb-2" />
				<p class="font-semibold text-white">Invoice Generation</p>
				<p class="text-sm text-surface-400">Create and manage bills</p>
			</div>
			<div class="p-4 bg-surface-800 rounded-lg">
				<TrendingUpIcon class="size-8 text-primary-400 mb-2" />
				<p class="font-semibold text-white">Sales Tracking</p>
				<p class="text-sm text-surface-400">Monitor revenue</p>
			</div>
			<div class="p-4 bg-surface-800 rounded-lg">
				<DatabaseIcon class="size-8 text-error-400 mb-2" />
				<p class="font-semibold text-white">SQLite Database</p>
				<p class="text-sm text-surface-400">Fast local storage</p>
			</div>
		</div>
	</div>
</div>

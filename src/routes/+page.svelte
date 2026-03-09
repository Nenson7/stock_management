<script lang="ts">
	import { products, billingRecords, dashboardStats } from '$lib/data';
	import { ArrowRightIcon, PackageIcon, FileTextIcon, TrendingUpIcon } from '@lucide/svelte';
</script>

<div class="space-y-8">
	<header class="text-center py-8">
		<h1 class="h1 mb-2">Stock Management System</h1>
		<p class="opacity-60 text-lg">Welcome back! Here's what's happening today.</p>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<a href="/dashboard" class="card p-6 hover:preset-filled-primary-500 transition-all group">
			<div class="flex items-center justify-between">
				<div>
					<p class="opacity-60 text-sm">Total Revenue</p>
					<p class="h2">Rs. {dashboardStats.totalRevenue.toLocaleString()}</p>
				</div>
				<TrendingUpIcon class="size-10 opacity-40 group-hover:opacity-100" />
			</div>
			<div class="mt-4 flex items-center gap-2 text-sm">
				Go to Dashboard <ArrowRightIcon class="size-4" />
			</div>
		</a>

		<a href="/records" class="card p-6 hover:preset-filled-secondary-500 transition-all group">
			<div class="flex items-center justify-between">
				<div>
					<p class="opacity-60 text-sm">Products</p>
					<p class="h2">{products.length}</p>
				</div>
				<PackageIcon class="size-10 opacity-40 group-hover:opacity-100" />
			</div>
			<div class="mt-4 flex items-center gap-2 text-sm">
				View Records <ArrowRightIcon class="size-4" />
			</div>
		</a>

		<a href="/billing" class="card p-6 hover:preset-filled-tertiary-500 transition-all group">
			<div class="flex items-center justify-between">
				<div>
					<p class="opacity-60 text-sm">Invoices</p>
					<p class="h2">{billingRecords.length}</p>
				</div>
				<FileTextIcon class="size-10 opacity-40 group-hover:opacity-100" />
			</div>
			<div class="mt-4 flex items-center gap-2 text-sm">
				View Billing <ArrowRightIcon class="size-4" />
			</div>
		</a>
	</div>

	<div class="card p-6">
		<h2 class="h3 mb-4">Quick Stats</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="text-center p-4 border border-surface-200-800 rounded-container-token">
				<p class="h2">{dashboardStats.totalOrders}</p>
				<p class="opacity-60 text-sm">Orders</p>
			</div>
			<div class="text-center p-4 border border-surface-200-800 rounded-container-token">
				<p class="h2">{products.filter(p => p.quantity < 20).length}</p>
				<p class="opacity-60 text-sm">Low Stock</p>
			</div>
			<div class="text-center p-4 border border-surface-200-800 rounded-container-token">
				<p class="h2">{billingRecords.filter(r => r.status === 'paid').length}</p>
				<p class="opacity-60 text-sm">Paid Invoices</p>
			</div>
			<div class="text-center p-4 border border-surface-200-800 rounded-container-token">
				<p class="h2">{billingRecords.filter(r => r.status === 'pending').length}</p>
				<p class="opacity-60 text-sm">Pending</p>
			</div>
		</div>
	</div>
</div>

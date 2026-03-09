<script lang="ts">
	import { dashboardStats, products } from '$lib/data';
	import { TrendingUpIcon, PackageIcon, ShoppingCartIcon, AlertTriangleIcon } from '@lucide/svelte';

	const lowStockProducts = products.filter(p => p.quantity < 20);
</script>

<div class="space-y-6">
	<header>
		<h1 class="h2">Dashboard</h1>
		<p class="opacity-60">Overview of your stock management system.</p>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="card p-4 preset-filled-primary-500">
			<div class="flex items-center gap-4">
				<div class="preset-filled-primary-500 p-3 rounded-container-token">
					<TrendingUpIcon class="size-8" />
				</div>
				<div>
					<p class="opacity-60 text-sm">Total Revenue</p>
					<p class="h3">Rs. {dashboardStats.totalRevenue.toLocaleString()}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 preset-filled-secondary-500">
			<div class="flex items-center gap-4">
				<div class="preset-filled-secondary-500 p-3 rounded-container-token">
					<PackageIcon class="size-8" />
				</div>
				<div>
					<p class="opacity-60 text-sm">Total Products</p>
					<p class="h3">{dashboardStats.totalProducts}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 preset-filled-tertiary-500">
			<div class="flex items-center gap-4">
				<div class="preset-filled-tertiary-500 p-3 rounded-container-token">
					<ShoppingCartIcon class="size-8" />
				</div>
				<div>
					<p class="opacity-60 text-sm">Total Orders</p>
					<p class="h3">{dashboardStats.totalOrders}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 preset-filled-warning-500">
			<div class="flex items-center gap-4">
				<div class="preset-filled-warning-500 p-3 rounded-container-token">
					<AlertTriangleIcon class="size-8" />
				</div>
				<div>
					<p class="opacity-60 text-sm">Low Stock Items</p>
					<p class="h3">{dashboardStats.lowStockItems}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div class="card p-6">
			<h3 class="h3 mb-4">Recent Sales</h3>
			<div class="space-y-3">
				{#each dashboardStats.recentSales as sale}
					<div class="flex justify-between items-center py-2 border-b border-surface-200-800">
						<span class="opacity-60">{sale.date}</span>
						<span class="font-bold">Rs. {sale.amount.toLocaleString()}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="card p-6">
			<h3 class="h3 mb-4">Low Stock Alerts</h3>
			{#if lowStockProducts.length > 0}
				<div class="space-y-3">
					{#each lowStockProducts as product}
						<div class="flex justify-between items-center py-2 border-b border-surface-200-800">
							<span>{product.name}</span>
							<span class="preset-filled-error-500 px-2 py-1 rounded text-sm">{product.quantity} left</span>
						</div>
					{/each}
				</div>
			{:else}
				<p class="opacity-60">All items are well stocked!</p>
			{/if}
		</div>
	</div>
</div>

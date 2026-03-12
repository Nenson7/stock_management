<script lang="ts">
	import DollarSignIcon from '@lucide/svelte/icons/dollar-sign';
	import PackageIcon from '@lucide/svelte/icons/package';
	import ShoppingCartIcon from '@lucide/svelte/icons/shopping-cart';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';

	let { data } = $props();
</script>

<div class="space-y-6">
	<header>
		<h1 class="h1">Dashboard</h1>
		<p class="opacity-60">Welcome back! Here's what's happening today.</p>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="card p-4 bg-surface-100-900 border border-surface-200-800 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500">
					<DollarSignIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm opacity-60 uppercase tracking-wider">Total Revenue</p>
					<p class="text-2xl font-bold">${(data.stats.totalRevenue / 100).toFixed(2)}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 bg-surface-100-900 border border-surface-200-800 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-lg bg-secondary-500/20 flex items-center justify-center text-secondary-500">
					<PackageIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm opacity-60 uppercase tracking-wider">Products</p>
					<p class="text-2xl font-bold">{data.stats.totalProducts}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 bg-surface-100-900 border border-surface-200-800 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-lg bg-tertiary-500/20 flex items-center justify-center text-tertiary-500">
					<ShoppingCartIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm opacity-60 uppercase tracking-wider">Total Orders</p>
					<p class="text-2xl font-bold">{data.stats.totalOrders}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 bg-surface-100-900 border border-surface-200-800 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-lg bg-error-500/20 flex items-center justify-center text-error-500">
					<AlertTriangleIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm opacity-60 uppercase tracking-wider">Low Stock</p>
					<p class="text-2xl font-bold">{data.stats.lowStockItems}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div class="card p-6 bg-surface-100-900 border border-surface-200-800 rounded-xl">
			<h2 class="h2 mb-4">Recent Sales</h2>
			<div class="space-y-4">
				{#each data.stats.recentSales as sale}
					<div class="flex justify-between items-center p-3 bg-surface-200-800 rounded-lg">
						<span>{sale.date}</span>
						<span class="font-bold text-success-500">+${(sale.amount / 100).toFixed(2)}</span>
					</div>
				{:else}
					<p class="text-center py-8 opacity-60">No recent sales.</p>
				{/each}
			</div>
		</div>

		<div class="card p-6 bg-surface-100-900 border border-surface-200-800 rounded-xl">
			<h2 class="h2 mb-4">Latest Invoices</h2>
			<div class="table-container">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>ID</th>
							<th>Customer</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{#each data.recentInvoices as inv}
							<tr>
								<td class="text-xs truncate max-w-[80px]">{inv.id}</td>
								<td>{inv.customerName}</td>
								<td class="font-bold">${(inv.totalAmount / 100).toFixed(2)}</td>
							</tr>
						{:else}
							<tr>
								<td colspan="3" class="text-center py-8 opacity-60">No invoices yet.</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

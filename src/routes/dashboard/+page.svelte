<script>
	import DollarSignIcon from '@lucide/svelte/icons/dollar-sign';
	import PackageIcon from '@lucide/svelte/icons/package';
	import ShoppingCartIcon from '@lucide/svelte/icons/shopping-cart';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	let { data } = $props();
</script>

<div class="space-y-6">
	<header>
		<h1 class="h1 text-white">Dashboard</h1>
		<p class="text-surface-400">Welcome back! Here's what's happening today.</p>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="card p-4 bg-surface-800 border border-surface-700 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
					<DollarSignIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm text-surface-400 uppercase tracking-wider">Total Revenue</p>
					<p class="text-2xl font-bold text-white">${(data.stats.totalRevenue / 100).toFixed(2)}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 bg-surface-800 border border-surface-700 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-xl bg-secondary-500/20 flex items-center justify-center text-secondary-400">
					<PackageIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm text-surface-400 uppercase tracking-wider">Products</p>
					<p class="text-2xl font-bold text-white">{data.stats.totalProducts}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 bg-surface-800 border border-surface-700 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-xl bg-tertiary-500/20 flex items-center justify-center text-tertiary-400">
					<ShoppingCartIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm text-surface-400 uppercase tracking-wider">Total Orders</p>
					<p class="text-2xl font-bold text-white">{data.stats.totalOrders}</p>
				</div>
			</div>
		</div>

		<div class="card p-4 bg-surface-800 border border-surface-700 rounded-xl">
			<div class="flex items-center gap-4">
				<div class="size-12 rounded-xl bg-error-500/20 flex items-center justify-center text-error-400">
					<AlertTriangleIcon class="size-6" />
				</div>
				<div>
					<p class="text-sm text-surface-400 uppercase tracking-wider">Low Stock</p>
					<p class="text-2xl font-bold text-white">{data.stats.lowStockItems}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div class="card p-6 bg-surface-800 border border-surface-700 rounded-xl">
			<div class="flex justify-between items-center mb-4">
				<h2 class="h3 text-white">Recent Sales</h2>
				<a href="/billing" class="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
					View All <ArrowRightIcon class="size-4" />
				</a>
			</div>
			<div class="space-y-3">
				{#each data.stats.recentSales as sale}
					<div class="flex justify-between items-center p-3 bg-surface-900 rounded-lg">
						<span class="text-surface-400">{sale.date}</span>
						<span class="font-bold text-success-400">+${(sale.amount / 100).toFixed(2)}</span>
					</div>
				{:else}
					<p class="text-center py-8 text-surface-500">No recent sales.</p>
				{/each}
			</div>
		</div>

		<div class="card p-6 bg-surface-800 border border-surface-700 rounded-xl">
			<div class="flex justify-between items-center mb-4">
				<h2 class="h3 text-white">Latest Invoices</h2>
				<a href="/billing" class="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
					View All <ArrowRightIcon class="size-4" />
				</a>
			</div>
			<div class="table-container">
				<table class="table table-hover">
					<thead>
						<tr class="text-surface-400">
							<th>Customer</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each data.recentInvoices as inv}
							<tr class="hover:bg-surface-700/50">
								<td class="text-white">{inv.customerName}</td>
								<td class="font-bold text-white">${(inv.totalAmount / 100).toFixed(2)}</td>
								<td>
									<span class="badge variant-filled-success capitalize">{inv.status}</span>
								</td>
							</tr>
						{:else}
							<tr>
								<td colspan="3" class="text-center py-8 text-surface-500">No invoices yet.</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { enhance } from '$app/forms';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import PackageIcon from '@lucide/svelte/icons/package';

	let { data, form } = $props();
	let showAddModal = $state(false);

	const categories = ['Beverages', 'Snacks', 'Ingredients', 'Equipment', 'Supplies'];
</script>

<div class="space-y-6">
	<header class="flex justify-between items-center">
		<div>
			<h1 class="h1">Product Records</h1>
			<p class="opacity-60">Manage your inventory and stock levels.</p>
		</div>
		<button class="btn variant-filled-primary" onclick={() => showAddModal = !showAddModal}>
			<PlusIcon class="size-4 mr-2" />
			Add Product
		</button>
	</header>

	{#if showAddModal}
		<div class="card p-6 border border-surface-200-800 bg-surface-100-900 shadow-xl rounded-xl mb-6">
			<h2 class="h2 mb-4">Add New Product</h2>
			<form method="POST" action="?/add" use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') showAddModal = false;
				};
			}} class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<label class="label">
					<span>Product Name</span>
					<input class="input" type="text" name="name" required placeholder="e.g. Arabica Beans" />
				</label>
				
				<label class="label">
					<span>Category</span>
					<select class="select" name="category" required>
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</label>

				<label class="label">
					<span>Price (in cents)</span>
					<input class="input" type="number" name="price" required placeholder="1200" />
				</label>

				<label class="label">
					<span>Quantity</span>
					<input class="input" type="number" name="quantity" required placeholder="50" />
				</label>

				<label class="label md:col-span-2">
					<span>Description</span>
					<textarea class="textarea" name="description" placeholder="Optional product description"></textarea>
				</label>

				<div class="md:col-span-2 flex justify-end gap-2 pt-2">
					<button type="button" class="btn variant-soft" onclick={() => showAddModal = false}>Cancel</button>
					<button type="submit" class="btn variant-filled-primary">Save Product</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="card bg-surface-100-900 border border-surface-200-800 rounded-xl overflow-hidden">
		<div class="table-container">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Product</th>
						<th>Category</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Status</th>
						<th class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.products as product (product.id)}
						<tr>
							<td>
								<div class="flex items-center gap-3">
									<div class="size-8 rounded bg-surface-200-800 flex items-center justify-center">
										<PackageIcon class="size-4" />
									</div>
									<span class="font-bold">{product.name}</span>
								</div>
							</td>
							<td><span class="badge variant-soft-surface">{product.category}</span></td>
							<td>${(product.price / 100).toFixed(2)}</td>
							<td>{product.quantity}</td>
							<td>
								{#if product.quantity > 20}
									<span class="badge variant-filled-success">In Stock</span>
								{:else if product.quantity > 0}
									<span class="badge variant-filled-warning">Low Stock</span>
								{:else}
									<span class="badge variant-filled-error">Out of Stock</span>
								{/if}
							</td>
							<td class="text-right">
								<form method="POST" action="?/delete" use:enhance class="inline">
									<input type="hidden" name="id" value={product.id} />
									<button class="btn-icon btn-icon-sm variant-soft-error">
										<TrashIcon class="size-4" />
									</button>
								</form>
							</td>
						</tr>
					{/each}
					{#if data.products.length === 0}
						<tr>
							<td colspan="6" class="text-center py-8 opacity-60">No products found. Add your first product to get started.</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>

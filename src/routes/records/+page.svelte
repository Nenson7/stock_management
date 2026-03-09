<script lang="ts">
	import { PlusIcon, Trash2Icon } from '@lucide/svelte';
	import { products, type Product } from '$lib/data';

	let inventory = $state<Product[]>([...products]);

	let showModal = $state(false);
	let newProduct = $state({ name: '', price: 0, quantity: 0, category: '' });

	const addProduct = () => {
		if (!newProduct.name || newProduct.price <= 0) return;

		const id = (inventory.length + 1).toString();
		inventory.push({ id, ...newProduct, quantity: newProduct.quantity || 0, category: newProduct.category || 'Uncategorized' });

		newProduct = { name: '', price: 0, quantity: 0, category: '' };
		showModal = false;
	};

	const deleteProduct = (id: string) => {
		inventory = inventory.filter((p) => p.id !== id);
	};
</script>

<div class="space-y-6">
	<header class="flex justify-between items-center">
		<div>
			<h1 class="h2">Product Records</h1>
			<p class="opacity-60">Manage your inventory and pricing.</p>
		</div>
		<button class="btn preset-filled-primary-500" onclick={() => (showModal = true)}>
			<PlusIcon class="size-4 mr-2" /> Add Product
		</button>
	</header>

	<div class="table-container shadow-xl border border-surface-200-800 rounded-container-token">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>ID</th>
					<th>Product Name</th>
					<th>Category</th>
					<th>Quantity</th>
					<th>Price (NPR)</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each inventory as item (item.id)}
					<tr>
						<td class="opacity-50">#{item.id}</td>
						<td class="font-bold">{item.name}</td>
						<td><span class="badge preset-filled-secondary-500">{item.category}</span></td>
						<td>{item.quantity}</td>
						<td>Rs. {item.price.toLocaleString()}</td>
						<td class="text-right">
							<button
								class="btn-icon btn-icon-sm hover:preset-filled-error-500 transition-colors"
								onclick={() => deleteProduct(item.id)}
								aria-label="Delete {item.name}"
							>
								<Trash2Icon class="size-4" />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

{#if showModal}
	<div
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-labelledby="modal-title"
		class="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 backdrop-blur-sm p-4"
		onclick={() => (showModal = false)}
		onkeydown={(e) => e.key === 'Escape' && (showModal = false)}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="card p-6 w-full max-w-md shadow-2xl border border-surface-500/30 bg-surface-100-900"
		>
			<header class="mb-4">
				<h3 id="modal-title" class="h3">Add New Product</h3>
			</header>

			<section class="space-y-4">
				<label class="label">
					<span>Product Name</span>
					<input class="input" type="text" bind:value={newProduct.name} placeholder="e.g. Nepali Tea" />
				</label>
				<label class="label">
					<span>Price (NPR)</span>
					<input class="input" type="number" bind:value={newProduct.price} />
				</label>
				<label class="label">
					<span>Quantity</span>
					<input class="input" type="number" bind:value={newProduct.quantity} />
				</label>
				<label class="label">
					<span>Category</span>
					<input class="input" type="text" bind:value={newProduct.category} placeholder="e.g. Beverages" />
				</label>
			</section>

			<footer class="mt-6 flex justify-end gap-2">
				<button class="btn preset-tonal" onclick={() => (showModal = false)}>Cancel</button>
				<button class="btn preset-filled-primary-500" onclick={addProduct}>Save Product</button>
			</footer>
		</div>
	</div>
{/if}

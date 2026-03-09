<script lang="ts">
	import { billingRecords } from '$lib/data';
	import { PlusIcon, Trash2Icon, SearchIcon } from '@lucide/svelte';

	let searchTerm = $state('');
	let showModal = $state(false);
	let newInvoice = $state({ customer: '', amount: 0, items: 0 });

	const filteredRecords = $derived(
		billingRecords.filter(
			(r) =>
				r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
				r.id.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'paid':
				return 'preset-filled-success-500';
			case 'pending':
				return 'preset-filled-warning-500';
			case 'overdue':
				return 'preset-filled-error-500';
			default:
				return '';
		}
	};

	const addInvoice = () => {
		if (!newInvoice.customer || newInvoice.amount <= 0) return;
		showModal = false;
		newInvoice = { customer: '', amount: 0, items: 0 };
	};
</script>

<div class="space-y-6">
	<header class="flex justify-between items-center">
		<div>
			<h1 class="h2">Billing</h1>
			<p class="opacity-60">Manage invoices and payments.</p>
		</div>
		<div class="flex gap-2">
			<div class="relative">
				<SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-40" />
				<input
					class="input pl-10"
					type="text"
					placeholder="Search invoices..."
					bind:value={searchTerm}
				/>
			</div>
			<button class="btn preset-filled-primary-500" onclick={() => (showModal = true)}>
				<PlusIcon class="size-4 mr-2" /> New Invoice
			</button>
		</div>
	</header>

	<div class="grid grid-cols-3 gap-4 mb-6">
		<div class="card p-4 preset-filled-success-500">
			<p class="opacity-60 text-sm">Paid</p>
			<p class="h3">{billingRecords.filter(r => r.status === 'paid').length}</p>
		</div>
		<div class="card p-4 preset-filled-warning-500">
			<p class="opacity-60 text-sm">Pending</p>
			<p class="h3">{billingRecords.filter(r => r.status === 'pending').length}</p>
		</div>
		<div class="card p-4 preset-filled-error-500">
			<p class="opacity-60 text-sm">Overdue</p>
			<p class="h3">{billingRecords.filter(r => r.status === 'overdue').length}</p>
		</div>
	</div>

	<div class="table-container shadow-xl border border-surface-200-800 rounded-container-token">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Invoice ID</th>
					<th>Customer</th>
					<th>Date</th>
					<th>Items</th>
					<th>Amount</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredRecords as record (record.id)}
					<tr>
						<td class="font-mono opacity-50">{record.id}</td>
						<td class="font-bold">{record.customer}</td>
						<td>{record.date}</td>
						<td>{record.items}</td>
						<td>Rs. {record.amount.toLocaleString()}</td>
						<td>
							<span class="px-2 py-1 rounded text-sm capitalize {getStatusClass(record.status)}">
								{record.status}
							</span>
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
				<h3 id="modal-title" class="h3">Create New Invoice</h3>
			</header>

			<section class="space-y-4">
				<label class="label">
					<span>Customer Name</span>
					<input class="input" type="text" bind:value={newInvoice.customer} placeholder="e.g. John Doe" />
				</label>
				<label class="label">
					<span>Amount (NPR)</span>
					<input class="input" type="number" bind:value={newInvoice.amount} />
				</label>
				<label class="label">
					<span>Number of Items</span>
					<input class="input" type="number" bind:value={newInvoice.items} />
				</label>
			</section>

			<footer class="mt-6 flex justify-end gap-2">
				<button class="btn preset-tonal" onclick={() => (showModal = false)}>Cancel</button>
				<button class="btn preset-filled-primary-500" onclick={addInvoice}>Create Invoice</button>
			</footer>
		</div>
	</div>
{/if}

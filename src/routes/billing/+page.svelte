<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import TrashIcon from '@lucide/svelte/icons/trash';
	import XIcon from '@lucide/svelte/icons/x';

	let { data } = $props();
	let showCreateModal = $state(false);
	let showViewModal = $state(false);
	let viewInvoice = $state<any>(null);
	
	let selectedItems = $state([{ productId: '', quantity: 1 }]);

	const addItem = () => {
		selectedItems = [...selectedItems, { productId: '', quantity: 1 }];
	};

	const removeItem = (index: number) => {
		selectedItems = selectedItems.filter((_, i) => i !== index);
	};

	const generatePDF = (invoice: any) => {
		const doc = new jsPDF();
		
		doc.setFontSize(22);
		doc.text('STOCK MANAGEMENT INVOICE', 105, 20, { align: 'center' });
		
		doc.setFontSize(12);
		doc.text(`Invoice ID: ${invoice.id}`, 20, 40);
		doc.text(`Customer: ${invoice.customerName}`, 20, 50);
		doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 20, 60);
		doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 70);

		const tableData = invoice.items.map((item: any) => {
			const product = data.products.find(p => p.id === item.productId);
			return [
				product?.name || 'Unknown Product',
				item.quantity,
				`$${(item.price / 100).toFixed(2)}`,
				`$${((item.price * item.quantity) / 100).toFixed(2)}`
			];
		});

		autoTable(doc, {
			startY: 80,
			head: [['Product', 'Quantity', 'Unit Price', 'Total']],
			body: tableData,
			foot: [['', '', 'Total Amount', `$${(invoice.totalAmount / 100).toFixed(2)}`]],
		});

		doc.save(`Invoice_${invoice.id}.pdf`);
	};

	const openViewModal = (invoice: any) => {
		viewInvoice = invoice;
		showViewModal = true;
	};

	const closeViewModal = () => {
		showViewModal = false;
		viewInvoice = null;
	};
</script>

<div class="space-y-6">
	<header class="flex justify-between items-center">
		<div>
			<h1 class="h1 text-white">Billing & Invoices</h1>
			<p class="text-surface-400">Generate and manage customer invoices.</p>
		</div>
		<button class="btn variant-filled-primary" onclick={() => showCreateModal = !showCreateModal}>
			<PlusIcon class="size-4 mr-2" />
			Create Invoice
		</button>
	</header>

	{#if showCreateModal}
		<div class="card p-6 bg-surface-800 border border-surface-700 shadow-xl rounded-xl mb-6">
			<h2 class="h2 text-white mb-4">Create New Invoice</h2>
			<form method="POST" action="?/create" use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						showCreateModal = false;
						(window as any).showToast?.('Invoice created successfully!', 'success');
						await invalidateAll();
					}
				};
			}} class="space-y-4">
				<label class="label">
					<span class="text-surface-300">Customer Name</span>
					<input class="input bg-surface-900 border-surface-700 text-white" type="text" name="customerName" required placeholder="John Doe" />
				</label>

				<div class="space-y-2">
					<div class="flex justify-between items-center">
						<span class="font-bold text-white">Items</span>
						<button type="button" class="btn btn-sm variant-soft-primary" onclick={addItem}>
							<PlusIcon class="size-3 mr-1" /> Add Item
						</button>
					</div>

					{#each selectedItems as item, i}
						<div class="flex gap-2 items-end">
							<label class="label flex-1">
								<span class="text-surface-400 text-sm">Product</span>
								<select class="select bg-surface-900 border-surface-700 text-white" name="productId" required bind:value={item.productId}>
									<option value="" disabled selected>Select a product</option>
									{#each data.products as product}
										<option value={product.id}>{product.name} (${(product.price / 100).toFixed(2)})</option>
									{/each}
								</select>
							</label>
							<label class="label w-24">
								<span class="text-surface-400 text-sm">Qty</span>
								<input class="input bg-surface-900 border-surface-700 text-white" type="number" name="quantity" required min="1" bind:value={item.quantity} />
							</label>
							<button type="button" class="btn-icon variant-soft-error" onclick={() => removeItem(i)} disabled={selectedItems.length === 1}>
								<PlusIcon class="size-4 rotate-45" />
							</button>
						</div>
					{/each}
				</div>

				<div class="flex justify-end gap-2 pt-4">
					<button type="button" class="btn variant-soft" onclick={() => showCreateModal = false}>Cancel</button>
					<button type="submit" class="btn variant-filled-primary">Generate & Save Invoice</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.invoices as invoice (invoice.id)}
			<div class="card p-4 bg-surface-800 border border-surface-700 rounded-xl hover:border-primary-500 transition-all">
				<div class="flex justify-between items-start mb-2">
					<div class="size-10 rounded-lg bg-surface-700 flex items-center justify-center">
						<FileTextIcon class="size-5 text-primary-400" />
					</div>
					<span class="badge variant-filled-success capitalize">{invoice.status}</span>
				</div>
				<h3 class="font-bold text-lg text-white">{invoice.customerName}</h3>
				<p class="text-sm text-surface-400 mb-4">{new Date(invoice.date).toLocaleDateString()}</p>
				
				<div class="flex justify-between items-center border-t border-surface-700 pt-4">
					<div>
						<p class="text-xs text-surface-500 uppercase tracking-wider">Amount</p>
						<p class="text-xl font-bold text-white">${(invoice.totalAmount / 100).toFixed(2)}</p>
					</div>
					<button class="btn btn-sm variant-soft-primary" onclick={() => generatePDF(invoice)}>
						<DownloadIcon class="size-4 mr-1" /> PDF
					</button>
					<button class="btn btn-sm variant-soft-secondary" onclick={() => openViewModal(invoice)}>
						<EyeIcon class="size-4 mr-1" /> View
					</button>
					<form method="POST" action="?/delete" use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								(window as any).showToast?.('Invoice deleted successfully!', 'success');
								await invalidateAll();
							}
						};
					}} class="inline">
						<input type="hidden" name="invoiceId" value={invoice.id} />
						<button type="submit" class="btn btn-sm variant-soft-error" onclick={(e) => { if (!confirm('Are you sure you want to delete this invoice?')) e.preventDefault(); }}>
							<TrashIcon class="size-4" />
						</button>
					</form>
				</div>
			</div>
		{/each}
		{#if data.invoices.length === 0}
			<div class="col-span-full text-center py-12 text-surface-500 bg-surface-800 border border-dashed border-surface-600 rounded-xl">
				No invoices yet. Create your first one above.
			</div>
		{/if}
	</div>

	{#if showViewModal && viewInvoice}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" aria-label="Invoice details" onclick={closeViewModal} onkeydown={(e) => e.key === 'Escape' && closeViewModal()}>
			<div class="card p-6 bg-surface-800 border border-surface-700 shadow-xl rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" role="document" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
				<div class="flex justify-between items-start mb-6">
					<div>
						<h2 class="h2 text-white">Invoice Details</h2>
						<p class="text-surface-400 text-sm">ID: {viewInvoice.id}</p>
					</div>
					<button class="btn-icon variant-soft" onclick={closeViewModal}>
						<XIcon class="size-5" />
					</button>
				</div>

				<div class="grid grid-cols-2 gap-4 mb-6">
					<div>
						<p class="text-xs text-surface-500 uppercase tracking-wider">Customer</p>
						<p class="text-white font-medium">{viewInvoice.customerName}</p>
					</div>
					<div>
						<p class="text-xs text-surface-500 uppercase tracking-wider">Date</p>
						<p class="text-white">{new Date(viewInvoice.date).toLocaleDateString()}</p>
					</div>
					<div>
						<p class="text-xs text-surface-500 uppercase tracking-wider">Status</p>
						<span class="badge variant-filled-success capitalize">{viewInvoice.status}</span>
					</div>
					<div>
						<p class="text-xs text-surface-500 uppercase tracking-wider">Total Amount</p>
						<p class="text-white font-bold text-xl">${(viewInvoice.totalAmount / 100).toFixed(2)}</p>
					</div>
				</div>

				<div class="border-t border-surface-700 pt-4">
					<h3 class="font-bold text-white mb-3">Items</h3>
					<div class="overflow-x-auto">
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="text-surface-400">Product</th>
									<th class="text-surface-400">Quantity</th>
									<th class="text-surface-400">Unit Price</th>
									<th class="text-surface-400">Total</th>
								</tr>
							</thead>
							<tbody>
								{#each viewInvoice.items as item}
									<tr class="border-surface-700">
										<td class="text-white">{data.products.find(p => p.id === item.productId)?.name || 'Unknown'}</td>
										<td class="text-white">{item.quantity}</td>
										<td class="text-white">${(item.price / 100).toFixed(2)}</td>
										<td class="text-white">${((item.price * item.quantity) / 100).toFixed(2)}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<div class="flex justify-end gap-2 mt-6 border-t border-surface-700 pt-4">
					<button class="btn variant-soft" onclick={closeViewModal}>Close</button>
					<button class="btn variant-filled-primary" onclick={() => { generatePDF(viewInvoice); }}>
						<DownloadIcon class="size-4 mr-2" /> Download PDF
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
